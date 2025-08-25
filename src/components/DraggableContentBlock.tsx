import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentBlockSkeleton } from './SkeletonLoader';

export type ContentBlockType = 'hero' | 'articles' | 'editorial' | 'custom';

export interface ContentBlockData {
  id: string;
  type: ContentBlockType;
  title?: string;
  content: React.ReactNode;
  className?: string;
}

interface DraggableContentBlockProps {
  block: ContentBlockData;
  isDragging?: boolean;
  isOverlay?: boolean;
}

export default function DraggableContentBlock({ 
  block, 
  isDragging, 
  isOverlay
}: DraggableContentBlockProps) {
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: sortableIsDragging,
  } = useSortable({ 
    id: block.id
  });

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), Math.random() * 800 + 200);
    return () => clearTimeout(timer);
  }, []);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: sortableIsDragging ? 'none' : transition || 'transform 250ms ease',
  };

  const isCurrentlyDragging = isDragging || sortableIsDragging;

  if (isLoading && !isOverlay) {
    return (
      <div className={block.className}>
        <ContentBlockSkeleton type={block.type} />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        relative transition-all duration-300 ease-out transform-gpu select-none cursor-grab
        ${isCurrentlyDragging ? 'opacity-80 scale-[1.02] z-50 shadow-elev-5 cursor-grabbing' : 'opacity-100'}
      `}
      {...attributes}
      {...listeners}
    >
      {/* Content Block */}
      <div className={`
        border-2 transition-all duration-300 ease-out rounded-lg relative overflow-hidden
        ${isCurrentlyDragging 
          ? 'border-primary/70 bg-surface-1/90 shadow-elev-5 backdrop-blur-sm' 
          : 'border-transparent hover:border-primary/30'
        }
      `}>
        {/* Shimmer effect when dragging */}
        {isCurrentlyDragging && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/15 to-transparent animate-shimmer pointer-events-none z-10" />
        )}
        
        {block.content}
      </div>

      {/* Drag indicator */}
      {isCurrentlyDragging && (
        <div className="absolute -top-2 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider
                        bg-primary text-on-primary rounded-full shadow-md z-20
                        border border-white/20 backdrop-blur-sm">
          DRAGGING
        </div>
      )}
    </div>
  );
}