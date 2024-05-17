import React, { useState, useEffect, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MD5 } from 'crypto-js';
import Web3 from 'web3';
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useNavigate } from 'react-router-dom';

const WalletConnect = ({ darkMode }) => {
  const [web3, setWeb3] = useState(null);
  const [hashedIcon, setHashedIcon] = useState(null);
  const [balance, setBalance] = useState(null);
  const { open, setDefaultChain } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const navigate = useNavigate();

  useEffect(() => {
    if (address) {
      const connectedWeb3 = new Web3(window.ethereum);
      connectedWeb3.eth.defaultAccount = address;
      setWeb3(connectedWeb3);

      const randomString = Math.random().toString();
      const hash = MD5(randomString).toString();
      setHashedIcon(hash);

      // Solicitar firma del usuario
      requestSignature(connectedWeb3, address);

      // Obtener el saldo
      connectedWeb3.eth.getBalance(address, 'latest', (err, balance) => {
        if (!err) {
          const etherBalance = connectedWeb3.utils.fromWei(balance, 'ether');
          setBalance(parseFloat(etherBalance).toFixed(4));
        } else {
          console.error('Error fetching balance:', err);
        }
      });
    }
  }, [address]);

  const requestSignature = async (web3Instance, userAddress) => {
    const message = `Sign this message to connect to the Dapp.`;
    try {
      const signature = await web3Instance.eth.personal.sign(message, userAddress, '');
      console.log('Signature:', signature);
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
      setWeb3(null);
      setBalance(null);
      sessionStorage.removeItem('walletAddress');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
    }
  };

  const handleSwitchNetwork = (networkId) => {
    if (switchNetwork) {
      switchNetwork(networkId);
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <>
      {isConnected ? (
        <div className="flex items-center">
          <div className={`${darkMode ? 'backdrop-blur-xl bg-white/10 drop-shadow-xl text-white hover:bg-white/20' : 'backdrop-blur-xl bg-black/10 drop-shadow-xl text-black hover:bg-black/20'} mr-3 shadow-sm shadow-black/10 px-5 py-2 rounded-lg transition ease-in-out duration-150`}>
            {balance ? balance : '0.00'} ETH
          </div>
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="rounded-full block">
                <span className="sr-only">Open user menu</span>
                <div className="rounded-full block px-1 py-1 border-none">
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
                      onClick={() => navigate('/profile')}
                      className={classNames(active ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white' : 'text-black dark:text-white', 'rounded-md block px-4 py-2 text-sm')}
                    >
                      Your Profile
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => navigate('/settings')}
                      className={classNames(active ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white' : 'text-black dark:text-white', 'rounded-md block px-4 py-2 text-sm')}
                    >
                      Settings
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={() => handleSwitchNetwork(1)} // Cambiar a Mainnet
                      className={classNames(active ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white' : 'text-black dark:text-white', 'rounded-md block px-4 py-2 text-sm')}
                    >
                      Change Network
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={disconnectWallet}
                      className={classNames(active ? 'bg-gray-300 dark:bg-gray-700 text-black dark:text-white' : 'text-black dark:text-white', 'rounded-md block px-4 py-2 text-sm')}
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
