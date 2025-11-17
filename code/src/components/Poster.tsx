import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsFillPlayFill, BsPlusLg, BsCheckLg, BsChevronDown } from 'react-icons/bs';
import type { MediaType, Media, Genre } from '../types/types';
import { useMyList } from '../context/MyListContext';
import { useAuth } from '../context/AuthContext';

interface PosterProps {
  id: number;
  imageUrl: string;
  title: string;
  rating: string;
  episodes: string;
  genres: Genre[];
  type?: MediaType;
  trailerUrl?: string;
}

const Poster: React.FC<PosterProps> = (props) => {
  const { id, imageUrl, title, rating, episodes, genres, type, trailerUrl } = props;
  
  const [isHovered, setIsHovered] = useState(false);
  
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const inList = isInMyList(id);
  
  const detailUrl = `/details/${type}/${id}`; 

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const toggleMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      const wantsToLogin = window.confirm("คุณยังไม่ได้เข้าสู่ระบบ\nกรุณาเข้าสู่ระบบเพื่อเก็บรายการของฉัน\n\nกด 'ตกลง' เพื่อไปหน้าเข้าสู่ระบบ");
      if (wantsToLogin) {
        navigate('/login');
      }
      return;
    }
    
    if (inList) {
      removeFromMyList(id);
    } else {
      const mediaObj: Media = { 
        id, imageUrl, title, rating, episodes, genres, 
        type: type!, 
        nationality: 'USA',
        description: '',
        trailerUrl 
      };
      addToMyList(mediaObj);
    }
  };

  return (
    <div 
      className="relative group w-full h-full transition-all duration-300 ease-in-out transform-gpu hover:scale-125 hover:z-40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={detailUrl} className="block w-full h-full rounded-lg overflow-hidden shadow-md relative">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover rounded-lg"
        />
      </Link>

      {isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-purple-50 to-yellow-50 text-gray-900 p-3 rounded-b-lg shadow-lg transform translate-y-full group-hover:translate-y-0 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 delay-150 z-20 border-2 border-purple-200">
          <h3 className="text-base font-semibold truncate mb-1 text-purple-900">{title}</h3>
          <div className="flex items-center justify-between mb-2">
            <div className="flex space-x-2">
              <Link 
                to={detailUrl}
                className="bg-gradient-to-r from-purple-500 to-yellow-400 text-white p-2 rounded-full hover:from-purple-600 hover:to-yellow-500 transition-all shadow-md flex items-center justify-center" 
                aria-label="Play"
              >
                <BsFillPlayFill className="w-4 h-4" />
              </Link>
              
              <button 
                onClick={toggleMyList}
                className={`border-2 p-2 rounded-full transition-all shadow-md flex items-center justify-center ${inList ? 'bg-white border-purple-500 text-purple-600' : 'border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-500'}`}
                aria-label="Toggle My List"
              >
                {inList ? (
                  <BsCheckLg className="w-4 h-4" />
                ) : (
                  <BsPlusLg className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <Link 
              to={detailUrl}
              className="border-2 border-purple-300 text-purple-700 p-2 rounded-full hover:bg-purple-50 transition-all shadow-md flex items-center justify-center" 
              aria-label="More info"
            >
              <BsChevronDown className="w-4 h-4" />
            </Link>

          </div>
          <div className="text-xs text-gray-700 space-y-1">
            <p className="font-medium">{rating} | {episodes}</p>
            <p className="truncate">{genres.join(', ')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Poster;