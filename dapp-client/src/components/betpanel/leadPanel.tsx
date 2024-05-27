import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTrayStore } from '../../store/useTrayStore';

type Props = {
}

const leadTitle = {
    1: '',
    2: 'Doubles',
    3: 'Triples',
    4: 'Fours',
    5: 'Fives',
    6: 'Sixs',
    7: 'Sevens',
    8: 'Eights',
    9: 'Nines',
    10: 'Tens',
    11: 'Somes',
}

export default function LeadPanel({ }: Props) {
    const [openInput, setOpenInput] = useState<boolean>(false);
    const [showSelections, setShowSelections] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<{ value: string, gains: string }>({ value: "$", gains: '' });
    const [inputValues, setInputValues] = useState<{ [id: string]: { value: string, gains: string } }[]>([]);
    const [shake, setShake] = useState<boolean>(false);
    const inputRef = useRef<HTMLDivElement>(null);
    const inputValueRef = useRef(inputValue);
    const { store, removeTray, removeTrays } = useTrayStore();
    useEffect(() => {
        inputValueRef.current = inputValue;
    }, [inputValue]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && inputValueRef.current === '$' && !inputRef.current.contains(event.target as Node)) {
                setOpenInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [inputRef]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        // Remove any character that is not a digit or comma
        value = value.replace(/[^\d,]/g, '');

        // Add the dollar sign at the beginning
        if (value !== '') {
            value = '$' + value;
        } else {
            value = '$';
        }

        // Format the number
        let formattedValue = formatNumber(value);

        // Check if the number exceeds 10,000,000
        if (parseFloat(formattedValue.replace(/[,$.]/g, '')) > 999999999) {
            formattedValue = '$999.999.999';
        }

        setInputValue({ value: formattedValue, gains: calculateAndFormat(formattedValue, store.totalGains) });
    };


    const formatNumber = (value: string) => {
        // Remove the dollar sign for formatting
        let numberValue = value.replace('$', '');

        // Replace commas with dots for uniformity
        numberValue = numberValue.replace(',', '.');

        // Split the number into integer and decimal parts
        let parts = numberValue.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Limit decimal part to two digits
        if (parts[1]) {
            parts[1] = parts[1].substring(0, 4);
        }

        // Join integer and decimal parts with a comma if there's a decimal part
        numberValue = parts.join(',');

        // Add the dollar sign back
        return '$' + numberValue;
    };

    function calculateAndFormat(moneyString, exponent) {
        // Elimina los caracteres no numéricos, excepto la coma decimal
        let cleanedString = moneyString.replace(/[^0-9,]/g, '');

        // Reemplaza la coma decimal por un punto decimal
        cleanedString = cleanedString.replace(',', '.');

        // Convierte el string a un número
        let base = parseFloat(cleanedString);

        // Calcula el resultado de elevar la base al exponente
        let result = base * exponent;

        // Multiplica el resultado por 10,000
        let finalResult = result;

        // Formatea el resultado en el mismo formato que el dinero original
        let formattedResult = finalResult.toLocaleString(undefined, {
            style: 'currency',
            currency: 'ETH'
        });

        // Devuelve el resultado final
        return formattedResult;
    }

    const handleInputValues = (id: string, e: React.ChangeEvent<HTMLInputElement>, gain: number) => {
        let value = e.target.value;

        // Remove any character that is not a digit or comma
        value = value.replace(/[^\d,]/g, '');

        // Add the dollar sign at the beginning
        if (value !== '') {
            value = '$' + value;
        } else {
            value = '$';
        }

        // Format the number
        let formattedValue = formatNumber(value);

        // Check if the number exceeds 10,000,000
        if (parseFloat(formattedValue.replace(/[,$.]/g, '')) > 999999999) {
            formattedValue = '$999.999.999';
        }

        setInputValues({ ...inputValues, [id]: { value: formattedValue, gains: calculateAndFormat(formattedValue, gain) } });
    };

    const handleSubmit = () => {
        if (inputValue.value === '$') {
            setShake(true);
            setTimeout(() => setShake(false), 500); // Reset shake after animation duration
        }
    };

    useEffect(() => {
        if (store.tray.length < 2) setShowSelections(false)
        // Código para ejecutar cuando el componente se monta o actualiza
    }, [store]);

    const getTotalGains = () => {
        let total = 0;
        let combined = Number(inputValue.gains.split(' ')[0].replace(/\./g, '').replace(',', '.'))

        Object.values(inputValues).forEach(({ gains }) => {
            // Eliminar el signo de dólar y formatear el número para convertirlo a un valor numérico
            const numericValue = Number(gains.split(' ')[0].replace(/\./g, '').replace(',', '.'));

            // Solo agregar el valor si es un número válido
            if (!isNaN(numericValue)) {
                total += numericValue;
            }
        });

        total += (combined || 0)

        // Formatear el resultado como un string con el formato de moneda
        return formatNumber(total.toString())
    };

    return (
        store.tray.length ?
            <div className='fixed bottom-0 lg:bottom-12 text-gray-200 start-1/2 transform -translate-x-1/2 w-full sm:w-2/3 lg:w-2/5 min-h-32 z-50 grid grid-cols-2 flex overflow-hidden'>
                <div className='col-span-2 bg-black/80 w-full flex sm:rounded-t-lg flex flex-col max-h-80'>
                    {store.tray.length > 1 && showSelections &&
                        <div className='w-full flex flex-row justify-between items-center p-2 whitespace-nowrap col-span-2 '>
                            <div className='flex'>
                                <h2 className='font-medium text-xl'>Selections</h2>
                                <p className='relative -top-1 bg-primary rounded-2xl w-4 h-4 text-xs text-center'>{store.tray.length}</p>
                            </div>
                            {store.tray.length > 1 &&
                                <div className='flex gap-2 items-center'>
                                    {store.availableMoney &&
                                        <div className='flex flex-col items-end font-light text-[10px]'>
                                            <p>
                                                Available money
                                            </p>
                                            <p>{store.availableMoney}</p>
                                        </div>
                                    }
                                    <p className='flex flex-row gap-1 items-center hover:underline text-primary cursor-pointer'
                                        onClick={() => setShowSelections(false)}>
                                        Show selections
                                        <ChevronDownIcon className='w-4 h-4 text-primary hover:underline' />
                                    </p>
                                </div>
                            }
                        </div>
                    }
                    <div className={`col-span-2 bg-black/60 w-full flex overflow-y-auto flex flex-col transition transform
                ${!showSelections && 'hidden'}`}>
                        {store.tray.length > 1 && showSelections && store.tray.map(({ winCondition, match, id, team, gains }, index: number) =>
                            <div className='w-full h-auto grid grid-cols-12 items-center border-b border-primary pb-2 pr-2'>
                                <div className='w-full h-5 hover:text-primary cursor-pointer col-span-1 flex justify-center'
                                    onClick={() => removeTray(id)}>
                                    <XMarkIcon />
                                </div>
                                <div className='w-full flex flex-row items-center justify-between col-span-11'>
                                    <p className='font-medium text-md'>{team}</p>
                                    <div className='flex flex-row items-end justify-end gap-1'>
                                        <p className='font-semibold text-xl text-primary w-12'>{gains.toFixed(2)}</p>
                                        <input className='relative w-1/2 h-8 p-1 bg-white/30 focus:outline-none'
                                            onChange={(e) => handleInputValues(id, e, gains)}
                                            value={inputValues[id]?.value || '$'}></input>
                                    </div>
                                </div>
                                <div></div>
                                <div className='flex font-medium text-xs w-full items-center justify-between flex-row col-span-11 opacity-80'>
                                    <div className='flex flex-col'>
                                        <p>
                                            {winCondition}
                                        </p>
                                        <p className='font-medium text-xs pt-1 opacity-80'>{match}</p>
                                    </div>
                                    {inputValues[id] && inputValues[id].value !== '$' &&
                                        <p className='text-end text-primary-300'>Potencial gains {inputValues[id].gains}</p>
                                    }

                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex grid grid-cols-12 min-h-20 max-h-auto items-center py-1'>
                        <div className='h-5 hover:text-primary cursor-pointer flex justify-center'
                            onClick={() => removeTrays()}>
                            <XMarkIcon />
                        </div>
                        <div className='w-auto flex flex-row items-center col-span-11'>
                            <p className='font-medium '>{store.tray.length > 1 ? leadTitle[store.tray.length] : store.tray[0].team}</p>
                            {showSelections ?
                                <div className='flex flex-row h-auto items-end w-full justify-end gap-4 relative bottom-1'>
                                    <p className='font-semibold text-xl text-primary pt-2 w-12'>{store?.totalGains?.toFixed(2)}</p>
                                    <input className='w-44 h-8 bg-white/30 pl-1 mr-2 focus:outline-none'
                                        value={inputValue.value}
                                        onChange={(e) => handleChange(e)}
                                    ></input>
                                </div>
                                :
                                <p className='font-semibold text-xl text-primary w-12 pl-3'>{store.totalGains.toFixed(2)}</p>
                            }
                            {store.tray.length > 1 && !showSelections &&
                                <div className='w-full flex flex-row justify-end items-center text-primary whitespace-nowrap p-2'>
                                    <p className='flex flex-row gap-1 relative -top-1 items-center hover:underline cursor-pointer'
                                        onClick={() => setShowSelections(true)}>
                                        Show selections
                                        <ChevronUpIcon className='w-4 h-4 text-primary hover:underline' />
                                    </p>
                                </div>
                            }
                        </div>
                        <div></div>
                        <div className='flex font-medium text-xs w-full items-center justify-between flex-row col-span-11 opacity-90 '>
                            <div className='flex flex-col'>
                                {store.tray.length > 1 ?
                                    <p className='col-span-12'></p>
                                    :
                                    <p className='font-medium text-xs opacity-90 col-span-11'>
                                        {store.tray[0].winCondition}</p>

                                }
                                {store.tray.length > 1 ?
                                    <p className='font-medium text-xs col-span-11 w-4/5 p4 pt-1 opacity-90'>{store.tray.reduce((acc, { team }, i) => acc += team + (store.tray.length !== i + 1 ? ', ' : '.'), '')}</p>
                                    :
                                    <p className='font-medium text-xs col-span-11 pt-1 opacity-90'>{store.tray[0].match}</p>
                                }
                            </div>
                            {inputValue && inputValue.value !== '$' && showSelections &&
                                <p className='text-end text-primary-300 pr-2'>Potencial gains {inputValue.gains}</p>
                            }

                        </div>

                    </div>
                </div>
                <div className='col-span-2 flex-row flex min-h-14 w-full justify-center transform transition-transform duration-700'>
                    <div className={`bg-gray-800 flex pl-3 h-full justify-center items-center lg:rounded-bl-lg
            ${showSelections ? 'hidden' : 'w-full'}`}
                        ref={inputRef}
                        onClick={() => setOpenInput(true)}>
                        {!openInput ?
                            <h1 className={`font-medium text-2xl opacity-90 w-full text-start text-primary ${shake ? 'animate-shake animate-twice animate-duration-300' : ''}`}>
                                Set Import</h1>
                            :
                            <div className='flex flex-col pt-1'>
                                <p className={`text-xs font-light`}>Import</p>
                                <input
                                    className='text-2xl font-semibold w-full text-primary bg-white/0 focus:outline-none cursor-pointer'
                                    value={inputValue.value}
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                        }
                    </div>
                    <div className={`flex flex-col items-center justify-center lg:rounded-br-lg transform transition-transform duration-300
            ${inputValue.value === '$' && getTotalGains() === '$0' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary  cursor-pointer'}
            ${showSelections ? 'w-full rounded-b' : 'w-full'}`}
                        onClick={() => handleSubmit()}>
                        <p
                            className='text-center rounded w-full font-semibold'>
                            Place bet
                        </p>
                        {showSelections && getTotalGains() !== '$0'
                            ?
                            <p className={`text-xs font-light relative text-center`}>
                                {'Total gains ' + calculateAndFormat(getTotalGains(), 1)}
                            </p>
                            :
                            <p className={`text-xs font-light relative text-center`}>
                                {inputValue.value !== '$' ? 'Potencial gains ' + inputValue.gains : ''}
                            </p>
                        }

                    </div>
                </div>
            </div >
            :
            null
    )
}
