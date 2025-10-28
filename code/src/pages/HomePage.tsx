import Lists from '../components/lists';
import Poster from '../components/Poster';

const HomePage: React.FC = () => (
  <main className="flex-grow p-8 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
    <div className="shadow-xl rounded-xl p-8 mb-8">
      <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl shadow-lg p-6 container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">รายการแนะนำ</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Lists.map(list => (
            <Poster
              key={list.id}
              id={list.id}
              imageUrl={list.imageUrl}
              title={list.title}
              rating={list.rating}
              episodes={list.episodes}
            />
          ))}
        </div>
      </div>
    </div>
  </main>
);

export default HomePage;