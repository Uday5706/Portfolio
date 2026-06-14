import { motion, type Variants } from 'framer-motion';
import { MapPin, GraduationCap, Code2, Download, Terminal } from 'lucide-react';
import data from '../data.json';
import { SmartText } from '../utils/SmartText'; // Ensure the path matches your folder structure

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 } 
  }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

const getIcon = (iconName: string) => {
  const className = "w-5 h-5 text-mint";
  switch (iconName) {
    case 'map': return <MapPin className={className} />;
    case 'graduation': return <GraduationCap className={className} />;
    case 'code': return <Code2 className={className} />;
    default: return <Terminal className={className} />;
  }
};

export default function About() {
  const { heading, paragraphs, quickFacts, resumeUrl, formatting } = data.about;

  return (
    <section id="about" className="py-20 w-full min-w-0">
      
      {/* HEADER */}
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap">
          {heading}
        </h2>
        <div className="ml-6 h-[1px] w-full max-w-xs bg-text-muted/30"></div>
      </motion.div>

      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col lg:flex-row gap-12 lg:gap-16 max-w-6xl mx-auto"
      >
        
        {/* LEFT COLUMN: The Narrative */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          {paragraphs.map((text: string, index: number) => (
            <motion.p 
              key={index}
              variants={childVariants}
              className="text-text-muted text-base md:text-lg leading-relaxed font-medium"
            >
              {/* Using the centralized SmartText component */}
              <SmartText 
                text={text} 
                boldWords={formatting.boldWords} 
                highlightedWords={formatting.highlightedWords} 
              />
            </motion.p>
          ))}
        </div>

        {/* RIGHT COLUMN: Executive Summary & Resume */}
        <motion.div 
          variants={childVariants}
          className="w-full lg:w-2/5 flex flex-col gap-6"
        >
          {/* Quick Facts Bento Box */}
          <div className="bg-navy-light rounded-2xl p-6 md:p-8 border border-text-muted/10 shadow-xl shadow-navy-light/10">
            <h3 className="font-mono text-text-main text-sm uppercase tracking-widest mb-6">
              Executive Summary
            </h3>
            
            <div className="flex flex-col gap-5">
              {quickFacts.map((fact: any, index: number) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="p-3 bg-mint/10 rounded-xl">
                    {getIcon(fact.icon)}
                  </div>
                  <div>
                    <p className="text-xs font-mono text-text-muted/60 uppercase tracking-wider mb-0.5">
                      {fact.label}
                    </p>
                    <p className="text-sm md:text-base font-bold text-text-main">
                      {fact.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Download Action */}
          {resumeUrl && (
            <a 
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-transparent border border-mint/50 hover:bg-mint/10 text-mint rounded-xl font-mono text-sm transition-all duration-300 active:scale-[0.98] group"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download Full Resume
            </a>
          )}
        </motion.div>

      </motion.div>
    </section>
  );
}