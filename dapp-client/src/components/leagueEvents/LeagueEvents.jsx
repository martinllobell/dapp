import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading/Loading';
import BetCreationModal from '../betCreationModal/BetCreationModal';
import Pagination from '../pagination/Pagination';

const LeagueEvents = ({ league, sport }) => {
    const [teamLogos, setTeamLogos] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEvents, setCurrentEvents] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [simulatedDate, setSimulatedDate] = useState(new Date('2023-12-01T00:00:00')); // Fecha simulada
    const defaultLogoUrl = 'default_logo_url'; // URL de imagen predeterminada
    const eventsPerPage = 12;

    useEffect(() => {
        if (sport === 'futbol') {
            fetchFutbolTeamLogos(league);
            fetchFutbolLeagueEvents(league);
        } else if (sport === 'nba') {
            fetchNBATeamLogos();
            fetchNBALeagueEvents(league);
        }
    }, [league, sport]);

    useEffect(() => {
        const initialPage = calculateInitialPage();
        setCurrentPage(initialPage);
    }, [allEvents]);

    useEffect(() => {
        paginateEvents();
    }, [allEvents, currentPage]);

    const calculateInitialPage = () => {
        const index = allEvents.findIndex(event => new Date(event.DateTime) >= simulatedDate);
        return Math.floor(index / eventsPerPage) + 1;
    };

    const fetchFutbolTeamLogos = async (league) => {
        try {
            const response = await axios.get(`/api/sportsdata/v4/soccer/scores/json/CompetitionDetails/${league.CompetitionId}?key=8f188c8fe9a64e7ea20b66115210ae44`);
            const logos = {};
            response.data.Teams.forEach(team => {
                logos[team.Name] = team.WikipediaLogoUrl || defaultLogoUrl;
            });
            setTeamLogos(logos);
        } catch (error) {
            console.error('Error fetching futbol team logos:', error);
        }
    };

    const fetchNBATeamLogos = async () => {
        try {
            const response = await axios.get('/api/sportsdata/v3/nba/scores/json/teams', {
                headers: { 'Ocp-Apim-Subscription-Key': '06b9feb762534274946d286934ff0235' }
            });
            const logos = {};
            response.data.forEach(team => {
                logos[team.Key] = team.WikipediaLogoUrl || defaultLogoUrl;
            });
            setTeamLogos(logos);
        } catch (error) {
            console.error('Error fetching NBA team logos:', error);
        }
    };

    const fetchFutbolLeagueEvents = async (league) => {
        try {
            const response = await axios.get(`/api/sportsdata/v4/soccer/scores/json/CompetitionDetails/${league.CompetitionId}?key=8f188c8fe9a64e7ea20b66115210ae44`);
            const sortedEvents = response.data.Games.sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));
            setAllEvents(sortedEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching futbol league events:', error);
        }
    };

    const fetchNBALeagueEvents = async (team) => {
        try {
            const response = await axios.get(`/api/sportsdata/v3/nba/scores/json/Games/${new Date().getFullYear()}`, {
                headers: { 'Ocp-Apim-Subscription-Key': '06b9feb762534274946d286934ff0235' }
            });
            const filteredEvents = response.data.filter(
                game => game.HomeTeam === team.Key || game.AwayTeam === team.Key
            );
            const sortedEvents = filteredEvents.sort((a, b) => new Date(a.DateTime) - new Date(b.DateTime));
            setAllEvents(sortedEvents);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching NBA league events:', error);
        }
    };

    const paginateEvents = () => {
        const startIndex = (currentPage - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        setCurrentEvents(allEvents.slice(startIndex, endIndex));
    };

    const handleCreateBet = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const isPastEvent = (eventDate) => {
        return new Date(eventDate) < simulatedDate;
    };

    const totalPages = Math.ceil(allEvents.length / eventsPerPage);

    return (
        <div className="flex justify-center">
            <div className="w-full">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
                <div className="flex w-full justify-around flex-wrap mt-5 mb-8 gap-8">
                    {loading ? (
                        Array(12).fill(0).map((_, index) => (
                            <div key={index} className="p-4 bg-gray-200 w-[30%] dark:bg-gray-700 rounded-lg flex flex-col space-y-3 animate-pulse">
                                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-8">
                                        <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                    </div>
                                    <span className="text-lg font-semibold mx-3">vs</span>
                                    <div className="flex items-center space-x-8">
                                        <div className="h-12 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
                                    </div>
                                </div>
                                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3 self-end"></div>
                            </div>
                        ))
                    ) : (
                        currentEvents.map(event => (
                            <div key={event.GameId || event.GameID} className={`p-4 ${isPastEvent(event.DateTime) ? 'backdrop-blur-xl bg-black/10 dark:bg-black/20 shadow-xl shadow-sm shadow-black/10 rounded-lg ' : 'backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 rounded-lg transition-colors'} sm:w-[45%] md:w-[30%] lg:w-[30%]   rounded-lg flex flex-col items-center space-y-3`}>
                                <div className="text-black dark:text-white flex gap-2 items-center justify-center rounded-lg bg-secundary-500/50 dark:bg-secundary-500/50 w-[100%] font-medium text-lg">
                                    <p>{event.DateTime.split('T')[0].split('-').join('/')}</p>
                                    <p>{event.DateTime.split('T')[1].slice(0, 5)}hs</p>
                                </div>
                                <div className="flex justify-around w-full items-center">
                                    <div className="flex flex-col items-center w-[25%] justify-between">
                                        <span className="text-lg font-semibold">{event.HomeTeamName || event.HomeTeam}</span>
                                        {
                                            teamLogos[event.HomeTeamName || event.HomeTeam] ?
                                                <img src={teamLogos[event.HomeTeamName || event.HomeTeam]} alt={event.HomeTeamName || event.HomeTeam} className="w-12 h-12" />
                                                : <Loading />
                                        }
                                    </div>
                                    <span className="text-lg font-semibold mt-5">vs</span>
                                    <div className="flex flex-col items-center w-[25%] justify-between">
                                        <span className="text-lg font-semibold">{event.AwayTeamName || event.AwayTeam}</span>
                                        {
                                            teamLogos[event.AwayTeamName || event.AwayTeam] ?
                                                <img src={teamLogos[event.AwayTeamName || event.AwayTeam]} alt={event.AwayTeamName || event.AwayTeam} className="w-12 h-12" />
                                                : <Loading />
                                        }
                                    </div>
                                </div>
                                {isPastEvent(event.DateTime) ? (
                                    <div className="text-center w-full flex content-center items-center justify-around">
                                        <div className="w-1/3 text-white dark:bg-gray-900 bg-gray-500 py-2 rounded-lg">
                                            {event.HomeTeamScore}
                                        </div>
                                        <p className="">
                                            -
                                        </p>
                                        <div className="w-1/3 text-white dark:bg-gray-900 bg-gray-500 py-2 rounded-lg">
                                            {event.AwayTeamScore}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-center">
                                        <button className="px-4 py-2 gap-1 bg-green-600 text-white font-medium hover:brightness-110 rounded-lg flex" onClick={() => handleCreateBet(event)}>
                                            Make a
                                            <p className='text-yellow-400 font-bold'>
                                                 BET
                                            </p>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
            {isModalOpen && selectedEvent && (
                <BetCreationModal
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    event={selectedEvent}
                    teamLogos={teamLogos}
                />
            )}
        </div>
    );
};

export default LeagueEvents;
