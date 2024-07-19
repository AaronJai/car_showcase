'use client';

import React from 'react'
import CustomButton from './CustomButton'
import Image from 'next/image';


const Hero = () => {
    const handleScroll = () => {

    }

    return (
        <div className='hero'>
            {/* Display text and Button of Hero page */}
            <div className='flex-1 pt-36 padding-x'>
                <h1 className='hero__title'>
                    Find, book, or rent a car — quickly and easily!
                </h1>

                <p className='hero__subtitle'>
                    Streamline your car rental experience with our platform.
                </p>

                <CustomButton 
                    title="Explore Cars"
                    containerStyles="bg-primary-blue text-white rounded-full mt-10"
                    handleClick={() => {handleScroll}}
                />
            </div>

            {/* Display Image of Hero page */}
            <div className='hero__image-container'>
                <div className='hero__image'>
                    <Image src="/hero.png" alt="hero-image" fill className='object-contain' />

                    <div className='hero__image-overlay'></div>
                </div>
            </div>

        </div>
    )
}

export default Hero