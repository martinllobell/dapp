import React, { FC, useRef, useState, useEffect } from "react";
import { CardMatch } from "./CardBet";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface CardsMainProps {
    darkMode: boolean;
}

export const CardsMain: FC<CardsMainProps> = ({ darkMode }) => {
    const match1 = {
        id: '0x2012391123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        maxBet: '2.00 ETH',
        limit: 10,
        suscribed: 7,
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
    };

    const match2 = {
        id: '0x20124567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        maxBet: '2.00 ETH',
        limit: 10,
        suscribed: 7,
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
    };

    const match3 = {
        id: '0x203424567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        maxBet: '2.00 ETH',
        limit: 10,
        suscribed: 7,
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
    };

    const match4 = {
        id: '0x2034224567123123',
        image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
        winCondition: 'Final result',
        maxBet: '2.00 ETH',
        limit: 10,
        suscribed: 7,
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
    };

    const matches = [match1, match2, match3, match4, match4, match4, match4, match4];

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const handleScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth / 4.9; // Ajusta este valor según sea necesario

            if (direction === 'left') {
                scrollContainerRef.current.scrollTo({ left: scrollLeft - scrollAmount, behavior: 'smooth' });
            } else {
                scrollContainerRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
            }
        }
    };

    const updateArrowsVisibility = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = scrollContainerRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('scroll', updateArrowsVisibility);
            updateArrowsVisibility(); // Initial check

            return () => {
                if (scrollContainerRef.current) {
                    scrollContainerRef.current.removeEventListener('scroll', updateArrowsVisibility);
                }
            };
        }
    }, []);

    return (
        <div className='relative w-full md:min-w-60 md:p-12 p-4'>
            <h1 className='font-semibold my-3 text-xl 2xl:text-3xl'>Trend Bets</h1>
            <div className="flex flex-row justify-between items-center md:px-4">
                {showLeftArrow && <ChevronLeftIcon className="h-5 cursor-pointer" onClick={() => handleScroll('left')} />}
                <div className='flex w-full gap-4 overflow-x-scroll scroll-invisible py-2 px-1' ref={scrollContainerRef}>
                    {matches.map((match, index) => (
                        <CardMatch key={index} matchData={match} darkMode={darkMode} />
                    ))}
                </div>
                <div>
                    {showRightArrow && <ChevronRightIcon className="h-5 cursor-pointer" onClick={() => handleScroll('right')} />}
                </div>
            </div>
        </div>
    );
};
