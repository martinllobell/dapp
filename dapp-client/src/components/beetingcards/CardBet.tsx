import React, { FC, useState } from "react";
import { Bet, useTrayStore } from "../../store/useTrayStore";

interface MatchData {
    id: string;
    image: string;
    winCondition: string;
    maxBet: string;
    limit: number;
    tipster: string;
    suscribed: number;
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
    draw: {
        odd: number;
    };
}

interface CardMatchProps {
    matchData: MatchData;
    darkMode: boolean;
}

export const CardMatch: FC<CardMatchProps> = ({ matchData, darkMode }: CardMatchProps) => {
    const [selections, setSelections] = useState<string>('');
    const { actualizeTray, removeTray } = useTrayStore();

    const handleAddBet = (id: string, winCondition: string, team: string, gains: number) => {
        const match = matchData.team1.name + ' v ' + matchData.team2.name;
        if (selections === team) {
            removeTray(id);
            setSelections('');
        } else {
            const newBet: Bet = { id, winCondition, team, gains: Number(gains.toFixed(2)), match };
            setSelections(team);
            actualizeTray(newBet);
        }
    };

    return (
        <div className='relative w-full md:min-w-72 min-w-60'>
            <div
                className={`flex h-full flex-col gap-3 rounded-md shadow-md p-2
                bg-gradient-to-b
                ${!darkMode ? 'from-black/10 to-black/10 hover:bg-indigo-500/10'
                        : 'from-white/10 to-black/20 hover:bg-indigo-500/10'}
                    shadow-black/50 transition ease-in-out duration-150`}>
                <div className='flex flex-row px-3 gap-3 items-center justify-between'>
                    <div className="flex flex-row gap-2 items-center">
                        <img src={matchData.image} alt={`${matchData.team1.name} logo`} className='w-8' />
                        <p className='text-sm text-xs font-medium w-40 bg-red-700 truncate'>{matchData.id}</p>
                    </div>
                    <div className="flex flex-col items-center rounded-full w-12">
                        <p className="text-[10px]">Limit</p>
                        <p className="text-sm">{matchData.suscribed}/{matchData.limit}</p>
                    </div>
                </div>
                <div className="items-center text-sm bg-gradient-to-bl dark:from-gray-900 from-indigo-200 to-transparent p-1 absolute w-1 mt-[43px] ml-6 h-2 -rotate-45"></div>
                <div className="flex flex-row items-start justify-between p-2 text-sm bg-gradient-to-r dark:from-gray-900/60 from-indigo-200 to-indigo-300/60 dark:to-gray-800/40 relative z-2 rounded-lg p-2">
                    <div className="flex flex-col w-full">
                        <p>{matchData.winCondition}: </p>
                        <p className="max-w-32 md:max-w-full">{matchData.team1.name} </p>
                    </div>
                    <div className="flex flex-col items-center w-auto whitespace-nowrap">
                        Max Bet
                        <p className="font-bold dark:text-secundary text-primary">{matchData.maxBet}</p>
                    </div>
                </div>
                <div className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col max-w-20 items-center'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className={'text-xs font-medium w-20 text-center'}>{matchData.team1.name}</h2>
                    </div>
                    <div className={'font-medium flex items-center flex-col h-full justify-start text-[10px] md:text-xs'}>
                        <div className="items-center w-full flex flex-col">
                            <h2>18:00hs</h2> {/* Shown on desktop */}
                            <h2>24/12/2024</h2> {/* Shown on desktop */}
                        </div>
                        <h2 className="mt-5">VS</h2> {/* Shown on desktop */}
                    </div>
                    <div className='flex flex-col max-w-20 items-center overflow-hidden'>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className={'text-xs font-medium w-20 text-center'}>{matchData.team2.name}</h2>
                    </div>
                </div>
                <div className="items-center w-full flex justify-center">
                    <hr className={`border-t w-5/6  ${darkMode ? 'border-white/20' : 'border-black/20'}`} />
                </div>
                <div className={`flex justify-around -mt-3 cursor-pointer text-center w-full `}>
                    <div className={`flex gap-2 p-1 items-center w-full rounded-lg whitespace-nowrap ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-500/40'}`}
                        onClick={() => handleAddBet(matchData.id, matchData.winCondition, matchData.team2.name, matchData.team2.odd)}>
                        <div className="flex flex-col items-center w-full">
                            <p>
                                Place Bet
                            </p>
                            <p>
                                {matchData.team2.name} Win
                            </p>
                            <p className={`text-sm font-bold p-1 text-center w-12 dark:text-secundary text-primary `}>
                                {matchData.team2.odd.toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
