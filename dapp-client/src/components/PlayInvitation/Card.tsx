'use client';
import React, { useState } from 'react'
import { Card } from './welcomePlay';

interface InvitationCardProp {
    card: Card
}
export default function InvitationCard({ card }: InvitationCardProp) {
    const { bgImage, description, leadImage, title } = card
    const [hover, setHover] = useState<boolean>(false)
    return (
        <div className='w-full flex rounded-lg border border-black/20 my-2 h-40 relative transition duration-300 hover:-translate-y-1 cursor-pointer '
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div
                className={`absolute flex justify-center overflow-hidden shadow-xl rounded-lg items-center h-40 w-full cursor-pointer transition-opacity duration-300 ${hover ? 'opacity-100' : 'opacity-80'}`}
            >
                <img src={bgImage} className='absolute border border-black w-full h-full object-cover rounded-lg' />
            </div>
            <div className='absolute w-full h-full flex justify-center items-center -top-[31px] '>
                <img src={leadImage} className='absolute max-h-56 min-h-56 object-cover'></img>
            </div>
                <div className={`absolute transform rounded-lg w-full h-full -bottom-1 duration-300 bg-gradient-to-b ${hover ? 'from-white/0 to-black/100' : 'bg-black/10'}`}></div>
            <div className='grid grid-cols-6 grid-rows-2 justify-center overflow-hidden items-center h-full'>
                <div className='flex flex-col items-end justify-end col-span-5 row-span-2'>
                    <div className={`flex flex-col h-full justify-end items-start w-full p-4 relative -bottom-14 transition duration-300 ${hover ? 'md:-translate-y-12' : ''}`}>
                        <h2 className='text-2xl font-semibold text-gray-200'>{title}</h2>
                        <h3 className='absolute top-12 mt-1 font-thin hidden md:block text-sm w-auto text-gray-200'>{description}</h3>
                    </div>
                </div>
                <div className='flex items-end justify-end h-full row-span-2'>
                    <a
                        className={`inline-block rounded-full backdrop-blur-xl bg-white drop-shadow-xl p-2 m-4 transform duration-300 ${hover ? 'text-black ' : 'text-white bg-white/10'}`}
                        href="#MainContent"
                    >
                        <span className="sr-only">Go to {title}</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 110 1.414z"
                                clip-rule="evenodd"
                                transform="rotate(90 10 10)"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}
