import { useState } from 'react';
import { Mail, PenTool, Menu, X } from 'lucide-react';
import data from '../data.json';

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-mint transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 hover:text-mint transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export default function Navbar() {
  const { logo, socials } = data.navbar;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 flex justify-between items-center py-6 relative">
      
      {/* LEFT SIDE: Hamburger + Logo + Desktop Links */}
      <div className="flex items-center gap-4 md:gap-8 relative">
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-text-main hover:text-mint transition-colors z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Logo */}
        <span className="text-text-main font-bold text-xl tracking-wide z-50 relative">
          {logo}
        </span>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-text-muted">
          {data.sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="hover:text-text-main transition-colors">
              {section.title}
            </a>
          ))}
        </div>

        {/* ======================================================== */}
        {/* ANIMATED MOBILE DIALOG BOX */}
        {/* ======================================================== */}
        <div 
          className={`
            absolute top-12 left-0 w-48 bg-navy-light border border-gray-700 shadow-2xl rounded-xl p-4 flex flex-col gap-4 md:hidden z-40
            transform origin-top-left transition-all duration-300 ease-out
            ${isMobileMenuOpen 
              ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' 
              : 'opacity-0 scale-95 pointer-events-none -translate-y-2'
            }
          `}
        >
          {data.sections.map((section) => (
            <a 
              key={section.id} 
              href={`#${section.id}`} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-text-main text-base font-medium hover:text-mint transition-colors w-full text-left"
            >
              {section.title}
            </a>
          ))}
        </div>

      </div>
      
      {/* RIGHT SIDE: Socials */}
      <div className="flex gap-4 md:gap-5 text-text-muted z-50 relative">
        <a href={socials.email} className="hover:text-mint transition-colors"><Mail className="w-5 h-5" /></a>
        <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-mint transition-colors"><GithubIcon /></a>
        <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-mint transition-colors"><LinkedinIcon /></a>
        <a href={socials.blog} target="_blank" rel="noopener noreferrer" className="hover:text-mint transition-colors hidden sm:block"><PenTool className="w-5 h-5" /></a>
      </div>

    </nav>
  );
}