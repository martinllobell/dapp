import FilterSearch from "./FilterSearch";

const HistoryBets = () => {
  return (
    <div className="p-8 transform hover:scale-105 transition duration-300 shadow-xl rounded-lg intro-y backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl">
      <h1 className="text-base font-semibold text-slate-400">History Bets</h1>
      <div className="mt-4">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full">
              <FilterSearch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryBets;
