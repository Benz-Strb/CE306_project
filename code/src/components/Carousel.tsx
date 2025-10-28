import React, { useRef, useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Poster from './Poster';

interface ListItem {
  id: number;
  imageUrl: string;
  title: string;
  rating: string;
  episodes: string;
}

interface CarouselProps {
  items: ListItem[];
  title?: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, title }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div 
      className="mb-12 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title && (
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 px-4 md:px-8">
          {title}
        </h2>
      )}
      
      <div className="relative group">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className={`absolute left-0 top-0 bottom-0 z-30 bg-black/60 hover:bg-black/80 text-white px-2 md:px-4 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll left"
          >
            <BsChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
        
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto scrollbar-hide px-4 md:px-8 scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] xl:w-[15%]"
            >
              <Poster
                id={item.id}
                imageUrl={item.imageUrl}
                title={item.title}
                rating={item.rating}
                episodes={item.episodes}
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className={`absolute right-0 top-0 bottom-0 z-30 bg-black/60 hover:bg-black/80 text-white px-2 md:px-4 transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="Scroll right"
          >
            <BsChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        )}
      </div>
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Carousel;