import { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Terminal } from 'lucide-react';
import data from '../data.json';

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const treeContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

const treeItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.2 } }
};

const SPINNER_FRAMES = ['/', '-', '\\', '|'];

export default function Skills() {
  const { heading, terminal, categories } = data.skills;
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const commandText = terminal.command;
  const [typedCommand, setTypedCommand] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  
  const [isResolving, setIsResolving] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);

  const currentCategoryData = categories.find((cat: any) => cat.id === activeCategory);

  useEffect(() => {
    if (!startTyping) return;
    
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setTypedCommand(commandText.slice(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex === commandText.length) {
        clearInterval(intervalId);
        setTimeout(() => setIsTypingComplete(true), 400); 
      }
    }, 50); 

    return () => clearInterval(intervalId);
  }, [startTyping, commandText]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % SPINNER_FRAMES.length);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isTypingComplete) return;
    
    setIsResolving(true);
    const timer = setTimeout(() => {
      setIsResolving(false);
    }, 600); 

    return () => clearTimeout(timer);
  }, [activeCategory, isTypingComplete]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isTypingComplete) return; 

    const currentIndex = categories.findIndex((cat: any) => cat.id === activeCategory);
    
    if (e.key === 'ArrowDown') {
      e.preventDefault(); 
      const nextIndex = (currentIndex + 1) % categories.length;
      setActiveCategory(categories[nextIndex].id);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault(); 
      const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
      setActiveCategory(categories[prevIndex].id);
    }
  };

return (
    <section id="skills" className="py-16 md:py-20 w-full min-w-0">
      
      <motion.div 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="flex items-center mb-8 md:mb-10"
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
        onViewportEnter={() => setStartTyping(true)} 
        className="w-full max-w-3xl mx-auto"
      >
        
        {/* Terminal Window */}
        <div 
          tabIndex={0} 
          onKeyDown={handleKeyDown}
          className="rounded-xl overflow-hidden bg-navy-light/80 border border-text-muted/20 shadow-xl focus:outline-none focus:ring-1 focus:ring-mint/50 transition-shadow duration-300 group flex flex-col h-[65vh] min-h-[420px] max-h-[550px]"
        >
          
          {/* Title Bar */}
          <div className="flex items-center px-4 py-3 bg-navy border-b border-text-muted/10 shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto flex items-center gap-2 text-text-muted/80 text-sm font-mono group-focus:text-mint/80 transition-colors">
              <Terminal className="w-4 h-4" />
              bash - {terminal.user}@{terminal.host}: {terminal.directory}
            </div>
          </div>

          {/* Terminal Body: Updated font sizes for better readability */}
          <div className="p-5 md:p-6 font-mono text-base md:text-[15px] leading-relaxed flex flex-col gap-5 overflow-y-auto custom-scrollbar h-full">
            
            {/* Input Line */}
            <div>
              <span className="text-mint font-bold">{terminal.user}@{terminal.host}</span>
              <span className="text-text-main">:</span>
              <span className="text-text-main font-bold">{terminal.directory}</span>
              <span className="text-text-main">$ {typedCommand}</span>
              
              {!isTypingComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-2.5 h-5 bg-mint/80 ml-1.5 align-middle"
                />
              )}
            </div>

            {/* Payload UI */}
            {isTypingComplete && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-5"
              >
                {/* CLI Prompt */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-mint font-bold">?</span>
                    <span className="text-text-main font-bold">Select target environment:</span>
                  </div>

                  <div className="flex flex-col gap-2 ml-6">
                    {categories.map((cat: any) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          tabIndex={-1} 
                          onClick={() => setActiveCategory(cat.id)}
                          className={`text-left w-fit flex items-center gap-2 transition-all ${
                            isActive ? 'text-mint font-bold' : 'text-text-muted hover:text-text-main'
                          }`}
                        >
                          <span className={`${isActive ? 'opacity-100' : 'opacity-0'}`}>❯</span>
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ASCII Tree */}
                <div className="mt-2 border-t border-text-muted/10 pt-4">
                  <div className="text-text-muted mb-3 flex items-center gap-2">
                    {isResolving ? (
                      <span className="text-mint font-bold w-4 text-center">{SPINNER_FRAMES[frameIndex]}</span>
                    ) : (
                      <span className="text-mint w-4 text-center">✔</span>
                    )}
                    <span>{isResolving ? 'Fetching' : 'Resolved'} dependencies...</span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {!isResolving && (
                      <motion.div
                        key={activeCategory}
                        variants={treeContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col ml-4 text-text-main pb-4" 
                      >
                        <motion.div variants={treeItemVariants} className="text-text-main font-bold mb-1">
                          {currentCategoryData?.id}_modules/
                        </motion.div>
                        {currentCategoryData?.items.map((skill: string, index: number) => (
                          <motion.div key={skill} variants={treeItemVariants} className="flex items-center gap-2 py-[2px]">
                            <span className="text-text-muted/50">{index === currentCategoryData.items.length - 1 ? '└── ' : '├── '}</span>
                            <span className="text-text-muted hover:text-mint transition-colors">{skill}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}