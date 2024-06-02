import React, { FC, useRef, useState, useEffect } from "react";
import axios from "axios";
import { CardMatch } from "./CardBet";
import CardSkeleton from "./CardSkeleton"; // Importa el nuevo componente de carga
import { useContracts } from "../../hooks/useContracts";
import { MD5 } from "crypto-js";

interface CardsMainProps {
    darkMode: boolean;
    filter: string,
}

interface Team {
    name: string;
    logo: string;
    odd: number;
}

interface Bet {
    id: string;
    tipster: string;
    image: string;
    winCondition: string;
    maxBet: string;
    eventDate: string;
    maxEntryFee: number;
    points: string;
    comparator: string;
    limit: number;
    maxNumberOfChallengers: number;
    challengers: Array<string>;
    dataBet: Array<number>;
    team1: Team;
    team2: Team;
    odds: number;
    isOngoing: boolean;
}

const defaultLogoUrl = "https://via.placeholder.com/150";

export const CardsMain: FC<CardsMainProps> = ({ darkMode, filter }) => {
    const { contracts, web3, setStartMatchTimestamp } = useContracts();
    const [matches, setMatches] = useState<Bet[]>([]);
    const [teamLogos, setTeamLogos] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(true); // Estado de carga
    const [filters, setFilters] = useState('Popular')

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

    const fetchEventData = async (eventID: number) => {
        try {
            const season = new Date().getFullYear();
            const response = await axios.get(`/api/sportsdata/v3/nba/scores/json/Games/${season}`, {
                headers: { 'Ocp-Apim-Subscription-Key': '01e1ae2db9b642229876fbd8527f4822' }
            });
            const event = response.data.find(ev => ev.GameID === eventID);
            return event || {};
        } catch (error) {
            console.error('Error fetching event data:', error);
            return {};
        }
    };

    useEffect(() => {
        fetchNBATeamLogos();
    }, []);

    useEffect(() => {
        const fetchBets = async () => {
            setLoading(true); // Inicia la carga
            try {
                const numberOfBets = await contracts.p2pBetting.methods.getNumberOfBets().call();
                const bets: Bet[] = [];

                for (let i = 0; i < numberOfBets; i++) {
                    const bet = await contracts.p2pBetting.methods.getBet(i).call();
                    if (bet) {
                        const event = await fetchEventData(parseInt(bet[1], 10));
                        console.log(bet, "CLAUDIAAAA");

                        const team1 = {
                            name: event.HomeTeam || "Unknown",
                            logo: teamLogos[event.HomeTeam] || defaultLogoUrl,
                            odd: Number(bet[10]) || 0
                        };
                        const team2 = {
                            name: event.AwayTeam || "Unknown",
                            logo: teamLogos[event.AwayTeam] || defaultLogoUrl,
                            odd: Number(bet[11]) || 0
                        };
                        const randomString = Math.random().toString();
                        const hash = MD5(randomString).toString();

                        const newBet: Bet = {
                            id: bet[0] ? bet[0].toString() : '0',
                            tipster: bet[2],
                            image: `https://www.gravatar.com/avatar/${hash}?d=retro&f=y&s=128`, // Placeholder image
                            winCondition: String(bet.betData[0]) === '0' ? 'Final result' : `Goals/Points`,
                            points: bet.betData[3] ? String(bet.betData[3]) : '',
                            comparator: bet.betData[2] !== undefined ? Number(bet.betData[2]) === 0 ? 'Exactly' : Number(bet.betData[2]) === 1 ? 'Greater than' : 'Less than' : '',
                            maxBet: bet[3] ? `${web3.utils.fromWei(bet[3].toString(), 'ether')} ETH` : '0 ETH',
                            limit: Number(bet[5]) || 0,
                            team1,
                            team2,
                            maxEntryFee: bet.maxEntryFee,
                            eventDate: event.DateTime,
                            maxNumberOfChallengers: bet.maxNumberOfChallengers,
                            challengers: bet.challengers,
                            dataBet: bet.betData.map((each) => Number(each)),
                            odds: Number(bet.odds) / 1000 || 0,
                            isOngoing: bet.startMatchTimestamp
                        };
                        bets.push(newBet);
                    } else {
                        console.error('Invalid bet data:', bet);
                    }
                }

                setMatches(bets);
                setLoading(false); // Termina la carga
            } catch (error) {
                console.error("Error fetching bets:", error);
                setLoading(false); // Termina la carga en caso de error
            }
        };

        fetchBets();
    }, [contracts, web3, teamLogos]);

    return (
        <div className='w-full mb-5'>
            <div className='flex flex-wrap w-full gap-10 overflow-x-scroll scroll-invisible justify-center'>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <CardSkeleton key={index} />
                    ))
                ) : (
                    matches.map((match, index) => (
                        <CardMatch key={index} matchData={match} darkMode={darkMode} setStartMatchTimestamp={setStartMatchTimestamp} filter={filter}/>
                    ))
                )}
            </div>
        </div>
    );
};
