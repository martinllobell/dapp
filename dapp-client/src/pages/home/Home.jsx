
import WelcomePlay from '../../components/PlayInvitation/WelcomePlay';
import { CardsMain } from '../../components/beetingcards/CardsMain';
import MyCarousel from '../../components/carrousel/Carousel';


export default function Home({ darkMode }) {
  return (
    <div className='w-full pt-1 flex flex-col items-center justify-center'>
      <div className="mt-[5rem]">
        <WelcomePlay />
        <div className="mt-[7rem] mb-[7rem]">
          <MyCarousel />
        </div>
      </div>
      <CardsMain darkMode={darkMode} />
    </div>
  );
}