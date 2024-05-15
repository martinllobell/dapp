import soccer from "../../assets/images/soccer.jpg";
import basket from "../../assets/images/basket.webp";
import rift from "../../assets/images/rift.webp";

// Importa los SVG de los equipos desde el directorio correcto
import barcelonaIcon from "../../assets/teamstestsvg/fc_barcelona.svg";
import realMadridIcon from "../../assets/teamstestsvg/realmadrid.svg";
import lakersIcon from "../../assets/teamstestsvg/losangeleslakers1.svg";
import celticsIcon from "../../assets/teamstestsvg/boston_celtics_1.svg";
import fnaticIcon from "../../assets/teamstestsvg/fnatic.svg";
import t1Icon from "../../assets/teamstestsvg/fnatic.svg"; // Suponiendo que "logo.svg" corresponde a T1

export const soccerMatches = {
  id: 1,
  team1: "FC Barcelona",
  team2: "Real Madrid",
  oddsTeam1: 2.5,
  oddsTeam2: 1.8,
  backgroundImage: soccer,
  tipsterVote: "equipo1",
  team1Icon: barcelonaIcon,
  team2Icon: realMadridIcon,
};

export const basketballMatches = {
  id: 1,
  team1: "Los Angeles Lakers",
  team2: "Boston Celtics",
  oddsTeam1: 1.7,
  oddsTeam2: 2.2,
  backgroundImage: basket,
  tipsterVote: "equipo2",
  team1Icon: lakersIcon,
  team2Icon: celticsIcon,
};

export const lolMatches = {
  id: 1,
  team1: "T1",
  team2: "Fnatic",
  oddsTeam1: 1.9,
  oddsTeam2: 2.0,
  backgroundImage: rift,
  tipsterVote: "equipo1",
  team1Icon: t1Icon,
  team2Icon: fnaticIcon,
};
