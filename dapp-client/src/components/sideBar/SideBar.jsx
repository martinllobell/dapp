import React, { useState } from "react";
import Search from "../searchBar/Search";

const leagues = {
  futbol: [
    { CompetitionId: 1, Name: "Premier League" },
    { CompetitionId: 2, Name: "La Liga" },
    { CompetitionId: 3, Name: "Serie A" },
    { CompetitionId: 4, Name: "Ligue 1" },
    { CompetitionId: 5, Name: "Bundesliga" },
  ],
  nba: [
    {
      TeamID: 1,
      Name: "Lakers",
      IconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/3c/Los_Angeles_Lakers_logo.svg",
    },
    {
      TeamID: 2,
      Name: "Warriors",
      IconUrl:
        "https://upload.wikimedia.org/wikipedia/en/0/01/Golden_State_Warriors_logo.svg",
    },
    {
      TeamID: 3,
      Name: "Bulls",
      IconUrl:
        "https://upload.wikimedia.org/wikipedia/en/6/67/Chicago_Bulls_logo.svg",
    },
    {
      TeamID: 4,
      Name: "Celtics",
      IconUrl:
        "https://upload.wikimedia.org/wikipedia/en/8/8f/Boston_Celtics.svg",
    },
    {
      TeamID: 5,
      Name: "Nets",
      IconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Brooklyn_Nets_newlogo.svg",
    },
  ],
  lol: [],
  csgo: [],
};

const Sidebar = ({
  setViewMore,
  setSelectedSport,
  darkMode,
  setSelectedLeague,
}) => {
  const [isExpanded, setIsExpanded] = useState({
    futbol: false,
    nba: false,
    lol: false,
    csgo: false,
  });

  const toggleExpand = (sport) => {
    setIsExpanded({
      futbol: false,
      nba: false,
      lol: false,
      csgo: false,
      [sport]: !isExpanded[sport],
    });
  };

  const handleSportSelection = (sport) => {
    setViewMore(false);
    setIsExpanded({
      futbol: false,
      nba: false,
      lol: false,
      csgo: false,
      [sport]: !isExpanded[sport],
    });
  };

  const handleLeagueSelection = (league) => {
    setSelectedLeague(league);
  };

  return (
    <div
      className={`w-64 h-screen fixed ${
        darkMode ? "bg-gray-900" : "bg-indigo-400/40"
      } backdrop-blur-xl drop-shadow-xl p-5`}
    >
      <div className="mt-[5rem] mb-4">
        <Search />
      </div>
      <h2 className="text-white text-sm mb-8">Juegos</h2>
      <div className="space-y-4">
        {Object.keys(leagues).map((sport) => (
          <div key={sport}>
            <button
              className="flex items-center p-2 bg-indigo-200 dark:bg-gray-700 rounded hover:bg-gray-600 w-full"
              onClick={() => setSelectedSport(sport)}
            >
              <span>{sport.charAt(0).toUpperCase() + sport.slice(1)}</span>
              <span
                className="ml-auto"
                onClick={() => handleSportSelection(sport)}
              >
                {isExpanded[sport] ? "-" : "+"}
              </span>
            </button>
            {isExpanded[sport] && (
              <div className="space-y-2 mt-2">
                {leagues[sport].slice(0, 5).map((league) => (
                  <div
                    key={league.CompetitionId || league.TeamID}
                    className="flex items-center p-2 bg-gray-300 dark:bg-gray-700 rounded cursor-pointer"
                    onClick={() => handleLeagueSelection(league)}
                  >
                    {league.IconUrl && (
                      <img
                        src={league.IconUrl}
                        alt={league.Name}
                        className="w-6 h-6 mr-3"
                      />
                    )}
                    <span>{league.Name}</span>
                  </div>
                ))}
                <button
                  className="text-blue-500 hover:underline"
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
