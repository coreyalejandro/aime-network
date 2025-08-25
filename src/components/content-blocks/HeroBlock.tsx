import React from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroBlock() {
  return (
    <div className="bg-surface-2 rounded-lg p-8 border border-outline/20 shadow-elev-3">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="text-6xl font-serif text-primary">The Black Women's Guide to Graves' Disease</h1>
            <p className="mt-4 text-lg text-on-surface-variant">
              A guide for community, care, and lived experience
            </p>
            <p className="mt-4 text-base text-on-surface">
              Stories from Black women living with Graves' disease, practical care tips, and what to expect. Resources from healthcare professionals.
            </p>
          </div>

          <div className="relative">
            <div className="relative rounded-xl shadow-2xl overflow-hidden transform perspective-1000 hover:scale-105 transition-all duration-700 ease-out">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 via-transparent to-orange-900/20 z-10 pointer-events-none"></div>
              
              <AspectRatio ratio={4 / 3}>
                <img 
                  src="/hero-black-women-1536x1024.jpg" 
                  alt="Beautiful painting of four Black women sharing joyful laughter and camaraderie, with warm earthy tones and visible brushstrokes"
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700 ease-out"
                />
              </AspectRatio>
              
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-primary/10 rounded-xl -z-10 transform rotate-1"></div>
            <div className="absolute -bottom-8 -right-8 w-full h-full bg-amber-600/5 rounded-xl -z-20 transform rotate-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}