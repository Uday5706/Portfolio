import { useState } from 'react';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';

export default function Experience() {
  const { heading, jobs, formatting } = data.experience;
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-20 flex flex-col justify-center w-full">
      
      <div className="flex items-center mb-12">
        <h2 className="text-3xl md:text-4xl text-white font-semibold font-poppins whitespace-nowrap">
          {heading}
        </h2>
        <div className="ml-6 h-[1px] w-full max-w-xs bg-gray-700"></div>
      </div>

      {/* Main Grid: min-w-0 prevents layout blowouts on small screens */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 min-w-0">
        
        {/* LEFT COLUMN: Scrollable Vertical Tabs */}
        <div className="relative w-full md:w-48 shrink-0">
          
          {/* THE FIX: Explicitly defined overflow rules for each axis on both mobile and desktop.
              Added 'overflow-y-hidden' to stop the glitchy vertical scrollbar on mobile.
              Added 'md:overflow-x-hidden' to ensure desktop stays strictly vertical.
          */}
          <div className="flex md:flex-col overflow-x-auto overflow-y-hidden md:overflow-x-hidden md:overflow-y-auto max-h-[250px] md:max-h-[350px] border-b-2 md:border-b-0 md:border-l-2 border-gray-700 custom-scrollbar md:pr-2 relative">
            
            {/* Desktop Animated Line */}
            <div 
              className="hidden md:block absolute left-[-2px] top-0 w-[4px] bg-mint transition-transform duration-300 ease-in-out"
              style={{ transform: `translateY(${activeTab * 48}px)`, height: '48px' }}
            />

            {/* Mobile Animated Line (Horizontal) */}
            <div 
              className="md:hidden absolute bottom-[-2px] left-0 h-[4px] bg-mint transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(${activeTab * 200}px)`, width: '200px' }} 
            />

            {jobs.map((job: any, index: number) => (
              <button
                key={job.company}
                onClick={() => setActiveTab(index)}
                className={`h-12 min-h-[48px] w-[200px] md:w-full shrink-0 px-4 md:px-6 flex items-center justify-center md:justify-start text-sm font-mono transition-colors duration-300 ${
                  activeTab === index 
                    ? 'text-mint bg-mint/5' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-navy-light'
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
          
          {/* Pinned Headings: shrink-0 keeps this locked at the top */}
          <div className="shrink-0">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-200">
              {jobs[activeTab].role} <span className="text-mint block sm:inline">@ {jobs[activeTab].company}</span>
            </h3>
            <p className="text-sm font-mono text-gray-400 mt-2 mb-6 tracking-wide">
              {jobs[activeTab].duration}
            </p>
          </div>
          
          {/* Scrollable Bullets Container*/}
          <div className="flex-1 overflow-y-auto max-h-[250px] custom-scrollbar pr-2 md:pr-4">
            <ul className="flex flex-col gap-6">
              {jobs[activeTab].bullets.map((bullet: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-mint mt-1 mr-4 text-sm flex-shrink-0">▹</span>
                  <p className="text-[#8892b0] leading-relaxed text-base md:text-lg">
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