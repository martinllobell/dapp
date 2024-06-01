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
    const [betAmount, setBetAmount] = useState<string>('');
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
                    setIsOngoing(bet.startMatchTimestamp > 0 && bet.startMatchTimestamp < Math.floor(Date.now() / 1000));
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
        const maxBet = parseFloat(matchData.maxBet);
        if (!isNaN(Number(value)) && parseFloat(value) <= maxBet) {
            setBetAmount(value);
        } else if (parseFloat(value) > maxBet) {
            setBetAmount(matchData.maxBet);
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
    };

    return (
        <div className='relative w-full md:min-w-72 min-w-60 shadow-black/10 shadow-2xl max-w-80'>
            <div
                className={`flex h-full flex-col gap-3 rounded-md shadow-md p-2
                bg-gradient-to-b
                ${!darkMode ? 'from-black/10 to-black/10 hover:bg-indigo-500/10'
                        : 'from-white/10 to-black/20 hover:bg-indigo-500/10'}
                shadow-black/50 transition ease-in-out duration-150`}>
                <div className='flex flex-row px-3 gap-3 items-center justify-between'>
                    <div className="flex flex-row gap-2 items-center">
                        <img src={matchData.image} alt={`${matchData.team1.name} logo`} className='w-8 rounded-full' />
                        <p className='text-sm font-medium w-40 truncate'>{matchData.tipster}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full w-12">
                        <p className="text-[10px] font-semibold">Limit</p>
                        <p className="text-sm font-semibold">{matchData.challengers?.length}/{matchData.maxNumberOfChallengers.toString()}</p>
                    </div>
                </div>
                <div className="items-center text-sm bg-gradient-to-bl dark:from-gray-900 from-indigo-200 to-transparent p-1 absolute w-1 mt-[43px] ml-6 h-2 -rotate-45"></div>
                <div className="flex flex-row items-start justify-between p-2 text-sm bg-gradient-to-r dark:from-gray-900/60 from-indigo-200 to-indigo-300/60 dark:to-gray-800/40 relative z-2 rounded-lg px-4">
                    <div className="flex flex-col w-full min-h-16 justify-center">
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
                                        <p>{'Sum of both'}</p>
                                        :
                                        <p>{'Both'}</p>
                            }

                        </div>
                        {matchData.comparator && <p>{matchData.comparator}: {matchData.points}</p>}
                    </div>
                    <div className="flex flex-col items-center h-full items-center justify-center w-auto whitespace-nowrap">
                        Max Bet
                        <p className="font-bold dark:text-secundary text-primary">{matchData.maxBet}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-around items-center'>
                    <div className='flex flex-col h-full items-center justify-between rounded-full  w-full z-10'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 object-cover h-auto md:max-w-20 ' />
                        <h2 className={'text-xs font-medium w-20 text-center'}>{matchData.team1.name}</h2>
                    </div>
                    <div className={'font-medium flex items-center flex-col h-full justify-start text-[10px]  md:text-xs'}>
                        <div className="w-40 h-8 absolute bg-black/10 rounded-t-full"></div>
                        <div className="items-center w-full flex flex-col w-full">
                            <h2>{matchData.eventDate.split("T")[0].split('-').join('/')}</h2>
                            <h2>{matchData.eventDate.split("T")[1].slice(0, 5)}</h2>
                        </div>
                        <h2 className="mt-5">VS</h2> {/* Shown on desktop */}
                    </div>
                    <div className='flex flex-col h-full items-center overflow-hidden justify-between rounded-full  w-full z-10 '>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 h-auto object-cover md:max-w-20' />
                        <h2 className={'text-xs font-medium w-20 text-center'}>{matchData.team2.name}</h2>
                    </div>
                </div>
                {
                    !isSubscribed ? <div className="flex justify-center items-center mt-4">

                        {showBetInput ? (
                            <div className="flex w-full flex-row justify-around gap-5 items-center ">
                                <div className="flex flex-col ml-1 w-[55%]">
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
                                    className="bg-green-500 text-white rounded-lg mt-7 w-[40%] h-[2.5rem]"
                                    onClick={handleConfirmBet}
                                >Bet X {matchData.odds.toFixed(2)}
                                </button>
                            </div>
                        ) : (
                            <button
                                className="bg-blue-500 text-white rounded-lg px-4 py-2 flex items-center justify-center"
                                onClick={handlePlaceBetClick}
                                style={{ width: '100%', height: '100%' }}
                            >
                                <span>Place Bet</span>
                                <span className="ml-2 text-green-500 font-bold">X {matchData.odds.toFixed(2)}</span>
                            </button>
                        )}
                    </div> : <p className="flex justify-center items-center mt-10 text-gray-500"> Already Subscribed </p>
                }
                {isOngoing &&
                    <button
                        className="bg-red-500 text-white rounded-lg px-4 py-2 flex items-center justify-center mt-4"
                        onClick={simulateOngoingEvent}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <span>Simulate Ongoing Event</span>
                    </button>
                }

            </div>
        </div>
    );
};
