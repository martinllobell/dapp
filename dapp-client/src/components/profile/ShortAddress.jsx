import React from 'react';
import { useContracts } from '../../hooks/useContracts'; // Asegúrate de reemplazar esto con la ruta real a tu hook

const ShortAddress = ({ chars = 4 }) => {
  const { account } = useContracts();

  const shortenAddress = (address, chars) => {
    let parsed = address;
    
    if (typeof parsed === 'undefined' || parsed === null) return 'Not connected';
  
    if (parsed.startsWith('0x')) {
      parsed = parsed.slice(2);
    }
  
    if (parsed.length <= chars * 2) {
      return `0x${parsed}`;
    }
  
    return `0x${parsed.slice(0, chars)}...${parsed.slice(parsed.length - chars)}`;
  }

  return (
    <div>
      {shortenAddress(account, chars)}
    </div>
  );
};

export default ShortAddress