import React, { useEffect } from 'react';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { WagmiConfig } from 'wagmi';
import { arbitrum, mainnet } from 'viem/chains';

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = 'bee67f4ed32e5f2859712f8b5a037806';

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, arbitrum];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

const Web3ModalProvider = ({ children }) => {
  useEffect(() => {
    return () => {
      // Cleanup on unmount if needed
    };
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      {children}
    </WagmiConfig>
  );
};

export default Web3ModalProvider;

