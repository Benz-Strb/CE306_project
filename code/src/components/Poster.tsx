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
        <div className="relative w-full overflow-hidden aspect-w-2 aspect-h-3">
            <img
            className="w-full h-full object-cover object-center"
            src={imageUrl}
            />
        </div>
    </div>
  );
};

export default Poster;