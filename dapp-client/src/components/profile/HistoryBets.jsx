import React, { useState } from 'react';

const HistoryBets = () => {
  const bets = [
    // Ejemplos
    { date: '2024-06-02', amount: 0.5, result: 'Loss', txHash: '0xDef1C0ded9bec7F1a1670819833240f027b25EfF' },
    { date: '2024-06-20', amount: 2.5, result: 'Win', txHash: '0xcec73B0d20e93179CCDAA1d69fEf1d137F45D8a1' },
    { date: '2024-07-02', amount: 1.5, result: 'Win', txHash: '0xDef1C0ded9bec7F1a1670819833240f027b25EfF' },
    { date: '2024-08-07', amount: 10.5, result: 'In Game', txHash: '0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555' },
    { date: '2024-08-02', amount: 10.5, result: 'In Game', txHash: '0xdf99A0839818B3f120EBAC9B73f82B617Dc6A555' },
  ];

  const [selectedOption, setSelectedOption] = useState("Date");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  let filteredBets = bets.filter(bet => {
    if (selectedOption === "Date") return true;
    if (selectedOption === "Won") return bet.result === 'Win';
    if (selectedOption === "Lost") return bet.result === 'Loss';
    if (selectedOption === "In Game") return bet.result === 'In Game';
    // Añade aquí más condiciones si es necesario
  });

  if (selectedOption === "Date") {
    filteredBets = filteredBets.reverse();
  }

  return (
    <div className="p-8 transform hover:scale-105 transition duration-300 shadow-xl rounded-lg intro-y backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl">
      <div className="grid w-auto grid-cols-4  rounded-xl p-1 ">
        {["Date","Won", "Lost", "In Game"].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="option"
              id={option}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="peer hidden"
            />
            <label
              htmlFor={option}
              className={`block cursor-pointer select-none rounded-xl p-2 text-center ${
                selectedOption === option
                  ? "transition-background rounded-md border border-gray-800 bg-gradient-to-r from-gray-100 via-[#c7d2fe] to-[#8678f9] bg-[length:200%_200%] bg-[0%_0%] font-medium text-gray-950 duration-500 hover:bg-[100%_200%] focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-50"
                  : ""
              }`}
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <div className="shadow-xl rounded-xl backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl w-full">
                <h1 className=" text-4xl font-bold px-2">History Bets</h1>
                <ul className="divide-y divide-gray-700">
                  {filteredBets.map((bet, index) => (
                    <li key={index} className="py-8">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className=" font-semibold  px-3">Date: {bet.date}</p>
                          <p className=" px-3">Amount: {bet.amount} ETH</p>
                        </div>
                        <div>
                          <p className={`font-bold ${bet.result === 'Win' ? 'text-green-500' : bet.result === 'Loss' ? 'text-red-500' : 'text-slate-400'}`}>
                            {bet.result}
                          </p>
                          <a
                            href={`https://etherscan.io/tx/${bet.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:text-purple-900 transition duration-300"
                          >
                            View Etherscan
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBets;
