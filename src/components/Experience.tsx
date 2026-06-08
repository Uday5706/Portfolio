import { useState } from 'react';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';

export default function Experience() {
  const { heading, jobs, formatting } = data.experience;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 flex flex-col justify-center w-full">
      
      <div className="flex items-center mb-12">
        {/* THEME FIX: text-white -> text-text-main */}
        <h2 className="text-3xl md:text-4xl text-text-main font-semibold font-poppins whitespace-nowrap transition-colors duration-500">
          {heading}
        </h2>
        {/* THEME FIX: bg-gray-700 -> bg-text-muted/30 */}
        <div className="ml-6 h-[1px] w-full max-w-xs bg-text-muted/30 transition-colors duration-500"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-w-0">
        
        {/* LEFT COLUMN: Tabs */}
        <div className="relative w-full md:w-48 shrink-0">
          {/* THEME FIX: border-gray-700 -> border-text-muted/30 */}
          <div className="flex md:flex-col overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto max-h-[250px] md:max-h-[350px] border-b-2 md:border-b-0 md:border-l-2 border-text-muted/30 custom-scrollbar md:pr-2 relative transition-colors duration-500">
            
            {/* Desktop Animated Line */}
            <div 
              className="hidden md:block absolute left-[-2px] top-0 w-[4px] bg-mint transition-all duration-300 ease-in-out"
              style={{ transform: `translateY(${activeTab * 48}px)`, height: '48px' }}
            />

            {/* Mobile Animated Line */}
            <div 
              className="md:hidden absolute bottom-[-2px] left-0 h-[4px] bg-mint transition-all duration-300 ease-in-out"
              style={{ transform: `translateX(${activeTab * 200}px)`, width: '200px' }} 
            />

            {jobs.map((job: any, index: number) => (
              <button
                key={job.company}
                onClick={() => setActiveTab(index)}
                // THEME FIX: Updated text and bg colors to variables
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
        </div>

        {/* RIGHT COLUMN: Job Details */}
        <div className="h-[400px] md:h-[450px] md:flex-1 flex flex-col min-w-0">
          
          <div className="shrink-0">
            {/* THEME FIX: text-gray-200 -> text-text-main */}
            <h3 className="text-xl md:text-2xl font-semibold text-text-main transition-colors duration-500">
              {jobs[activeTab].role} <span className="text-mint block sm:inline">@ {jobs[activeTab].company}</span>
            </h3>
            {/* THEME FIX: text-gray-400 -> text-text-muted */}
            <p className="text-sm font-mono text-text-muted mt-2 mb-6 tracking-wide transition-colors duration-500">
              {jobs[activeTab].duration}
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto max-h-[250px] custom-scrollbar pr-2 md:pr-4">
            <ul className="flex flex-col gap-6">
              {jobs[activeTab].bullets.map((bullet: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint mt-1 mr-4 text-sm flex-shrink-0">▹</span>
                  {/* THEME FIX: text-[#8892b0] -> text-text-muted */}
                  <p className="text-text-muted leading-relaxed text-base md:text-lg transition-colors duration-500">
                    <SmartText 
                      text={bullet} 
                      boldWords={formatting?.boldWords || []} 
                      highlightedWords={formatting?.highlightedWords || []} 
                    />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}