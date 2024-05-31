import React, { FC, useState } from "react";
import { Bet, useTrayStore } from "../../store/useTrayStore";

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
}

interface CardMatchProps {
    matchData: MatchData;
    darkMode: boolean;
}

export const CardMatch: FC<CardMatchProps> = ({ matchData, darkMode }: CardMatchProps) => {
    const [selections, setSelections] = useState<string>('');
    const { store, actualizeTray, removeTray } = useTrayStore();
    console.log(matchData.dataBet);

    const handleAddBet = (id: string, winCondition: string, team: { name: string, logo?: string }, gains: number, maxBet: string, maxEntryFee: number) => {
        const match = matchData.team1.name + ' v ' + matchData.team2.name;
        if (selections === id) {
            removeTray(id);
            setSelections('');
        } else {
            const newBet: Bet = { id, winCondition, team, gains: Number(gains.toFixed(4)), match, maxBet, maxEntryFee };
            setSelections(id);
            actualizeTray(newBet);
        }
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
                <div className='flex flex-row h-full justify-around items-center'>
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
                <div className="items-center w-full flex justify-center">
                </div>
                <div className={`flex justify-around -mt-3 cursor-pointer text-center w-full `}>
                    <div className={`flex gap-2 p-1 items-center w-full rounded-lg whitespace-nowrap bg-black/10 dark:hover:bg-white/20 hover:bg-gray-500/40 ${store.tray.some(({ id }) => id === matchData.id) ? 'dark:bg-white/20 bg-gray-500/40' : ''}`}
                        onClick={() => handleAddBet(
                            matchData.id,
                            matchData.winCondition + ' ' + matchData.comparator + ' ' + matchData.points,
                            matchData?.dataBet[1] === 0 ?
                                { name: matchData.team1.name, logo: matchData.team1.logo }
                                : matchData?.dataBet[1] === 1 ?
                                    { name: matchData.team2.name, logo: matchData.team2.logo }
                                    : matchData?.dataBet[1] === 2 ?
                                        { name: 'Sum of both: ' + matchData.comparator + ' ' + matchData.points + ' (' + matchData.team1.name + ' v ' + matchData.team2.name + ')' } :
                                        matchData?.dataBet[1] === 3 ?
                                            { name: 'Difference: ' + matchData.comparator + ' ' + matchData.points + ' (' + matchData.team1.name + ' v ' + matchData.team2.name + ')' }
                                            : { name: 'Both: ' + matchData.comparator + ' ' + matchData.points + ' (' + matchData.team1.name + ' v ' + matchData.team2.name + ')' },
                            Number(matchData.odds),
                            String(matchData.maxBet),
                            Number(matchData.maxEntryFee))}>
                        <div className="flex flex-col items-center w-full">
                            <p>
                                Place Bet
                            </p>
                            {/* <div className="flex gap-1">
                                <p>
                                    {
                                        matchData.dataBet && matchData.dataBet[0] === "0n" && matchData.dataBet[1] === "0n" ? matchData.team2.name : matchData.team1.name
                                    }
                                </p>
                                <h3>WIN</h3>
                            </div> */}


                            <p className={`text-sm font-bold p-1 text-center w-12 dark:text-secundary text-primary `}>
                                X  {matchData.odds.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
