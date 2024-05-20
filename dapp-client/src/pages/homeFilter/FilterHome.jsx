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
    const [leagueIcons, setLeagueIcons] = useState({});
    const [currentLeagues, setCurrentLeagues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSport, setSelectedSport] = useState('futbol');
    const [activeTab, setActiveTab] = useState('Torneos');
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [leagueEvents, setLeagueEvents] = useState([]);

    useEffect(() => {
        fetchAllLeagues();
        fetchLeagueIcons();
    }, []);

    useEffect(() => {
        if (allLeagues[selectedSport]) {
            setCurrentLeagues(allLeagues[selectedSport].slice(0, currentPage * 10));
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
                lol: [], // Ajustar con la lógica para obtener ligas de LoL
                csgo: [] // Ajustar con la lógica para obtener ligas de CS:GO
            });
        } catch (error) {
            console.error('Error fetching leagues:', error);
        }
    };

    const fetchLeagueIcons = async () => {
        try {
            const response = await axios.get('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php');
            const icons = {};
            response.data.leagues.forEach(league => {
                icons[league.strLeague] = league.strBadge;
            });
            setLeagueIcons(icons);
        } catch (error) {
            console.error('Error fetching league icons:', error);
        }
    };

    const fetchLeagueEvents = async () => {
        try {
            const response = await axios.get(`/api/sportsdata/v4/soccer/scores/json/CompetitionDetails/${selectedLeague.CompetitionId}?key=8f188c8fe9a64e7ea20b66115210ae44`);
            setLeagueEvents(response.data.Games);
        } catch (error) {
            console.error('Error fetching league events:', error);
        }
    };

    const fetchMoreLeagues = () => {
        setCurrentPage(prev => prev + 1);
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
            <Sidebar setViewMore={setViewMore} setSelectedSport={setSelectedSport} darkMode={darkMode} />
            <div className={`ml-64 p-5 shadow-md min-h-[40rem] flex-1 mt-[5rem]`}>
                <div className="mb-5">
                    <img src={sportImages[selectedSport]} alt={selectedSport} className="w-full h-64 object-cover rounded-lg" />
                    <h2 className="text-3xl mt-3">{!selectedLeague ? sportNames[selectedSport] : selectedLeague.Name}</h2>
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
                    <>
                        <div className="flex flex-wrap gap-4">
                            {currentLeagues.map(league => (
                                <div key={league.CompetitionId || league.TeamID}
                                    className="flex w-[25%] items-center p-3 bg-indigo-200 dark:bg-gray-700 rounded-lg cursor-pointer transition-colors hover:bg-gray-200"
                                    onClick={() => setSelectedLeague(league)}>
                                    <span>{league.Name}</span>
                                </div>
                            ))}
                        </div>
                        {currentLeagues.length < (allLeagues[selectedSport] ? allLeagues[selectedSport].length : 0) && (
                            <button
                                className="mt-5 text-blue-500 focus:outline-none"
                                onClick={fetchMoreLeagues}
                            >
                                Ver más
                            </button>
                        )}
                    </>
                )}
                {selectedLeague && (
                    <>
                        <button
                            onClick={() => setSelectedLeague(null)}
                            className="mb-5 text-blue-500 focus:outline-none"
                        >
                            Volver a ligas
                        </button>
                        <LeagueEvents league={selectedLeague} events={leagueEvents} />
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
