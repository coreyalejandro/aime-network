import React, { useState, useCallback } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Info,
  MessageSquare,
  Mic,
  Sparkles,
  Heart,
  Palette,
  Camera,
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import ModularAvatarSystem, { useAvatar } from "./ModularAvatarSystem";

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

interface FashionShowProps {
  episode?: {
    id: string;
    title: string;
    duration: number;
    currentTime?: number;
    description: string;
  };
  collection?: {
    id: string;
    name: string;
    season: string;
    theme: string;
    designer: string;
    pieces: FashionPiece[];
    inspiration: string;
    runwayNotes: string[];
  };
}

const FashionShowWithAvatar = ({
  episode = {
    id: "1",
    title: "Autumn Elegance - A Tribute to Sustainable Luxury",
    duration: 1800, // 30 minutes in seconds
    currentTime: 0,
    description:
      "In this groundbreaking fashion show, we celebrate the fusion of luxury and sustainability. Each piece tells a story of craftsmanship, ethical sourcing, and timeless elegance. This collection represents the future of fashion - where beauty meets responsibility.",
  },
  collection = {
    id: "1",
    name: "Autumn Elegance Collection",
    season: "Fall/Winter 2024",
    theme: "Sustainable Luxury Meets Timeless Elegance",
    designer: "Isabella Chen",
    inspiration: "Inspired by the golden hour light filtering through autumn leaves, this collection celebrates the beauty of natural cycles and sustainable luxury. Each piece is crafted with ethically sourced materials and timeless design principles.",
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
        description: "A flowing silk dress that captures the essence of golden hour light. The organic silk drapes beautifully, while recycled gold thread adds subtle shimmer. Natural dyes create the perfect autumn amber hue.",
        stylingTips: [
          "Pair with minimal gold jewelry to let the dress shine",
          "Perfect for evening events and special occasions",
          "The silk is naturally temperature regulating",
          "Hand wash cold to preserve the natural dyes"
        ],
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        designer: "Isabella Chen",
        season: "Fall/Winter 2024"
      },
      {
        id: "2",
        name: "Sustainable Wool Coat",
        category: "Outerwear",
        materials: ["Ethical wool", "Recycled lining", "Natural buttons"],
        price: "$1,950",
        description: "A timeless wool coat crafted from ethically sourced merino wool. The recycled lining provides warmth while reducing environmental impact. Natural horn buttons add elegant detail.",
        stylingTips: [
          "Layer over any outfit for instant sophistication",
          "The wool naturally repels water and odors",
          "Perfect for transitional weather",
          "Store on a wooden hanger to maintain shape"
        ],
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800&q=80",
        designer: "Isabella Chen",
        season: "Fall/Winter 2024"
      },
      {
        id: "3",
        name: "Bamboo Silk Blouse",
        category: "Day Wear",
        materials: ["Bamboo silk", "Organic cotton", "Natural pearl buttons"],
        price: "$450",
        description: "A versatile blouse made from bamboo silk, known for its softness and sustainability. The fabric is naturally antibacterial and moisture-wicking, perfect for everyday elegance.",
        stylingTips: [
          "Tuck into high-waisted pants for a polished look",
          "Layer under the wool coat for sophisticated layering",
          "The bamboo silk is naturally wrinkle-resistant",
          "Machine wash cold for easy care"
        ],
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
        designer: "Isabella Chen",
        season: "Fall/Winter 2024"
      },
      {
        id: "4",
        name: "Recycled Denim Ensemble",
        category: "Casual Luxury",
        materials: ["Recycled denim", "Organic cotton", "Natural indigo"],
        price: "$680",
        description: "A sophisticated denim ensemble crafted from 100% recycled materials. The natural indigo dye creates a rich, deep color that ages beautifully over time.",
        stylingTips: [
          "The denim softens with each wear",
          "Pair with the bamboo silk blouse for contrast",
          "Perfect for both casual and smart-casual occasions",
          "Wash infrequently to preserve the natural indigo"
        ],
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
        designer: "Isabella Chen",
        season: "Fall/Winter 2024"
      },
      {
        id: "5",
        name: "Artisan Leather Bag",
        category: "Accessories",
        materials: ["Vegetable-tanned leather", "Recycled hardware", "Organic cotton lining"],
        price: "$890",
        description: "A handcrafted leather bag using traditional vegetable tanning methods. Each piece is unique, with natural variations that tell the story of its creation.",
        stylingTips: [
          "The leather develops a beautiful patina over time",
          "Perfect size for everyday essentials",
          "The vegetable tanning makes it naturally water-resistant",
          "Condition with natural leather oil to maintain beauty"
        ],
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
        designer: "Isabella Chen",
        season: "Fall/Winter 2024"
      }
    ]
  },
}: FashionShowProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [showInteractivePrompt, setShowInteractivePrompt] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{
    user: string;
    fashionista: string;
    timestamp: Date;
  }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAvatarPanel, setShowAvatarPanel] = useState(false);

  // Fashion AI responses using the avatar system
  const generateFashionResponse = async (userInput: string): Promise<string> => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const inputLower = userInput.toLowerCase();
    let response = "";
    
    if (inputLower.includes("silk") || inputLower.includes("fabric")) {
      response = "The silk in this collection is absolutely divine, darling! We're using organic silk that's not only luxurious but also sustainable. The way it drapes and moves is pure poetry. Each piece tells a story of ethical luxury.";
    } else if (inputLower.includes("sustainable") || inputLower.includes("eco")) {
      response = "Sustainability is at the heart of everything we do! Every material is carefully sourced - from the organic silk to the recycled denim. Fashion can be both beautiful and responsible. That's the future we're creating.";
    } else if (inputLower.includes("styling") || inputLower.includes("wear")) {
      response = "Styling is all about confidence and personal expression! These pieces are designed to work together seamlessly. Layer the bamboo silk blouse under the wool coat for instant sophistication, or let the golden hour dress make its own statement.";
    } else if (inputLower.includes("price") || inputLower.includes("cost")) {
      response = "Quality and sustainability come with investment, but these pieces are designed to last a lifetime. Think of it as building a capsule wardrobe that grows more beautiful with time. Each piece is an investment in both style and values.";
    } else if (inputLower.includes("designer") || inputLower.includes("isabella")) {
      response = "Isabella Chen is a visionary! She believes that luxury and sustainability aren't mutually exclusive. Her designs celebrate the beauty of natural materials while pushing the boundaries of ethical fashion. She's truly changing the industry.";
    } else {
      response = "Oh darling, I love your questions about fashion! This collection is all about creating beauty that doesn't compromise our values. What aspect of sustainable luxury speaks to you most?";
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
      fashionista: "",
      timestamp: new Date()
    }]);
    
    const fashionistaResponse = await generateFashionResponse(userMessage);
    
    setConversationHistory(prev => {
      const updated = [...prev];
      updated[updated.length - 1].fashionista = fashionistaResponse;
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
  React.useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (100 / episode.duration) * 0.1;

          if (Math.floor(newProgress) === 25 && !showInteractivePrompt) {
            setShowInteractivePrompt(true);
          }

          return newProgress > 100 ? 100 : newProgress;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isPlaying, episode.duration, showInteractivePrompt]);

  // Fashion Designer Avatar Configuration
  const fashionDesignerAvatar = {
    characterName: "Isabella Chen",
    characterPersonality: "Creative visionary with a passion for sustainable luxury fashion. Warm, inspiring, and deeply knowledgeable about ethical design.",
    characterVoice: "Sophisticated, warm, and inspiring with a touch of artistic flair. Speaks with authority about fashion while remaining approachable.",
    defaultOutfit: "designer-suit",
    outfitCategories: [
      {
        id: "designer",
        name: "Designer Attire",
        items: [
          {
            id: "designer-suit",
            name: "Creative Director Suit",
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
            description: "Sophisticated designer suit in sustainable materials",
            tags: ["professional", "creative", "luxury", "sustainable"],
            rarity: "legendary"
          },
          {
            id: "artistic-dress",
            name: "Artistic Director Dress",
            image: "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
            description: "Elegant dress reflecting creative vision",
            tags: ["artistic", "elegant", "creative"],
            rarity: "rare"
          }
        ]
      },
      {
        id: "casual",
        name: "Casual Creative",
        items: [
          {
            id: "studio-outfit",
            name: "Studio Creative Outfit",
            image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&q=80",
            description: "Comfortable yet stylish studio wear",
            tags: ["casual", "creative", "comfortable"],
            rarity: "common"
          }
        ]
      }
    ],
    responseTemplates: {
      general: {
        "fashion": "Fashion is about expressing your authentic self through beautiful design. Each piece in this collection tells a story of sustainability and luxury.",
        "sustainability": "Sustainable luxury is the future of fashion - beauty with purpose. Every material choice matters in creating a better world.",
        "design": "Great design comes from understanding both aesthetics and function. It's about creating pieces that are both beautiful and meaningful.",
        "default": "I'm here to inspire and guide you through the world of fashion. What would you like to know about this collection?"
      },
      professional: {
        "materials": "The materials in this collection are carefully chosen for their sustainability and beauty. Organic silk, ethical wool, and recycled denim all play a role.",
        "craftsmanship": "Craftsmanship is at the heart of luxury. Each piece is created with attention to detail and respect for traditional techniques.",
        "default": "As a professional designer, I believe in creating timeless pieces that respect both people and planet."
      },
      creative: {
        "inspiration": "Inspiration comes from everywhere - nature, culture, and the stories we want to tell. This collection was inspired by golden hour light.",
        "innovation": "Innovation in fashion means pushing boundaries while staying true to our values. Sustainable luxury is the future.",
        "default": "Creativity is the key to innovation and problem-solving in fashion design."
      }
    }
  };

  return (
    <div className="w-full h-full bg-background flex flex-col">
      {/* Main video display area */}
      <div className="relative w-full h-[60vh] bg-black">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
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
                    <span className="font-semibold text-gray-800">Ask Isabella Chen</span>
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
                          Isabella: {message.fashionista}
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
                        Isabella is thinking...
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
            Chat with Isabella
          </Button>

          {/* Avatar Panel Toggle */}
          <Button
            onClick={() => setShowAvatarPanel(!showAvatarPanel)}
            className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <User className="h-4 w-4 mr-1" />
            Designer Avatar
          </Button>
        </div>

        {/* Video controls overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <Progress value={progress} className="h-1 mb-2" />

          <div className="flex justify-between text-xs text-white mb-2">
            <span>{formatTime((episode.duration * progress) / 100)}</span>
            <span>{formatTime(episode.duration)}</span>
          </div>

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

      {/* Episode info and collection details */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main content area - 70% */}
        <div className="w-[70%] p-6">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">{episode.title}</h1>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Enhanced
            </Badge>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{collection.season}</Badge>
            <Badge variant="outline">{collection.theme}</Badge>
            <span className="text-sm text-muted-foreground">
              Designer: {collection.designer}
            </span>
            <span className="text-sm text-muted-foreground">
              Pieces: {collection.pieces.length}
            </span>
          </div>

          <p className="text-muted-foreground mb-6">{episode.description}</p>

          <Tabs defaultValue="pieces" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="pieces">Collection Pieces</TabsTrigger>
              <TabsTrigger value="styling">Styling Tips</TabsTrigger>
              <TabsTrigger value="inspiration">Designer Inspiration</TabsTrigger>
            </TabsList>

            <TabsContent value="pieces" className="space-y-4">
              <ScrollArea className="h-[400px] rounded-md border p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {collection.pieces.map((piece) => (
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
                  {collection.pieces.map((piece) => (
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
                      {collection.inspiration}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Camera className="h-5 w-5 text-purple-600" />
                      Runway Experience
                    </h3>
                    <div className="space-y-2">
                      {collection.runwayNotes.map((note, index) => (
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
                      {collection.designer} believes that true luxury comes from conscious creation. Every piece in this collection is crafted with intention, using materials that respect both the environment and the artisans who create them. The goal is to create timeless pieces that tell a story of sustainable elegance.
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
                Season 1, Episode 1
              </p>
              <p className="text-sm text-muted-foreground">
                Original Air Date: September 15, 2024
              </p>
              <p className="text-sm mb-4">
                This groundbreaking fashion show celebrates the intersection of luxury and sustainability. Each piece tells a story of ethical sourcing, timeless design, and conscious consumption.
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Info className="h-4 w-4" />
                    Material Origins
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Learn about the sustainable sourcing of each material used in this collection.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              <ShoppingBag className="h-4 w-4" />
              Shop Collection
            </Button>
          </div>
        </div>
      </div>

      {/* Avatar Panel */}
      <AnimatePresence>
        {showAvatarPanel && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Isabella Chen</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAvatarPanel(false)}
                >
                  ×
                </Button>
              </div>
              
              <ModularAvatarSystem
                {...fashionDesignerAvatar}
                className="h-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FashionShowWithAvatar;
