import React, { useEffect, useState } from "react";
import "flowbite/dist/flowbite.css";
import { Carousel } from "flowbite";
import PopularBets from "./PopularBets";
import { basketballMatches, lolMatches, soccerMatches } from "./dataMatch";
import "./Carousel.scss";

export default function MyCarousel() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleScreenSizeChange(e) {
      setIsDesktop(e.matches);
    }

    handleScreenSizeChange(mediaQuery);
    mediaQuery.addListener(handleScreenSizeChange);

    return () => {
      mediaQuery.removeListener(handleScreenSizeChange);
    };
  }, []);

  useEffect(() => {
    const myCarousel = new Carousel(".carousel", {
      cellAlign: "center",
      wrapAround: true,
      freeScroll: true,
      autoPlay: 3000,
    });

    return () => {
      myCarousel.destroy();
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center my-6  md:mx-10 gap-16">
      <div className="mx-6 flex flex-col gap-4">
        <h1 className="text-4xl font-normal">Most Popular Bets</h1>
        <h2 className="md:text-lg leading-relaxed">
          Join thousands of bettors on the leading decentralized betting
          platform.{" "}
          <span className="font-semibold">Your Crypto, Your Bets</span>
        </h2>
      </div>
      <div
        id="default-carousel"
        className="relative w-full"
        data-carousel="slide"
      >
        {isDesktop ? (
          <div
            id="carousel_wrapper"
            className="relative overflow-hidden rounded-lg md:h-64"
          >
            <div
              className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4"
              data-carousel-item
            >
              <PopularBets selectedMatches={lolMatches} />
              <PopularBets selectedMatches={basketballMatches} />
              <PopularBets selectedMatches={soccerMatches} />
              <PopularBets selectedMatches={lolMatches} />
            </div>
            <div
              className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4"
              data-carousel-item
            >
              <PopularBets selectedMatches={lolMatches} />
              <PopularBets selectedMatches={basketballMatches} />
              <PopularBets selectedMatches={soccerMatches} />
              <PopularBets selectedMatches={lolMatches} />
            </div>
            <div
              className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4"
              data-carousel-item
            >
              <PopularBets selectedMatches={lolMatches} />
              <PopularBets selectedMatches={basketballMatches} />
              <PopularBets selectedMatches={soccerMatches} />
              <PopularBets selectedMatches={lolMatches} />
            </div>
          </div>
        ) : (
          <div
            id="carousel_wrapper"
            className="relative overflow-hidden rounded-lg h-64 md:h-96"
          >
            <div
              className="carousel-item duration-700 ease-in-out"
              data-carousel-item
            >
              <PopularBets selectedMatches={lolMatches} />
            </div>
            <div
              className="carousel-item duration-700 ease-in-out"
              data-carousel-item
            >
              <PopularBets selectedMatches={soccerMatches} />
            </div>
            <div
              className="carousel-item duration-700 ease-in-out"
              data-carousel-item
            >
              <PopularBets selectedMatches={basketballMatches} />
            </div>
            <div
              className="carousel-item duration-700 ease-in-out"
              data-carousel-item
            >
              <PopularBets selectedMatches={lolMatches} />
            </div>
          </div>
        )}
        <div className="absolute z-20 flex -translate-x-1/2 left-1/2 space-x-3 rtl:space-x-reverse -bottom-4">
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="true"
            aria-label="Slide 1"
            data-carousel-slide-to="0"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 2"
            data-carousel-slide-to="1"
          ></button>
          <button
            type="button"
            className="w-3 h-3 rounded-full"
            aria-current="false"
            aria-label="Slide 3"
            data-carousel-slide-to="2"
          ></button>
        </div>
      </div>
    </div>
  );
}
