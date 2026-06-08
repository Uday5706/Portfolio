import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Experience from './components/Experience';
import Builds from './components/Builds';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [isSandTheme, setIsSandTheme] = useState(false);

  useEffect(() => {
    const root = document.documentElement; 
    
    if (isSandTheme) {
      root.classList.add('theme-sand');
    } else {
      root.classList.remove('theme-sand');
    }
  }, [isSandTheme]);

  return (
    /* Added transition-colors and duration-500 alongside text-text-main to handle global canvas shifts */
    <div className="bg-navy min-h-screen text-text-main font-poppins relative transition-colors duration-500 flex flex-col">
      
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50 bg-navy/90 backdrop-blur-sm transition-colors duration-500">
        <Navbar />
      </div>

      {/* Floating Game Mode Toggle (Hidden on mobile) */}
      <div className="fixed top-24 left-10 z-40 hidden md:block">
        <button 
          onClick={() => setIsSandTheme(!isSandTheme)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-text-muted/30 text-xs tracking-widest text-text-muted hover:text-text-main hover:border-text-main transition-all bg-navy/50 backdrop-blur-sm duration-500"
        >
          {/* Dynamic Indicator Dot with Glow Effect */}
          <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isSandTheme ? 'bg-mint shadow-[0_0_8px_var(--accent)]' : 'bg-text-muted/50'}`}></div>
          {isSandTheme ? 'SAND MODE' : 'GAME MODE'}
        </button>
      </div>

      {/* THE MASTER CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-24 flex flex-col gap-12 md:gap-24 w-full flex-1">
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