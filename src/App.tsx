import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Builds from './components/Builds';
import Footer from './components/Footer';
import { useEffect,useState } from 'react';

function App() {
  const [isSandTheme, setIsSandTheme] = useState(false);

  // 2. Inject or remove the class on the document body whenever the state changes
  useEffect(() => {
    if (isSandTheme) {
      document.body.classList.add('theme-sand');
    } else {
      document.body.classList.remove('theme-sand');
    }
  }, [isSandTheme]);

  return (
    <div className="bg-navy min-h-screen text-gray-300 font-poppins relative">
      
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50 bg-navy/90 backdrop-blur-sm">
        <Navbar />
      </div>

      {/* Floating Game Mode Toggle (Hidden on mobile) */}
      <div className="fixed top-24 left-10 z-40 hidden md:block">
        <button 
          onClick={() => setIsSandTheme(!isSandTheme)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-600 text-xs tracking-widest text-text-muted hover:text-text-main hover:border-text-main transition-all bg-navy/50 backdrop-blur-sm"
        >
          {/* Indicator Dot */}
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${isSandTheme ? 'bg-mint shadow-[0_0_8px_var(--accent)]' : 'bg-gray-400'}`}></div>
          {isSandTheme ? 'SAND MODE' : 'GAME MODE'}
        </button>
      </div>

      {/* THE MASTER CONTAINER */}
      <div className="max-w-6xl mx-auto px-12 md:px-12 pt-12 flex flex-col gap-6 md:gap-24">
        <Home />
        <About />
        <Experience />
        <Builds />
        <Footer />
      </div>

    </div>
  );
}

export default App;