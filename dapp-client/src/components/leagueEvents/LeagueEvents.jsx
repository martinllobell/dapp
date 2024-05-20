import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../loading/Loading';

const LeagueEvents = ({ league, events }) => {
    const [teamLogos, setTeamLogos] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [currentEvents, setCurrentEvents] = useState([]);
    const defaultLogoUrl = 'default_logo_url'; // URL de imagen predeterminada

    useEffect(() => {
        const eventsPerPage = 10;
        const startIndex = (currentPage - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        setCurrentEvents(events.slice(startIndex, endIndex));
    }, [currentPage, events]);

    useEffect(() => {
        fetchAllTeamLogos(league);
    }, [league]);

    const fetchAllTeamLogos = async (league) => {
        try {
            const response = await axios.get(`/api/sportsdata/v4/soccer/scores/json/CompetitionDetails/${league.CompetitionId}?key=8f188c8fe9a64e7ea20b66115210ae44`);
            const logos = {};
            response.data.Teams.forEach(team => {
                logos[team.Name] = team.WikipediaLogoUrl || defaultLogoUrl;
            });
            setTeamLogos(logos);
        } catch (error) {
            console.error('Error fetching team logos:', error);
        }
    };

    return (
        <div className="p-5">
            <h3 className="text-sm mb-5">Eventos de la Liga</h3>
            <div className="flex justify-start flex-wrap gap-5">
                {currentEvents.map(event => (
                    <div key={event.GameId} className="p-4 bg-gray-200 w-[45%] dark:bg-gray-700 rounded-lg flex flex-col space-y-3">
                        <div className="text-gray-600 dark:text-gray-400">{new Date(event.DateTime).toLocaleString()}</div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                {
                                    teamLogos[event.HomeTeamName] ? <img src={teamLogos[event.HomeTeamName]} alt={event.HomeTeamName} className="w-12 h-12" /> : <Loading/>
                                }
                                <span className="text-lg font-semibold">{event.HomeTeamName}</span>
                            </div>
                            <span className="text-lg font-semibold mx-3">vs</span>
                            <div className="flex items-center space-x-3">
                                <span className="text-lg font-semibold">{event.AwayTeamName}</span>
                                {
                                    teamLogos[event.AwayTeamName] ? <img src={teamLogos[event.AwayTeamName]} alt={event.AwayTeamName} className="w-12 h-12" /> : <Loading/>
                                }
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-lg">Crear apuesta</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-5 flex justify-between">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                    Anterior
                </button>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default LeagueEvents;
