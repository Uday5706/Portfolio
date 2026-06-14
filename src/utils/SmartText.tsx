// src/utils/SmartText.tsx
export const SmartText = ({ 
  text, 
  boldWords = [], 
  highlightedWords = [] 
}: { 
  text: string, 
  boldWords?: string[], 
  highlightedWords?: string[] 
}) => {
  const allTargets = Array.from(new Set([...boldWords, ...highlightedWords]));
  
  if (allTargets.length === 0) return <span className="whitespace-pre-wrap">{text}</span>;

  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  allTargets.sort((a, b) => b.length - a.length);
  const regex = new RegExp(`(${allTargets.map(escapeRegExp).join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const lowerPart = part.toLowerCase();
        const isBold = boldWords.some(w => w.toLowerCase() === lowerPart);
        const isHighlight = highlightedWords.some(w => w.toLowerCase() === lowerPart);

        // Added whitespace-pre-wrap to ensure HTML doesn't collapse spaces between spans
        let classNames = "whitespace-pre-wrap "; 
        if (isBold) classNames += "font-bold text-main ";
        if (isHighlight) classNames += "font-semibold text-mint ";

        return classNames.trim() !== "whitespace-pre-wrap" ? (
          <span key={index} className={classNames.trim()}>{part}</span>
        ) : (
          <span key={index} className="whitespace-pre-wrap">{part}</span>
        );
      })}
    </>
  );
};