import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Folder, ChevronLeft, ChevronRight } from 'lucide-react';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';

// Custom SVGs
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 hover:text-mint transition-colors duration-500"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 hover:text-mint transition-colors duration-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
);

// --- FRAMER MOTION VARIANTS ---

// Standard slide-up for single elements (Header, Carousel)
const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

// Container variant to stagger the grid cards
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// The animation for each individual card in the grid
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export default function Builds() {
  const { heading, projects, formatting } = data.builds;
  const githubLink = data.navbar.socials.github; 
  
  const featuredProjects = projects.filter((p: any) => p.imagePath);
  const gridProjects = projects.filter((p: any) => !p.imagePath);

  const mobileProjects = projects.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));

  return (
    <section id="builds" className="py-12 md:px-12 flex flex-col justify-center w-full min-w-0">
      
      {/* HEADER (Animated on scroll) */}
      <motion.div 
        variants={slideUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center justify-between mb-12"
      >
        <div className="flex items-center w-full">
          <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap transition-colors duration-500">
            {heading}
          </h2>
          <div className="ml-6 h-[1px] flex-1 max-w-sm bg-text-muted/30 transition-colors duration-500"></div>
        </div>
        <a href={githubLink} target="_blank" rel="noreferrer" className="hidden md:block text-mint font-mono text-sm hover:underline whitespace-nowrap ml-4 transition-colors duration-500">
          View all
        </a>
      </motion.div>

      {/* FEATURED CAROUSEL (Animated on scroll) */}
      {featuredProjects.length > 0 && (
        <motion.div 
          variants={slideUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-16 relative hidden sm:block"
        >
          <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
            
            <div 
              className="flex w-full h-full transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {featuredProjects.map((project: any, idx: number) => (
                <div key={idx} className="relative w-full shrink-0 h-full flex flex-col items-center justify-end p-6 md:p-12 overflow-hidden group">
                  
                  {/* Background Image with Solid Overlay */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.imagePath})` }}
                  >
                    <div className="absolute inset-0 bg-navy-light/90 transition-colors duration-500"></div>
                  </div>

                  {/* Slide Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <h4 className="text-2xl md:text-4xl font-bold text-text-main mb-3 md:mb-4 transition-colors duration-500">
                      {project.title}
                    </h4>
                    
                    <p className="text-xs w-[80%] font-normal md:text-base text-text-muted max-w-2xl mb-6 md:mb-8 line-clamp-3 md:line-clamp-none transition-colors duration-500">
                      <SmartText 
                        text={project.description} 
                        boldWords={formatting?.boldWords} 
                        highlightedWords={formatting?.highlightedWords} 
                      />
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 mb-6 font-mono text-[10px] md:text-xs text-mint transition-colors duration-500">
                      {project.techStack.map((tech: string) => (
                        <span key={tech}>{tech.toUpperCase()}</span>
                      ))}
                    </div>

                    <div className="flex gap-4 text-text-muted transition-colors duration-500">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                          <GithubIcon />
                        </a>
                      )}
                      {project.external && (
                        <a href={project.external} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                          <ExternalIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {featuredProjects.length > 1 && (
              <>
                <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-mint z-20 transition-colors duration-500 bg-navy/20 rounded-full hover:bg-navy/50">
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-mint z-20 transition-colors duration-500 bg-navy/20 rounded-full hover:bg-navy/50">
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
              </>
            )}
          </div>

          {/* Pagination Bars */}
          {featuredProjects.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {featuredProjects.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 transition-all duration-300 rounded-full ${
                    currentSlide === idx ? 'w-8 bg-mint' : 'w-4 bg-text-muted/50 hover:bg-text-muted'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* GRID PROJECTS (Desktop - Staggered scroll reveal) */}
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {gridProjects.map((project: any, index: number) => (
          <motion.div 
            variants={cardVariants}
            key={index} 
            className="bg-navy-light rounded-lg p-6 md:p-8 flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group"
          >
            <div className="flex justify-between items-center mb-8 text-text-muted transition-colors duration-500">
              <Folder className="w-8 h-8 text-mint stroke-1" />
              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                    <GithubIcon />
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-text-main mb-4 group-hover:text-mint transition-colors duration-500">
              {project.title}
            </h3>
            <div className="text-text-muted font-medium text-sm leading-relaxed mb-8 flex-1 transition-colors duration-500">
              <SmartText 
                text={project.description} 
                boldWords={formatting?.boldWords} 
                highlightedWords={formatting?.highlightedWords} 
              />
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto font-mono text-xs text-text-muted transition-colors duration-500">
              {project.techStack.map((tech: string) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* MOBILE ONLY GRID (Staggered scroll reveal) */}
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid sm:hidden grid-cols-1 gap-6"
      >
        {mobileProjects.map((project: any, index: number) => (
          <motion.div 
            variants={cardVariants}
            key={index} 
            className="bg-navy-light rounded-lg p-6 flex flex-col h-full transition-all duration-500 group"
          >
            {project.imagePath && (
              <div className="w-full h-40 mb-6 rounded bg-navy/50 overflow-hidden shrink-0 relative transition-colors duration-500">
                <img 
                  src={project.imagePath} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen" 
                />
              </div>
            )}

            <div className="flex justify-between items-center mb-6 text-text-muted transition-colors duration-500">
              <Folder className="w-8 h-8 text-mint stroke-1" />
              <div className="flex gap-4">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                    <GithubIcon />
                  </a>
                )}
                {project.external && (
                  <a href={project.external} target="_blank" rel="noreferrer" className="hover:text-mint transition-colors duration-500">
                    <ExternalIcon />
                  </a>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-text-main mb-3 group-hover:text-mint transition-colors duration-500">
              {project.title}
            </h3>
            <div className="text-text-muted text-sm leading-relaxed mb-6 flex-1 transition-colors duration-500">
              <SmartText 
                text={project.description} 
                boldWords={formatting?.boldWords} 
                highlightedWords={formatting?.highlightedWords} 
              />
            </div>

            <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-auto font-mono text-xs text-text-muted transition-colors duration-500">
              {project.techStack.map((tech: string) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      {/* MOBILE BUTTON (Fade in) */}
      <motion.div 
        variants={slideUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="md:hidden mt-10 flex justify-center w-full"
      >
        <a 
          href={githubLink} 
          target="_blank" 
          rel="noreferrer" 
          className="px-8 py-3 border border-mint text-mint font-mono text-sm rounded hover:bg-mint/10 transition-colors duration-500"
        >
          View all
        </a>
      </motion.div>

    </section>
  );
}