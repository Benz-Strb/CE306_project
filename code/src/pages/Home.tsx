import React, { useMemo, useState, useEffect } from 'react';
import db from '../data/database';
import type { Media, MediaType, Genre } from '../types/types';
import Carousel from '../components/Carousel';

const getMedia = (
  allMedia: Media[],
  type?: MediaType,
  genre?: Genre,
  excludeId?: number
): Media[] => {
  let filtered = allMedia;
  
  if (type) {
    filtered = filtered.filter(item => item.type === type);
  }
  if (genre) {
    filtered = filtered.filter(item => item.genres.includes(genre));
  }
  if (excludeId) {
    filtered = filtered.filter(item => item.id !== excludeId);
  }
  return filtered;
};

const shuffleArray = (array: Media[]): Media[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const Home: React.FC = () => {
  // รวมข้อมูลจาก database + localStorage
  const [allMedia, setAllMedia] = useState<Media[]>([]);

  useEffect(() => {
    const adminMovies = localStorage.getItem('admin-movies');
    const parsedAdminMovies = adminMovies ? JSON.parse(adminMovies) : [];
    setAllMedia([...db, ...parsedAdminMovies]);
  }, []);

  const recommendedItems = useMemo(() => {
    return shuffleArray(allMedia).slice(0, 20);
  }, [allMedia]);

  const actionMovies = useMemo(() => getMedia(allMedia, 'movie', 'Action'), [allMedia]);
  const comedyMovies = useMemo(() => getMedia(allMedia, 'movie', 'Comedy'), [allMedia]);
  const dramaMovies = useMemo(() => getMedia(allMedia, 'movie', 'Drama'), [allMedia]);
  const horrorMovies = useMemo(() => getMedia(allMedia, 'movie', 'Horror'), [allMedia]);
  const sciFiMovies = useMemo(() => getMedia(allMedia, 'movie', 'Sci-fi'), [allMedia]);
  const fantasySeries = useMemo(() => getMedia(allMedia, 'series', 'Fantasy'), [allMedia]);
  const sciFiSeries = useMemo(() => getMedia(allMedia, 'series', 'Sci-fi'), [allMedia]);
  const comedySeries = useMemo(() => getMedia(allMedia, 'series', 'Comedy'), [allMedia]);
  const crimeThrillerSeries = useMemo(() => getMedia(allMedia, 'series', 'Crime Thriller'), [allMedia]);
  const dramaSeries = useMemo(() => getMedia(allMedia, 'series', 'Drama'), [allMedia]);

  return (
    <main className="flex-grow min-h-screen py-8">
      
      <section id="home">
         <Carousel 
          items={recommendedItems}
          title="รายการแนะนำ"
        />
      </section>

      <section id="movies" className="pt-8"> 
        <Carousel 
          items={actionMovies} 
          title="ภาพยนตร์แอคชั่น"
        />
        <Carousel 
          items={comedyMovies} 
          title="ภาพยนตร์ตลก"
        />
        <Carousel 
          items={dramaMovies} 
          title="ภาพยนตร์ดราม่า"
        />
        <Carousel 
          items={horrorMovies} 
          title="ภาพยนตร์สยองขวัญ"
        />
        <Carousel 
          items={sciFiMovies} 
          title="ภาพยนตร์ไซไฟ"
        />
      </section>
      
      <section id="series" className="pt-8">
        <Carousel 
          items={fantasySeries} 
          title="ซีรีส์แฟนตาซี"
        />
        <Carousel 
          items={sciFiSeries} 
          title="ซีรีส์ Sci-Fi"
        />
        <Carousel 
          items={comedySeries} 
          title="ซีรีส์ตลก"
        />
        <Carousel 
          items={crimeThrillerSeries} 
          title="ซีรีส์อาชญากรรม-ระทึกขวัญ"
        />
        <Carousel 
          items={dramaSeries} 
          title="ซีรีส์ดราม่า"
        />
      </section>

    </main>
  );
};

export default Home;