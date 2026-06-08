import { motion,type Variants } from 'framer-motion';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';

// --- FRAMER MOTION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const textVariants : Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -4 },
  visible: { 
    opacity: 1, scale: 1, rotate: 0, 
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
  },
};

export default function About() {
  const { heading, description, skills, formatting, layout, imagePath } = data.about;

  const layoutDirection = layout.imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row';
  const marqueeSkills = skills ? [...skills, ...skills] : [];

  return (
    <section id="about" className="max-w-7xl w-full py-32 flex flex-col justify-center overflow-hidden">
      
      {/* The Split Container - Animated with whileInView */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className={`flex flex-col ${layoutDirection} gap-16 items-center`}
      >
        
        {/* TEXT & SKILLS COLUMN */}
        <div className={`w-full ${imagePath && layout.imagePosition !== 'none' ? 'md:w-3/5' : ''}`}>
          
          <motion.div variants={textVariants} className="mb-8 flex items-center w-full">
            <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap transition-colors duration-500">
              {heading}
            </h2>
            <div className="ml-6 h-[1px] flex-1 max-w-sm bg-text-muted/30 transition-colors duration-500"></div>
          </motion.div>
          
          <motion.div variants={textVariants}>
            <p className="text-xl font-medium leading-relaxed text-text-muted mb-12 max-w-2xl transition-colors duration-500">
              <SmartText 
                text={description} 
                boldWords={formatting?.boldWords || []} 
                highlightedWords={formatting?.highlightedWords || []} 
              />
            </p>
          </motion.div>

          {/* PILL LAYOUT (with staggered pop-in animation) */}
          {layout.skillsDisplay === 'pill' && (
            <motion.div variants={textVariants} className="flex flex-wrap gap-3 md:gap-4">
              {skills?.map((skill: string, index: number) => (
                <motion.span 
                  key={`${skill}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05, type: "spring", stiffness: 150 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 md:px-6 md:py-3 border border-mint text-mint rounded-lg text-sm md:text-lg font-mono hover:bg-mint hover:text-navy transition-colors duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* AUTO-SCROLL CAROUSEL LAYOUT (with fade-in animation) */}
          {layout.skillsDisplay === 'carousel' && (
            <motion.div variants={textVariants} className="w-full overflow-hidden relative pt-2">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none transition-colors duration-500"></div>
              
              <div className="flex w-max animate-marquee hover:pause cursor-grab active:cursor-grabbing">
                {marqueeSkills.map((skill: string, idx: number) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="px-8 py-3 mx-2 border border-text-muted/30 bg-navy text-mint rounded-lg text-md font-mono whitespace-nowrap hover:border-mint transition-colors duration-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* IMAGE COLUMN */}
        {imagePath && layout.imagePosition !== 'none' && (
          <motion.div variants={imageVariants} className="hidden md:block w-full md:w-2/5 flex justify-center">
            <div className="relative group max-w-sm w-[75%]">
              <div className="absolute inset-0 border-2 border-mint rounded-lg translate-x-4 translate-y-4 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <img 
                src={imagePath} 
                alt="Profile" 
                className="relative z-10 rounded-lg w-full object-cover aspect-[4/5] transition-all duration-500"
              />
              
              <div className="absolute inset-0 bg-mint/20 mix-blend-multiply z-20 rounded-lg opacity-100 group-hover:opacity-0 transition-all duration-500"></div>
            </div>
          </motion.div>
        )}

      </motion.div>
    </section>
  );
}