import React from "react";
import Card from "./Card";
import CryptoCarousel from "./CryptoCarousel";
import lebron from "../../assets/images/lebron.png";
import basketballBackground from "../../assets/images/basketballBackground.jpg";

export interface Card {
  title: string;
  link: string;
  description: string;
  leadImage: string;
  bgImage: string;
}

const cards: Card[] = [
  {
    title: "Sport",
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
    leadImage: lebron,
    bgImage: basketballBackground,
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
    <div className="relative flex flex-col justify-center my-6 md:mx-10 gap-16">
      <div className="mx-6 flex flex-col gap-4">
        <h1 className="text-3xl font-semibold 2xl:text-5xl">
          Customize and <span className="font-bold text-yellow-500">WIN</span>!
        </h1>
        <span className="md:text-lg 2xl:text-2xl mx-auto leading-relaxed">
          Choose a Sport or Esport, Beat the Odds and Claim Big Profits by Matering Your Betting Skills!
          <span className="font-semibold text-primary"> What Are You Waiting For?</span>

        </span>
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
        <div className="col-span-5 gap-3 flex items-center flex-row opacity-50 relative -left-5 md:left-0">
          <h1 className="text-3xl md:text-5xl 2xl:text-7xl font-bold">100</h1>
          <p className="w-8 2xl:text-3xl">Crypto networks</p>
          <div className="min-w-8 min-h-10 mx-2 2xl:mx-20 2xl:min-w-16 2xl:relative left-8 transform rotate-90">
            <hr className="border-b border-black dark:border-white"></hr>
          </div>
          <p className="text-3xl md:text-5xl 2xl:text-7xl font-bold">500</p>
          <h1 className="min-w-8 2xl:text-3xl">Crypto wallets</h1>
        </div>
        <div className="col-span-7 relative md:gap-3 flex items-center w-full justify-end flex-row opacity-50 relative -right-5 md:right-0">
          <div className="flex-row justify-end gap-3 lg:flex hidden">
            {cryptos.map(({ img, name }) => (
              <div className="flex flex-row gap-2 items-center">
                <img src={img} className="max-w-6 2xl:max-w-10"></img>
                <h2 className="font-semibold text-xl 2xl:text-3xl">{name}</h2>
              </div>
            ))}
          </div>
          <div className="min-w-8 min-h-10 mx-4 md:-ml-5 transform rotate-90 ">
            <hr className="border-b border-black dark:border-white"></hr>
          </div>
          <h1 className="text-sm md:text-xl font-semibold cursor-pointer whitespace-nowrap">
            See all
          </h1>
        </div>
      </div>
      <div className="flex -mt-10 lg:hidden overflow-hidden">
        <CryptoCarousel data={cryptos} />
      </div>
    </div>
  );
}
