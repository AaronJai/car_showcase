'use client';

import { useState } from "react";
import Image from "next/image";
import { CarProps } from "@/types";
import CustomButton from "./CustomButton";
import { calculateCarRent, generateCarImageUrl } from "@/utils";
import CarDetails from "./CarDetails";

interface CarCardProps {
    car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
    const { city_mpg, year, make, model, transmission, drive } = car;

    const [isOpen, setisOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year);

    return (
        // Car card component
        <div className="car-card group">
            {/* Car model details */}
            <div className="car-card__content">
                <h2 className="car-card__content-title">{make} {model}</h2>
            </div>

            {/* rent cost details */}
            <p className="flex mt-6 text-[32px] font-extrabold">
                <span className="self-start text-[14px] font-semibold">
                    $
                </span>
                {carRent}
                <span className="self-end text-[14px] font-medium">
                    /day
                </span>
            </p>

            {/* Car image - will come from another API */}
            <div className="relative w-full h-40 my-3 object-contain">
                <Image
                    src={generateCarImageUrl(car)}
                    alt="Car model"
                    fill
                    priority
                    className="object-contain"
                />
            </div>

            {/* additional car details */}
            <div className="relative flex w-full mt-2">
                <div className="flex group-hover:invisible w-full justify-between text-gray">

                    {/* display transmission */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                            src='/steering-wheel.svg'
                            width={20}
                            height={20}
                            alt='steering wheel'
                        />
                        <p className="text-[14px]">
                            {transmission === 'a' ? 'Automatic' : 'Manual'}
                        </p>
                    </div>

                    {/* display drivetrain configuration*/}
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                            src='/tire.svg'
                            width={20}
                            height={20}
                            alt='tire'
                        />
                        <p className="text-[14px]">
                            {drive.toUpperCase()}
                        </p>
                    </div>

                    {/* display fuel usage, converted from MPG to KM/L*/}
                    <div className="flex flex-col justify-center items-center gap-2">
                        <Image
                            src='/gas.svg'
                            width={20}
                            height={20}
                            alt='gas'
                        />
                        <p className="text-[14px]">
                            {((city_mpg * 1.60934) / 3.78541).toFixed(1)} KM/L
                        </p>
                    </div>

                </div>

                {/* button to show more info */}
                <div className="car-card__btn-container">
                    <CustomButton 
                        title="View More" 
                        containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setisOpen(true)}
                    />
                </div>
            </div>

            {/* display car details */}
            <CarDetails isOpen={isOpen} closeModal={() => setisOpen(false)} car={car}/>
        </div>
    )
}

export default CarCard