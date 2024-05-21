import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sideBar/SideBar';
import futbol from '../../assets/images/champions.jpg';
import nba from '../../assets/images/nba.jpg';
import lol from '../../assets/images/lol.jpg';
import csgo from '../../assets/images/cs2.webp';
import LeagueEvents from '../../components/leagueEvents/LeagueEvents';

const sportImages = {
    futbol,
    nba,
    lol,
    csgo
};

const FilterHome = ({ darkMode }) => {
    const [viewMore, setViewMore] = useState(false);
    const [allLeagues, setAllLeagues] = useState({});
    const [currentLeagues, setCurrentLeagues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSport, setSelectedSport] = useState('futbol');
    const [activeTab, setActiveTab] = useState('Torneos');
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [leagueEvents, setLeagueEvents] = useState([]);

    useEffect(() => {
        fetchAllLeagues();
    }, []);

    useEffect(() => {
        if (allLeagues[selectedSport]) {
            const leaguesPerPage = 12;
            const startIndex = (currentPage - 1) * leaguesPerPage;
            const endIndex = startIndex + leaguesPerPage;
            setCurrentLeagues(allLeagues[selectedSport].slice(startIndex, endIndex));
        }
    }, [allLeagues, currentPage, selectedSport]);

    useEffect(() => {
        if (selectedLeague) {
            fetchLeagueEvents();
        }
    }, [selectedLeague]);

    const fetchAllLeagues = async () => {
        try {
            const responseFutbol = await axios.get('/api/sportsdata/v4/soccer/scores/json/Competitions?key=8f188c8fe9a64e7ea20b66115210ae44');
            const responseNBA = await axios.get('/api/sportsdata/v3/nba/scores/json/teams', {
                headers: { 'Ocp-Apim-Subscription-Key': '06b9feb762534274946d286934ff0235' }
            });

            setAllLeagues({
                futbol: responseFutbol.data,
                nba: responseNBA.data,
                lol: [],
                csgo: [],
            });
        } catch (error) {
            console.error('Error fetching leagues:', error);
        }
    };

    const fetchLeagueEvents = async () => {
        if (selectedSport === 'futbol') {
            try {
                const response = await axios.get(`/api/sportsdata/v4/soccer/scores/json/CompetitionDetails/${selectedLeague.CompetitionId}?key=8f188c8fe9a64e7ea20b66115210ae44`);
                setLeagueEvents(response.data.Games);
            } catch (error) {
                console.error('Error fetching league events:', error);
            }
        } else if (selectedSport === 'nba') {
            try {
                const season = new Date().getFullYear();
                const response = await axios.get(`/api/sportsdata/v3/nba/scores/json/Games/${season}`, {
                    headers: { 'Ocp-Apim-Subscription-Key': '06b9feb762534274946d286934ff0235' }
                });
                const events = response.data.filter(event => 
                    event.HomeTeamID === selectedLeague.TeamID || event.AwayTeamID === selectedLeague.TeamID
                );
                setLeagueEvents(events);
            } catch (error) {
                console.error('Error fetching league events:', error);
            }
        }
    };

    const handleSportChange = (sport) => {
        setSelectedSport(sport);
        setSelectedLeague(null);
        setCurrentPage(1);
    };

    const handleLeagueSelection = (league) => {
        setSelectedLeague(league);
    };

    const sportNames = {
        futbol: 'Fútbol',
        nba: 'NBA',
        lol: 'LoL',
        csgo: 'CS:GO',
    };

    const filters = ['Torneos', 'En vivo', 'Pre partida', 'Outrights', 'Calendario'];

    return (
        <div className="flex">
            <Sidebar setViewMore={setViewMore} setSelectedSport={handleSportChange} darkMode={darkMode} setSelectedLeague={handleLeagueSelection} />
            <div className={`ml-64 p-5 shadow-md min-h-[40rem] flex-1 mt-[5rem]`}>
                <div className="mb-5">
                    <img src={sportImages[selectedSport]} alt={selectedSport} className="w-full h-64 object-cover rounded-lg" />
                    <h2 className="text-3xl mt-3 flex items-center">
                        {!selectedLeague ? sportNames[selectedSport] : selectedLeague.Name}
                        {selectedLeague?.IconUrl && (
                            <img src={selectedLeague.IconUrl} alt={selectedLeague.Name} className="w-12 h-12 ml-3" />
                        )}
                    </h2>
                    {!selectedLeague && (
                        <div className="flex space-x-4 mt-3">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveTab(filter)}
                                    className={`px-4 py-2 rounded-lg ${activeTab === filter ? 'bg-green-500' : 'dark:bg-gray-700 bg-indigo-500'} text-white`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {!selectedLeague && (
                    <h2 className="text-2xl mb-5">{activeTab}</h2>
                )}
                {activeTab === 'Torneos' && !selectedLeague && (
                    <div className=' w-full flex flex-col items-center'>
                        <div className='w-[80%]'>

                            <div className={`${currentPage === 1 ? 'flex justify-end' : 'flex justify-between mb-5'} h-[3rem] `}>
                                {currentPage > 1 && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    >
                                        Anterior
                                    </button>
                                )}
                                {currentLeagues.length === 12 && (
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                    >
                                        Siguiente
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap w-full justify-center mt-5 gap-8">
                                {currentLeagues.map(league => (
                                    <div key={league.CompetitionId || league.TeamID}
                                        className="flex w-[25%] items-center p-3 bg-indigo-200 dark:bg-gray-700 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
                                        onClick={() => handleLeagueSelection(league)}>
                                        {league.WikipediaLogoUrl && (
                                            <img src={league.WikipediaLogoUrl} alt={league.Name || league.FullName} className="w-12 h-12 mr-3" />
                                        )}
                                        <span>{league.Name || league.FullName}</span>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {selectedLeague && (
                    <>
                        <button
                            onClick={() => setSelectedLeague(null)}
                            className="mb-5 text-blue-500 focus:outline-none"
                        >
                            Volver a ligas
                        </button>
                        <LeagueEvents league={selectedLeague} sport={selectedSport} />
                    </>
                )}
                {activeTab === 'En vivo' && (
                    <div>Contenido para En vivo</div>
                )}
                {activeTab === 'Pre partida' && (
                    <div>Contenido para Pre partida</div>
                )}
                {activeTab === 'Outrights' && (
                    <div>Contenido para Outrights</div>
                )}
                {activeTab === 'Calendario' && (
                    <div>Contenido para Calendario</div>
                )}
            </div>
        </div>
    );
};

export default FilterHome;
