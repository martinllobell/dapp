import React, { useState } from 'react';
import Search from '../searchBar/Search';

const leagues = {
    futbol: [
        { CompetitionId: 1, Name: 'Premier League' },
        { CompetitionId: 2, Name: 'La Liga' },
        { CompetitionId: 3, Name: 'Serie A' },
        { CompetitionId: 4, Name: 'Ligue 1' },
        { CompetitionId: 5, Name: 'Bundesliga' },
    ],
    nba: [
        { TeamID: 1, Name: 'Lakers', IconUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg' },
        { TeamID: 2, Name: 'Warriors', IconUrl: 'https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg' },
        { TeamID: 3, Name: 'Bulls', IconUrl: 'https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg' },
        { TeamID: 4, Name: 'Celtics', IconUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg' },
        { TeamID: 5, Name: 'Nets', IconUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg' },
    ],
    lol: [],
    csgo: [],
};

const Sidebar = ({ setViewMore, setSelectedSport, darkMode, setSelectedLeague, sport }) => {
    const [isExpanded, setIsExpanded] = useState({
        futbol: false,
        nba: false,
        lol: false,
        csgo: false
    });

    const toggleExpand = (sport) => {
        setIsExpanded({
            futbol: false,
            nba: false,
            lol: false,
            csgo: false,
            [sport]: !isExpanded[sport]
        });
    };

    const handleSportSelection = (sport) => {
        setSelectedSport(sport);
        setViewMore(false);

    };

    const handleLeagueSelection = (league, sport) => {

        setSelectedLeague(league);
    };

    return (
        <div className={`h-[3rem] lg:mt-0 mt-8 w-full flex lg:block lg:w-64 lg:h-screen lg:fixed lg:top-0 lg:left-0 lg:bg-indigo-900/20 lg:dark:bg-white/10 lg:shadow-sm transition-colors lg:backdrop-blur-xl lg:shadow-md lg:drop-shadow-md lg:p-5`}>
            <div className="hidden lg:flex mt-[5rem] mb-4">
                {/* <Search /> */}
            </div>
            <h2 className="hidden lg:flex text-white text-sm lg:mb-8 lg:mt-6">P2P Betting</h2>
            <div className="lg:space-y-4">
                <button
                    className="hidden lg:flex items-center lg:w-full p-4 backdrop-blur-xl bg-white/10 shadow-md shadow-black/10 rounded-lg cursor-pointer transition-colors hover:bg-primary/50 hover:dark:bg-secundary/50"
                    onClick={() => { handleSportSelection("bets") }}
                >
                    <span>Bets</span>
                </button>
            </div>

            <h2 className="hidden lg:flex text-white text-sm mb-8 mt-8">Sports</h2>
            <div className="lg:space-y-4 lg:w-auto w-full lg:inline flex gap-10 mb-2 items-center justify-center ">
                <div className='lg:hidden w-full flex lg:h-auto h-full lg:w-auto lg:block'>
                    <button
                        className="flex items-center justify-center w-full lg:p-2 backdrop-blur-xl bg-white/10 shadow-md shadow-black/10 rounded-lg cursor-pointer transition-colors hover:bg-primary/50 hover:dark:bg-secundary/50"

                        onClick={() => { handleSportSelection("bets") }}
                    >
                        <span>Bets</span>
                    </button>
                </div>
                {Object.keys(leagues).map(sport => (
                    <div key={sport} className=' w-full lg:h-auto h-full justify-center flex lg:w-auto lg:block'>
                        <button
                            className="flex items-center justify-center w-full lg:p-2 backdrop-blur-xl bg-white/10 shadow-md shadow-black/10 rounded-lg cursor-pointer transition-colors hover:bg-primary/50 hover:dark:bg-secundary/50"
                        >
                            <span onClick={() => toggleExpand(sport)} className="hidden lg:flex +right-0 z-500 w-[2rem] h-[1.5rem]">{isExpanded[sport] ? '-' : '+'}</span>
                            <span onClick={() => handleSportSelection(sport)} className='w-full h-full flex justify-center items-center lg:justify-start text-start'>{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
                        </button>
                        {isExpanded[sport] && (
                            <div className="hidden lg:inline space-y-2 relative -bottom-2">
                                {leagues[sport].slice(0, 5).map(league => (
                                    <div key={league.CompetitionId || league.TeamID}
                                        className="flex items-center p-2 backdrop-blur-xl bg-white/10  shadow-md rounded-lg cursor-pointer transition-colors hover:bg-primary/50 hover:dark:bg-secundary/50"
                                        onClick={() => handleLeagueSelection(league, sport)}>
                                        {league.IconUrl && (
                                            <img src={league.IconUrl} alt={league.Name} className="w-6 h-6 mr-3" />
                                        )}
                                        <span>{league.Name}</span>
                                    </div>
                                ))}
                                <button
                                    className="hidden lg:flex text-primary dark:text-secundary hover:underline"
                                    onClick={() => handleSportSelection(sport)}
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
