import { AddSuperheroForm } from '@/components/add-superhero-from'
import { SuperheroesList } from '@/components/superhero-list'
import './app.css'

export function App() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Ejam Humble Superheroes
      </h1>
    
      <AddSuperheroForm/>
      <SuperheroesList />
      
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        ↑
      </button>
    </div>
  )
}
