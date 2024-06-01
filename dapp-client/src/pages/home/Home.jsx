import React from "react";
import { CardsMain } from "../../components/beetingcards/CardsMain";
import FirstComponent from "../../components/firstComponent/FirstComponent";
import WelcomePlay from "../../components/PlayInvitation/WelcomePlay";

const Home = ({ darkMode, setStartMatchTimestamp }) => {
  return (
    <div
      className={`w-full pt-1 flex flex-col items-center justify-center space-y-48 ${darkMode ? "dark-mode-class" : ""
        }`}
    >
      <div className="mt-[7rem] w-full flex flex-col items-center space-y-48">
        <FirstComponent />
        <WelcomePlay />
      </div>
      <h1 className="text-4xl font-bold mt-6 md:mt-0 md:text-7xl">
        <span className="font-bold text-red-600">Trending Bets 🔥</span>  
      </h1>
      <div className=" lg:w-[90%]  mb-8">
        <CardsMain setStartMatchTimestamp={setStartMatchTimestamp} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default Home;
