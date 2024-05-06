import React, { FC } from "react";

interface MatchData {
    id: string;
    image: string;
    team1: {
        logo: string;
        name: string;
    };
    team2: {
        logo: string;
        name: string;
    };
    odds: {
        odd1: number;
        oddX: number;
        odd2: number;
    };
}

interface CardMatchProps {
    matchData: MatchData;
    darkMode: boolean;
}

export const CardMatch: FC<CardMatchProps> = ({ matchData }: CardMatchProps) => {
    const darkMode = localStorage.getItem("darkMode") === 'true' ? true : false;
    return (
        <div className='relative w-full md:min-w-60'>
            <div
                className={`flex h-full flex-col gap-3 rounded-md shadow-md
                pt-2 bg-gradient-to-b 
                ${!darkMode ? 'from-black/10 to-black/10 hover:bg-indigo-500/10'
                        : 'from-white/10 to-black/20 hover:bg-indigo-500/10'}
                    shadow-black/50 transition ease-in-out duration-150`}>
                <div className='flex flex-row py-2 px-3 gap-3 items-center'>
                    <img src={matchData.image} alt={`${matchData.team1.name} logo`} className='w-8' />
                    <p className={'text-sm  text-xs font-medium'}
                    >{matchData.id}</p>
                </div>
                <div className='flex flex-row justify-around items-center'>
                    <div className='flex flex-col max-w-20 items-center'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className={'text-sm text-xs font-medium w-20 text-center'}>{matchData.team1.name}</h2>
                    </div>
                    <h2 className={'font-medium md:hidden'}>v</h2> {/* Hidden on mobile */}
                    <h2 className={'font-medium hidden md:block'}>vs</h2> {/* Shown on desktop */}
                    <div className='flex flex-col max-w-20 items-center overflow-hidden'>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className={'text-sm text-xs font-medium w-20 text-center'}>{matchData.team2.name}</h2>
                    </div>
                </div>
                <hr className={`border-t ${darkMode ? 'border-white/20' : 'border-slate-900'}`} />
                <div className={`flex justify-around -mt-3 cursor-pointer text-center w-full ${darkMode? 'text-yellow-500' : 'text-violet-600'}`}>
                    <div className={`text-sm font-semibold w-full py-2 flex flex-row justify-center gap-1 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-500/40'}`}>
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>1</p>
                        {matchData.odds.odd1.toFixed(2)}
                    </div>
                    <div className={`text-sm font-semibold w-full py-2 flex flex-row justify-center gap-1 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-500/40'}`}>
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>X</p>
                        {matchData.odds.oddX.toFixed(2)}
                    </div>
                    <div className={`text-sm font-semibold w-full py-2 flex flex-row justify-center gap-1 ${darkMode ? 'hover:bg-white/20' : 'hover:bg-gray-500/40'}`}>
                        <p className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>2</p>
                        {matchData.odds.odd2.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};