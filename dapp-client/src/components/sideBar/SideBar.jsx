import React, { useState } from 'react';
import Search from '../searchBar/Search';

const leagues = {
    futbol: [
        { CompetitionId: 1, Name: 'Premier League', IconUrl: 'url1' },
        { CompetitionId: 2, Name: 'La Liga', IconUrl: 'url2' },
        { CompetitionId: 3, Name: 'Serie A', IconUrl: 'url3' },
        { CompetitionId: 4, Name: 'Ligue 1', IconUrl: 'url4' },
        { CompetitionId: 5, Name: 'Bundesliga', IconUrl: 'url5' },
        // Agrega más ligas de fútbol según sea necesario
    ],
    nba: [
        // Agrega ligas de NBA aquí
    ],
    lol: [
        // Agrega ligas de LoL aquí
    ],
    csgo: [
        // Agrega ligas de CS:GO aquí
    ],
};

const Sidebar = ({ setViewMore, setSelectedSport, darkMode }) => {
    const [isExpanded, setIsExpanded] = useState({
        futbol: false,
        nba: false,
        lol: false,
        csgo: false
    });

    const toggleExpand = (sport) => {
        setIsExpanded(prevState => ({
            ...prevState,
            [sport]: !prevState[sport]
        }));
    };

    const handleSportSelection = (sport) => {
        setSelectedSport(sport);
        setViewMore(false); // Reset view more state
    };
    return (
        <div className={`w-64 h-screen fixed ${darkMode ? 'bg-gray-900' : 'bg-indigo-400/40'} backdrop-blur-xl drop-shadow-xl p-5`}>
            <div className="mt-[5rem] mb-4">
                <Search />
            </div>
            <h2 className="text-white text-sm mb-8">Juegos</h2>
            <div className="space-y-4">
                {Object.keys(leagues).map(sport => (
                    <div key={sport}>
                        <button
                            className="flex items-center p-2 bg-indigo-200 dark:bg-gray-700 rounded hover:bg-gray-600 w-full"
                            onClick={() => toggleExpand(sport)}
                        >
                            <span>{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
                            <span className="ml-auto">{isExpanded[sport] ? '-' : '+'}</span>
                        </button>
                        {isExpanded[sport] && (
                            <div className="space-y-2 mt-2">
                                {leagues[sport].slice(0, 5).map(league => (
                                    <div key={league.CompetitionId} className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded">
                                        <img src={league.IconUrl} alt={league.Name} className="w-6 h-6 mr-3" />
                                        <span>{league.Name}</span>
                                    </div>
                                ))}
                                <button
                                    className="text-blue-500 hover:underline"
                                    onClick={() => {
                                        setViewMore(sport);
                                        handleSportSelection(sport);
                                    }}
                                >
                                    Ver más
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
