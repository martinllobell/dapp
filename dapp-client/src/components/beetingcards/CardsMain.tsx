
import React, { FC } from "react";
import { CardMatch } from "./CardBet";

interface CardsMainProps {
    darkMode: boolean;
}

export const CardsMain: FC<CardsMainProps> = ({darkMode}) => {
    const match1 = {
        id: '0x2012391123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        team1: {
            name: 'Manchester United',
            logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg'
        },
        team2: {
            name: 'Manchester City',
            logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png'
        },
        odds: {
            odd1: 1.52,
            oddX: 2.40,
            odd2: 3.20
        }
    }
    return (
        <div className='relative w-full md:min-w-60'>
            <h1 className='font-bold my-3'>Partidos en Vivo</h1>
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
                <CardMatch matchData={match1} darkMode={darkMode}/>
                <CardMatch matchData={match1} darkMode={darkMode}/>
                <CardMatch matchData={match1} darkMode={darkMode}/>
                <CardMatch matchData={match1} darkMode={darkMode}/>
              
            </div>

        </div>
    );
};