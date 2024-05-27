import React from 'react'
import backgroundImage from '../../assets/images/backgroundLanding.png'
import landingImage from '../../assets/images/LandingImage.png'

type Props = {}

export default function FirstComponent({ }: Props) {
    return (
        <div className='w-full flex justify-center'>
            <div className='w-full min-h-[520px] max-h-auto relative flex justify-between flex-col lg:flex-row'>
                <div className='relative z-20 flex flex-col p-4 lg:p-20 relative gap-6'>
                    <h1 className='text-4xl sm:text-5xl font-bold formal-text'>Immerse yourself in the best cryptocurrency betting experience</h1>
                    <button className="w-1/2 p-4 rounded-lg bg-primary font-bold text-gray-200 hover:shadow-xs hover:shadow-[#8A2BE2] hover:brightness-110 transition duration-300 ease-in-out hover:text-white text-shadow">Start to Play</button>
                </div>
                <div className='w-full flex justify-end'>

                <img src={landingImage} className='lg:h-auto max-h-[520px] w-auto lg:absolute right-0'/>
                </div>
            </div>
        </div>
    )
}