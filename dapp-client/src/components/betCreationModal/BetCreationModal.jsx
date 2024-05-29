// src/components/BetCreationModal.jsx

import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const BetCreationModal = ({ isOpen, onRequestClose, event, teamLogos }) => {
    const [betType, setBetType] = useState('');
    const [amount, setAmount] = useState('');
    const [maxBet, setMaxBet] = useState('');
    const [currency, setCurrency] = useState('ETH');
    const [potentialWin, setPotentialWin] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle bet creation
        console.log(`Bet created for event ${event.GameID} with amount: ${amount}, bet type: ${betType}, potential win: ${potentialWin}`);
        onRequestClose();
    };

    const betOptions = [
        { label: 'Match Winner', value: 'winner' },
        { label: `Home Team Points (${event.HomeTeam})`, value: 'homeTeamPoints' },
        { label: `Away Team Points (${event.AwayTeam})`, value: 'awayTeamPoints' },
        { label: `Home Team Money Line (${event.HomeTeamMoneyLine})`, value: 'homeTeamMoneyLine' },
        { label: `Away Team Money Line (${event.AwayTeamMoneyLine})`, value: 'awayTeamMoneyLine' },
        { label: `Point Spread (${event.PointSpread})`, value: 'pointSpread' },
    ];

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Bet"
            className="modal-content transition duration-300 transform dark:bg-gray-800 dark:text-white"
            overlayClassName="modal-overlay transition duration-300"
            closeTimeoutMS={300}
        >
            <h2 className="text-2xl mb-7">Create P2P Bet</h2>
            <div className="flex justify-between h-16 items-center bg-black/20 dark:bg-white/20 rounded-full mb-4">
                <div className="flex items-center justify-center w-[33.33%]">
                    <span className="font-bold">{event.HomeTeam || event.HomeTeamName}</span>
                </div>
                <div className="flex justify-center w-[33.33%]">
                    <img src={teamLogos[event.HomeTeam || event.HomeTeamName]} alt={event.HomeTeam || event.HomeTeamName} className="w-12 h-12 mr-2" />
                    <span className="text-lg font-semibold mx-3 mt-2">vs</span>
                    <img src={teamLogos[event.AwayTeam || event.AwayTeamName]} alt={event.AwayTeam || event.AwayTeamName} className="w-12 h-12 mr-2" />
                </div>
                <div className="flex items-center justify-center w-[33.33%]">
                    <span className="font-bold">{event.AwayTeam || event.AwayTeamName}</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Bet Type</label>
                    <select
                        value={betType}
                        onChange={(e) => setBetType(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    >
                        {betOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex grid grid-cols-2 gap-10 w-full ">
                    <div className="">
                        <label className="block mb-2">Amount</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="">
                        <label aria-required className="block mb-2">Max Bet Amount</label>
                        <input
                            type="number"
                            value={maxBet}
                            onChange={(e) => setMaxBet(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Currency</label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            <option value="ETH">ETH</option>
                            <option value="BTC">BTC</option>
                            <option value="USD">USD</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Potential Win</label>
                        <input
                            type="number"
                            value={potentialWin}
                            onChange={(e) => setPotentialWin(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="mt-8 px-4 py-2 w-32 bg-green-500 text-white rounded">Create</button>
            </form>
        </Modal>
    );
};

export default BetCreationModal;
