import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  MessageSquare,
  Sparkles,
  Heart,
  Palette,
  Star,
  ShoppingBag,
  Users,
  Zap,
  User,
  Shirt,
} from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// INSTRUCTIONS FOR CUSTOMIZATION
// ============================================================================
/*
HOW TO CUSTOMIZE THIS FASHION SHOW:

1. CHANGE DESIGNER NAME:
   - Search for "Alex Chen" and replace with your designer name
   - Update characterName in fashionDesignerAvatar object

2. CHANGE EPISODES:
   - Modify the episodes array below
   - Each episode has: id, title, duration, description, collection
   - Add/remove episodes as needed

3. CHANGE OUTFITS:
   - Modify outfitCategories in fashionDesignerAvatar
   - Each outfit has: id, name, image, description, tags, rarity

4. CHANGE AI RESPONSES:
   - Modify responseTemplates in fashionDesignerAvatar
   - Add keywords and responses for different contexts

5. CHANGE IMAGES:
   - Replace all image URLs with your own images
   - Update avatarUrl for the designer avatar

6. ADD NEW FEATURES:
   - Add new tabs in the main content area
   - Add new buttons in the controls
   - Extend the episode handling system
*/

// ============================================================================
// EPISODE DATA - CUSTOMIZE HERE
// ============================================================================

interface FashionPiece {
  id: string;
  name: string;
  category: string;
  materials: string[];
  price: string;
  description: string;
  stylingTips: string[];
  image: string;
  designer: string;
  season: string;
}

interface FashionCollection {
  id: string;
  name: string;
  season: string;
  theme: string;
  designer: string;
  pieces: FashionPiece[];
  inspiration: string;
  runwayNotes: string[];
}

interface FashionEpisode {
  id: string;
  title: string;
  duration: number; // in seconds
  description: string;
  collection: FashionCollection;
}

// EPISODE HANDLING MECHANISM
const episodes: FashionEpisode[] = [
  {
    id: "1",
    title: "Autumn Elegance - A Tribute to Sustainable Luxury",
    duration: 1800, // 30 minutes
    description: "In this groundbreaking fashion show, we celebrate the fusion of luxury and sustainability. Each piece tells a story of craftsmanship, ethical sourcing, and timeless elegance.",
    collection: {
      id: "1",
      name: "Autumn Elegance Collection",
      season: "Fall/Winter 2024",
      theme: "Sustainable Luxury Meets Timeless Elegance",
      designer: "Alex Chen",
      inspiration: "Inspired by the golden hour light filtering through autumn leaves, this collection celebrates the beauty of natural cycles and sustainable luxury.",
      runwayNotes: [
        "Models walk to ambient nature sounds",
        "Lighting transitions from warm gold to deep amber",
        "Each piece is introduced with its sustainability story",
        "Interactive elements showcase material origins"
      ],
      pieces: [
        {
          id: "1",
          name: "Golden Hour Silk Dress",
          category: "Evening Wear",
          materials: ["Organic silk", "Recycled gold thread", "Natural dyes"],
          price: "$2,800",
          description: "A flowing silk dress that captures the essence of golden hour light. The organic silk drapes beautifully, while recycled gold thread adds subtle shimmer.",
          stylingTips: [
            "Pair with minimal gold jewelry to let the dress shine",
            "Perfect for evening events and special occasions",
            "The silk is naturally temperature regulating",
            "Hand wash cold to preserve the natural dyes"
          ],
          image: "https://images.unsplash.com/photo-1594736797933-d0200ba2fe65?w=800&q=80",
          designer: "Alex Chen",
          season: "Fall/Winter 2024"
        },
        {
          id: "2",
          name: "Sustainable Wool Coat",
          category: "Outerwear",
          materials: ["Ethical wool", "Recycled lining", "Natural buttons"],
          price: "$1,950",
          description: "A timeless wool coat crafted from ethically sourced merino wool. The recycled lining provides warmth while reducing environmental impact.",
          stylingTips: [
            "Layer over any outfit for instant sophistication",
            "The wool naturally repels water and odors",
            "Perfect for transitional weather",
            "Store on a wooden hanger to maintain shape"
          ],
          image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
          designer: "Alex Chen",
          season: "Fall/Winter 2024"
        },
        {
          id: "3",
          name: "Bamboo Silk Blouse",
          category: "Day Wear",
          materials: ["Bamboo silk", "Organic cotton", "Natural pearl buttons"],
          price: "$450",
          description: "A versatile blouse made from bamboo silk, known for its softness and sustainability. The fabric is naturally antibacterial and moisture-wicking.",
          stylingTips: [
            "Tuck into high-waisted pants for a polished look",
            "Layer under the wool coat for sophisticated layering",
            "The bamboo silk is naturally wrinkle-resistant",
            "Machine wash cold for easy care"
          ],
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
          designer: "Alex Chen",
          season: "Fall/Winter 2024"
        }
      ]
    }
  },
  {
    id: "2",
    title: "Spring Awakening - Sustainable Streetwear",
    duration: 1200, // 20 minutes
    description: "A fresh take on streetwear that doesn't compromise on style or sustainability. This collection redefines casual luxury for the modern urban lifestyle.",
    collection: {
      id: "2",
      name: "Spring Awakening Collection",
      season: "Spring/Summer 2024",
      theme: "Sustainable Streetwear Meets Urban Elegance",
      designer: "Alex Chen",
      inspiration: "Inspired by the energy of city life and the renewal of spring, this collection combines urban edge with sustainable materials.",
      runwayNotes: [
        "Models walk to urban beats",
        "Dynamic lighting reflects city energy",
        "Each piece showcases urban functionality",
        "Interactive elements highlight sustainability features"
      ],
      pieces: [
        {
          id: "4",
          name: "Urban Denim Jacket",
          category: "Streetwear",
          materials: ["Recycled denim", "Organic cotton", "Natural indigo"],
          price: "$380",
          description: "A modern denim jacket crafted from 100% recycled materials. The natural indigo dye creates a rich, deep color that ages beautifully.",
          stylingTips: [
            "Layer over any casual outfit for instant style",
            "The denim softens with each wear",
            "Perfect for both day and evening",
            "Wash infrequently to preserve the natural indigo"
          ],
          image: "https://images.unsplash.com/photo-1594736797933-d0200ba2fe65?w=800&q=80",
          designer: "Alex Chen",
          season: "Spring/Summer 2024"
        }
      ]
    }
  }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const FashionShowComplete = () => {
  // Episode handling state
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [showInteractivePrompt, setShowInteractivePrompt] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{
    user: string;
    designer: string;
    timestamp: Date;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentEpisode = episodes[currentEpisodeIndex];
  const currentCollection = currentEpisode.collection;

  // Episode navigation
  const nextEpisode = () => {
    if (currentEpisodeIndex < episodes.length - 1) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  const previousEpisode = () => {
    if (currentEpisodeIndex > 0) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      setProgress(0);
      setIsPlaying(false);
    }
  };

  // AI responses
  const generateDesignerResponse = async (userInput: string): Promise<string> => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const inputLower = userInput.toLowerCase();
    let response = "";
    
    if (inputLower.includes("silk") || inputLower.includes("fabric")) {
      response = "The silk in this collection is absolutely divine! We're using organic silk that's not only luxurious but also sustainable. The way it drapes and moves is pure poetry.";
    } else if (inputLower.includes("sustainable") || inputLower.includes("eco")) {
      response = "Sustainability is at the heart of everything we do! Every material is carefully sourced - from the organic silk to the recycled denim. Fashion can be both beautiful and responsible.";
    } else if (inputLower.includes("styling") || inputLower.includes("wear")) {
      response = "Styling is all about confidence and personal expression! These pieces are designed to work together seamlessly. Layer the bamboo silk blouse under the wool coat for instant sophistication.";
    } else if (inputLower.includes("price") || inputLower.includes("cost")) {
      response = "Quality and sustainability come with investment, but these pieces are designed to last a lifetime. Think of it as building a capsule wardrobe that grows more beautiful with time.";
    } else if (inputLower.includes("designer") || inputLower.includes("alex")) {
      response = "Alex Chen is a visionary! They believe that luxury and sustainability aren't mutually exclusive. Their designs celebrate the beauty of natural materials while pushing the boundaries of ethical fashion.";
    } else {
      response = "I love your questions about fashion! This collection is all about creating beauty that doesn't compromise our values. What aspect of sustainable luxury speaks to you most?";
    }
    
    setIsProcessing(false);
    return response;
  };

  const handleAIChat = async () => {
    if (!aiMessage.trim()) return;
    
    const userMessage = aiMessage.trim();
    setAiMessage("");
    
    setConversationHistory(prev => [...prev, {
      user: userMessage,
      designer: "",
      timestamp: new Date()
    }]);
    
    const designerResponse = await generateDesignerResponse(userMessage);
    
    setConversationHistory(prev => {
      const updated = [...prev];
      updated[updated.length - 1].designer = designerResponse;
      return updated;
    });
  };

  // Format time from seconds to MM:SS
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  // Simulate progress update
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / currentEpisode.duration) * 0.1;

          if (Math.floor(newProgress) === 25 && !showInteractivePrompt) {
            setShowInteractivePrompt(true);
          }

          return newProgress > 100 ? 100 : newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentEpisode.duration, showInteractivePrompt]);

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Episode Navigation Header */}
      <div className="bg-purple-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fashion Show</h1>
            <p className="text-purple-200">Episode {currentEpisodeIndex + 1} of {episodes.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={previousEpisode}
              disabled={currentEpisodeIndex === 0}
              className="text-white border-white hover:bg-white hover:text-purple-600"
            >
              Previous Episode
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextEpisode}
              disabled={currentEpisodeIndex === episodes.length - 1}
              className="text-white border-white hover:bg-white hover:text-purple-600"
            >
              Next Episode
            </Button>
          </div>
        </div>
      </div>

      {/* Main video display area */}
      <div className="relative w-full h-[60vh] bg-black">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200&q=80"
            alt="Fashion runway"
            className="w-full h-full object-cover opacity-60"
          />

          {/* Fashion Model Avatar */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={isProcessing ? { scale: [1, 1.05, 1] } : { scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=fashion-model&backgroundColor=ffdfba&skinColor=brown&hairColor=black&clothingColor=purple&accessoriesColor=gold"
                alt="Fashion Model"
                className="h-[70%] w-auto"
              />
            </motion.div>
          </div>

          {/* AI Chat Interface */}
          <AnimatePresence>
            {showAIChat && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="absolute bottom-32 left-4 right-4 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-xl max-h-[200px] overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="font-semibold text-gray-800">Ask Alex Chen</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAIChat(false)}
                  >
                    ×
                  </Button>
                </div>
                
                <ScrollArea className="h-[120px] mb-2">
                  <div className="space-y-2">
                    {conversationHistory.slice(-3).map((message, index) => (
                      <div key={index} className="space-y-1">
                        <div className="text-xs text-gray-500">You: {message.user}</div>
                        <div className="text-sm text-purple-800 bg-purple-50 p-2 rounded">
                          Alex: {message.designer}
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-3 w-3" />
                        </motion.div>
                        Alex is thinking...
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAIChat()}
                    placeholder="Ask about fabrics, styling, or sustainable fashion..."
                    className="flex-1 text-sm"
                    disabled={isProcessing}
                  />
                  <Button
                    onClick={handleAIChat}
                    disabled={!aiMessage.trim() || isProcessing}
                    size="sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive prompt */}
          {showInteractivePrompt && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg animate-bounce">
              <p className="font-bold">Time for the runway walk!</p>
              <div className="mt-2 flex justify-center gap-2">
                <Button onClick={() => setShowInteractivePrompt(false)}>
                  Confident Stride
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowInteractivePrompt(false)}
                >
                  Elegant Pose
                </Button>
              </div>
            </div>
          )}

          {/* AI Chat Toggle Button */}
          <Button
            onClick={() => setShowAIChat(!showAIChat)}
            className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white"
            size="sm"
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Chat with Alex
          </Button>
        </div>

        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <Progress value={progress} className="h-1 mb-2" />

          <div className="flex justify-between text-xs text-white mb-2">
            <span>{formatTime((currentEpisode.duration * progress) / 100)}</span>
            <span>{formatTime(currentEpisode.duration)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousEpisode}
                disabled={currentEpisodeIndex === 0}
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
                onClick={nextEpisode}
                disabled={currentEpisodeIndex === episodes.length - 1}
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

      {/* Episode info and collection details */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area - 70% */}
        <div className="w-[70%] p-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">{currentEpisode.title}</h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{currentCollection.season}</Badge>
            <Badge variant="outline">{currentCollection.theme}</Badge>
            <span className="text-sm text-muted-foreground">
              Designer: {currentCollection.designer}
            </span>
            <span className="text-sm text-muted-foreground">
              Pieces: {currentCollection.pieces.length}
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{currentEpisode.description}</p>

          <Tabs defaultValue="pieces" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pieces">Collection Pieces</TabsTrigger>
              <TabsTrigger value="styling">Styling Tips</TabsTrigger>
              <TabsTrigger value="inspiration">Designer Inspiration</TabsTrigger>
            </TabsList>

            <TabsContent value="pieces" className="space-y-4">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentCollection.pieces.map((piece) => (
                    <Card key={piece.id} className="overflow-hidden">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={piece.image}
                          alt={piece.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{piece.name}</h3>
                          <Badge variant="outline">{piece.price}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {piece.description}
                        </p>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Materials:</h4>
                            <div className="flex flex-wrap gap-1">
                              {piece.materials.map((material, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {material}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Category:</h4>
                            <Badge variant="outline" className="text-xs">
                              {piece.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="styling" className="space-y-4">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-6">
                  {currentCollection.pieces.map((piece) => (
                    <div key={piece.id} className="border-b pb-4 last:border-b-0">
                      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                        <Palette className="h-5 w-5 text-purple-600" />
                        {piece.name}
                      </h3>
                      <div className="space-y-2">
                        {piece.stylingTips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Star className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-700">{tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="inspiration" className="space-y-4">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-purple-600" />
                      Collection Inspiration
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {currentCollection.inspiration}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Runway Experience
                    </h3>
                    <div className="space-y-2">
                      {currentCollection.runwayNotes.map((note, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Zap className="h-4 w-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Designer Philosophy
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {currentCollection.designer} believes that true luxury comes from conscious creation. Every piece in this collection is crafted with intention, using materials that respect both the environment and the artisans who create them.
                    </p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - 30% */}
        <div className="w-[30%] border-l p-6 bg-muted/20">
          <h2 className="text-xl font-semibold mb-4">Show Information</h2>

          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">About This Show</h3>
              <p className="text-sm text-muted-foreground">
                Season 1, Episode {currentEpisodeIndex + 1}
              </p>
              <p className="text-sm text-muted-foreground">
                Duration: {formatTime(currentEpisode.duration)}
              </p>
              <p className="text-sm mb-4">
                {currentEpisode.description}
              </p>
            </CardContent>
          </Card>

          <h3 className="font-medium mb-2">Featured Materials</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Organic silk</li>
            <li>Ethical wool</li>
            <li>Bamboo silk</li>
            <li>Recycled denim</li>
            <li>Vegetable-tanned leather</li>
          </ul>

          <h3 className="font-medium mb-2">Sustainability Focus</h3>
          <p className="text-sm mb-4">
            This collection represents the future of fashion - where luxury meets responsibility. Every material is carefully sourced, every process is transparent, and every piece is designed to last a lifetime.
          </p>

          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              Shop Collection
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionShowComplete;
