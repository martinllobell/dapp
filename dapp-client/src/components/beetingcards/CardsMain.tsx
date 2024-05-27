
import React, { FC } from "react";
import { CardMatch } from "./CardBet";

interface CardsMainProps {
    darkMode: boolean;
}

export const CardsMain: FC<CardsMainProps> = ({ darkMode }) => {
    const match1 = {
        id: '0x2012391123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        team1: {
            name: 'Manchester United',
            logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg',
            odd: 1.52,
        },
        team2: {
            name: 'Manchester City',
            logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png',
            odd: 3.20
        },
        draw: {
            odd: 2.40,
        }
    }

    const match2 = {
        id: '0x20124567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        team1: {
            name: 'Manchester United',
            logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg',
            odd: 2.80,
        },
        team2: {
            name: 'Manchester City',
            logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png',
            odd: 3.20
        },
        draw: {
            odd: 2.20,
        }
    }

    const match3 = {
        id: '0x203424567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        team1: {
            name: 'Manchester United',
            logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg',
            odd: 2.80,
        },
        team2: {
            name: 'Manchester City',
            logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png',
            odd: 3.20
        },
        draw: {
            odd: 2.20,
        }
    }

    const match4 = {
        id: '0x2034224567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        team1: {
            name: 'Manchester United',
            logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg',
            odd: 2.80,
        },
        team2: {
            name: 'Manchester City',
            logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png',
            odd: 3.20
        },
        draw: {
            odd: 2.20,
        }
    }


    return (
        <div className='relative w-full md:min-w-60'>
            <h1 className='font-bold my-3'>Partidos en Vivo</h1>
            <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
                <CardMatch matchData={match1} darkMode={darkMode} />
                <CardMatch matchData={match2} darkMode={darkMode} />
                <CardMatch matchData={match3} darkMode={darkMode} />
                <CardMatch matchData={match4} darkMode={darkMode} />

            </div>

        </div>
    );
};