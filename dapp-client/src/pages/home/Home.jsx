import { CardMatch } from '../../components/CardMatch';
import WelcomePlay from '../../components/PlayInvitation/WelcomePlay';
import MyCarousel from '../../components/carrousel/Carousel';
import Footer from '../../components/footer/Footer';

const match1 = {
  id: '0x2012391123123',
  image: 'https://nmdfc.org/uploads/gallery/video/badgepng-cd449eedf7ca2d60e1875cf42dec68e3.png',
  team1: {
    name: 'Manchester United',
    logo: 'https://www.logo.wine/a/logo/Manchester_United_F.C./Manchester_United_F.C.-Logo.wine.svg'
  },
  team2: {
    name: 'Manchester City',
    logo: 'https://download.logo.wine/logo/Manchester_City_F.C./Manchester_City_F.C.-Logo.wine.png'
  },
  odds: {
    odd1: 1.52,
    oddX: 2.40,
    odd2: 3.20
  }
}

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <MyCarousel/>
      <h1 className='font-bold my-3'>Partidos en Vivo</h1>
      <div className='grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4'>
        <CardMatch matchData={match1} />
        <CardMatch matchData={match1} />
        <CardMatch matchData={match1} />
        <CardMatch matchData={match1} />
        <CardMatch matchData={match1} />
        <CardMatch matchData={match1} />
      </div>
      <WelcomePlay/>
      <Footer />
    </div>
  );
}