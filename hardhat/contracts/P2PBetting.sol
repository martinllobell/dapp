// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {AggregatorV3Interface} from "../lib/chainlink-brownie-contracts/contracts/src/v0.5/interfaces/AggregatorV3Interface.sol";
import "../lib/chainlink-brownie-contracts/contracts/src/v0.8/AutomationCompatible.sol";
import {FunctionsClient} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "../lib/chainlink-brownie-contracts/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "../lib/BokkyPooBahsDateTimeLibrary/contracts/BokkyPooBahsDateTimeLibrary.sol";

//Alomejor hay que importar esta:
// import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract P2PBetting is Ownable, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    /////////////////////////////////////////////
    ////////// ERRORS ///////////////////////////
    /////////////////////////////////////////////

    error P2PBetting__TransferFailed();
    error P2PBetting__NumberOfChallengersCantBeZero();
    error P2PBetting__MaxPriceCantBeZero();
    error P2PBetting__MatchDoesntExist();
    error P2PBetting__WrongBetFormat();
    error P2PBetting__MatchDidNotEnd();
    error P2PBetting__OddsMustBeHigherThanOne();
    error P2PBetting__NotEnoughEthSent();
    error P2PBetting__TooMuchEthSent();
    error P2PBetting__BetIsFullOrNonexistent();
    error P2PBetting__CantEnterBetNow();
    error P2PBetting__UserNotInBet();
    error P2PBetting__CantCallIfNotOwner();
    error P2PBetting__AlreadyRetrievedOrBetNonexistent();
    error P2PBetting__OnlyCalledIfTipsterLost();
    error P2PBetting__UnexpectedRequestId();

    /////////////////////////////////////////////
    ////////// EVENTS ///////////////////////////
    /////////////////////////////////////////////

    event P2PBetting__NewFeeSet(uint256 indexed oldFee, uint256 indexed newFee);
    event P2PBetting__NewOracleSet(address indexed oracle);
    event P2PBetting__BetCreated(
        uint256 indexed maxPrice,
        uint256 indexed odds,
        uint256 indexed maxNumOfPlayers,
        uint256 betId
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

    event testevent(string name);

    /////////////////////////////////////////////
    ////////// CHAINNLINK VARIABLES /////////////
    /////////////////////////////////////////////

    // DON ID for the Functions DON to which the requests are sent

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint32 gasLimit = 30000000;

    //Valores hardcodeados para Avalanche Fuji

    address router = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    uint64 subscriptionId = 8293;
    bytes32 public donId =
        0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;

    string sourceGetResults = "0";
    string sourceGetMatchesToInsert = "0";

    //Podría ser un array de estos, ya que puede haber EUR_ETH, ARG_ETH....
    AggregatorV3Interface internal USD_ETH_dataFeed;

    uint256 constant DECIMALS = 1000; //3 decimals
    uint256 private s_fee; // 2000 = 2%
    uint256 private feesCollected;
    uint256 private intervalForAutomation = 24 hours;
    uint256 private lastTimestamp;
    uint256 private timestampToGetMatches;
    uint256 private numberOfBetsDone = 0;
    uint256 private numberOfMatchesDone;

    mapping(address user => Profile profile) s_Profiles;
    mapping(uint256 betId => Bet bet) s_Bets;
    mapping(uint256 matchId => Match) s_Matches;
    mapping(uint256 timestampTick => uint256[] matchId) s_MatchesByDate;
    uint256[] private allMatches;
    uint256[] private failedToClose; //Tiene los ids de los partidos que no se cerraron llamando a la API

    struct Match {
        uint256 matchId;
        string home;
        string away;
        uint256 pointsHome;
        uint256 pointsAway;
        uint256 timeOfGame;
        bool ended;
        uint256[] betsOfMatch;
    }

    struct Profile {
        int256 balanceVariation;
        uint256[] betIdHistory;
    }

    struct Bet {
        uint256 betId;
        uint256 matchId;
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
        bool ended; //cuando el partido se acaba
        uint256 startMatchTimestamp;
        uint256[] betData;
    }

    /**
     *
     * @param fee_ Percentage of money collected as fee:
     * @param owner Person who will manage the contract
     * @param subscriptionId_ Number of the subscription ID for chainlink functions
     */

    constructor(
        uint256 fee_,
        address owner,
        uint64 subscriptionId_
    ) Ownable() FunctionsClient(router) {
        transferOwnership(owner);
        s_fee = fee_ * DECIMALS;
        subscriptionId = subscriptionId_;
    }
    /**
     * Sends the fees collected to the owner of the contract
     */

    function collectFees() external {
        (bool succ, ) = payable(owner()).call{value: feesCollected}("");
        if (!succ) {
            revert P2PBetting__TransferFailed();
        }
        uint256 feesCollectedNow = feesCollected;
        feesCollected = 0;
        emit P2PBetting__FeesCollected(feesCollectedNow);
    }

    /**
     *
     * @param matchId : ID of the match
     * @param maxNumberOfChallengers_ : Number of max challengers Tipster allows
     * @param odds_ : multiplier of the bet for challengers: 1500 if odds is 1.5
     * @param maxEntryFee_ : Maximum money able to bet
     * @param betData_ : [winner/points, home/away/sumatory/difference/both, more/less/equal, points]
     */

    function createBet(
        uint256 matchId,
        uint256 maxNumberOfChallengers_,
        uint256 odds_,
        uint256 maxEntryFee_,
        uint256[] memory betData_
    ) external payable {
        // if (odds_ <= 1000) {
        //     revert P2PBetting__OddsMustBeHigherThanOne();
        // }
        if (maxNumberOfChallengers_ == 0) {
            revert P2PBetting__NumberOfChallengersCantBeZero();
        }
        if (maxEntryFee_ == 0) {
            revert P2PBetting__MaxPriceCantBeZero();
        }
        // if (s_Matches[matchId].timeOfGame == 0) {
        //     revert P2PBetting__MatchDoesntExist();
        // }
        if (betData_.length < 2) {
            revert P2PBetting__WrongBetFormat();
        }
        // if (
        //     msg.value <
        //     ((maxNumberOfChallengers_ * odds_ * maxEntryFee_) /
        //         DECIMALS -
        //         maxNumberOfChallengers_ *
        //         maxEntryFee_)
        // ) {
        //     revert P2PBetting__NotEnoughEthSent();
        // }
        Bet memory newBet;
        newBet.tipster = msg.sender;

        newBet.maxNumberOfChallengers = maxNumberOfChallengers_;

        newBet.odds = odds_;
        newBet.fee = s_fee;
        newBet.matchId = matchId;

        newBet.maxEntryFee = maxEntryFee_;
        newBet.betData = betData_;

        newBet.moneyInBet = msg.value;
        newBet.collateralGiven = msg.value;
        newBet.betId = numberOfBetsDone;
        newBet.startMatchTimestamp = s_Matches[matchId].timeOfGame;
        s_Bets[numberOfBetsDone] = newBet;
        s_Profiles[msg.sender].betIdHistory.push(numberOfBetsDone);
        s_Profiles[msg.sender].balanceVariation -= int256(msg.value);
        s_Matches[matchId].betsOfMatch.push(numberOfBetsDone);
        numberOfBetsDone++;

        emit P2PBetting__BetCreated(
            maxEntryFee_,
            odds_,
            maxNumberOfChallengers_,
            numberOfBetsDone - 1
        );
    }

    /**
     *
     * @param betId_ Id of the bet you want to join
     */

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

        if (
            betSelected.ended ||
            block.timestamp + 10 minutes > betSelected.startMatchTimestamp //Se cierra 10 minutos antes del comienzo
        ) {
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

    /**
     *
     * @param matchId MatchID of the match that will get all its bets ended
     */

    function _endBetsUsingMatchId(uint256 matchId) internal {
        Match memory matchOfBets = s_Matches[matchId];
        if (!matchOfBets.ended) {
            revert P2PBetting__MatchDidNotEnd();
        }
        uint256[] memory arrayBets = matchOfBets.betsOfMatch;
        for (uint i = 0; i < arrayBets.length; i++) {
            Bet memory betToClose = s_Bets[arrayBets[i]];

            if (betToClose.betData.length >= 2) {
                if (betToClose.betData[0] == 0 && betToClose.betData[1] < 3) {
                    if (
                        (betToClose.betData[1] == 0 &&
                            matchOfBets.pointsHome <= matchOfBets.pointsAway) ||
                        (betToClose.betData[1] == 1 &&
                            matchOfBets.pointsHome >= matchOfBets.pointsAway) ||
                        (betToClose.betData[1] == 2 &&
                            matchOfBets.pointsHome != matchOfBets.pointsAway)
                    ) {
                        betToClose.tipsterWon = true;
                    }
                    betToClose.ended = true;
                    s_Bets[arrayBets[i]] = betToClose;
                } else if (
                    betToClose.betData.length >= 4 &&
                    betToClose.betData[0] == 1 &&
                    betToClose.betData[1] < 5 &&
                    betToClose.betData[2] < 3
                ) {
                    if (
                        betToClose.betData[1] == 0 &&
                        ((betToClose.betData[2] == 0 &&
                            matchOfBets.pointsHome <= betToClose.betData[3]) ||
                            (betToClose.betData[2] == 1 &&
                                matchOfBets.pointsHome >=
                                betToClose.betData[3]) ||
                            (betToClose.betData[2] == 2 &&
                                matchOfBets.pointsHome !=
                                betToClose.betData[3]))
                    ) {
                        betToClose.tipsterWon = true;
                    } else if (
                        betToClose.betData[1] == 1 &&
                        ((betToClose.betData[2] == 0 &&
                            matchOfBets.pointsAway <= betToClose.betData[3]) ||
                            (betToClose.betData[2] == 1 &&
                                matchOfBets.pointsAway >=
                                betToClose.betData[3]) ||
                            (betToClose.betData[2] == 2 &&
                                matchOfBets.pointsAway !=
                                betToClose.betData[3]))
                    ) {
                        betToClose.tipsterWon = true;
                    } else if (
                        betToClose.betData[1] == 2 &&
                        ((betToClose.betData[2] == 0 &&
                            matchOfBets.pointsAway + matchOfBets.pointsHome <=
                            betToClose.betData[3]) ||
                            (betToClose.betData[2] == 1 &&
                                matchOfBets.pointsAway +
                                    matchOfBets.pointsHome >=
                                betToClose.betData[3]) ||
                            (betToClose.betData[2] == 2 &&
                                matchOfBets.pointsAway +
                                    matchOfBets.pointsHome !=
                                betToClose.betData[3]))
                    ) {
                        betToClose.tipsterWon = true;
                    } else if (betToClose.betData[1] == 3) {
                        uint256 difference;
                        if (
                            int256(matchOfBets.pointsAway) -
                                int256(matchOfBets.pointsHome) <
                            0
                        ) {
                            difference =
                                matchOfBets.pointsHome -
                                matchOfBets.pointsAway;
                        } else {
                            difference =
                                matchOfBets.pointsAway -
                                matchOfBets.pointsHome;
                        }
                        if (
                            (betToClose.betData[2] == 0 &&
                                difference <= betToClose.betData[3]) ||
                            (betToClose.betData[2] == 1 &&
                                difference >= betToClose.betData[3]) ||
                            (betToClose.betData[2] == 2 &&
                                difference != betToClose.betData[3])
                        ) {
                            betToClose.tipsterWon = true;
                        }
                    } else if (
                        betToClose.betData[1] == 4 &&
                        ((betToClose.betData[2] == 0 &&
                            (matchOfBets.pointsAway <= betToClose.betData[3] ||
                                matchOfBets.pointsHome <=
                                betToClose.betData[3])) ||
                            (betToClose.betData[2] == 1 &&
                                (matchOfBets.pointsAway >=
                                    betToClose.betData[3] ||
                                    matchOfBets.pointsHome >=
                                    betToClose.betData[3])) ||
                            (betToClose.betData[2] == 2 &&
                                (matchOfBets.pointsAway !=
                                    betToClose.betData[3] ||
                                    matchOfBets.pointsHome !=
                                    betToClose.betData[3])))
                    ) {
                        betToClose.tipsterWon = true;
                    }
                    betToClose.ended = true;
                    s_Bets[arrayBets[i]] = betToClose;
                }
            } else {
                // no se puede cerrar
                failedToClose.push(matchId);
            }
        }
    }

    /**
     *
     * @param matchId MatchID of the match that will get all its bets ended
     */

    function endBetsUsingMatchId(uint256 matchId) external onlyOwner {
        _endBetsUsingMatchId(matchId);
    }

    /**
     *
     * @param betId Id of the bet you want to get the rewards from
     * @param numberOfChallenger Number of the position of your address in the challengers array
     */

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

    /**
     *
     * @param betId_ Id of the bet that you want to get collateral from
     * DOes not have to be called by tipster necessarily, but the money will go to him if
     * challengers won but not all collateral was used because not all challengers bet the max possible.
     */

    function getCollateralBack(uint256 betId_) external {
        Bet memory betSelected = s_Bets[betId_];
        if (betSelected.collateralGiven == 0) {
            revert P2PBetting__AlreadyRetrievedOrBetNonexistent();
        }
        if (!betSelected.ended || betSelected.tipsterWon) {
            revert P2PBetting__OnlyCalledIfTipsterLost();
        }
        uint256 amountToTransferBack = betSelected.moneyInBet -
            (((betSelected.moneyInBet - betSelected.collateralGiven) *
                betSelected.odds) / DECIMALS);
        s_Bets[betId_].collateralGiven = 0;
        payable(betSelected.tipster).transfer(amountToTransferBack);
    }


    // function endUsingMatchId(uint256 matchId_) public returns (bytes32) {
    //     if (
    //         s_Matches[matchId_].timeOfGame == 0 &&
    //         block.timestamp < s_Matches[matchId_].timeOfGame + 4 hours
    //     ) {
    //         revert P2PBetting__MatchDidNotEnd();
    //     }
    //     FunctionsRequest.Request memory req;
    //     string[] memory args = new string[](1);
    //     args[0] = uintToString(matchId_);
    //     req.initializeRequestForInlineJavaScript(sourceGetResults);
    //     if (args.length > 0) {
    //         req.setArgs(args);
    //     }
    //     s_lastRequestId = _sendRequest(
    //         req.encodeCBOR(),
    //         subscriptionId,
    //         gasLimit,
    //         donId
    //     );
    //     return s_lastRequestId;
    // }

    function uintToString(uint256 _value) public pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }
        uint256 temp = _value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(_value % 10)));
            _value /= 10;
        }
        return string(buffer);
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        s_lastResponse = response;
        s_lastError = err;
        uint256 offset = 0;
        uint256 GameID;
        if (response.length < 128 && response.length != 0) {
            assembly {
                GameID := mload(add(response, add(offset, 0x20)))
            }
            offset += 32;
            uint256 homePoints;
            uint256 awayPoints;
            assembly {
                homePoints := mload(add(response, add(offset, 0x20)))
            }
            offset += 32;
            assembly {
                awayPoints := mload(add(response, add(offset, 0x20)))
            }
            Match memory auxMatch = s_Matches[GameID];
            auxMatch.pointsHome = homePoints;
            auxMatch.pointsAway = awayPoints;
            auxMatch.ended = true;
            s_Matches[GameID] = auxMatch;
            _endBetsUsingMatchId(GameID);
        } else {
            while (offset < response.length) {
                assembly {
                    GameID := mload(add(response, add(offset, 0x20)))
                }

                offset += 32;
                uint256 gameTimestamp;
                assembly {
                    gameTimestamp := mload(add(response, add(offset, 0x20)))
                }
                offset += 32;
                string memory AwayTeam = _parseString(response, offset);
                offset += 32;
                string memory HomeTeam = _parseString(response, offset);
                offset += 32;

                Match memory newMatch;
                newMatch.matchId = GameID;
                newMatch.home = HomeTeam;
                newMatch.away = AwayTeam;
                newMatch.timeOfGame = gameTimestamp;
                s_Matches[GameID] = newMatch;
                numberOfMatchesDone++;
                allMatches.push(GameID);
            }
        }
    }

    function _parseString(
        bytes memory data,
        uint256 offset
    ) private pure returns (string memory) {
        uint256 len;
        assembly {
            len := mload(add(data, add(offset, 0x20)))
        }

        bytes memory strBytes = new bytes(len);
        for (uint256 i = 0; i < len; i++) {
            strBytes[i] = data[offset + i + 32];
        }

        return string(strBytes);
    }

    ///////////////////////////////////////////
    ////// CHAINLINK AUTOMATION ///////////////
    ///////////////////////////////////////////


    function endBetOwner(uint256 betId_, bool tipsterWon) external onlyOwner {
        s_Bets[betId_].tipsterWon = tipsterWon;
        s_Bets[betId_].ended = true;
    }

    ///////////////////////////////////////////
    /////// TESTING ///////////////////////////
    ///////////////////////////////////////////

    function testingAddMatch(
        uint256 gameId,
        uint256 timestamp,
        string memory home_,
        string memory away_,
        uint256 pointsHome_,
        uint256 pointsAway_
    ) external onlyOwner {
        Match memory matchAux;
        matchAux.matchId = gameId;
        matchAux.timeOfGame = timestamp;
        matchAux.home = home_;
        matchAux.away = away_;
        matchAux.pointsHome = pointsHome_;
        matchAux.pointsAway = pointsAway_;
        s_Matches[gameId] = matchAux;
        allMatches.push(gameId);
    }

    function testEndMatch(uint256 gameId) external onlyOwner {
        s_Matches[gameId].ended = true;
    }

    ///////////////////////////////////////////
    /////// SETTERS ///////////////////////////
    ///////////////////////////////////////////

    function setDonId(bytes32 newDonId) external onlyOwner {
        donId = newDonId;
    }

    function setFee(uint256 newFee) external onlyOwner {
        uint256 oldfee = s_fee;
        s_fee = newFee;
        emit P2PBetting__NewFeeSet(oldfee, newFee);
    }

    function setUsdOracle(address newOracle) external onlyOwner {
        USD_ETH_dataFeed = AggregatorV3Interface(newOracle);
        emit P2PBetting__NewOracleSet(newOracle);
    }

    function setTimestampToGetMatches(uint256 newTimestamp) external onlyOwner {
        timestampToGetMatches = newTimestamp;
    }

    function setIntervalForAutomation(uint256 newInterval) external onlyOwner {
        intervalForAutomation = newInterval;
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

    function getAllBets() external view returns (uint256[] memory) {
        return allMatches;
    }

    function getNumberOfMatchesDone() external view returns (uint256) {
        return numberOfMatchesDone;
    }

    function getLastTimestamp() external view returns (uint256) {
        return lastTimestamp;
    }

    function getIntervalForAutomation() external view returns (uint256) {
        return intervalForAutomation;
    }

    function getTimestampToGetMatches() external view returns (uint256) {
        return timestampToGetMatches;
    }

    function getMatch(uint256 matchId) external view returns (Match memory) {
        return s_Matches[matchId];
    }
}
