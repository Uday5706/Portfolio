import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Code2, Trophy, ShieldCheck, Users, ArrowUpRight } from 'lucide-react';
import data from '../data.json';

// --- CUSTOM SVG ICON ---
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut" } 
  }
};

const getIcon = (type: string, isActive: boolean) => {
  const className = `w-5 h-5 md:w-8 md:h-8 transition-colors duration-500 ${isActive ? 'text-mint' : 'text-text-muted'}`;
  switch (type) {
    case 'code': return <Code2 className={className} />;
    case 'trophy': return <Trophy className={className} />;
    case 'shield': return <ShieldCheck className={className} />;
    case 'users': return <Users className={className} />;
    default: return <Code2 className={className} />;
  }
};

export default function Achievements() {
  const { heading, items } = data.achievements;
  const linkedin = data.navbar.socials.linkedin;
  const [expandedIndex, setExpandedIndex] = useState<number>(0);

  return (
    <section id="achievements" className="py-20 w-full min-w-0 overflow-hidden">
      
      {/* HEADER */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center justify-between mb-10 md:mb-12"
      >
        <div className="flex items-center w-full">
          <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap">
            {heading}
          </h2>
          <div className="ml-6 h-[1px] w-full max-w-xs bg-text-muted/30"></div>
        </div>
      </motion.div>

      {/* THE EXPANDING ACCORDION DECK */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto h-auto md:h-[450px] flex flex-col md:flex-row gap-3 md:gap-4"
      >
        {items.map((item: any, index: number) => {
          const isActive = index === expandedIndex;

          return (
            <motion.div
              key={item.id}
              layout 
              transition={{ layout: { type: "spring", bounce: 0, duration: 0.5 } }} 
              onClick={() => setExpandedIndex(index)}
              className={`relative cursor-pointer rounded-2xl overflow-hidden flex flex-col md:flex-row transition-colors duration-500 ${
                isActive 
                  ? "flex-[5] md:flex-[4] bg-navy-light border border-mint/30 shadow-[0_0_30px_rgba(100,255,218,0.05)]" 
                  : "flex-[1] bg-navy/40 hover:bg-navy/80 border border-text-muted/20"
              }`}
            >
              
              {/* THE "PILLAR" CONTENT (Inactive Mobile Row / Active Desktop Sidebar) */}
              <motion.div 
                layout="position" 
                className={`flex shrink-0 z-20 ${
                  isActive 
                    ? 'hidden md:flex md:flex-col md:items-center md:w-20 md:h-full bg-navy/20 border-r border-text-muted/10 p-6' 
                    : 'flex-row md:flex-col items-center w-full h-[72px] md:h-full px-5 md:px-6 justify-start md:pt-6'
                }`}
              >
                
                <div className="flex flex-row md:flex-col items-center gap-4 md:gap-6">
                  <span className={`font-mono text-xs md:text-base font-bold transition-colors duration-500 ${isActive ? 'text-mint/50' : 'text-text-muted/30'}`}>
                    {item.id}
                  </span>
                  <div className={`p-2.5 md:p-3 rounded-xl transition-colors duration-500 ${isActive ? 'bg-mint/10' : 'bg-text-muted/5'}`}>
                    {getIcon(item.icon, isActive)}
                  </div>
                  
                  {/* Inactive Mobile Category Title */}
                  {!isActive && (
                    <span className="md:hidden font-poppins font-bold tracking-wider uppercase text-text-muted/60 text-xs ml-1 truncate">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Desktop Vertical Category Title */}
                <div className={`hidden md:flex items-center justify-center font-poppins font-bold tracking-wider uppercase transition-colors duration-500 ${
                  isActive 
                    ? 'text-transparent' 
                    : 'text-text-muted/60 -rotate-90 origin-center absolute bottom-32 left-1/2 -translate-x-1/2 translate-y-1/2 group-hover:text-text-main w-[250px] text-center'
                }`}>
                  {!isActive && item.category}
                </div>
              </motion.div>

              {/* THE REVEALED CONTENT */}
              {isActive && (
                <div className="flex flex-col justify-end p-6 md:p-8 lg:p-10 h-full w-full flex-1 min-w-0 relative z-10">
                  
                  {/* Mobile Header (Replaces the hidden sidebar) */}
                  <div className="md:hidden flex flex-wrap items-center gap-3 mb-5">
                    <span className="font-mono text-xs font-bold text-mint/50">{item.id}</span>
                    <div className="p-2 rounded-lg bg-mint/10">
                      {getIcon(item.icon, isActive)}
                    </div>
                    <span className="inline-block px-2.5 py-1 bg-mint/10 border border-mint/20 text-mint font-mono text-[10px] rounded-full tracking-wide uppercase ml-auto">
                      {item.category}
                    </span>
                  </div>

                  {/* Desktop Category Badge */}
                  <div className="hidden md:block">
                    <span className="inline-block px-3 py-1 bg-mint/10 border border-mint/20 text-mint font-mono text-xs rounded-full tracking-wide uppercase mb-4">
                      {item.category}
                    </span>
                  </div>

                  <div className="max-w-xl w-full">
                    <h3 className="text-2xl md:text-4xl font-bold text-text-main leading-tight mb-2 md:mb-3 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-mint font-mono text-xs md:text-sm uppercase tracking-widest mb-4 md:mb-6 truncate">
                      {item.context}
                    </p>
                    <p className="text-text-muted text-sm md:text-lg font-medium leading-relaxed mb-6 md:mb-8">
                      {item.description}
                    </p>

                    {item.link && (
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-text-main font-mono text-xs md:text-sm hover:text-mint transition-colors duration-300 group"
                      >
                        View Details 
                        <ArrowUpRight className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              )}

            </motion.div>
          );
        })}
      </motion.div>

      {/* VIEW ALL ON LINKEDIN BUTTON */}
      {linkedin && (
        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-10 md:mt-12 flex justify-center w-full"
        >
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 border border-text-muted/20 hover:border-mint/50 bg-navy-light text-text-muted hover:text-mint rounded-lg font-mono text-xs md:text-sm transition-all duration-300 active:scale-95 group"
          >
            <LinkedinIcon className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
            View all on LinkedIn
          </a>
        </motion.div>
      )}

    </section>
  );
}