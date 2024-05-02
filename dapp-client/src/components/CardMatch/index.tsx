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
}

export const CardMatch: FC<CardMatchProps> = ({ matchData }: CardMatchProps) => {
    return (
        <div className='relative h-auto w-full min-w-60 mx-2'>
            <div className='absolute top-0 flex w-full justify-center'>
                <div className='left-0 h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000' />
            </div>
            <div className='flex h-full flex-col gap-3 rounded-md border border-gray-800 bg-gradient-to-b from-gray-950 to-black px-3 py-2'>
                <div className='flex flex-row py-2 gap-3 items-center'>
                    <img src={matchData.image} alt={`${matchData.team1.name} logo`} className='w-8' />
                    <p className='text-sm text-gray-200 text-xs font-medium'>{matchData.id}</p>
                </div>
                <div className='flex flex-row justify-around items-center'>
                    <div className='flex flex-col max-w-20 items-center'>
                        <img src={matchData.team1.logo} alt={`${matchData.team1.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className='text-sm text-gray-200 text-xs font-medium w-20 text-center'>{matchData.team1.name}</h2>
                    </div>
                    <h2 className='text-gray-200 font-medium md:hidden'>v</h2> {/* Hidden on mobile */}
                    <h2 className='text-gray-200 font-medium hidden md:block'>vs</h2> {/* Shown on desktop */}
                    <div className='flex flex-col max-w-20 items-center overflow-hidden'>
                        <img src={matchData.team2.logo} alt={`${matchData.team2.name} logo`} className='max-w-12 md:max-w-20' />
                        <h2 className='text-sm text-gray-200 text-xs font-medium w-20 text-center'>{matchData.team2.name}</h2>
                    </div>
                </div>
                <hr />
                <div className='flex justify-around gap-2 md:px-3 py-1'>
                    <h2 className='text-gray-200 font-semibold'>{matchData.odds.odd1.toFixed(2)}</h2>
                    <h2 className='text-gray-200 font-semibold'>{matchData.odds.oddX.toFixed(2)}</h2>
                    <h2 className='text-gray-200 font-semibold'>{matchData.odds.odd2.toFixed(2)}</h2>
                </div>
            </div>
        </div>
    );
};