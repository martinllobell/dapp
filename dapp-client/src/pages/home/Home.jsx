import WelcomePlay from "../../components/PlayInvitation/WelcomePlay";
import { CardsMain } from "../../components/beetingcards/CardsMain";
import MyCarousel from "../../components/carrousel/Carousel";

export default function Home({ darkMode }) {
  return (
    <div
      className={`w-full pt-1 flex flex-col items-center justify-center ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="mt-20">
        <WelcomePlay />
        <div className="mt-20 mb-28">
          <MyCarousel />
        </div>
      </div>
      <CardsMain darkMode={darkMode} />
    </div>
  );
}
