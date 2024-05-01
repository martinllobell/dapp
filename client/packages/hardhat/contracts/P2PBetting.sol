// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract P2PBetting is Ownable {
    /////////////////////////////////////////////
    ////////// ERRORS ///////////////////////////
    /////////////////////////////////////////////

    error P2PBetting__TransferFailed();
    error P2PBetting__NumberOfChallengersCantBeZero();
    error P2PBetting__OddsMustBeHigherThanOne();
    error P2PBetting__NotEnoughEthSent();
    error P2PBetting__TooMuchEthSent();
    error P2PBetting__BetIsFullOrNonexistent();
    error P2PBetting__BetEnded();
    error P2PBetting__UserNotInBet();
    error P2PBetting__AlreadyRetrievedOrBetNonexistent();

    /////////////////////////////////////////////
    ////////// EVENTS ///////////////////////////
    /////////////////////////////////////////////

    event P2PBetting__NewFeeSet(uint256 indexed oldFee, uint256 indexed newFee);
    event P2PBetting__BetCreated(
        uint256 indexed maxPrice,
        uint256 indexed odds,
        uint256 indexed maxNumOfPlayers,
        string betData
    );

    /////////////////////////////////////////////
    ////////// VARIABLES ////////////////////////
    /////////////////////////////////////////////

    uint256 constant DECIMALS = 1000; //3 decimals
    uint256 private s_fee; // 2% = 2000 creo
    uint256 private feesCollected;
    uint256 private numberOfBetsDone;
    uint256 private maxIntervalToClose; // 30 días

    mapping(address user => Profile profile) s_Profiles;
    mapping(uint256 betId => Bet bet) s_Bets;

    struct Profile {
        int256 balanceVariation;
        int256[] oddsHistory;
        uint256[] betIdHistory;
    }

    struct Bet {
        uint256 betId;
        address tipster;
        uint256 moneyInBet;
        uint256 maxNumberOfChallengers;
        address[] challengers;
        uint256[] challengersMoneyBet;
        uint256 odds;
        uint256 maxEntryFee;
        uint256 fee;
        bool tipsterWon;
        bool ended;
        bool closed; //Cuando el admin cierra la apuesta
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
    }

    function createBet(
        uint256 maxNumberOfChallengers_,
        uint256 odds_,
        uint256 maxEntryFee_ /** , variable de datos de la apuesta */
    ) external payable {
        if (
            msg.value <
            (maxNumberOfChallengers_ *
                odds_ *
                maxEntryFee_ -
                maxNumberOfChallengers_ *
                maxEntryFee_)
        ) {
            revert P2PBetting__NotEnoughEthSent();
        }
        Bet memory newBet;
        newBet.tipster = msg.sender;
        if (maxNumberOfChallengers_ == 0) {
            revert P2PBetting__NumberOfChallengersCantBeZero();
        }
        newBet.maxNumberOfChallengers = maxNumberOfChallengers_;
        if (odds_ <= 1) {
            revert P2PBetting__OddsMustBeHigherThanOne();
        }
        newBet.odds = odds_;
        newBet.fee = s_fee;
        newBet.maxEntryFee = maxEntryFee_;
        //newBet.variabledatosdeapuesta = datos de la apuesta

        newBet.challengers = new address[](maxNumberOfChallengers_);
        newBet.challengersMoneyBet = new uint256[](maxNumberOfChallengers_);
        newBet.moneyInBet = msg.value;
        newBet.betId = numberOfBetsDone;
        s_Bets[numberOfBetsDone] = newBet;
        s_Profiles[msg.sender].betIdHistory.push(numberOfBetsDone);
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
        if (msg.value > betSelected.maxEntryFee) {
            revert P2PBetting__TooMuchEthSent();
        }
        if (
            betSelected.maxNumberOfChallengers <= betSelected.challengers.length
        ) {
            revert P2PBetting__BetIsFullOrNonexistent();
        }
        if (betSelected.ended) {
            revert P2PBetting__BetEnded();
        }

        s_Bets[betId_].challengers.push(msg.sender);
        s_Bets[betId_].challengersMoneyBet.push(msg.value);
        s_Bets[betId_].moneyInBet += msg.value;
        s_Profiles[msg.sender].betIdHistory.push(betId_);
    }

    //Función automatizada que pide el resultado de fútbol a la api y
    //cierra la apuesta, decidiendo si el ganador es el challenger o el tipster

    /** function closeBet()  returns () {
        
    }*/

    function getRewards(uint256 betId, uint256 numberOfChallenger) external {
        Bet memory betSelected = s_Bets[betId];
        if (msg.sender != owner()) {
            if (
                msg.sender == betSelected.tipster &&
                betSelected.tipsterWon &&
                betSelected.moneyInBet != 0
            ) {
                s_Profiles[msg.sender].balanceVariation += int256(
                    betSelected.moneyInBet
                );
                s_Profiles[msg.sender].oddsHistory.push(
                    int256(betSelected.odds)
                );
                uint256 feeFromThisBet = (betSelected.moneyInBet *
                    betSelected.fee) / (100 * DECIMALS); //Revisar, puede que mal
                uint256 moneyToTransfer = betSelected.moneyInBet -
                    feeFromThisBet;
                s_Bets[betId].moneyInBet = 0;
                feesCollected += feeFromThisBet;
                payable(msg.sender).transfer(moneyToTransfer);
            } else if (
                numberOfChallenger < betSelected.challengers.length &&
                msg.sender == betSelected.challengers[numberOfChallenger] &&
                betSelected.challengersMoneyBet[numberOfChallenger] != 0
            ) {
                uint256 amountWon = betSelected.odds *
                    betSelected.challengersMoneyBet[numberOfChallenger];
                s_Profiles[msg.sender].balanceVariation += int256(amountWon);
                s_Profiles[msg.sender].oddsHistory.push(
                    int256(betSelected.odds)
                );
                uint256 feeFromThisBet = (amountWon * betSelected.fee) /
                    (100 * DECIMALS); //Revisar, puede que mal
                uint256 moneyToTransfer = amountWon - feeFromThisBet;
                s_Bets[betId].challengersMoneyBet[numberOfChallenger] = 0;
                feesCollected += feeFromThisBet;
                payable(msg.sender).transfer(moneyToTransfer);
            } else {
                revert P2PBetting__AlreadyRetrievedOrBetNonexistent();
            }
        } else {
            //Se actualizan los diversos perfiles con los perdedores
            if (betSelected.tipsterWon) {}
        }
    }

    ///////////////////////////////////////////
    /////// SETTERS ///////////////////////////
    ///////////////////////////////////////////

    function setFee(uint256 newFee) external onlyOwner {
        uint256 oldfee = s_fee;
        s_fee = newFee;
        emit P2PBetting__NewFeeSet(oldfee, newFee);
    }

    ///////////////////////////////////////////
    /////// GETTERS ///////////////////////////
    ///////////////////////////////////////////

    function getFee() external view returns (uint256) {
        return s_fee;
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
}

