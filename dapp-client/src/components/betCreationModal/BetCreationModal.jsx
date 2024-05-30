import React, { useState } from 'react';
import Modal from 'react-modal';
import { useContracts } from '../../hooks/useContracts';

Modal.setAppElement('#root');

const BetCreationModal = ({ isOpen, onRequestClose, event, teamLogos }) => {
    const { contracts, account, web3 } = useContracts();
    const [betType, setBetType] = useState('0');
    const [betScope, setBetScope] = useState('0');
    const [comparator, setComparator] = useState('0');
    const [points, setPoints] = useState('');
    const [amount, setAmount] = useState('');
    const [potentialWin, setPotentialWin] = useState('');
    const [maxNumberOfChallengers, setMaxNumberOfChallengers] = useState('');
    const [odds, setOdds] = useState('');
    const [maxEntryFee, setMaxEntryFee] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const weiAmount = web3.utils.toWei(amount, 'ether');
            const weiPotentialWin = web3.utils.toWei(potentialWin, 'ether');
            const weiMaxEntryFee = web3.utils.toWei(maxEntryFee, 'ether');

            let betDetails = [parseInt(betType), parseInt(betScope)];
            if (betType === '1') {
                betDetails.push(parseInt(comparator), parseInt(points));
            }

            console.log('Bet details:', betDetails); // Línea de depuración

            await contracts.p2pBetting.methods.createBet(
                event.GameID,
                parseInt(maxNumberOfChallengers),
                parseInt(odds),
                weiMaxEntryFee,
                betDetails
            ).send({ from: account, value: weiAmount });

            console.log(`Bet created for event ${event.GameID} with amount: ${amount}, bet details: ${betDetails}, potential win: ${potentialWin}`);
            onRequestClose();
        } catch (error) {
            console.error('Error creating bet:', error);
        }
    };

    const betTypeOptions = [
        { label: 'Match Winner/Loser/Draw', value: '0' },
        { label: 'Goals/Points', value: '1' }
    ];

    const betScopeOptions = [
        { label: 'Home Team', value: '0' },
        { label: 'Away Team', value: '1' },
        { label: 'Sum of Points', value: '2' },
        { label: 'Point Difference', value: '3' },
        { label: 'Both Teams', value: '4' }
    ];

    const comparatorOptions = [
        { label: 'Greater than', value: '0' },
        { label: 'Less than', value: '1' },
        { label: 'Equal to', value: '2' }
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
                        {betTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Bet Scope</label>
                    <select
                        value={betScope}
                        onChange={(e) => setBetScope(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    >
                        {betScopeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                {betType === '1' && (
                    <>
                        <div className="mb-4 w-full">
                            <label className="block mb-2">Comparator</label>
                            <select
                                value={comparator}
                                onChange={(e) => setComparator(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            >
                                {comparatorOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4 w-full">
                            <label className="block mb-2">Points</label>
                            <input
                                type="number"
                                value={points}
                                onChange={(e) => setPoints(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    </>
                )}
                <div className="mb-4 w-full">
                    <label className="block mb-2">Max Number of Challengers</label>
                    <input
                        type="number"
                        value={maxNumberOfChallengers}
                        onChange={(e) => setMaxNumberOfChallengers(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Odds</label>
                    <input
                        type="number"
                        value={odds}
                        onChange={(e) => setOdds(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Max Entry Fee (ETH)</label>
                    <input
                        type="number"
                        value={maxEntryFee}
                        onChange={(e) => setMaxEntryFee(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="flex grid grid-cols-2 gap-10 w-full ">
                    <div className="">
                        <label className="block mb-2">Amount (ETH)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block mb-2">Potential Win (ETH)</label>
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
