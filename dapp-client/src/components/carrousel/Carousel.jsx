import React, { useEffect, useState } from 'react';
import 'flowbite/dist/flowbite.css'; // Importa los estilos de Flowbite
import { Carousel } from 'flowbite';
import PopularBets from './PopularBets';
import { basketballMatches, lolMatches, soccerMatches } from './dataMatch';

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
    const myCarousel = new Carousel('.carousel', {
      cellAlign: "center",
      wrapAround: true,
      freeScroll: true,
    });

    return () => {
      myCarousel.destroy();
    };
  }, []);

  return (
    <div id="default-carousel" className="relative w-full mb-[3rem]" data-carousel="slide">
      {isDesktop ? (
        <div id='carousel_wrapper' className="relative overflow-hidden rounded-lg md:h-64">
          <div className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={lolMatches} />
            <PopularBets selectedMatches={basketballMatches} />
            <PopularBets selectedMatches={soccerMatches} />
            <PopularBets selectedMatches={lolMatches} />
          </div>
          <div className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={lolMatches} />
            <PopularBets selectedMatches={basketballMatches} />
            <PopularBets selectedMatches={soccerMatches} />
            <PopularBets selectedMatches={lolMatches} />
          </div>
          <div className="carousel-item duration-300 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={lolMatches} />
            <PopularBets selectedMatches={basketballMatches} />
            <PopularBets selectedMatches={soccerMatches} />
            <PopularBets selectedMatches={lolMatches} />
          </div>
        </div>
      ) : (
        <div id='carousel_wrapper' className="relative h-64 overflow-hidden rounded-lg md:h-96">
          <div className="carousel-item hidden duration-700 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={lolMatches} />
          </div>
          <div className="carousel-item hidden duration-700 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={soccerMatches} />
          </div>
          <div className="carousel-item hidden duration-700 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={basketballMatches} />
          </div>
          <div className="carousel-item hidden duration-700 ease-in-out grid grid-cols-4 gap-4" data-carousel-item>
            <PopularBets selectedMatches={lolMatches} />
          </div>
        </div>
      )}

      {isDesktop ? (
        <div className="absolute z-20 flex -translate-x-1/2 -bottom-4 left-1/2 space-x-3 rtl:space-x-reverse -bottom-8">
          <button type="button" className="!bg-white/60 w-3 h-2 rounded-sm" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="!bg-white/60 w-3 h-2 rounded-sm" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="!bg-white/60 w-3 h-2 rounded-sm" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
      ) : (
        <div className="absolute z-20 flex -translate-x-1/2 -bottom-4 left-1/2 space-x-3 rtl:space-x-reverse">
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 1" data-carousel-slide-to="0"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        </div>
      )}
    </div>
  );
}
