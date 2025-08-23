import React, { useState } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Info,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";

interface CookingShowProps {
  episode?: {
    id: string;
    title: string;
    duration: number;
    currentTime?: number;
    description: string;
  };
  recipe?: {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    prepTime: string;
    cookTime: string;
    ingredients: string[];
    instructions: string[];
  };
}

const CookingShow = ({
  episode = {
    id: "1",
    title: "Butter Chicken Soul Stew - A Birthday Tribute to Mary Ann Davis",
    duration: 1800, // 30 minutes in seconds
    currentTime: 0,
    description:
      "In this special birthday tribute episode, Auntie Mae honors Mary Ann Davis by sharing her beloved Butter Chicken Soul Stew recipe - a beautiful fusion of Indian spices and soul food comfort that represents the journey from India to Detroit. This dish tells the story of adaptation, love, and the healing power of food.",
  },
  recipe = {
    id: "1",
    name: "Butter Chicken Soul Stew",
    category: "Fusion",
    difficulty: "Intermediate",
    prepTime: "20 mins",
    cookTime: "40 mins",
    ingredients: [
      "2 lbs chicken thighs, bone-in",
      "1 cup yogurt",
      "2 tbsp garam masala",
      "1 tbsp paprika",
      "1 tbsp cayenne pepper",
      "4 tbsp butter",
      "1 large onion, diced",
      "4 cloves garlic, minced",
      "2 tbsp ginger, grated",
      "1 can (14 oz) tomato sauce",
      "1 cup heavy cream",
      "1 cup chicken stock",
      "Salt and pepper to taste",
      "¼ cup fresh cilantro, chopped",
    ],
    instructions: [
      "Marinate chicken in yogurt, garam masala, paprika, and cayenne for at least 2 hours.",
      "In a large pot, melt butter and sauté onions until translucent.",
      "Add garlic and ginger, cook for 1 minute until fragrant.",
      "Add marinated chicken and cook for 5 minutes on each side.",
      "Pour in tomato sauce, heavy cream, and chicken stock. Stir well.",
      "Simmer on low heat for 30 minutes until chicken is tender and sauce thickens.",
      "Season with salt and pepper to taste.",
      "Garnish with fresh cilantro before serving.",
    ],
  },
}: CookingShowProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [showInteractivePrompt, setShowInteractivePrompt] = useState(false);

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, this would control the video playback
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, this would control the audio
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    // In a real implementation, this would adjust the audio volume
  };

  // Simulate progress update (would be tied to actual video playback in real implementation)
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / episode.duration) * 0.1;

          // Show interactive prompt at 25% progress
          if (Math.floor(newProgress) === 25 && !showInteractivePrompt) {
            setShowInteractivePrompt(true);
          }

          return newProgress > 100 ? 100 : newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, episode.duration, showInteractivePrompt]);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Main video display area */}
      <div className="relative w-full h-[60vh] bg-black">
        {/* Video placeholder - in a real implementation this would be a video player */}
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?w=1200&q=80"
            alt="Auntie Mae cooking"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Avatar overlay - this would be the 3D avatar in a real implementation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-respectful&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold"
              alt="Auntie Mae - Wise Indian-American Chef"
              className="h-[70%] w-auto"
            />
          </div>

          {/* Interactive prompt */}
          {showInteractivePrompt && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg animate-bounce">
              <p className="font-bold">Time to stir the pot!</p>
              <div className="mt-2 flex justify-center gap-2">
                <Button onClick={() => setShowInteractivePrompt(false)}>
                  Stir clockwise
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowInteractivePrompt(false)}
                >
                  Stir counter-clockwise
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress bar */}
          <Progress value={progress} className="h-1 mb-2" />

          {/* Time display */}
          <div className="flex justify-between text-xs text-white mb-2">
            <span>{formatTime((episode.duration * progress) / 100)}</span>
            <span>{formatTime(episode.duration)}</span>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {}}
                className="text-white hover:text-white hover:bg-white/20"
              >
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="text-white hover:text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              <div className="w-24">
                <Slider
                  value={[isMuted ? 0 : volume]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={handleVolumeChange}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Episode info and recipe details */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area - 70% */}
        <div className="w-[70%] p-6">
          <h1 className="text-3xl font-bold mb-2">{episode.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{recipe.category}</Badge>
            <Badge variant="outline">{recipe.difficulty}</Badge>
            <span className="text-sm text-muted-foreground">
              Prep: {recipe.prepTime}
            </span>
            <span className="text-sm text-muted-foreground">
              Cook: {recipe.cookTime}
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{episode.description}</p>

          <Tabs defaultValue="ingredients" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="notes">Auntie's Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredients" className="space-y-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <ul className="list-disc pl-5 space-y-2">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="instructions" className="space-y-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <ol className="list-decimal pl-5 space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="pl-2">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  <p>
                    "This recipe is dedicated to my dear friend Mary Ann Davis,
                    whose birthday we celebrate today. Mary Ann taught me that
                    food is medicine, and this dish represents the beautiful
                    fusion of my Indian heritage with the soul food traditions I
                    learned in Detroit. The key is to let the spices bloom in
                    the butter - that's where the healing magic happens!"
                  </p>
                  <p>
                    "Mary Ann always said that when we cook with love and
                    intention, we're not just feeding bodies - we're nourishing
                    souls. This Butter Chicken Soul Stew carries the wisdom of
                    generations, from my grandmother's kitchen in India to the
                    vibrant community kitchens of Detroit."
                  </p>
                  <p>
                    "If you can't find garam masala, you can make your own by
                    mixing cardamom, cinnamon, cloves, cumin, and coriander.
                    That's what I had to do back in the 60s when these spices
                    weren't easy to find in Detroit! For a vegetarian version,
                    substitute with chickpeas and cauliflower - Mary Ann would
                    approve of feeding everyone at the table."
                  </p>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 30% */}
        <div className="w-[30%] border-l p-6 bg-muted/20">
          <h2 className="text-xl font-semibold mb-4">Episode Information</h2>

          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">About This Episode</h3>
              <p className="text-sm text-muted-foreground">
                Season 1, Episode 3
              </p>
              <p className="text-sm text-muted-foreground">
                Original Air Date: June 15, 2023
              </p>
              <p className="text-sm mb-4">
                In this special birthday tribute episode, Auntie Mae honors Mary
                Ann Davis by sharing the story behind her signature Butter
                Chicken Soul Stew - a recipe that bridges cultures and heals
                hearts, combining traditional Indian spices with soul food
                cooking techniques learned in Detroit's vibrant community.
              </p>
            </CardContent>
          </Card>

          <h3 className="font-medium mb-2">Featured Kitchen Tools</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Cast iron Dutch oven</li>
            <li>Wooden spoon</li>
            <li>Spice grinder</li>
            <li>Chef's knife</li>
          </ul>

          <h3 className="font-medium mb-2">Cultural Background</h3>
          <p className="text-sm mb-4">
            This dish represents the beautiful fusion of Indian butter chicken
            (murgh makhani) with slow-cooked soul food stews, honoring Mary Ann
            Davis's belief that food is medicine. The creamy tomato base is
            common to both traditions, while the healing spice blend bridges
            Auntie Mae's Indian heritage with Detroit's soul food scene,
            creating comfort that nourishes both body and spirit.
          </p>

          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    Recipe History
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Auntie Mae developed this recipe in 1968 after moving to
                    Detroit with her husband.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="secondary" size="sm">
              Save Recipe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingShow;
