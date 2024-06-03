import React, { FC, useEffect, useState } from "react";
import { useContracts } from "../../hooks/useContracts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface MatchData {
    id: string;
    image: string;
    winCondition: string;
    points: string;
    comparator: string;
    maxEntryFee: number;
    maxNumberOfChallengers: number;
    tipster: string;
    maxBet: string;
    challengers: Array<string>;
    dataBet: Array<number>;
    eventDate: string;
    team1: {
        logo: string;
        name: string;
        odd: number;
    };
    team2: {
        logo: string;
        name: string;
        odd: number;
    };
    odds: number;
    isOngoing: boolean;
    eventId: string;
}

interface CardMatchProps {
    matchData: MatchData;
    darkMode: boolean;
    setStartMatchTimestamp: (betId: string, newTimestamp: number) => Promise<void>;
    filter: string;
}

export const CardMatch: FC<CardMatchProps> = ({ matchData, darkMode, setStartMatchTimestamp, filter }) => {
    const [showBetInput, setShowBetInput] = useState<boolean>(false);
    const [betAmount, setBetAmount] = useState<string>("0.0001");
    const { contracts, account, web3 } = useContracts();
    const [isOngoing, setIsOngoing] = useState<boolean>(matchData.isOngoing);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [eventResults, setEventResults] = useState<any>(null);
    const [isWinner, setIsWinner] = useState<boolean | null>(null);
    const [showRewardToast, setShowRewardToast] = useState<boolean>(false);

    useEffect(() => {
        const checkIfSubscribed = async () => {
            if (contracts && contracts.p2pBetting) {
                try {
                    const bet = await contracts.p2pBetting.methods.getBet(matchData.id).call();
                    setIsSubscribed(bet.challengers.includes(account));
                } catch (error) {
                    console.error("Error checking subscription:", error);
                }
            }
        };

        checkIfSubscribed();
    }, [contracts, matchData.id, account]);

    const handlePlaceBetClick = () => {
        setShowBetInput(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const numericValue = parseFloat(value);
        const maxEntryFeeFloat = parseFloat(matchData.maxBet.toString());

        if (numericValue >= 0) {
            if (numericValue <= maxEntryFeeFloat) {
                setBetAmount(value);
            } else {
                setBetAmount(maxEntryFeeFloat.toFixed(4));
            }
        } else {
            setBetAmount('')
        }
    };

    const handleConfirmBet = async () => {
        if (contracts && contracts.p2pBetting && betAmount) {
            try {
                const betId = matchData.id;
                const valueInWei = web3.utils.toWei(betAmount, 'ether');
                await contracts.p2pBetting.methods.joinBet(betId).send({
                    from: account,
                    value: valueInWei
                });
                console.log("Bet subscribed successfully!");
                setIsSubscribed(true);
                setShowBetInput(false);
                setBetAmount('');
            } catch (error) {
                console.error("Error subscribing to bet:", error);
            }
        }
    };

    const simulateOngoingEvent = async () => {
        const oneHourLater = Math.floor(Date.now() / 1000) + 3600;
        await setStartMatchTimestamp(matchData.id, oneHourLater);
        setIsOngoing(true);
    };

    const handleEndEvent = async () => {
        try {
            const season = new Date().getFullYear();
            const response = await axios.get(`/api/sportsdata/v3/nba/scores/json/Games/${season}`, {
                headers: { 'Ocp-Apim-Subscription-Key': '01e1ae2db9b642229876fbd8527f4822' }
            });

            const events = response.data?.filter(event => event.GameID.toString() === matchData.eventId.toString());

            setEventResults(events[0]);
            setShowResults(true);

            const homeTeamWon = events[0].HomeTeamScore > events[0].AwayTeamScore;
            const userBetOnHomeTeam = matchData.dataBet[1] === 0;
            const userBetOnAwayTeam = matchData.dataBet[1] === 1;

            if ((homeTeamWon && userBetOnHomeTeam) || (!homeTeamWon && userBetOnAwayTeam)) {
                setIsWinner(true);
            } else {
                setIsWinner(false);
            }
        } catch (error) {
            console.error('Error fetching league events:', error);
        }
    };

    const handleGetRewards = () => {
        console.log("Getting rewards...");
        setShowRewardToast(true);
        toast.success("Reward received successfully!", {
            style: {
                background: darkMode ? "#333" : "#fff",
                color: darkMode ? "#fff" : "#333"
            }
        });
    };

    if (filter === 'Active') {
        if (!isOngoing) {
            return null;
        }
    } else if (filter === 'My Bets') {
        if (!isSubscribed) {
            return null;
        }
    }

    const getResultColor = (teamName: string) => {
        if (!eventResults) return "text-gray-500";
        const homeTeam = eventResults.HomeTeamID === matchData.team1.id ? matchData.team1.name : matchData.team2.name;
        const awayTeam = eventResults.AwayTeamID === matchData.team1.id ? matchData.team1.name : matchData.team2.name;
        if (teamName === homeTeam && eventResults.HomeTeamScore > eventResults.AwayTeamScore) {
            return "text-green-500";
        } else if (teamName === awayTeam && eventResults.AwayTeamScore > eventResults.HomeTeamScore) {
            return "text-green-500";
        } else {
            return "text-red-500";
        }
    };

    return (
        <div className="font-semibold mb-8 w-auto p-4 lg:h-[22rem] h-[25rem] backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 rounded-lg transition-colors relative">
            {showRewardToast && <Toaster />}
            {showResults && eventResults && (
                <div className="z-50 absolute top-0 left-0 right-0 bottom-0 dark:bg-black/90 bg-gray-800/90 backdrop-blur-[9px] flex flex-col justify-around items-center rounded-lg">
                    <p className="text-white mb-4">Event Results:</p>
                    <div className="flex flex-row justify-between w-full px-8">
                        <div className="flex flex-col items-center">
                            <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className="w-16 h-16 rounded-full mb-2" />
                            <p className={getResultColor(matchData.team1.name)}>{`${matchData.team1.name}: ${eventResults.HomeTeamScore}`}</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className="w-16 h-16 rounded-full mb-2" />
                            <p className={getResultColor(matchData.team2.name)}>{`${matchData.team2.name}: ${eventResults.AwayTeamScore}`}</p>
                        </div>
                    </div>
                    {isWinner !== null && (
                        <p className={`text-2xl ${isWinner ? "text-green-500" : "text-red-500"}`}>
                            {isWinner ? "Winner" : "Loser"}
                        </p>
                    )}
                    {isWinner && (
                        <button
                            className="bg-green-600 dark:bg-green-700 text-sm text-white rounded-lg px-4 py-2 mt-4"
                            onClick={handleGetRewards}
                        >
                            Get Rewards
                        </button>
                    )}
                </div>
            )}
            <div className="h-full flex flex-col justify-between">
                <div className='h-[20%] mb-3 flex flex-row items-center justify-between'>
                    <div className="flex flex-row px-2 gap-2 items-center">
                        <img src={matchData.image} alt={`${matchData.team1.name} logo`} className='w-8 rounded-full' />
                        <p className='text-sm font-medium w-40 truncate'>{matchData.tipster}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full w-12">
                        <p className="text-[10px] font-semibold">Limit</p>
                        <p className="text-[10px] font-semibold">{matchData.challengers?.length}/{matchData.maxNumberOfChallengers.toString()}</p>
                    </div>
                </div>

                <div className={`h-[20%] px-4 mb-2 flex flex-row items-center justify-between text-sm bg-gradient-to-r dark:from-gray-900/60 from-indigo-200 to-indigo-300/60 dark:to-gray-800/40 relative z-2 rounded-lg ${isOngoing ? 'rounded-tl-none' : ''}`}>
                    <div className="flex flex-col w-full justify-center">
                        {isOngoing && <p className="absolute -top-5 bg-gradient-to-r dark:from-gray-900/60 from-indigo-200 to-indigo-300/60 dark:to-gray-800/40 flex justify-center rounded-t-full w-24 text-secondary dark:text-secondary font-bold left-0 text-[10px] px-2">
                            Event Active
                        </p>}
                        <p>{matchData.winCondition} </p>
                        <div className="max-w-32 md:max-w-full">
                            {matchData?.dataBet[1] === 0 ?
                                <div className='flex gap-1'>
                                    <img src={matchData.team1.logo} className='w-5'></img>
                                    <p>{matchData.team1.name} {matchData.comparator ? '' : ' Win'}</p>
                                </div>
                                :
                                matchData?.dataBet[1] === 1 ?
                                    <div className="flex items-center gap-2">
                                        <img src={matchData.team2.logo} className='w-5'></img>
                                        <p>{matchData.team2.name} {matchData.comparator ? '' : ' Win'}</p>
                                    </div>
                                    :
                                    matchData?.dataBet[1] === 2 ?
                                        <p>{matchData.dataBet[0] === 1 ? 'Sum of both' : 'Draw'}</p>
                                        :
                                        <p>{'Both'}</p>
                            }
                        </div>
                        {matchData.comparator && <p>{matchData.comparator}: {matchData.points}</p>}
                    </div>
                    <div className="flex flex-col h-full items-center justify-center w-auto whitespace-nowrap">
                        Total Pool
                        <p className="font-bold dark:text-secondary text-secondary">{Number(matchData.maxBet.split(' ')[0]).toFixed(4) + ' ETH'}</p>
                    </div>
                </div>

                <div className='h-[35%] flex flex-row justify-center w-full items-center'>
                    <div className='px-2 flex flex-col h-full items-center justify-center rounded-full z-10'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 w-16 lg:max-w-[4rem] object-cover h-auto' />
                    </div>
                    <h2 className={'text-xs font-medium text-center'}>{matchData.team1.name}</h2>
                    <div className={'font-medium flex items-center flex-col h-full justify-start text-[10px] md:text-xs'}>
                        <div className="w-40 h-8 absolute bg-black/10 rounded-t-full"></div>
                        <div className="items-center w-full flex flex-col w-full">
                            <h2>{matchData.eventDate.split("T")[0].split('-').join('/')}</h2>
                            <h2>{matchData.eventDate.split("T")[1].slice(0, 5)}</h2>
                        </div>
                        <h2 className="mt-5">VS</h2>
                    </div>
                    <h2 className={'text-xs font-medium text-center'}>{matchData.team2.name}</h2>

                    <div className='px-2 flex flex-col h-full items-center justify-center rounded-full z-10'>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 w-16 lg:max-w-[4rem] h-auto object-cover' />
                    </div>
                </div>

                <div className="h-[25%] h-16">
                    {matchData.challengers.length >= matchData.maxNumberOfChallengers ?
                        <p className="flex justify-center items-center h-full text-gray-500"> {isSubscribed ? 'Already Subscribed' : 'Bet Closed'} </p>
                        :
                        <div className="flex justify-center items-center h-full">
                            {!isSubscribed ? (
                                <div className="flex justify-center items-center mt-4">
                                    {!isOngoing ?
                                        <button
                                            className="bg-red-700 text-sm text-white rounded-lg px-4 py-2 flex items-center justify-center"
                                            onClick={simulateOngoingEvent}
                                        >
                                            <span>Simulate Event</span>
                                        </button> :
                                        showBetInput ? (
                                            <div className="flex text-sm flex-row justify-center items-end gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm text-nowrap w-10">
                                                        Potential Gain: {betAmount ? (parseFloat(betAmount) * matchData.odds).toFixed(4) : '0'} ETH
                                                    </p>
                                                    <input
                                                        type="text"
                                                        value={betAmount}
                                                        onChange={handleInputChange}
                                                        className={`p-1.5 w-32 border rounded-lg text-center bg-transparent
                                                        ${darkMode ? 'text-white' : 'text-black'}`}
                                                        placeholder="Amount..."
                                                        max={matchData.maxBet}
                                                    />
                                                </div>
                                                <button
                                                    className={`text-white rounded-lg px-4 mt-7 py-2 flex items-center justify-center bg-green-600 ${betAmount === '' || Number(betAmount) < 0.0001 ? 'cursor-not-allowed' : 'bg-green-600 cursor-pointer'}`}
                                                    onClick={handleConfirmBet}
                                                    disabled={betAmount === '' || Number(betAmount) < 0.0001}
                                                ><span className="text-yellow-400 font-bold">BET</span>
                                                    <span className="ml-2 font-bold">X {matchData.odds.toFixed(2)}</span>
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className={`text-white rounded-lg px-4 py-2 flex items-center justify-center ${betAmount === '' || Number(betAmount) < 0.0001 ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 cursor-pointer'}`}
                                                onClick={handlePlaceBetClick}
                                                disabled={betAmount === '' || Number(betAmount) < 0.0001}
                                            >
                                                <span className="text-yellow-400 font-bold">BET</span>
                                                <span className="ml-2 font-bold">X {matchData.odds.toFixed(2)}</span>
                                            </button>
                                        )}
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-full text-gray-500">
                                    <p> Already Subscribed </p>
                                    <button
                                        className="bg-blue-700 text-sm text-white rounded-lg px-4 py-2 flex items-center justify-center mt-4"
                                        onClick={handleEndEvent}
                                    >
                                        <span>End Event</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    }
                </div>
            </div>
        </div>
    );

};