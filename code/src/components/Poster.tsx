import React from 'react';
import Button from './Botton';

interface PosterProps {
  imageUrl: string;
}

const Poster: React.FC<PosterProps> = ({
  imageUrl,
}) => {
  return (
    <div className="w-full md:w-80 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-200 hover:scale-105 my-4">
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
            <img
            className="w-full h-full object-cover object-center"
            src={imageUrl}
            />
        </div>
        <div className="p-6 flex flex-col flex-grow">
            {/* <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p> */}
            <div className="flex items-center justify-between mb-4">
            </div>
        </div>
    </div>
  );
};

export default Poster;
