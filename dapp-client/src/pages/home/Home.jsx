import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./styles.module.scss"

export default function Home() {
  const [matches, setMatches] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/matchess');
        setMatches(response.data.matches);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={darkMode ? styles.homeDark : styles.home}>
      <h1>Partidos en Vivo</h1>
      {matches.map(match => (
        <div key={match.id}>
          <h2>{match.homeTeam.name} vs {match.awayTeam.name}</h2>
          <p>{match.status}</p>
          {/* Agrega más información del partido según tus necesidades */}
        </div>
      ))}
    </div>
  );
};
