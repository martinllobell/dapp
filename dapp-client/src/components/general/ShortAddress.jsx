
const ShortAddress = ({ address, chars = 4 }) => {
  const shortenAddress = (address, chars) => {
    let parsed = address;
    
    if (typeof parsed === 'undefined') return '';
  
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
      {shortenAddress(address, chars)}
    </div>
  );
};

export default ShortAddress;
