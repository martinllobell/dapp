'use client';
import WelcomePlay from '../../components/PlayInvitation/WelcomePlay';
import { CardsMain } from '../../components/beetingcards/CardsMain';
import MyCarousel from '../../components/carrousel/Carousel';
import FirstComponent from '../../components/firstComponent/FirstComponent';

export default function Home({ darkMode }) {
  return (
    <div className='w-full pt-1 flex flex-col items-center justify-center'>
      <div className="mt-[7rem]">
        <FirstComponent />
        <WelcomePlay />
      </div>
      <CardsMain darkMode={darkMode} />
    </div>
  );
}