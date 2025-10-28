import React from 'react';
import Lists from '../components/lists';
import Carousel from '../components/Carousel';

const HomePage: React.FC = () => {
  return (
    <main className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-8">
      <Carousel 
        items={Lists} 
        title="รายการแนะนำ"
      />
      
      {/* <Carousel 
        items={ActionMovies} 
        title="หนังแอคชั่น"
      />
      
      <Carousel 
        items={PopularSeries} 
        title="ซีรีส์ยอดนิยม"
      /> ยังไม่ได้สร้างหมวดหนังแอคชั่นและหมวดซีรีส์ยอดนิยม */}
    </main>
  );
};

export default HomePage;