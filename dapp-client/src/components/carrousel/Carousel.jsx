import React, { useEffect, useState } from 'react';
import 'flowbite/dist/flowbite.css'; // Importa los estilos de Flowbite
import { Carousel } from 'flowbite';
import nba from "../../assets/images/nba.jpg";
import lol from "../../assets/images/lol.jpg";
import cs2 from "../../assets/images/cs2.webp";
import champions from "../../assets/images/champions.jpg";

export default function MyCarousel() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleScreenSizeChange(e) {
      setIsDesktop(e.matches);
    }

    // Llama a la función para inicializar el estado
    handleScreenSizeChange(mediaQuery);

    // Agrega el listener para el cambio de tamaño de la pantalla
    mediaQuery.addListener(handleScreenSizeChange);

    // Limpia el listener cuando el componente se desmonte
    return () => {
      mediaQuery.removeListener(handleScreenSizeChange);
    };
  }, []);
  useEffect(() => {
    // Inicializa el carrusel de Flowbite después de que el componente se haya montado en el DOM
    const myCarousel = new Carousel('.carousel', {
      // Configuración del carrusel, como cellAlign, wrapAround, etc.
      cellAlign: "center",
      wrapAround: true,
      freeScroll: true,
    });

    // Devuelve una función de limpieza para limpiar cuando el componente se desmonte
    return () => {
      myCarousel.destroy(); // Limpia el carrusel cuando el componente se desmonte
    };
  }, []); // El segundo argumento de useEffect asegura que esto solo se ejecute una vez

  return (
    <div id="default-carousel" className="relative w-4/5 md:w-2/3" data-carousel="slide">
      {
        isDesktop ?
          <div id='carousel_wrapper' className="relative overflow-hidden rounded-lg md:h-64">
            {/* Primer par de imágenes */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={nba} className="bg-top absolute block w-2/4 h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="NBA" />
              <img src={champions} className="bg-top absolute block w-2/4 h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg right-0" alt="Champions" />
            </div>
            {/* Segundo par de imágenes */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={lol} className="bg-top absolute block w-2/4 h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="LOL" />
              <img src={cs2} className="bg-top absolute block w-2/4 h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg right-0" alt="CS2" />
            </div>
          </div>
          :
          <div id='carousel_wrapper' className="relative h-64 overflow-hidden rounded-lg md:h-96">
            {/* Item 1 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={nba} className="bg-top absolute block w-full h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="NBA" />
            </div>
            {/* Item 2 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={champions} className="bg-top absolute block w-full h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="Champions" />
            </div>
            {/* Item 3 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={lol} className="bg-top absolute block w-full h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="LOL" />
            </div>
            {/* Item 4 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img src={cs2} className="bg-top absolute block w-full h-full object-cover transition-transform transform scale-95 duration-300 hover:scale-100 rounded-lg" alt="CS2" />
            </div>
          </div>
      }
      {/* Slider indicators */}
      {
        isDesktop ?
          <div className="absolute z-20 flex -translate-x-1/2 bottom- left-1/2 space-x-3 rtl:space-x-reverse">
            <button type="button" className="!bg-white/60 w-3 h-2 rounded-sm" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" className="!bg-white/60 w-3 h-2 rounded-sm" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
          </div> : <div className="absolute z-20 flex -translate-x-1/2  left-1/2 space-x-3 rtl:space-x-reverse">
            <button type="button" className="!bg-white/60 w-5 h-1.5 rounded-sm" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
            <button type="button" className="!bg-white/60 w-5 h-1.5 rounded-sm" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
            <button type="button" className="!bg-white/60 w-5 h-1.5 rounded-sm" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
            <button type="button" className="!bg-white/60 w-5 h-1.5 rounded-sm" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
          </div>
      }
      {/* Slider controls */}
      {/* <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button> */}
    </div>
  );
}
