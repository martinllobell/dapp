import { Menu, Transition } from '@headlessui/react';
import React, { useState, useEffect, Fragment } from 'react';
import Web3 from 'web3';
import { MD5 } from 'crypto-js';
import { useAccount, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import Loading from '../loading/Loading';

const WalletConnect = ({ darkMode }) => {
    const [web3, setWeb3] = useState(null);
    const [hashedIcon, setHashedIcon] = useState(null);
    const [balance, setBalance] = useState(null);
    const [network, setNetwork] = useState('Ethereum');
    const [signing, setSigning] = useState(false);
    const [showNetworks, setShowNetworks] = useState(false);
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const getProviderUrl = (network) => {
        switch (network) {
            case 'Ethereum':
                return `https://mainnet.infura.io/v3/518105519fa0442bb5029844ac5c3c2e`;
            case 'Sepolia':
                return `https://sepolia.infura.io/v3/518105519fa0442bb5029844ac5c3c2e`;
            case 'Polygon':
                return `https://polygon-mainnet.infura.io/v3/518105519fa0442bb5029844ac5c3c2e`;
            default:
                return `https://mainnet.infura.io/v3/518105519fa0442bb5029844ac5c3c2e`;
        }
    };

    const getCryptoName = (network) => {
        switch (network) {
            case 'Ethereum':
            case 'Sepolia':
                return 'ETH';
            case 'Polygon':
                return 'MATIC';
            default:
                return 'ETH';
        }
    };

    useEffect(() => {
        const sessionAddress = sessionStorage.getItem('walletAddress');
        const sessionSignature = sessionStorage.getItem('walletSignature');
        if (sessionAddress && sessionSignature) {
            connectWallet(sessionAddress, sessionSignature);
        }
    }, []);

    useEffect(() => {
        if (address) {
            const sessionSignature = sessionStorage.getItem('walletSignature');
            connectWallet(address, sessionSignature);
        }
    }, [address]);

    const connectWallet = async (address, storedSignature) => {
        try {
            const provider = window.ethereum;
            if (!provider) throw new Error("No Ethereum provider found");

            await provider.request({ method: 'eth_requestAccounts' });

            const providerUrl = getProviderUrl(network);
            const connectedWeb3 = new Web3(provider);
            connectedWeb3.eth.defaultAccount = address;
            setWeb3(connectedWeb3);

            const randomString = Math.random().toString();
            const hash = MD5(randomString).toString();
            setHashedIcon(hash);

            let signature;
            if (!storedSignature) {
                setSigning(true);
                signature = await provider.request({
                    method: 'personal_sign',
                    params: ["Sign in to verify your wallet.", address],
                });
                sessionStorage.setItem('walletSignature', signature);
                setSigning(false);
            }

            sessionStorage.setItem('walletAddress', address);

            const balance = await connectedWeb3.eth.getBalance(address);
            const etherBalance = connectedWeb3.utils.fromWei(balance, 'ether');
            setBalance(parseFloat(etherBalance).toFixed(4));
        } catch (error) {
            console.error("Error connecting wallet:", error);
            setSigning(false);
        }
    };

    const disconnectWallet = () => {
        disconnect();
        setWeb3(null);
        setBalance(null);
        sessionStorage.removeItem('walletAddress');
        sessionStorage.removeItem('walletSignature');
    };

    const changeNetwork = async (newNetwork) => {
        try {
            const provider = window.ethereum;
            if (!provider) throw new Error("No Ethereum provider found");

            let chainId;
            switch (newNetwork) {
                case 'Ethereum':
                    chainId = '0x1';
                    break;
                case 'Sepolia':
                    chainId = '0xaa36a7'; // Sepolia chain ID
                    break;
                case 'Polygon':
                    chainId = '0x89';
                    break;
                default:
                    chainId = '0x1';
            }

            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }],
            });

            setNetwork(newNetwork);
            setShowNetworks(false);
            if (web3 && address) {
                connectWallet(address);
            }
        } catch (error) {
            console.error("Error changing network:", error);
        }
    };

    const toggleNetworks = (e) => {
        e.stopPropagation();
        setShowNetworks(!showNetworks);
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    return (
        <>
            {isConnected ? (
                <div className="flex items-center">
                    <div className={`${darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20" : "backdrop-blur-xl bg-black/10 drop-shadow-xl text-black  hover:bg-black/20"} mr-3 shadow-sm shadow-black/10 px-5 py-2 rounded-lg transition ease-in-out duration-150 font-semibold`}>
                        {signing ? <Loading /> : `${balance ? balance : "0.00"} ${getCryptoName(network)}`}
                    </div>
                    <Menu as="div" className="relative">
                        <div>
                            <Menu.Button className={'rounded-full block'}>
                                <span className="sr-only">Open user menu</span>
                                <div className={'rounded-full block px-1 py-1 border-none'}>
                                    <img
                                        className="h-[2.3rem] w-[2.3rem] rounded-full"
                                        src={`https://www.gravatar.com/avatar/${hashedIcon}?d=retro&f=y&s=128`}
                                        alt=""
                                    />
                                </div>
                            </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-gray-200 dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                        >
                                            Your Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    <div className="relative">
                                        <button
                                            onClick={toggleNetworks}
                                            className={classNames("text-left w-full px-4 py-2 text-sm flex justify-between", darkMode ? "text-white" : "text-black")}
                                        >
                                            Change Network
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${showNetworks ? "" : "rotate-[-90deg]" } transition transform duration-30 mt-[.1rem] w-4 h-4 inline-block ml-1`}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                    </div>
                                </Menu.Item>
                                {showNetworks && (
                                    <>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                                    onClick={() => changeNetwork('Ethereum')}
                                                >
                                                    Ethereum
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                                    onClick={() => changeNetwork('Sepolia')}
                                                >
                                                    Sepolia
                                                </a>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <a
                                                    href="#"
                                                    className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                                    onClick={() => changeNetwork('Polygon')}
                                                >
                                                    Polygon
                                                </a>
                                            )}
                                        </Menu.Item>
                                    </>
                                )}
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? "bg-gray-300 dark:bg-gray-700 text-black dark:text-white" : "text-black dark:text-white", 'rounded-md block px-4 py-2 text-sm')}
                                            onClick={disconnectWallet}
                                        >
                                            Disconnect
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
            ) : (
                <button onClick={open} className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 backdrop-blur-xl drop-shadow-xl flex items-center justify-center text-nowrap font-semibold text-sm shadow-sm shadow-black/10 w-[10rem] h-[2.3rem] rounded-lg transition ease-in-out hover:scale-105 duration-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12M12 6v12" />
                        <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    </svg>
                    Connect wallet
                </button>
            )}
        </>
    );
};

export default WalletConnect;
