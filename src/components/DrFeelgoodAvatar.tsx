import React from 'react';
import { motion } from 'framer-motion';

interface DrFeelgoodAvatarProps {
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  className?: string;
}

const DrFeelgoodAvatar: React.FC<DrFeelgoodAvatarProps> = ({ 
  size = 'medium', 
  showLabel = true,
  className = ''
}) => {
  // Avatar size configurations
  const sizeConfig = {
    small: 'w-24 h-24',
    medium: 'w-48 h-48', 
    large: 'w-64 h-64'
  };

  // Generate avatar URL for Dr. Feelgood - medical professional style with distinctive face
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=dr-feelgood&backgroundColor=87ceeb&skinColor=brown&hairColor=black&clothingColor=white&accessoriesColor=red&top=ShortHairShortFlat&topColor=Black&eyes=Happy&eyebrow=Default&mouth=Smile&facialHair=Blank&clothing=ShirtCrewNeck&accessories=Round&accessoriesColor=red&clothingGraphic=Skull&clothingGraphicColor=red`;

  return (
    <div className={`relative ${className}`}>
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
      >
        <div className={`${sizeConfig[size]} relative`}>
          <img
            src={avatarUrl}
            alt="Dr. Feelgood - Your Medical Guide"
            className={`${sizeConfig[size]} object-cover border-4 border-blue-400 rounded-full shadow-2xl bg-blue-50`}
            onError={(e) => {
              // Fallback if avatar fails to load
              console.log('Dr. Feelgood avatar failed to load, using fallback');
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=dr-feelgood-fallback&backgroundColor=87ceeb&skinColor=brown&hairColor=black&clothingColor=white&accessoriesColor=red&top=ShortHairShortFlat&topColor=Black&eyes=Happy&eyebrow=Default&mouth=Smile&facialHair=Blank&clothing=ShirtCrewNeck&accessories=Round&accessoriesColor=red&clothingGraphic=Skull&clothingGraphicColor=red`;
            }}
          />
          
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full shadow-lg animate-pulse-glow"></div>
          
          {/* Medical cross overlay */}
          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
            ⚕
          </div>
        </div>
        
        {showLabel && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-400 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
            Dr. Feelgood
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DrFeelgoodAvatar;
