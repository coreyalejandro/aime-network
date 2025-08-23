import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  HandMetal,
  MessageSquare,
  ChefHat,
  RotateCcw,
} from "lucide-react";

interface AvatarDisplayProps {
  avatarUrl?: string;
  animations?: string[];
  currentOutfit?: string;
  onAnimationChange?: (animation: string) => void;
}

const AvatarDisplay = ({
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-respectful&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold",
  animations = ["wave", "talk", "cook", "idle"],
  currentOutfit = "Traditional Indian Heritage",
  onAnimationChange = () => {},
}: AvatarDisplayProps) => {
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoomLevel, setZoomLevel] = useState([100]);

  const handleAnimationChange = (animation: string) => {
    setCurrentAnimation(animation);
    onAnimationChange(animation);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleZoomChange = (value: number[]) => {
    setZoomLevel(value);
  };

  const resetAvatar = () => {
    setCurrentAnimation("idle");
    setIsPlaying(false);
    setZoomLevel([100]);
  };

  return (
    <Card className="w-full max-w-[600px] h-[500px] bg-slate-100 overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Auntie Mae</h3>
          <div className="text-sm text-muted-foreground">{currentOutfit}</div>
        </div>

        <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 rounded-md overflow-hidden">
          <motion.div
            className="relative"
            animate={{
              scale: zoomLevel[0] / 100,
              y: isPlaying && currentAnimation === "wave" ? [0, -10, 0] : 0,
              rotate:
                isPlaying && currentAnimation === "cook"
                  ? [0, -5, 5, -5, 0]
                  : 0,
            }}
            transition={{
              repeat: isPlaying ? Infinity : 0,
              duration: 1.5,
            }}
          >
            <img
              src={avatarUrl}
              alt="Auntie Mae Avatar"
              className="w-64 h-64 object-contain"
            />

            {isPlaying && currentAnimation === "talk" && (
              <motion.div
                className="absolute top-1/4 right-0"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <span role="img" aria-label="speech">
                    💬
                  </span>
                </div>
              </motion.div>
            )}

            {isPlaying && currentAnimation === "cook" && (
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <div className="bg-gray-300 p-2 rounded-full shadow-md">
                  <span role="img" aria-label="cooking">
                    🍳
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Zoom:</span>
            <Slider
              value={zoomLevel}
              min={50}
              max={150}
              step={5}
              onValueChange={handleZoomChange}
              className="flex-1"
            />
            <span className="text-sm w-10">{zoomLevel[0]}%</span>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={togglePlayPause}>
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button size="sm" variant="outline" onClick={resetAvatar}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={currentAnimation === "wave" ? "default" : "outline"}
                onClick={() => handleAnimationChange("wave")}
              >
                <HandMetal className="h-4 w-4 mr-1" />
                Wave
              </Button>
              <Button
                size="sm"
                variant={currentAnimation === "talk" ? "default" : "outline"}
                onClick={() => handleAnimationChange("talk")}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Talk
              </Button>
              <Button
                size="sm"
                variant={currentAnimation === "cook" ? "default" : "outline"}
                onClick={() => handleAnimationChange("cook")}
              >
                <ChefHat className="h-4 w-4 mr-1" />
                Cook
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvatarDisplay;
