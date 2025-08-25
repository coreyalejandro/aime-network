import React from 'react';
import { motion } from 'framer-motion';
import { useAuntieMae } from '../contexts/AuntieMaeContext';

interface AuntieMaeAvatarProps {
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  className?: string;
}

const AuntieMaeAvatar: React.FC<AuntieMaeAvatarProps> = ({ 
  size = 'medium', 
  showLabel = true,
  className = ''
}) => {
  const { state } = useAuntieMae();
  
  // Avatar size configurations
  const sizeConfig = {
    small: 'w-24 h-24',
    medium: 'w-48 h-48', 
    large: 'w-64 h-64'
  };

  // Outfit to clothing color mapping
  const getClothingColor = (outfit: string) => {
    switch (outfit) {
      case 'kitchen-apron': return 'blue';
      case 'detroit-motown': return 'purple';
      case 'traditional-indian': return 'red';
      default: return 'red';
    }
  };

  // Generate avatar URL with distinctive, warm face
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-${state.currentOutfit || 'traditional-indian'}&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=${getClothingColor(state.currentOutfit || 'traditional-indian')}&accessoriesColor=gold&top=LongHairStraight&topColor=Gray&eyes=Happy&eyebrow=Default&mouth=Smile&facialHair=Blank&accessories=Round&accessoriesColor=gold&clothingGraphic=Skull&clothingGraphicColor=gold`;

  const outfitLabel = (state.currentOutfit || 'traditional-indian')
    .replace('-', ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

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
            alt="Auntie Mae - Your Health Guide"
            className={`${sizeConfig[size]} object-cover border-4 border-amber-400 rounded-full shadow-2xl bg-amber-50`}
            onError={(e) => {
              // Fallback if avatar fails to load
              console.log('Avatar failed to load, using fallback');
              (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-fallback&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold&accessories=Round&accessoriesColor=gold&clothingGraphic=Skull&clothingGraphicColor=gold`;
            }}
          />
          
          {/* Glowing effect */}
          <div className="absolute inset-0 rounded-full shadow-lg animate-pulse-glow"></div>
        </div>
        
        {showLabel && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
            {outfitLabel} Style
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuntieMaeAvatar;