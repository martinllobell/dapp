import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import Web3 from 'web3';
import { MD5 } from 'crypto-js';



export default function WalletConnect({ darkMode }) {

    const [web3, setWeb3] = useState(null);
    const [hashedIcon, setHashedIcon] = useState(null);


    useEffect(() => {
        console.log(darkMode);
        const address = sessionStorage.getItem('walletAddress');
        if (address) {
            const provider = new Web3.providers.HttpProvider('https://polygon-mainnet.infura.io/v3/your-infura-project-id'); // Reemplaza 'your-infura-project-id' con tu propio ID de Infura para la red de Polygon
            const connectedWeb3 = new Web3(provider);
            connectedWeb3.eth.defaultAccount = address;
            setWeb3(connectedWeb3);
        }
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const connectedWeb3 = new Web3(window.ethereum);
                const address = window.ethereum.selectedAddress;
                sessionStorage.setItem('walletAddress', address);
                connectedWeb3.eth.defaultAccount = address;
                setWeb3(connectedWeb3);
                const randomString = Math.random().toString();
                const hash = MD5(randomString).toString();
                setHashedIcon(hash)
            } catch (error) {
                console.error('Error al conectar la wallet:', error);
            }
        } else {
            console.error('MetaMask no está instalado');
        }
    };
    const navigation = [
        { name: 'Dashboard', href: '#', current: true },
        { name: 'Team', href: '#', current: false },
        { name: 'Projects', href: '#', current: false },
        { name: 'Calendar', href: '#', current: false },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const disconnectWallet = () => {
        if (window.ethereum && window.ethereum.selectedAddress) {
            window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
                if (accounts.length > 0) {
                    window.ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
                        setWeb3(null);
                        sessionStorage.removeItem('walletAddress');
                    });
                } else {
                    setWeb3(null);
                    sessionStorage.removeItem('walletAddress');
                }
            });
        }
    };
    return (
        <>

            {web3 ? (
                <Menu as="div" className="relative ml-3">
                    <div>
                        <Menu.Button className={'rounded-md block'}
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <div className={'rounded-xl block px-1 py-1 border-none'}
                            >
                                <img
                                    className="h-7 w-7 rounded-full"
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-xl bg-white/10 drop-shadow-xl">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? `${darkMode ? "bg-gray-100 text-black" : "bg-gray-600"}` : 'text-white', 'rounded-md block px-4 py-2 text-sm')}
                                    >
                                        Your Profile
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? `${darkMode ? "bg-gray-100 text-black" : "bg-gray-600"}` : 'text-white', 'rounded-md block px-4 py-2 text-sm')}
                                    >
                                        Settings
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(active ? `${darkMode ? "bg-gray-100 text-black" : "bg-gray-600"}` : 'text-white', ' rounded-md block px-4 py-2 text-sm')}
                                        onClick={disconnectWallet}
                                    >
                                        Disconnect
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item >
                                <div
                                    className={'flex items-center px-4 py-2 text-sm'}
                                >

                                    <button onClick={connectWallet} className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-3 py-3 rounded-lg hover:bg-indigo-100 transition ease-in-out hover:scale-105 duration-150 hover:text-blue-500"}>
                                        Add Founds
                                    </button>
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <button onClick={connectWallet} className={`${!darkMode ? "backdrop-blur-xl bg-white/10 drop-shadow-xl text-white" : "hover:bg-indigo-300 backdrop-blur-xl bg-indigo-100 drop-shadow-xl "}` + " shadow-sm shadow-black/10 text-slate-900 px-3 py-2.5 rounded-lg hover:bg-indigo-100 transition ease-in-out hover:scale-105 duration-150 hover:text-black"}>
                    Connect Wallet
                </button>
            )}
        </>

    )
}