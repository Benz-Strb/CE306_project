import React from 'react';
import { BsPlayFill, BsPlus, BsHandThumbsUp, BsChevronDown } from 'react-icons/bs';

interface PosterProps {
  id: number;
  imageUrl: string;
  title?: string;
  rating?: string;
  episodes?: string;
}

const Poster: React.FC<PosterProps> = ({ imageUrl, title = "", rating = "", episodes = "" }) => {
  return (
    <div className="group relative w-full md:w-80 bg-gray-800 rounded-xl shadow-lg overflow-hidden flex flex-col transition-transform duration-300 hover:scale-105 my-4 z-0 hover:z-20">
      <div className="relative w-full overflow-hidden aspect-w-16 aspect-h-9 md:aspect-w-16 md:aspect-h-9">
        <img
          className="w-full h-full object-cover object-center transition-opacity duration-300 group-hover:opacity-50"
          src={imageUrl}
          alt={title || 'Poster'}
        />
      </div>

      <div className="absolute inset-0 z-10 rounded-xl overflow-hidden opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 ease-in-out delay-150 group-hover:delay-0 flex flex-col bg-gray-800 shadow-2xl">
        <div className="relative w-full h-1/2 overflow-hidden">
          <img
            className="w-full h-full object-cover object-center"
            src={imageUrl}
            alt={title || 'Poster Preview'}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30"></div>
        </div>

        <div className="p-4 flex flex-col flex-grow text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <button className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-black hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white transition-all">
                <BsPlayFill size={24} />
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
                <BsPlus size={24} />
              </button>
              <button className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
                <BsHandThumbsUp size={16} />
              </button>
            </div>
            <button className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all">
              <BsChevronDown size={16} />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <span className="border border-gray-500 px-1">{rating}</span>
            <span>{episodes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;