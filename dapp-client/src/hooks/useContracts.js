import { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractAddress from '../../../hardhat/frontend/src/contracts/contract-address.json';
import P2PBettingArtifact from '../../../hardhat/frontend/src/contracts/P2PBetting.json';
import P2PBettingActionsArtifact from '../../../hardhat/frontend/src/contracts/P2PBettingActions.json';
import P2PBettingFrontArtifact from '../../../hardhat/frontend/src/contracts/P2PBettingFront.json';

export const useContracts = () => {
  const [contracts, setContracts] = useState({});
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initProvider = async () => {
      console.log("Initializing provider...");
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("Ethereum provider found and account requested.");
          
          const web3 = new Web3(window.ethereum);
          console.log("Web3 instance created.");
          setWeb3(web3);

          const accounts = await web3.eth.getAccounts();
          console.log("Accounts fetched: ", accounts);
          setAccount(accounts[0]);

          const p2pBetting = new web3.eth.Contract(P2PBettingArtifact.abi, contractAddress.P2PBetting);
          console.log("P2PBetting contract initialized.");
          const p2pBettingActions = new web3.eth.Contract(P2PBettingActionsArtifact.abi, contractAddress.P2PBettingActions);
          console.log("P2PBettingActions contract initialized.");
          const p2pBettingFront = new web3.eth.Contract(P2PBettingFrontArtifact.abi, contractAddress.P2PBettingFront);
          console.log("P2PBettingFront contract initialized.");

          setContracts({
            p2pBetting,
            p2pBettingActions,
            p2pBettingFront,
          });

          console.log("Contracts set in state.");
        } catch (error) {
          console.error('Error connecting to Ethereum provider:', error);
        }
      } else {
        console.error('No Ethereum provider found. Install MetaMask.');
      }
    };

    initProvider();
  }, []);

  return { contracts, account, web3 };
};
