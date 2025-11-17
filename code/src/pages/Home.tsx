import React, { useMemo } from 'react';
import db from '../data/database';
import type { Media, MediaType, Genre } from '../types/types';
import Carousel from '../components/Carousel';

const getMedia = (
  type?: MediaType,
  genre?: Genre,
  excludeId?: number
): Media[] => {
  let filtered = db;
  
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
  const recommendedItems = useMemo(() => {
    return shuffleArray(db).slice(0, 20);
  }, []);

  const actionMovies = useMemo(() => getMedia('movie', 'Action'), []);
  const comedyMovies = useMemo(() => getMedia('movie', 'Comedy'), []);
  const dramaMovies = useMemo(() => getMedia('movie', 'Drama'), []);
  const horrorMovies = useMemo(() => getMedia('movie', 'Horror'), []);
  const sciFiMovies = useMemo(() => getMedia('movie', 'Sci-fi'), []);
  const fantasySeries = useMemo(() => getMedia('series', 'Fantasy'), []);
  const sciFiSeries = useMemo(() => getMedia('series', 'Sci-fi'), []);
  const comedySeries = useMemo(() => getMedia('series', 'Comedy'), []);
  const crimeThrillerSeries = useMemo(() => getMedia('series', 'Crime Thriller'), []);
  const dramaSeries = useMemo(() => getMedia('series', 'Drama'), []);

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