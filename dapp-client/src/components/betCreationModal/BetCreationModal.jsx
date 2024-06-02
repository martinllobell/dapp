import React, { useState, useEffect } from 'react';
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
    const [odds, setOdds] = useState(1.00);
    const [maxEntryFee, setMaxEntryFee] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    useEffect(() => {
        if (amount && odds) {
            const potentialWinCalculated = (parseFloat(amount) * parseFloat(odds)).toFixed(4);
            setPotentialWin(potentialWinCalculated);
        }
    }, [amount]);

    useEffect(() => {
        if (potentialWin && odds) {
            const amountCalculated = (parseFloat(potentialWin) / parseFloat(odds)).toFixed(4);
            setAmount(amountCalculated);
        }
    }, [potentialWin, odds]);


    const handleAmountChange = (e) => {
        let value = e.target.value;
        // Reemplaza comas con puntos
        value = value.replace(',', '.');

        // Verifica si el valor es un número y convierte a float
        let numericValue = parseFloat(value);

        if (isNaN(numericValue) || numericValue < 0.01) {
            numericValue = 0.01;
        }

        setAmount(numericValue.toFixed(4));
    }

    const handlePotentialWinChange = (e) => {
        const value = e.target.value;
        // Reemplaza comas con puntos
        value = value.replace(',', '.');

        // Verifica si el valor es un número y convierte a float
        let numericValue = parseFloat(value);

        if (isNaN(numericValue) || numericValue < 0.01) {
            numericValue = 0.01;
        }

        setPotentialWin(numericValue.toFixed(4));
    };

    const handleEntryFee = (e) => {
        let value = e.target.value;
        // Reemplaza comas con puntos
        value = value.replace(',', '.');

        // Verifica si el valor es un número y convierte a float
        let numericValue = parseFloat(value);

        if (isNaN(numericValue) || numericValue < 0.01) {
            numericValue = 0.01;
        }

        setMaxEntryFee(numericValue.toFixed(4));
    };

    const handleOddsChange = (e) => {
        const value = e.target.value;

        // Validación: Solo permitir números y un punto decimal
        const regex = /^[0-9]*\.?[0-9]{0,2}$/;
        if (regex.test(value)) {
            const numericValue = parseFloat(value);
            setOdds(numericValue < 1.00 ? '1.00' : value);

        }
    };

    const handlePointsChange = (e) => {
        if (e >= 1) {
            setPoints(e);
        } else {
            setPoints(1);
        }
    };

    const handleChallengerNumbers = (e) => {
        if (e >= 1) {
            setMaxNumberOfChallengers(e);
        } else {
            setMaxNumberOfChallengers(1);
        }
    };

    useEffect(() => {
        // Desactiva el botón si faltan datos
        const isFormValid =
            parseFloat(amount) > 0 &&
            parseFloat(potentialWin) > 0 &&
            parseFloat(maxEntryFee) >= 0.01 &&
            parseInt(maxNumberOfChallengers) >= 1 &&
            parseFloat(odds) > 1.00 &&
            (betType === '0' || (betType === '1' && points >= 1));

        setIsSubmitDisabled(!isFormValid);
    }, [amount, potentialWin, maxEntryFee, maxNumberOfChallengers, odds, betType, comparator, points]);


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

            await contracts.p2pBetting.methods.createBet(
                event.GameID,
                parseInt(maxNumberOfChallengers),
                parseInt(odds) * 1000,
                weiMaxEntryFee,
                betDetails
            ).send({ from: account, value: weiAmount });

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
        { label: `Home Team (${event.HomeTeam})`, value: '0' },
        { label: `Away Team (${event.AwayTeam})`, value: '1' },
        { label: 'Draw', value: '2' },
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
            className="p-6 rounded-xl transition duration-300 transform max-h-[90vh] flex flex-col text-white font-medium overflow-y-auto bg-indigo-900/20 dark:bg-white/10 shadow-sm transition-colors backdrop-blur-xl shadow-xl drop-shadow-xl"
            overlayClassName="modal-overlay transition duration-300"
            closeTimeoutMS={300}
        >
            <h2 className="text-2xl mb-6">Create P2P Bet</h2>
            <div className="flex flex-col justify-between p-2 items-center bg-black/10 dark:bg-white/10 rounded-xl mb-4">
                <div className='flex items-center gap-2 '>
                    <p>{event.DateTime.split('T')[0].split('-').join('/')}</p>
                    <p>{event.DateTime.split('T')[1].slice(0, 5)}hs</p>
                </div>
                <div className="flex justify-center gap-2 w-full items-center rounded-full">
                    <div className="flex items-center justify-center">
                        <img src={teamLogos[event.HomeTeam || event.HomeTeamName]} alt={event.HomeTeam || event.HomeTeamName} className="w-12 h-12 mr-2" />
                    </div>
                    <div className="flex justify-center w items-center">
                        <span className="font-bold">{event.HomeTeam || event.HomeTeamName}</span>
                        <span className="text-lg font-semibold mx-3">vs</span>
                        <span className="font-bold">{event.AwayTeam || event.AwayTeamName}</span>
                    </div>
                    <div className="flex items-center justify-center ">
                        <img src={teamLogos[event.AwayTeam || event.AwayTeamName]} alt={event.AwayTeam || event.AwayTeamName} className="w-12 h-12 mr-2" />
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Bet Type</label>
                    <select
                        value={betType}
                        onChange={(e) => setBetType(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
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
                        className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                        required
                    >
                        {betScopeOptions.map((option, index) => (betType === '0' ? index < 3 &&
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option> : option.label !== 'Draw' &&
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
                                className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
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
                                onChange={(e) => handlePointsChange(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
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
                        onChange={(e) => handleChallengerNumbers(e.target.value)}
                        className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Odds</label>
                    <input
                        type="number"
                        step="0.01"
                        value={odds}
                        onChange={handleOddsChange}
                        className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="mb-4 w-full">
                    <label className="block mb-2">Max Entry Fee (ETH)</label>
                    <input
                        type="number"
                        value={maxEntryFee}
                        onChange={handleEntryFee}
                        className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                        required
                    />
                </div>
                <div className="flex grid grid-cols-2 gap-10 w-full ">
                    <div className="">
                        <label className="block mb-2">Amount (ETH)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={handleAmountChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                    <div className="">
                        <label className="block mb-2">Potential Win (ETH)</label>
                        <input
                            type="number"
                            value={potentialWin}
                            onChange={handlePotentialWinChange}
                            className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-500 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className={`mt-8 px-4 py-2 w-32 ${isSubmitDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'} text-white rounded`}
                    disabled={isSubmitDisabled}
                >
                    Create
                </button>
            </form>
        </Modal>
    );
};

export default BetCreationModal;
