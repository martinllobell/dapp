

const BalanceProfile = ({balance}) => {
  return (
    <div className= "shadow-xl rounded-xl backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl w-full">
      <div className="p-6">
        <div className="flex justify-evenly gap-10">
          <div className="flex flex-col items-center">
            <span className="text-base font-medium text-slate-400">
              My balance
            </span>
            <span className="text-lg font-bold">{balance}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-medium text-slate-400">
              On bets
            </span>
            <span className="text-lg font-bold">$0.00</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-base font-medium text-slate-400">
              Available winnings
            </span>
            <span className="text-lg font-bold">$500.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceProfile;
