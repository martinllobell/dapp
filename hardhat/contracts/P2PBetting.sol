// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract P2PBetting is Ownable {
    /////////////////////////////////////////////
    ////////// ERRORS ///////////////////////////
    /////////////////////////////////////////////

    error P2PBetting__TransferFailed();
    error P2PBetting__NumberOfChallengersCantBeZero();
    error P2PBetting__MaxPriceCantBeZero();
    error P2PBetting__OddsMustBeHigherThanOne();
    error P2PBetting__NotEnoughEthSent();
    error P2PBetting__TooMuchEthSent();
    error P2PBetting__BetIsFullOrNonexistent();
    error P2PBetting__CantEnterBetNow();
    error P2PBetting__UserNotInBet();
    error P2PBetting__AlreadyRetrievedOrBetNonexistent();
    error P2PBetting__OnlyCalledIfTipsterLost();

    /////////////////////////////////////////////
    ////////// EVENTS ///////////////////////////
    /////////////////////////////////////////////

    event P2PBetting__NewFeeSet(uint256 indexed oldFee, uint256 indexed newFee);
    event P2PBetting__NewOracleSet(address indexed oracle);
    event P2PBetting__BetCreated(
        uint256 indexed maxPrice,
        uint256 indexed odds,
        uint256 indexed maxNumOfPlayers,
        string betData
    );
    event P2PBetting__FeesCollected(uint256 indexed feesCollected);
    event P2PBetting__BetJoined(
        address indexed challenger,
        uint256 indexed betID
    );
    event P2PBetting__RewardClaimed(
        address indexed winner,
        uint256 indexed amount
    );

    /////////////////////////////////////////////
    ////////// VARIABLES ////////////////////////
    /////////////////////////////////////////////

    //Podría ser un array de estos, ya que puede haber EUR_ETH, ARG_ETH....
    AggregatorV3Interface internal USD_ETH_dataFeed;

    uint256 constant DECIMALS = 1000; //3 decimals
    uint256 private s_fee; // 2000 = 2%
    uint256 private feesCollected;
    uint256 private numberOfBetsDone;

    mapping(address user => Profile profile) s_Profiles;
    mapping(uint256 betId => Bet bet) s_Bets;

    struct Profile {
        int256 balanceVariation;
        uint256[] betIdHistory;
    }

    struct Bet {
        uint256 betId;
        address tipster;
        uint256 collateralGiven;
        uint256 moneyInBet;
        uint256 maxNumberOfChallengers;
        address[] challengers;
        uint256[] challengersMoneyBet;
        uint256 odds; //Por ejemplo 1500 = 1.5
        uint256 maxEntryFee;
        uint256 fee;
        bool tipsterWon;
        bool locked;
        bool ended; //cuando el partido se acaba
        uint256 timestampWhenEnded;
        //Falta una variable que contenga datos de la apuesta.
        //Cuando tengamos claro cómo funciona la IA, se podrá parametrizar
        //Por ejemplo : "Madrid Gana , Barça gana o empata, Manchester City más de 4,5 amarillas, más de 4.5 goles...
    }

    constructor(uint256 fee_, address owner) Ownable(owner) {
        s_fee = fee_;
    }

    function collectFees() external {
        (bool succ, ) = payable(owner()).call{value: feesCollected}("");
        if (!succ) {
            revert P2PBetting__TransferFailed();
        }
        uint256 feesCollectedNow = feesCollected;
        feesCollected = 0;
        emit P2PBetting__FeesCollected(feesCollectedNow);
    }

    function createBet(
        uint256 maxNumberOfChallengers_,
        uint256 odds_,
        uint256 maxEntryFee_ /** , variable de datos de la apuesta */
    ) external payable {
        if (odds_ <= 1000) {
            revert P2PBetting__OddsMustBeHigherThanOne();
        }
        if (maxNumberOfChallengers_ == 0) {
            revert P2PBetting__NumberOfChallengersCantBeZero();
        }
        if (maxEntryFee_ == 0) {
            revert P2PBetting__MaxPriceCantBeZero();
        }
        if (
            msg.value <
            ((maxNumberOfChallengers_ * odds_ * maxEntryFee_) /
                DECIMALS -
                maxNumberOfChallengers_ *
                maxEntryFee_)
        ) {
            revert P2PBetting__NotEnoughEthSent();
        }
        Bet memory newBet;
        newBet.tipster = msg.sender;

        newBet.maxNumberOfChallengers = maxNumberOfChallengers_;

        newBet.odds = odds_;
        newBet.fee = s_fee;

        newBet.maxEntryFee = maxEntryFee_;
        //newBet.variabledatosdeapuesta = datos de la apuesta

        newBet.moneyInBet = msg.value;
        newBet.collateralGiven = msg.value;
        newBet.betId = numberOfBetsDone;
        s_Bets[numberOfBetsDone] = newBet;
        s_Profiles[msg.sender].betIdHistory.push(numberOfBetsDone);
        s_Profiles[msg.sender].balanceVariation -= int256(msg.value);
        numberOfBetsDone++;

        emit P2PBetting__BetCreated(
            maxEntryFee_,
            odds_,
            maxNumberOfChallengers_,
            "Aqui el string de los datos de la apuesta"
        );
    }

    function joinBet(uint256 betId_) external payable {
        Bet memory betSelected = s_Bets[betId_];
        if (
            betSelected.maxNumberOfChallengers <= betSelected.challengers.length
        ) {
            revert P2PBetting__BetIsFullOrNonexistent();
        }
        if (msg.value > betSelected.maxEntryFee) {
            revert P2PBetting__TooMuchEthSent();
        }

        if (betSelected.ended || betSelected.locked) {
            revert P2PBetting__CantEnterBetNow();
        }

        s_Bets[betId_].challengers.push(msg.sender);
        s_Bets[betId_].challengersMoneyBet.push(msg.value);
        s_Bets[betId_].moneyInBet += msg.value;
        s_Profiles[msg.sender].betIdHistory.push(betId_);
        s_Profiles[msg.sender].balanceVariation -= int256(msg.value);

        emit P2PBetting__BetJoined(msg.sender, betId_);
    }

    //Función automatizada que pide el resultado de fútbol a la api y
    //cierra la apuesta, decidiendo si el ganador es el challenger o el tipster

    //Ahora no tiene nada, solo está así para testear , cambiará en el futuro

    function lockBet(uint256 betId_) external {
        s_Bets[betId_].locked = true;
    }

    function endBet(uint256 betId_, bool tipsterWon) public {
        //Automation
        //functions

        s_Bets[betId_].tipsterWon = tipsterWon;
        s_Bets[betId_].ended = true;
    }

    function getRewards(uint256 betId, uint256 numberOfChallenger) external {
        Bet memory betSelected = s_Bets[betId];

        if (
            msg.sender == betSelected.tipster &&
            betSelected.tipsterWon &&
            betSelected.moneyInBet != 0 &&
            betSelected.ended
        ) {
            s_Profiles[msg.sender].balanceVariation += int256(
                betSelected.moneyInBet
            );
            uint256 feeFromThisBet = ((betSelected.moneyInBet -
                betSelected.collateralGiven) *
                betSelected.odds *
                betSelected.fee) / (100 * DECIMALS * DECIMALS); //Revisar, puede que mal
            uint256 moneyToTransfer = betSelected.moneyInBet - feeFromThisBet;
            s_Bets[betId].moneyInBet = 0;
            feesCollected += feeFromThisBet;
            payable(msg.sender).transfer(moneyToTransfer);
            emit P2PBetting__RewardClaimed(msg.sender, moneyToTransfer);
        } else if (
            numberOfChallenger < betSelected.challengers.length &&
            msg.sender == betSelected.challengers[numberOfChallenger] &&
            betSelected.challengersMoneyBet[numberOfChallenger] != 0 &&
            betSelected.ended &&
            !betSelected.tipsterWon
        ) {
            uint256 amountWon = (betSelected.odds *
                betSelected.challengersMoneyBet[numberOfChallenger]) / DECIMALS;
            s_Profiles[msg.sender].balanceVariation += int256(amountWon);
            uint256 feeFromThisBet = (amountWon * betSelected.fee) /
                (100 * DECIMALS); //Revisar, puede que mal
            uint256 moneyToTransfer = amountWon - feeFromThisBet;
            s_Bets[betId].challengersMoneyBet[numberOfChallenger] = 0;
            feesCollected += feeFromThisBet;
            (bool succ, ) = payable(msg.sender).call{value: moneyToTransfer}(
                ""
            );
            if (!succ) {
                revert P2PBetting__TransferFailed();
            }
            emit P2PBetting__RewardClaimed(msg.sender, moneyToTransfer);
        } else {
            revert P2PBetting__AlreadyRetrievedOrBetNonexistent();
        }
    }

    function getCollateralBack(uint256 betId_) external {
        Bet memory betSelected = s_Bets[betId_];
        if (betSelected.collateralGiven == 0 ) {
            revert P2PBetting__AlreadyRetrievedOrBetNonexistent();
        }
        if (!betSelected.ended || betSelected.tipsterWon){
            revert P2PBetting__OnlyCalledIfTipsterLost();
        }
        uint256 amountToTransferBack = betSelected.moneyInBet -(((betSelected.moneyInBet - betSelected.collateralGiven) * betSelected.odds)/DECIMALS);
        s_Bets[betId_].collateralGiven = 0;
        payable(betSelected.tipster).transfer(amountToTransferBack);
    }

    ///////////////////////////////////////////
    /////// SETTERS ///////////////////////////
    ///////////////////////////////////////////

    function setFee(uint256 newFee) external onlyOwner {
        uint256 oldfee = s_fee;
        s_fee = newFee;
        emit P2PBetting__NewFeeSet(oldfee, newFee);
    }

    function setUsdOracle(address newOracle) external onlyOwner {
        USD_ETH_dataFeed = AggregatorV3Interface(newOracle);
        emit P2PBetting__NewOracleSet(newOracle);
    }

    ///////////////////////////////////////////
    /////// GETTERS ///////////////////////////
    ///////////////////////////////////////////

    function getFee() external view returns (uint256) {
        return s_fee;
    }

    function getOracle() external view returns (address) {
        return address(USD_ETH_dataFeed);
    }

    function getProfile(address user) external view returns (Profile memory) {
        return s_Profiles[user];
    }

    function getBet(uint256 betId) external view returns (Bet memory) {
        return s_Bets[betId];
    }

    function getFeesCollected() external view returns (uint256) {
        return feesCollected;
    }

    function getNumberOfChallenger(
        uint256 betId_
    ) external view returns (uint256) {
        address[] memory possibleAddresses = s_Bets[betId_].challengers;
        for (uint i; i < possibleAddresses.length; i++) {
            if (possibleAddresses[i] == msg.sender) {
                return i;
            }
        }
        revert P2PBetting__UserNotInBet();
    }

    function getNumberOfBets() external view returns (uint256) {
        return numberOfBetsDone;
    }

    //Uso de Chainlink-DataStreams
    function getUsdConversionRate(
        uint256 usdValue_
    ) external view returns (uint256) {
        (, int256 answer, , , ) = USD_ETH_dataFeed.latestRoundData();
        uint256 ethPrice = uint256(answer * 10000000000);
        // Convertir la cantidad de USD a Ether utilizando la tasa de conversión actual
        uint256 ethAmount = (usdValue_ * 1e18) / ethPrice;
        return ethAmount;
    }
}
