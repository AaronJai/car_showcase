'use client'

import { CarProps } from '@/types';
import Image from 'next/image';
import { Fragment } from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { generateCarImageUrl } from '@/utils';

interface CarDetailsProps {
    isOpen: boolean;
    closeModal: () => void;
    // utilising additional props from CarProps we created
    car: CarProps;
}

const CarDetails = ( { isOpen, closeModal, car }: CarDetailsProps) => {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as='div' className="relative z-10" onClose={closeModal}>
                    {/* background fade-out */}
                    <TransitionChild 
                        as={Fragment} 
                        enter='ease-out duration-300' 
                        enterFrom='opacity-0' 
                        enterTo='opacity-100' 
                        leave='ease-in duration 200' 
                        leaveFrom='opacity-100' 
                        leaveTo='opacity-0'>
                            <div className='fixed inset-0 bg-black bg-opacity-25'/>
                    </TransitionChild>

                    {/* text box */}
                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <TransitionChild 
                                as={Fragment} 
                                enter='ease-out duration-300' 
                                enterFrom='opacity-0 scale-95' 
                                enterTo='opacity-100 scale-100' 
                                leave='ease-in duration 200' 
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'>

                                    <DialogPanel className='relative w-full max-w-lg max-h-[90vh] overflow-y-auto transform rounded-2xl bg-white p-6 text-left shadow-xl transition-all flex flex-col gap-3'>
                                        {/* close button */}
                                        <button
                                            type='button'
                                            className='absolute top-2 right-2 z-10 w-fit p-2 bg-primary-blue-100 rounded-full'
                                            onClick={closeModal}
                                        >
                                            <Image 
                                                src='/close.svg'
                                                alt='close icon'
                                                width={20}
                                                height={20}
                                                className='object-contain'
                                            />
                                        </button>

                                        {/* display car details */}
                                        <div className='flex-1 flex flex-col gap-3'>
                                            {/* car image */}
                                            <div className='relative w-full h-40 bg-pattern bg-cover bg-center rounded-lg'>
                                                <Image
                                                    src={generateCarImageUrl(car, 'angle')}
                                                    alt="Car model"
                                                    fill
                                                    priority
                                                    className="object-contain"
                                                />
                                            </div>
                                            {/* 3 smaller car images */}
                                            <div className='flex gap-3'>
                                                {/* 1 */}
                                                <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                    <Image
                                                        src={generateCarImageUrl(car, '29')}
                                                        alt="Car model"
                                                        fill
                                                        priority
                                                        className="object-contain"
                                                    />
                                                </div>
                                                {/* 2 */}
                                                <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                    <Image
                                                        src={generateCarImageUrl(car, '33')}
                                                        alt="Car model"
                                                        fill
                                                        priority
                                                        className="object-contain"
                                                    />
                                                </div>
                                                {/* 3 */}
                                                <div className='flex-1 relative w-full h-24 bg-primary-blue-100 rounded-lg'>
                                                    <Image
                                                        src={generateCarImageUrl(car, '13')}
                                                        alt="Car model"
                                                        fill
                                                        priority
                                                        className="object-contain"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content of car - name etc */}
                                        <div className='flex-1 flex flex-col gap-2'>
                                            {/* title */}
                                            <h2 className='font-semibold text=xl capitalize'>
                                                {car.make} {car.model}
                                            </h2>

                                            {/* car details - contains in line conversions, could convert to functions */}
                                            <div className='mt-3 flex flex-wrap gap-4'>
                                                {/* returns key/value pairs to display data */}
                                                {Object.entries(car).map(([key, value]) => (
                                                    <div className='flex justify-between gap-5 w-full text-right' key={key}>
                                                        {/* conversion of strings and numbers to metric */}
                                                        <h4 className='text-grey capitalize'>
                                                            {key.endsWith('mpg') ? key.replace('mpg', 'KM/L').split('_').join(' ') : key.split('_').join(' ')}
                                                        </h4>
                                                        <p className='text-black-100 font-semibold'>
                                                            {typeof value === 'number' && key.endsWith('mpg') ? ((value * 1.60934) / 3.78541).toFixed(1) : key === 'drive' 
                                                            ? value.toString().toUpperCase() : typeof value === 'string' ? value.replace(/\b\w/g, char => char.toUpperCase()) : value}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default CarDetails