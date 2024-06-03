const DisplayBets = () => {
  return (
    <div className="flex-auto h-full p-6 transform py-[3rem] hover:scale-105 transition duration-300 shadow-xl rounded-lg intro-y backdrop-blur-xl text-3xl bg-white/10 drop-shadow-xl">
      <h2 className="text-xxl font-bold">My Stats</h2>
      <p className="text-xl text-gray-400">
        Estadísticas reales de tus apuestas.
      </p>
      <div className="px-1 py-[2rem] rounded-lg mt-4 backdrop-blur-xl bg-white/10 shadow-black/20">
        <div className="flex flex-grow">
          <div className="text-center basis-1/3">
            <p className="text-xl font-semibold text-gray-400">Victorias totales</p>
            <p className="text-xl font-bold">$1200.00</p>
          </div>
          <div className="text-center basis-1/3">
            <p className="text-xl font-semibold text-gray-400">Mejor ronda</p>
            <p className="text-xl font-bold">$500.00</p>
          </div>
          <div className="text-center basis-1/3">
            <p className="text-xl font-semibold text-gray-400">
              Ronda promedio
            </p>
            <p className="text-xl font-bold">$0.00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayBets;
