import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';

// --- FRAMER MOTION VARIANTS ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

// 1. Add Tab Content Variants to handle staggering the bullets
// When 'visible' is triggered, it animates itself and then cascades the signal to its children
const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.5, // Animates each child element 0.15s after the previous one
      delayChildren: 0.3,    // Waits 0.1s before starting the child animations
    },
  },
};

// 2. Add Bullet Variants for the individual list items
// These wait for the 'visible' signal from the parent container to execute
const bulletVariants: Variants = {
  hidden: { opacity: 0, x: -15 }, // Start slightly offset to the left
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

export default function Experience() {
  const { heading, jobs, formatting } = data.experience;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 flex flex-col justify-center w-full overflow-hidden">
      
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col w-full"
      >
        
        <motion.div variants={itemVariants} className="flex items-center mb-12">
          <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap transition-colors duration-500">
            {heading}
          </h2>
          <div className="ml-6 h-[1px] w-full max-w-xs bg-text-muted/30 transition-colors duration-500"></div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-w-0">
          
          <motion.div variants={itemVariants} className="relative w-full md:w-48 shrink-0">
            <div className="flex md:flex-col overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto max-h-[250px] md:max-h-[350px] border-b-2 md:border-b-0 md:border-l-2 border-text-muted/30 custom-scrollbar md:pr-2 relative transition-colors duration-500">
              
              <div 
                className="hidden md:block absolute left-[-2px] top-0 w-[4px] bg-mint transition-all duration-300 ease-in-out"
                style={{ transform: `translateY(${activeTab * 48}px)`, height: '48px' }}
              />

              <div 
                className="md:hidden absolute bottom-[-2px] left-0 h-[4px] bg-mint transition-all duration-300 ease-in-out"
                style={{ transform: `translateX(${activeTab * 200}px)`, width: '200px' }} 
              />

              {jobs.map((job: any, index: number) => (
                <button
                  key={job.company}
                  onClick={() => setActiveTab(index)}
                  className={`h-12 min-h-[48px] w-[200px] md:w-full shrink-0 px-4 md:px-6 flex items-center justify-center md:justify-start text-sm font-mono transition-colors duration-500 ${
                    activeTab === index 
                      ? 'text-mint bg-mint/5' 
                      : 'text-text-muted hover:text-text-main hover:bg-navy-light'
                  }`}
                >
                  <span className="truncate w-full block text-center md:text-left">
                    {job.company}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="h-[400px] md:h-[450px] md:flex-1 flex flex-col min-w-0">
            
            {/* 3. Link the Tab Container to the new variants */}
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col h-full"
            >
              {/* Note: Header elements remain standard divs so they don't inherit the stagger delay and appear instantly */}
              <div className="shrink-0">
                <h3 className="text-xl md:text-2xl font-semibold text-text-main transition-colors duration-500">
                  {jobs[activeTab].role} <span className="text-mint block sm:inline">@ {jobs[activeTab].company}</span>
                </h3>
                <p className="text-sm font-mono text-text-muted mt-2 mb-6 tracking-wide transition-colors duration-500">
                  {jobs[activeTab].duration}
                </p>
              </div>
              
              <div className="flex-1 overflow-y-auto max-h-[250px] custom-scrollbar pr-2 md:pr-4">
                <ul className="flex flex-col gap-6">
                  {jobs[activeTab].bullets.map((bullet: string, index: number) => (
                    <motion.li 
                      key={index} 
                      variants={bulletVariants} 
                      className="flex items-start"
                    >
                      <span className="text-mint mt-1 mr-4 text-sm flex-shrink-0">▹</span>
                      <p className="text-text-muted leading-relaxed text-base md:text-lg transition-colors duration-500">
                        <SmartText 
                          text={bullet} 
                          boldWords={formatting?.boldWords || []} 
                          highlightedWords={formatting?.highlightedWords || []} 
                        />
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}