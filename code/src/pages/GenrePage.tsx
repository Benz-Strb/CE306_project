import React, { useMemo } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import db from '../data/database';
import type { Media, Genre, MediaType, Nationality } from '../types/types';
import Carousel from '../components/Carousel';

const formatGenreFromUrl = (genreParam: string = ""): Genre => {
  if (genreParam === 'sci-fi') {
    return 'Sci-fi';
  }

  return genreParam
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') as Genre;
};

const movieGenres = ['Action', 'Drama', 'Comedy', 'Horror', 'Sci-fi'];
const seriesGenres = ['Comedy', 'Crime Thriller', 'Drama', 'Fantasy', 'Sci-fi'];
const allNationalities: Nationality[] = [...new Set(db.map(item => item.nationality))];

export const GenrePage: React.FC = () => {
  const { genre: genreParam } = useParams<{ genre: string }>();
  const location = useLocation();
  const navigate = useNavigate(); 

  const mediaType: MediaType | null = location.pathname.startsWith('/movies') 
    ? 'movie' 
    : location.pathname.startsWith('/series') ? 'series' : null;

  const targetGenre = genreParam ? formatGenreFromUrl(genreParam) : undefined;
  
  const availableGenres = mediaType === 'movie' ? movieGenres : seriesGenres;

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPath = e.target.value;
    navigate(newPath);
  };

  const basePath = mediaType === 'movie' ? '/movies' : '/series';
  const currentSelectValue = targetGenre 
    ? `${basePath}/${genreParam}`
    : basePath;

  const carouselsData = useMemo(() => {
    const genreFilteredMedia = db.filter(item => {
      const typeMatch = !mediaType || item.type === mediaType;
      const genreMatch = !targetGenre || item.genres.includes(targetGenre);
      return typeMatch && genreMatch;
    });

    const groupedByNationality: { [key in Nationality]?: Media[] } = {};
    for (const item of genreFilteredMedia) {
      if (!groupedByNationality[item.nationality]) {
        groupedByNationality[item.nationality] = [];
      }
      groupedByNationality[item.nationality]!.push(item);
    }

    const result = allNationalities
      .map(nat => ({
        nationality: nat,
        items: groupedByNationality[nat] || []
      }))
      .filter(group => group.items.length > 0);

    return result;
  }, [mediaType, targetGenre]);

  const title = targetGenre 
    ? `${targetGenre} ${mediaType === 'movie' ? 'Movies' : 'Series'}`
    : `All ${mediaType === 'movie' ? 'Movies' : 'Series'}`;

  return (
    <main className="flex-grow min-h-screen py-8">
      <div className="flex items-center justify-between mb-10 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-purple-700">{title}</h1>
        
        {mediaType && (
          <div className="flex space-x-4">
            <select 
              value={currentSelectValue}
              onChange={handleGenreChange}
              className="bg-purple-600 text-white p-2 rounded border border-purple-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value={basePath}>แนว (ทั้งหมด)</option>
              {availableGenres.map(genre => {
                const genrePath = `${basePath}/${genre.toLowerCase().replace(' ', '-')}`;
                return (
                  <option 
                    key={genre} 
                    value={genrePath}
                  >
                    {genre}
                  </option>
                );
              })}
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-col">
        {carouselsData.length > 0 ? (
          carouselsData.map(carousel => (
            <Carousel
              key={carousel.nationality}
              title={carousel.nationality}
              items={carousel.items}
            />
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl mb-2">ไม่พบรายการที่ตรงกัน</p>
            <p className="text-gray-500 text-sm">ลองเลือกหมวดหมู่อื่นดูนะ</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default GenrePage;