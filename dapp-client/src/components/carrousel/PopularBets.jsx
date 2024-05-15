import React, { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import md5 from "crypto-js/md5";

export default function PopularBets(selectedMatches) {
  const [match, setMatch] = useState(null);

  useEffect(() => {
    setMatch(selectedMatches?.selectedMatches);
  }, [selectedMatches]);

  function generateAvatar() {
    const randomString = Math.random().toString();
    const hashedIcon = md5(randomString).toString();
    return (
      <img
        src={`https://www.gravatar.com/avatar/${hashedIcon}?d=retro&f=y&s=128`}
        alt="Avatar"
        className="w-6 h-6 rounded-full"
      />
    );
  }

  return (
    <div>
      <div className=" overflow-hidden text-white h-[16rem]">
        <div className="relative h-[15rem] border-[1.5px] border-black/30 rounded-md shadow-md">
          <img
            src={match?.backgroundImage}
            className="absolute inset-0 w-full h-full object-cover filter contrast-[.8] blur-[2px]"
            alt="Estadio"
          />
          {match ? (
            <div className="absolute z-40 inset-0 flex items-center justify-between p-4">
              <div className="flex flex-col items-center">
                <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-full">
                  <img
                    src={match.team1Icon}
                    alt={match.team1}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs rounded-full px-1">
                    50%
                  </span>
                </div>
                <span className="text-white text-xs text-center mt-1">
                  {match.team1}
                </span>
              </div>
              <div className="flex flex-col items-center mx-2">
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-white w-16"></div>
                  <span className="mx-2 text-white text-sm bg-gray-800 px-2">VS</span>
                  <div className="border-t border-white w-16"></div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-full">
                  <img
                    src={match.team2Icon}
                    alt={match.team2}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs rounded-full px-1">
                    50%
                  </span>
                </div>
                <span className="text-white text-xs text-center mt-1">
                  {match.team2}
                </span>
              </div>
              <div
                className={
                  match.tipsterVote === "equipo1"
                    ? "absolute top-2 left-2 flex items-center flex-col"
                    : "absolute top-2 right-2 flex items-center flex-col"
                }
              >
                {generateAvatar()}
                <span className="text-xs mt-1">
                 BET
                </span>
              </div>
              <div className="absolute bottom-2 left-0 right-0 flex justify-around items-center w-full px-4">
                <div className="w-full flex justify-between items-center mt-2">
                  <button className="backdrop-blur-xl bg-purple-500 drop-shadow-sm text-white font-semibold text-sm shadow-sm shadow-black/10 w-2/5 h-[2.3rem] rounded-lg hover:bg-indigo-100 transition ease-in-out hover:scale-105 duration-100 hover:text-black">
                    BET {match.oddsTeam1}x
                  </button>
                  <button className="backdrop-blur-xl bg-purple-500 drop-shadow-sm text-white font-semibold text-sm shadow-sm shadow-black/10 w-2/5 h-[2.3rem] rounded-lg hover:bg-indigo-100 transition ease-in-out hover:scale-105 duration-100 hover:text-black">
                    BET {match.oddsTeam2}x
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
