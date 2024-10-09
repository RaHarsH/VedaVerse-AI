'use client'
import { useSearchParams } from "next/navigation";
import React from 'react';

const SearchDetails = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('query');

  return (
    <div className='h-screen w-full flex flex-col justify-center items-center'>
      <h1 className='md:text-5xl text-3xl text-black/90'>Search Results for:</h1>
      <p className='md:text-3xl text-xl text-gray-700'>{searchTerm}</p>
      
      <div className='mt-5 p-5 border rounded-lg shadow-md bg-gray-100'>
        
        <h2 className='text-2xl font-bold'>Results:</h2>
        
        <ul className='w-[500px]'>
          <li>Result 1 for "{searchTerm}"</li>
        </ul>
      </div>
    </div>
  );
};

export default SearchDetails;
