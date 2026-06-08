import data from '../data.json';
import { SmartText } from '../utils/SmartText';

export default function About() {
  const { heading, description, skills, formatting, layout, imagePath } = data.about;

  // Dynamically swap the flex layout based on your JSON configuration
  const layoutDirection = layout.imagePosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row';
  
  // Duplicate the array for the seamless infinite loop
  const marqueeSkills = [...skills, ...skills];

  return (
    <section id="about" className="max-w-7xl w-full py-32 flex flex-col justify-center">
      
      {/* The Split Container */}
      <div className={`flex flex-col ${layoutDirection} gap-16 items-center`}>
        
        {/* TEXT & SKILLS COLUMN */}
        <div className={`w-full ${imagePath && layout.imagePosition !== 'none' ? 'md:w-3/5' : ''}`}>
          <div className="mb-8 flex items-center w-full">
            <h2 className=" text-3xl md:text-4xl text-white font-semibold font-poppins whitespace-nowrap">
              {heading}
            </h2>
          <div className="ml-6 h-[1px] flex-1 max-w-sm bg-gray-700"></div>
        </div>
          
          <p className="text-xl font-medium leading-relaxed text-[#8892b0] mb-12 max-w-2xl">
            <SmartText 
              text={description} 
              boldWords={formatting?.boldWords || []} 
              highlightedWords={formatting?.highlightedWords || []} 
            />
          </p>

          {/* PILL LAYOUT */}
          {layout.skillsDisplay === 'pill' && (
            <div className="flex flex-wrap gap-4">
              {skills.map((skill: string) => (
                <span key={skill} className="px-6 py-3 border border-mint text-mint rounded-lg text-lg font-mono hover:bg-mint hover:text-navy transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* AUTO-SCROLL CAROUSEL LAYOUT */}
          {layout.skillsDisplay === 'carousel' && (
            <div className="w-full overflow-hidden relative pt-2">
              {/* Fade out edges so the pills disappear smoothly */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none"></div>
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none"></div>
              
              <div className="flex w-max animate-marquee">
                {marqueeSkills.map((skill: string, idx: number) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="px-8 py-3 mx-2 border border-gray-700 bg-navy text-mint rounded-lg text-md font-mono whitespace-nowrap hover:border-mint transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* IMAGE COLUMN */}
        {imagePath && layout.imagePosition !== 'none' && (
          <div className="hidden md:block w-full md:w-2/5 flex justify-center">
            <div className="relative group max-w-sm w-[75%]">
              {/* The "Hacker" offset geometric border */}
              <div className="absolute inset-0 border-2 border-mint rounded-lg translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <img 
                src={imagePath} 
                alt="Uday Profile" 
                className="relative z-10 rounded-lg w-full object-cover aspect-[4/5] transition-all duration-500"
              />
              
              {/* Mint overlay that disappears on hover */}
              <div className="absolute inset-0 bg-mint/20 mix-blend-multiply z-20 rounded-lg opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}