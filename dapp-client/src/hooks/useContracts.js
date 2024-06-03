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
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const web3 = new Web3(window.ethereum);
          setWeb3(web3);

          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);

          const p2pBetting = new web3.eth.Contract(P2PBettingArtifact.abi, contractAddress.P2PBetting);
          const p2pBettingActions = new web3.eth.Contract(P2PBettingActionsArtifact.abi, contractAddress.P2PBettingActions);
          const p2pBettingFront = new web3.eth.Contract(P2PBettingFrontArtifact.abi, contractAddress.P2PBettingFront);

          setContracts({
            p2pBetting,
            p2pBettingActions,
            p2pBettingFront,
          });
        } catch (error) {
          console.error('Error connecting to Ethereum provider:', error);
        }
      } else {
        console.error('No Ethereum provider found. Install MetaMask.');
      }
    };

    initProvider();
  }, []);

  const setStartMatchTimestamp = async (betId, newTimestamp) => {
    if (contracts.p2pBetting) {
      try {
        await contracts.p2pBetting.methods.setStartMatchTimestamp(betId, newTimestamp).send({ from: account });
        console.log("Start match timestamp updated successfully!");
      } catch (error) {
        console.error("Error updating start match timestamp:", error);
      }
    }
  };

  return { contracts, account, web3, setStartMatchTimestamp };
};

