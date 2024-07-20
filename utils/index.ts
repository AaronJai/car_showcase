import { CarProps } from "@/types";

// function to fetch car data from the API
export async function fetchCars() {
    const headers = {
        headers: {
            'x-rapidapi-key': '0ec6df61d6msh712bceb2dc885b8p19b31djsne0ae0b5d47ad',
            'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    }

	const response = await fetch('https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=q3', headers);

    const result = await response.json();

    return result;
}

// arbitrarily set price of rental of a car based on factors
export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };

// function to fetch car image data from the API
export const generateCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL('https://cdn.imagin.studio/getimage');

    const { make, year, model } = car;
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angle}`);
    
    return `${url}`;
}