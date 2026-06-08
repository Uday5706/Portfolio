import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import data from '../data.json';
import { SmartText } from '../utils/SmartText';
import { AsciiRepel } from './AsciiRepel';

export default function Home() {
    const { layout, content, formatting } = data.hero;

    // Responsive layout flip: On mobile, it's always flex-col. 
    // On desktop (md:), it respects the patternPosition JSON config.
    const layoutClass = layout.patternPosition === "right"
        ? "md:flex-row-reverse"
        : "md:flex-row";

    const [typedHeading, setTypedHeading] = useState("");

    useEffect(() => {
        let i = 0;
        const fullText = content.heading;
        const timer = setInterval(() => {
            setTypedHeading(fullText.slice(0, i + 1));
            i++;
            if (i >= fullText.length) clearInterval(timer);
        }, 120);
        return () => clearInterval(timer);
    }, [content.heading]);

    return (
        // min-h-[calc(100vh-6rem)] ensures it takes up the screen minus navbar height, 
        // but allows it to grow if content pushes it, preventing overlays.
        <section id="home" className="min-h-[calc(100vh-6rem)] py-12 md:py-20 flex items-center justify-center w-full">
            <div className={`flex flex-col ${layoutClass} items-center justify-between gap-12 w-full`}>

                {/* Pattern/Portrait Container - Scales down on mobile */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    {/* THE THEME FIX: Replaced border-gray-700 and text-gray-600 with dynamic variables */}
                    {/* <div className="w-full max-w-[400px] h-[300px] md:h-[500px] border border-dashed border-text-muted/30 flex items-center justify-center text-text-muted/50 rounded-lg shrink-0 transition-colors duration-500">
              [ 3D Canvas / Pattern Placeholder ]
           </div> */}

                    
                    <div className="flex h-full justify-center items-center">
                        <AsciiRepel
                        src="/me.png"
                        width={300}
                        height={350}
                        resolution={4}
                        repelRadius={80}
                    />
                    </div>
                </div>

                {/* Text Container */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">

                    {/* THE THEME FIX: Replaced text-gray-200 with text-text-main */}
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-text-main mb-6 tracking-tight whitespace-pre-wrap leading-tight transition-colors duration-500">
                        <SmartText
                            text={typedHeading}
                            boldWords={formatting.boldWords}
                            highlightedWords={formatting.highlightedWords}
                        />
                        <span className="animate-pulse text-mint font-light inline-block translate-y-[-2px] ml-[2px]">|</span>
                    </h1>

                    {/* THE THEME FIX: Replaced text-[#8892b0] with text-text-muted */}
                    <p className="text-text-muted text-base md:text-lg leading-relaxed mb-10 max-w-lg transition-colors duration-500">
                        <SmartText text={content.description} boldWords={formatting.boldWords} highlightedWords={formatting.highlightedWords} />
                    </p>

                    <button className="flex items-center gap-3 px-6 py-4 border border-mint text-mint font-mono text-sm hover:bg-mint/10 rounded transition-all duration-500">
                        <Mail className="w-4 h-4" />
                        {content.buttonText}
                    </button>
                </div>

            </div>
        </section>
    );
}