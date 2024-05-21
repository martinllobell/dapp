import ShortAddress from "../../components/general/ShortAddress";
import HistoryBets from "../../components/general/HistoryBets";
import DisplayBets from "../../components/general/DisplayBets";
import BalanceProfile from "../../components/general/BalanceProfile";
import BarStats from "../../components/general/BarStats";

const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[70%] max-[1024px]:w-[90%] mt-[10rem] max-[1024px]:mt-[5rem]  ">
        <div className="flex justify-between items-center w-full items-center content-center ">
          <div className=" mb-[5rem] flex flex-row w-full max-[1024px]:flex-col gap-10 w-full">
            <div className="w-[50%]  max-[1024px]:w-[100%] flex items-center justify-center grow max-[1024px]:flex-col gap-10 ">
              <div className="flex relative left-[1rem] w-32 h-32 max-w-[10rem] max-height-[10rem] items-center justify-center rounded-full backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 ">
                <img
                  className="rounded-full size-24 min-w-24"
                  src="https://lh3.googleusercontent.com/u/0/drive-viewer/AKGpihZtZhVwE6g3zGLuiB9BTHNWWvWaXoW60Knk-tpDMvr33cc6pfZw6yGrgz_f59Gdh2nneM4wK2LUaxGi_udG4u6ebGOlyl1KFyA=w994-h1962"
                  alt="Perfil de Usuario"
                />
              </div>
              <div className="flex justify-center p-4 items-center text-xl w-[50%]  backdrop-blur-xl bg-white/10 shadow-xl shadow-sm shadow-black/10 rounded-full">
                <ShortAddress address="0x7184e10E6168FB44d0b7f961db2eF7ab3a455EA0" />
              </div>
            </div>
            <div className="flex items-center  justify-center w-[50%] max-[1024px]:w-[100%]">
              <BalanceProfile />
            </div>
          </div>
        </div>
        <div className="flex flex-row max-[1024px]:flex-col  gap-10 ">
          <div className="basis-1/2">
            <DisplayBets />
          </div>
          <div className="basis-1/2">
            <BarStats />
          </div>
        </div>
        <div className="flex-auto py-[4rem]">
          <HistoryBets />
        </div>
      </div>
    </div>
  );
};

export default Profile;
