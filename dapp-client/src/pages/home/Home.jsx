import React from "react";
import { CardsMain } from "../../components/beetingcards/CardsMain";
import FirstComponent from "../../components/firstComponent/FirstComponent";
import WelcomePlay from "../../components/PlayInvitation/WelcomePlay";
import PowerBy from "../../components/poweredby/PoweredBy";

const Home = ({ darkMode, setStartMatchTimestamp }) => {
  return (
    <div
      className={`w-full pt-1 flex flex-col items-center justify-center space-y-40 ${
        darkMode ? "dark-mode-class" : ""
      }`}
    >
      <div className="mt-[7rem] w-full flex flex-col items-center space-y-28">
        <FirstComponent />
        <WelcomePlay />
      </div>
      <div className=" lg:w-[90%]  mb-8">
        <div className="relative flex flex-col my-6 md:mx-10 mx-6 gap-4">
          <h1 className="text-3xl 2xl:text-5xl font-semibold">
            Top
            <span className="text-red-600"> Trending </span>
            Bets!
          </h1>
          <span className="md:text-lg 2xl:text-2xl mx-auto leading-relaxed">
            <span className="text-yellow-500 font-semibold">
              Get in the Action:{" "}
            </span>
            Don't Miss Out on the Most Exciting Bets of the Day! See What's
            Trending Now Down Bellow 👇
          </span>
          <CardsMain
            setStartMatchTimestamp={setStartMatchTimestamp}
            darkMode={darkMode}
          />
          <PowerBy />
        </div>
      </div>
    </div>
  );
};

export default Home;
