import React, { FC, useEffect, useState } from "react";
import { useTrayStore } from "../../store/useTrayStore";
import { useContracts } from "../../hooks/useContracts";

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
    isOngoing: boolean
}

interface CardMatchProps {
    matchData: MatchData;
    darkMode: boolean;
    setStartMatchTimestamp: (betId: string, newTimestamp: number) => Promise<void>;
}

export const CardMatch: FC<CardMatchProps> = ({ matchData, darkMode, setStartMatchTimestamp }) => {
    const [showBetInput, setShowBetInput] = useState<boolean>(false);
    const [betAmount, setBetAmount] = useState<string>("0.0001");
    const { contracts, account, web3 } = useContracts();
    const [isOngoing, setIsOngoing] = useState<boolean>(matchData.isOngoing);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

        // Convert the value to a number
        const numericValue = parseFloat(value);

        // Convert maxEntryFee (BigInt) to a number
        const maxEntryFeeFloat = parseFloat(matchData.maxBet.toString());

        // Regular expression to check if the value has up to 4 decimal places
        const decimalRegex = /^\d+(\.\d{0,4})?$/;

        // Check if the value matches the decimal pattern and is at least 0.0001
        if (numericValue >= 0) {
            // Set the bet amount to the entered value if it's less than or equal to the max entry fee
            if (numericValue <= maxEntryFeeFloat) {
                setBetAmount(value);
            } else {
                // Otherwise, set the bet amount to the max entry fee
                setBetAmount(maxEntryFeeFloat.toFixed(4));
            }
        } else  {
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
                setIsSubscribed(true); // Cambiar estado a suscrito
                setShowBetInput(false);
                setBetAmount('');
            } catch (error) {
                console.error("Error subscribing to bet:", error);
            }
        }
    };

    const simulateOngoingEvent = async () => {
        const oneHourLater = Math.floor(Date.now() / 1000) + 3600; // Current time in seconds + 1 hour
        await setStartMatchTimestamp(matchData.id, oneHourLater);
        setIsOngoing(true);
    };

    return (
        <div className="font-semibold mb-8 lg:w-[22%] p-4 lg:h-[22rem] h-[25rem] backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 rounded-lg transition-colors">
            <div
                className="h-full flex flex-col justify-between">

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
                    <div className="flex flex-col w-full  justify-center">
                        {isOngoing && <p className="absolute -top-5 bg-gradient-to-r dark:from-gray-900/60 from-indigo-200 to-indigo-300/60 dark:to-gray-800/40 flex justify-center rounded-t-full w-24 text-secundary dark:text-secundary font-bold left-0 text-[10px] px-2">
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
                        Max Bet
                        <p className="font-bold dark:text-secundary text-secundary">{Number(matchData.maxBet.split(' ')[0]).toFixed(4) + ' ETH'}</p>
                    </div>

                </div>

                <div className='h-[35%] flex flex-row justify-between  items-center'>
                    <div className='px-2 flex flex-col h-full items-center justify-center rounded-full  z-10'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 w-16 lg:max-w-[4rem] object-cover h-auto' />
                    </div>
                    <h2 className={'text-xs font-medium text-center'}>{matchData.team1.name}</h2>
                    <div className={'font-medium flex items-center flex-col h-full justify-start text-[10px]  md:text-xs'}>
                        <div className="w-40 h-8 absolute bg-black/10 rounded-t-full"></div>
                        <div className="items-center w-full flex flex-col w-full">
                            <h2>{matchData.eventDate.split("T")[0].split('-').join('/')}</h2>
                            <h2>{matchData.eventDate.split("T")[1].slice(0, 5)}</h2>
                        </div>
                        <h2 className="mt-5">VS</h2> {/* Shown on desktop */}
                    </div>
                    <h2 className={'text-xs font-medium  text-center'}>{matchData.team2.name}</h2>

                    <div className='px-2 flex flex-col h-full items-center overflow-hidden justify-center rounded-full z-10 '>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 w-16 lg:max-w-[4rem] h-auto object-cover ' />
                    </div>
                </div>

                <div className="h-[25%] h-16">
                    {
                        !isSubscribed ? <div className="flex justify-center items-center mt-4">
                            {!isOngoing ?
                                <button
                                    className="bg-red-700 text-sm text-white rounded-lg px-4 py-2 flex items-center justify-center mb-4"
                                    onClick={simulateOngoingEvent}
                                >
                                    <span>Simulate Event</span>
                                </button> :
                                showBetInput ? (
                                    <div className="flex text-sm flex-row justify-around  items-center ">
                                        <div className="flex flex-col w-[50%]">
                                            <p className="mb-2 text-sm text-nowrap">
                                                Potential Gain: {betAmount ? (parseFloat(betAmount) * matchData.odds).toFixed(4) : '0'} ETH
                                            </p>
                                            <input
                                                type="number"
                                                value={betAmount}
                                                onChange={handleInputChange}
                                                className={`p-2 border rounded-lg w-full text-center bg-transparent
                                                ${darkMode ? 'text-white' : 'text-black'}`}
                                                placeholder="Amount..."
                                                max={matchData.maxBet}
                                            />

                                        </div>

                                        <button
                                            className={`text-white rounded-lg px-4 mt-7 py-2 flex items-center justify-center bg-green-600  ${betAmount === '' || Number(betAmount) < 0.0001 ? 'cursor-not-allowed' : 'bg-green-600 cursor-pointer'}`}
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
                        </div> : <p className="flex justify-center items-center mt-10 text-gray-500"> Already Subscribed </p>
                    }
                </div>


            </div>
        </div>
    );
};
