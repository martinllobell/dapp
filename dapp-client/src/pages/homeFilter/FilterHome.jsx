import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sideBar/SideBar';
import futbol from '../../assets/images/soccer.webp';
import nba from '../../assets/images/basket.webp';
import lol from '../../assets/images/lol.webp';
import csgo from '../../assets/images/cs2.webp';
import bets from '../../assets/images/bet.webp';
import LeagueEvents from '../../components/leagueEvents/LeagueEvents';
import { CardsMain } from '../../components/beetingcards/CardsMain';
import Pagination from '../../components/pagination/Pagination';
import Footer from '../../components/footer/footer';

const sportImages = {
    futbol,
    nba,
    lol,
    csgo,
    bets
};

const FilterHome = ({ darkMode, setStartMatchTimestamp }) => {
    const [viewMore, setViewMore] = useState(false);
    const [allLeagues, setAllLeagues] = useState({});
    const [currentLeagues, setCurrentLeagues] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSport, setSelectedSport] = useState('nba');
    const [activeTab, setActiveTab] = useState('Torneos');
    const [betactiveTab, setBetActiveTab] = useState('Popular');
    const [selectedLeague, setSelectedLeague] = useState(null);
    const [leagueEvents, setLeagueEvents] = useState([]);
    const [totalLeagues, setTotalLeagues] = useState(0);

    const leaguesPerPage = 12;

    useEffect(() => {
        fetchAllLeagues();
    }, []);

    useEffect(() => {
        if (allLeagues[selectedSport]) {
            const startIndex = (currentPage - 1) * leaguesPerPage;
            const endIndex = startIndex + leaguesPerPage;
            setCurrentLeagues(allLeagues[selectedSport].slice(startIndex, endIndex));
            setTotalLeagues(allLeagues[selectedSport].length);
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
                    headers: { 'Ocp-Apim-Subscription-Key': '01e1ae2db9b642229876fbd8527f4822' }
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
        futbol: 'Football',
        nba: 'NBA',
        lol: 'LoL',
        csgo: 'CS:GO',
        bets: 'Bets',
    };

    const filters = ['Torneos', 'En vivo', 'Calendario'];
    const betfilters = ['Popular', 'My Bets', 'Active'];

    const totalPages = Math.ceil(totalLeagues / leaguesPerPage);

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:ml-64 p-5 flex-1">
                <div className="mb-5">
                    <img src={sportImages[selectedSport]} alt={selectedSport} className="w-full h-56 md:h-64 object-cover object-center rounded-lg" />

                    <Sidebar setViewMore={setViewMore} setSelectedSport={handleSportChange} darkMode={darkMode} setSelectedLeague={handleLeagueSelection} />
                    <h2 className="text-3xl mt-3 flex items-center">
                        {!selectedLeague ? sportNames[selectedSport] : selectedLeague.Name}
                        {selectedLeague?.IconUrl && (
                            <img src={selectedLeague.IconUrl} alt={selectedLeague.Name} className="w-12 h-12 ml-3" />
                        )}
                    </h2>
                    {!selectedLeague && selectedSport !== "bets" && (
                        <div className="flex space-x-2 md:space-x-4 mt-3 overflow-auto">
                            {filters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => { setActiveTab(filter) }}
                                    className={`px-2 py-1 md:px-4 md:py-2 rounded-lg ${activeTab === filter ? 'border-b-4 border-primary dark:border-secundary' : ''}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {selectedSport === "bets" ? (
                    <div className="">
                        <div className="flex space-x-2 md:space-x-4 mt-3 mb-10 overflow-auto"> {betfilters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => {setBetActiveTab(filter) }}
                                className={`px-2 py-1 md:px-4 md:py-2 rounded-lg ${betactiveTab === filter ? 'border-b-4 border-primary' : ''}`}
                            >
                                {filter}
                            </button>
                        ))}
                        </div>
                        <div className='flex w-full overflow-x-scroll'>

                            <CardsMain darkMode={darkMode} setStartMatchTimestamp={setStartMatchTimestamp} filter={betactiveTab}/>
                        </div>
                    </div>

                ) : (
                    <>
                        {!selectedLeague && (
                            <h2 className="text-2xl mb-5">{activeTab}</h2>
                        )}
                        {activeTab === 'Torneos' && !selectedLeague && (
                            <div className='w-full flex flex-col'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                                <div className="flex flex-wrap justify-center gap-4 mt-5">
                                    {currentLeagues.map(league => (
                                        <div key={league.CompetitionId || league.TeamID}
                                            className="flex w-full sm:w-[45%] md:w-[30%] lg:w-[23%] h-20 items-center justify-start p-3 backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 rounded-lg cursor-pointer transition-colors hover:bg-secundary/60 hover:dark:bg-secundary/60"
                                            onClick={() => handleLeagueSelection(league)}>
                                            {league.WikipediaLogoUrl && (
                                                <img src={league.WikipediaLogoUrl} alt={league.Name || league.FullName} className="w-16 h-16 mr-3" />
                                            )}
                                            <span className="text-sm md:text-base lg:text-lg">{league.Name || league.FullName}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {selectedLeague && (
                            <>
                                <button
                                    onClick={() => setSelectedLeague(null)}
                                    className="mb-5 text-secundary dark:text-secundary focus:outline-none"
                                >
                                    Volver a ligas
                                </button>
                                <LeagueEvents league={selectedLeague} sport={selectedSport} />
                            </>
                        )}
                    </>
                )}
                <Footer></Footer>
            </div>
        </div>
    );
};


export default FilterHome;
