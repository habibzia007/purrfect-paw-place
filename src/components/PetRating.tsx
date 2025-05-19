
import { useState } from "react";

interface PetRatingProps {
  rating: number;
  editable?: boolean;
  onRatingChange?: (newRating: number) => void;
  size?: "sm" | "md" | "lg";
}

const PetRating = ({ 
  rating, 
  editable = false, 
  onRatingChange,
  size = "sm" 
}: PetRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  // Convert size to dimensions
  const dimensions = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  
  const handleClick = (selectedRating: number) => {
    if (editable && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };
  
  const renderPaw = (pawIndex: number) => {
    const filled = (editable && hoverRating >= pawIndex) || (!editable && rating >= pawIndex);
    
    return (
      <svg 
        key={pawIndex}
        className={`${dimensions[size]} ${editable ? 'cursor-pointer' : ''} ${filled ? 'text-pet-purple' : 'text-gray-400'} transition-colors duration-200`}
        viewBox="0 0 24 24" 
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor" 
        strokeWidth="2"
        onMouseEnter={() => editable && setHoverRating(pawIndex)}
        onMouseLeave={() => editable && setHoverRating(0)}
        onClick={() => handleClick(pawIndex)}
      >
        <path d="M3 7a4 4 0 0 1 4-4c2 0 4 2 5 3.5C13 5 15 3 17 3a4 4 0 0 1 4 4c0 2-2 4-3.5 5 1.5 1 3.5 3 3.5 5a4 4 0 0 1-4 4c-2 0-4-2-5-3.5C11 19 9 21 7 21a4 4 0 0 1-4-4c0-2 2-4 3.5-5C5 11 3 9 3 7z"></path>
      </svg>
    );
  };
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(index => renderPaw(index))}
      
      {/* Display numerical rating if not editable */}
      {!editable && (
        <span className="ml-2 text-xs text-gray-300">{rating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default PetRating;
