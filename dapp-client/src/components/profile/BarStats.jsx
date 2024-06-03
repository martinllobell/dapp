import { useState } from "react";
import CountUp from "react-countup";

const TotalBetsCard = () => {
  const [hasBet, setHasBet] = useState(true);

  const sessions = hasBet
    ? [
        {
          label: "Wins",
          size: 60,
          color: "bg-green-700",
        },
        {
          label: "Loss",
          size: 30,
          color: "bg-red-500",
        },
        {
          label: "In Game",
          size: 10,
          color: "bg-gray-400",
        },
      ]
    : [];

  return (
    <div className={`p-2 py-[3rem] flex-col justify-center items-center h-full transform hover:scale-105 transition duration-300 shadow-xl rounded-lg intro-y backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl ${hasBet ? "" : "opacity-50"}`}>
      {hasBet ? (
        <div className="w-full p-4 rounded-lg">
          <div className="pb-1 lg:pb-1">
            <h3 className="text-xxl font-bold">My Bets</h3>
          </div>
          <div className="pb-1 lg:pb-14">
            <h4 className="text-xl text-gray-400">
              Total:
              <CountUp end={150} />
            </h4>
          </div>
          <div className="pb-4 lg:pb-6">
            <div className="overflow-hidden rounded-full h-3 bg-gray-700 flex w-full">
              {sessions.map((session, index) => (
                <div
                  key={index}
                  className={`${session.color}`}
                  style={{ width: `${session.size}%` }}
                ></div>
              ))}
            </div>
          </div>
          <div className="flex -mx-4">
            {sessions.map((session, index) => (
              <div
                key={index}
                className={`w-1/3 px-4 ${index !== 0 ? "border-l border-gray-700" : ""}`}
              >
                <div className="text-sm">
                  <span
                    className={`${session.color} inline-block w-2 h-2 rounded-full mr-1 align-middle`}
                  ></span>
                  <span className="align-middle">{session.label}</span>
                </div>
                <div className="font-medium text-lg">
                  <CountUp end={session.size} />%
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center brightness-50 font-bold text-xl">No bets have been placed yet</div>
      )}
    </div>
  );
};

export default TotalBetsCard;
