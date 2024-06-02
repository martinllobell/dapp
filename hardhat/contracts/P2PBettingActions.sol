// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {P2PBetting} from "../src/P2PBettingFront.sol";

//Alomejor hay que importar esta:
// import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract P2PBettingActions is
    ConfirmedOwner,
    AutomationCompatibleInterface,
    FunctionsClient
{
    using FunctionsRequest for FunctionsRequest.Request;
    using Strings for uint256;
    P2PBetting p2pBetting;

    /////////////////////////////////////////////
    ////////// ERRORS ///////////////////////////
    /////////////////////////////////////////////

    error P2PBetting__MatchDidNotEnd();

    /////////////////////////////////////////////
    ////////// EVENTS ///////////////////////////
    /////////////////////////////////////////////

    /////////////////////////////////////////////
    ////////// CHAINNLINK VARIABLES /////////////
    /////////////////////////////////////////////

    // DON ID for the Functions DON to which the requests are sent

    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    uint32 gasLimit = 3000000;

    //Valores hardcodeados para Avalanche Fuji

    address router = 0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0;
    uint64 subscriptionId = 8293;
    bytes32 public donId =
        0x66756e2d6176616c616e6368652d66756a692d31000000000000000000000000;

    string sourceGetResults =
        "const gameId = args[0];"
        "const config = {"
        "url: `https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=06b9feb762534274946d286934ff0235`"
        "};"
        "const response = await Functions.makeHttpRequest(config);"
        "const match = response.data.Game;"
        "if(match.IsClosed){"
        "const gameIdUint = parseInt(gameId, 10);"
        "const encodedGameId = Functions.encodeUint256(gameIdUint);"
        "const encodedHomeTeamScore = Functions.encodeUint256(match.HomeTeamScore);"
        "const encodedAwayTeamScore = Functions.encodeUint256(match.AwayTeamScore);"
        "return Buffer.concat([encodedGameId, encodedHomeTeamScore, encodedAwayTeamScore]);"
        "}"
        "else{"
        "throw new Error('Match not found for given arguments')"
        "}";

    /////////////////////////////////////////////
    ////////// VARIABLES ////////////////////////
    /////////////////////////////////////////////

    uint256 private intervalForAutomation = 24 hours;
    uint256 private lastTimestamp;

    mapping(uint256 matchId => uint256[3]) s_Results;

    constructor(address owner) ConfirmedOwner(owner) FunctionsClient(router) {}

    /**
     *
     * @param betToClose Bet to check if is good or not
     * @param pointsHome Points of home team
     * @param pointsAway Points of away team
     */

    function _endBetsUsingMatchId(
        uint256[] memory betToClose,
        uint256 pointsHome,
        uint256 pointsAway
    ) external pure returns (bool ended, bool tipsterWon) {
        for (uint i = 0; i < betToClose.length; i++) {
            if (betToClose.length >= 2) {
                if (betToClose[0] == 0 && betToClose[1] < 3) {
                    if (
                        (betToClose[1] == 0 && pointsHome <= pointsAway) ||
                        (betToClose[1] == 1 && pointsHome >= pointsAway) ||
                        (betToClose[1] == 2 && pointsHome != pointsAway)
                    ) {
                        tipsterWon = true;
                    }
                    ended = true;
                } else if (
                    betToClose.length >= 4 &&
                    betToClose[0] == 1 &&
                    betToClose[1] < 5 &&
                    betToClose[2] < 3
                ) {
                    if (
                        betToClose[1] == 0 &&
                        ((betToClose[2] == 0 && pointsHome <= betToClose[3]) ||
                            (betToClose[2] == 1 &&
                                pointsHome >= betToClose[3]) ||
                            (betToClose[2] == 2 && pointsHome != betToClose[3]))
                    ) {
                        tipsterWon = true;
                    } else if (
                        betToClose[1] == 1 &&
                        ((betToClose[2] == 0 && pointsAway <= betToClose[3]) ||
                            (betToClose[2] == 1 &&
                                pointsAway >= betToClose[3]) ||
                            (betToClose[2] == 2 && pointsAway != betToClose[3]))
                    ) {
                        tipsterWon = true;
                    } else if (
                        betToClose[1] == 2 &&
                        ((betToClose[2] == 0 &&
                            pointsAway + pointsHome <= betToClose[3]) ||
                            (betToClose[2] == 1 &&
                                pointsAway + pointsHome >= betToClose[3]) ||
                            (betToClose[2] == 2 &&
                                pointsAway + pointsHome != betToClose[3]))
                    ) {
                        tipsterWon = true;
                    } else if (betToClose[1] == 3) {
                        uint256 difference;
                        if (int256(pointsAway) - int256(pointsHome) < 0) {
                            difference = pointsHome - pointsAway;
                        } else {
                            difference = pointsAway - pointsHome;
                        }
                        if (
                            (betToClose[2] == 0 &&
                                difference <= betToClose[3]) ||
                            (betToClose[2] == 1 &&
                                difference >= betToClose[3]) ||
                            (betToClose[2] == 2 && difference != betToClose[3])
                        ) {
                            tipsterWon = true;
                        }
                    } else if (
                        betToClose[1] == 4 &&
                        ((betToClose[2] == 0 &&
                            (pointsAway <= betToClose[3] ||
                                pointsHome <= betToClose[3])) ||
                            (betToClose[2] == 1 &&
                                (pointsAway >= betToClose[3] ||
                                    pointsHome >= betToClose[3])) ||
                            (betToClose[2] == 2 &&
                                (pointsAway != betToClose[3] ||
                                    pointsHome != betToClose[3])))
                    ) {
                        tipsterWon = true;
                    }
                    ended = true;
                }
            }
        }
    }

    ///////////////////////////////////////////
    ////// CHAINLINK FUNCTIONS ///////////////
    ///////////////////////////////////////////

    function endUsingMatchId(uint256 matchId_) public returns (bytes32) {
        if (
            block.timestamp < p2pBetting.getMatchTimestamp(matchId_) + 4 hours
        ) {
            revert P2PBetting__MatchDidNotEnd();
        }
        FunctionsRequest.Request memory req;
        string[] memory args = new string[](1);
        args[0] = matchId_.toString();
        req.initializeRequestForInlineJavaScript(sourceGetResults);
        if (args.length > 0) {
            req.setArgs(args);
        }
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donId
        );
        return s_lastRequestId;
    }

    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        s_lastResponse = response;
        s_lastError = err;
        uint256 gameId;
        uint256 homePoints;
        uint256 awayPoints;
        (gameId, homePoints, awayPoints) = abi.decode(
            response,
            (uint256, uint256, uint256)
        );
        s_Results[gameId][0] = homePoints;
        s_Results[gameId][1] = awayPoints;
        s_Results[gameId][2] = 1;
    }

    ///////////////////////////////////////////
    ////// CHAINLINK AUTOMATION ///////////////
    ///////////////////////////////////////////

    function checkUpkeep(
        bytes calldata
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /*performData **/)
    {
        //Checkea si se ha de ejecutar la función.
        if ((block.timestamp - lastTimestamp) >= intervalForAutomation) {
            upkeepNeeded = true;
        }
    }

    function performUpkeep(bytes calldata /*performData **/) external {
        if ((block.timestamp - lastTimestamp) >= intervalForAutomation) {
            p2pBetting.collectFees();
        }
    }

    /////////////////////
    // SETTERS //////////
    /////////////////////

    function setIntervalForAutomation(
        uint256 _intervalForAutomation
    ) external onlyOwner {
        intervalForAutomation = _intervalForAutomation;
    }

    function setBettingFrontAddress(address bettingFront) external onlyOwner {
        p2pBetting = P2PBetting(bettingFront);
    }

    /////////////////////
    // GETTERS //////////
    /////////////////////

    function getResults(
        uint256 matchId
    ) external view returns (uint256[3] memory) {
        return s_Results[matchId];
    }
}
