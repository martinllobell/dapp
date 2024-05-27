import React from 'react'
import { Crypto } from './welcomePlay'

interface CryptoCarousel {
  data: Crypto[]
}
export default function CryptoCarousel({ data }: CryptoCarousel) {
  const repeatedData = Array.from({ length: 6 }, () => data).flat();
  return (
    <div className='w-80'>
      <div className="opacity-50 w-screen animate-slide">
        <div className="flex gap-3 flex">
          {
            repeatedData.map(({ img, name }) =>
              <div className="flex flex-row gap-2 items-center">
                <img src={img} className="max-w-6" alt={name} />
                <h2 className="font-semibold text-xl">{name}</h2>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
