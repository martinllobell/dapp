import React from "react";
import Card from "./Card";
import CryptoCarousel from "./CryptoCarousel";

export interface Card {
  title: string;
  link: string;
  description: string;
  leadImage: string;
  bgImage: string;
}

const cards: Card[] = [
  {
    title: "Sports",
    link: "/sports",
    description:
      "Betting has never been so simple and attractive. Click and try!",
    leadImage:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62bf873b-e9df-40d4-828c-afc8da770e1d/dg3dkjf-3fdf4256-9240-4f0f-9069-560f5289f601.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYyYmY4NzNiLWU5ZGYtNDBkNC04MjhjLWFmYzhkYTc3MGUxZFwvZGczZGtqZi0zZmRmNDI1Ni05MjQwLTRmMGYtOTA2OS01NjBmNTI4OWY2MDEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4IMTzEb-LHENJEDBRShZGgKC0GJK11ndaxjqxwQUq0k",
    bgImage:
      "https://wallpapers.com/images/hd/best-football-background-vkr4qy2utkrsn5rj.jpg",
  },
  {
    title: "Trending",
    link: "/sports",
    description:
      "Place bets on world tournaments and follow their results live!",
    leadImage: "https://pbs.twimg.com/media/Fx-9ZCTaMAA6qa0.png",
    bgImage: "https://esportbet.com/wp-content/uploads/2020/09/worlds.jpg",
  },
  {
    title: "Games",
    link: "/sports",
    description: "Try your luck at last games and enjoy the experience!",
    leadImage:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d099d316-98cf-4095-a2f9-32cca4219baa/da51u5h-c959469c-020b-435b-aded-a93a0df6b87c.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QwOTlkMzE2LTk4Y2YtNDA5NS1hMmY5LTMyY2NhNDIxOWJhYVwvZGE1MXU1aC1jOTU5NDY5Yy0wMjBiLTQzNWItYWRlZC1hOTNhMGRmNmI4N2MucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZP8f1TvIq95yPlEUgoIZW-I2Lcq3cXkOa1BnW3roXNc",
    bgImage:
      "https://images.contentstack.io/v3/assets/blt187521ff0727be24/bltcea170f820e544c5/60ee0e19a471a34acb2c1f66/ionia-01.jpg",
  },
  // {
  //     title: 'Games',
  //     description: 'Try your luck at last games and enjoy the experience!',
  //     leadImage: 'https://pngimg.com/uploads/deadpool/small/deadpool_PNG19.png',
  //     bgImage: 'https://e1.pxfuel.com/desktop-wallpaper/784/689/desktop-wallpaper-marvel-cinematic-universe.jpg'
  // },
  // {
  //     title: 'Boxing',
  //     description: 'Try your luck at last games and make your spaceship fly to the moon!',
  //     leadImage: 'https://dmxg5wxfqgb4u.cloudfront.net/styles/athlete_bio_full_body/s3/2021-07/MCGREGOR_CONOR_L_07-10.png?itok=xbg9Kwfj',
  //     bgImage: 'https://m.media-amazon.com/images/I/71n-5EpfMpL.jpg'
  // },
  // {
  //     title: 'MOMO',
  //     description: 'te haces el canchero y sos hincha de plantense',
  //     leadImage: 'https://www.kruesports.gg/assets/img/players/kru-players/July2022/OjEHIfPD4agpMsBEitul.png',
  //     bgImage: 'data:image/jpeg;base64,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'
  // },
];

export interface Crypto {
  img: string;
  name: string;
}

const cryptos: Crypto[] = [
  {
    img: "src/assets/icons/atar.png",
    name: "Tether",
  },
  {
    img: "src/assets/icons/bitcoin.png",
    name: "Bitcoin",
  },
  {
    img: "src/assets/icons/ethereum.png",
    name: "Ethereum",
  },
  {
    img: "src/assets/icons/tron.png",
    name: "Tron",
  },
  {
    img: "src/assets/icons/bnb.png",
    name: "BNB",
  },
];

export default function WelcomePlay() {
  return (
    <div className="relative flex flex-col justify-center my-6  md:mx-10 gap-16">
      <div className="mx-6 flex flex-col gap-4">
        <h1 className="text-4xl font-normal">
          Unleash the Power of Crypto Betting!
        </h1>
        <h2 className="md:text-lg leading-relaxed ">
          Experience the future of online betting with the power of blockchain technology<span className="font-semibold"> Bet Smart, Bet Crypto</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-3 w-full px-8 md:gap-12 gap-6">
        {cards.map((card, index) =>
          (index + 1) % 3 === 0 ? (
            <div className="col-span-2 my-4 md:mt-0 md:col-span-1">
              <Card card={card} />
            </div>
          ) : (
            <div>
              <Card card={card} />
            </div>
          )
        )}
      </div>
      <div className="grid grid-cols-12 w-full -mt-12 px-8">
        <div className="col-span-5 gap-3 flex min-w-full items-center flex-row opacity-50 relative -left-5 md:left-0">
          <h1 className="text-3xl md:text-5xl font-bold">100</h1>
          <p className="w-8">Crypto networks</p>
          <div className="min-w-8 min-h-10 mx-2 transform rotate-90">
            <hr className="border-b border-black dark:border-white"></hr>
          </div>
          <p className="text-3xl md:text-5xl font-bold">500</p>
          <h1 className="min-w-8">Crypto wallets</h1>
        </div>
        <div className="col-span-7 relative md:gap-3 flex items-center w-full justify-end flex-row opacity-50 relative -right-5 md:right-0">
          <div className="flex-row justify-end min-w-full gap-3 lg:flex hidden">
            {cryptos.map(({ img, name }) => (
              <div className="flex flex-row gap-2 items-center">
                <img src={img} className="max-w-6"></img>
                <h2 className="font-semibold text-xl">{name}</h2>
              </div>
            ))}
          </div>
          <div className="min-w-8 min-h-10 mx-4 md:-ml-5 transform rotate-90 ">
            <hr className="border-b border-black dark:border-white"></hr>
          </div>
          <h1 className="text-sm md:text-xl font-semibold cursor-pointer hover:text-yellow-500 whitespace-nowrap">
            See all
          </h1>
        </div>
      </div>
      <div className="flex -mt-10 lg:hidden">
        <CryptoCarousel data={cryptos} />
      </div>
    </div>
  );
}
