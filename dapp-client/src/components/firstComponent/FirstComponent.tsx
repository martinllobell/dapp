import React from "react";
import landingImage from "../../assets/images/LandingImage.png";

const FirstComponent = () => {
  return (
    <div className="p-6 w-full">
      <div className="p-6 flex flex-col md:flex-row items-center justify-center w-full">
        <div className="text-center md:text-left mb-4 md:mb-0 md:mr-6 w-full md:w-1/2">
          <h1 className="text-4xl font-bold md:text-5xl xl:text-6xl 2xl:text-7xl">
            Explore
            <span className="font-bold text-primary"> D</span>'
            <span className="font-bold text-yellow-400">Best</span> way to P2P
            betting with Crypto
          </h1>
          <button
            onClick={() => { window.scrollY }}
            className="w-auto whitespace-nowrap p-4 rounded-lg bg-primary font-bold text-white hover:text-black hover:shadow-xs hover:bg-yellow-500 hover:brightness-110 transition duration-300 ease-in-out text-shadow 2xl:text-xl my-6"
          >
            Ready, Set, Bet!
          </button>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={landingImage}
            alt="Landing"
            className="w-full md:w-auto lg:h-[450px] 2xl:h-[600px] max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default FirstComponent;
