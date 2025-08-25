import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import {
  Play,
  Pause,
  HandMetal,
  MessageSquare,
  ChefHat,
  RotateCcw,
  Palette,
  Settings,
  Info,
  HelpCircle,
  Zap,
  Eye,
  Shirt,
  User,
  Heart,
  Star,
  Shuffle,
  Save,
  Download,
  Share2,
  Camera,
  Volume2,
  VolumeX,
  Search,
  ChevronRight,
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MemoryEntry {
  id: string;
  timestamp: Date;
  type: "conversation" | "preference" | "interaction" | "emotion";
  content: string;
  userInput?: string;
  avatarResponse?: string;
  emotion?: "happy" | "concerned" | "excited" | "calm" | "wise" | "professional" | "creative";
  tags?: string[];
  importance: number;
  context?: string;
}

interface OutfitItem {
  id: string;
  name: string;
  image: string;
  description: string;
  tags?: string[];
  culturalSignificance?: string;
  price?: number;
  rarity?: "common" | "rare" | "legendary";
}

interface OutfitCategory {
  id: string;
  name: string;
  description?: string;
  icon?: React.ReactNode;
  items: OutfitItem[];
}

interface AvatarConfig {
  seed: string;
  backgroundColor: string;
  skinColor: string;
  hairStyle: string;
  hairColor: string;
  eyeStyle: string;
  eyeColor: string;
  mouthStyle: string;
  clothingStyle: string;
  clothingColor: string;
  accessoryStyle: string;
  accessoryColor: string;
}

interface AvatarState {
  memories: MemoryEntry[];
  currentOutfit: string;
  userName: string;
  conversationHistory: Array<{
    user: string;
    avatar: string;
    timestamp: Date;
    context: string;
  }>;
  userPreferences: {
    favoriteTopics: string[];
    interests: string[];
    learningStyle: string;
  };
  currentContext: "general" | "professional" | "creative" | "casual";
  isProcessing: boolean;
}

type AvatarAction =
  | { type: 'ADD_MEMORY'; payload: Omit<MemoryEntry, 'id' | 'timestamp'> }
  | { type: 'SET_OUTFIT'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'ADD_CONVERSATION'; payload: { user: string; avatar: string; context: string } }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AvatarState['userPreferences']> }
  | { type: 'SET_CONTEXT'; payload: AvatarState['currentContext'] }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'CLEAR_MEMORIES' };

interface ModularAvatarProps {
  // Core Configuration
  characterName: string;
  characterPersonality: string;
  characterVoice: string;
  defaultOutfit: string;
  
  // Avatar Configuration
  avatarUrl?: string;
  outfitCategories: OutfitCategory[];
  responseTemplates: {
    [context: string]: {
      [keyword: string]: string;
    };
  };
  
  // Behavior
  enableMemory?: boolean;
  enableConversations?: boolean;
  enableOutfitChanges?: boolean;
  enableAnimations?: boolean;
  
  // Callbacks
  onAvatarChange?: (config: AvatarConfig) => void;
  onConversation?: (userInput: string, avatarResponse: string) => void;
  onOutfitChange?: (outfitId: string) => void;
  
  // Styling
  theme?: "light" | "dark" | "auto";
  className?: string;
}

// ============================================================================
// CONTEXT & PROVIDER
// ============================================================================

const AvatarContext = createContext<{
  state: AvatarState;
  dispatch: React.Dispatch<AvatarAction>;
  getRelevantMemories: (query: string) => MemoryEntry[];
  generateResponse: (userInput: string, context?: string) => Promise<string>;
} | null>(null);

function avatarReducer(state: AvatarState, action: AvatarAction): AvatarState {
  switch (action.type) {
    case 'ADD_MEMORY':
      const newMemory: MemoryEntry = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      };
      return {
        ...state,
        memories: [newMemory, ...state.memories].slice(0, 100)
      };
    
    case 'SET_OUTFIT':
      return { ...state, currentOutfit: action.payload };
    
    case 'SET_USER_NAME':
      return { ...state, userName: action.payload };
    
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversationHistory: [
          ...state.conversationHistory,
          {
            user: action.payload.user,
            avatar: action.payload.avatar,
            timestamp: new Date(),
            context: action.payload.context
          }
        ].slice(-50)
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload }
      };
    
    case 'SET_CONTEXT':
      return { ...state, currentContext: action.payload };
    
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    
    case 'CLEAR_MEMORIES':
      return { ...state, memories: [] };
    
    default:
      return state;
  }
}

function AvatarProvider({ 
  children, 
  characterName,
  responseTemplates 
}: { 
  children: React.ReactNode;
  characterName: string;
  responseTemplates: any;
}) {
  const [state, dispatch] = useReducer(avatarReducer, {
    memories: [],
    currentOutfit: "default",
    userName: "",
    conversationHistory: [],
    userPreferences: {
      favoriteTopics: [],
      interests: [],
      learningStyle: "visual"
    },
    currentContext: "general",
    isProcessing: false
  });

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(`${characterName}AvatarState`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.memories) {
          parsed.memories.forEach((memory: any) => {
            dispatch({
              type: 'ADD_MEMORY',
              payload: {
                type: memory.type,
                content: memory.content,
                userInput: memory.userInput,
                avatarResponse: memory.avatarResponse,
                emotion: memory.emotion,
                tags: memory.tags,
                importance: memory.importance,
                context: memory.context
              }
            });
          });
        }
        if (parsed.userPreferences) {
          dispatch({ type: 'UPDATE_PREFERENCES', payload: parsed.userPreferences });
        }
        if (parsed.currentOutfit) {
          dispatch({ type: 'SET_OUTFIT', payload: parsed.currentOutfit });
        }
        if (parsed.userName) {
          dispatch({ type: 'SET_USER_NAME', payload: parsed.userName });
        }
      } catch (error) {
        console.error(`Error loading ${characterName} avatar state:`, error);
      }
    }
  }, [characterName]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(`${characterName}AvatarState`, JSON.stringify({
      memories: state.memories,
      userPreferences: state.userPreferences,
      currentOutfit: state.currentOutfit,
      userName: state.userName
    }));
  }, [state.memories, state.userPreferences, state.currentOutfit, state.userName, characterName]);

  const getRelevantMemories = (query: string): MemoryEntry[] => {
    const keywords = query.toLowerCase().split(" ");
    return state.memories.filter(memory => 
      keywords.some(keyword => 
        memory.content.toLowerCase().includes(keyword) ||
        memory.tags?.some(tag => tag.toLowerCase().includes(keyword)) ||
        memory.userInput?.toLowerCase().includes(keyword)
      )
    ).slice(0, 5);
  };

  const generateResponse = async (userInput: string, context: string = "general"): Promise<string> => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const relevantMemories = getRelevantMemories(userInput);
    const inputLower = userInput.toLowerCase();
    
    let emotion: MemoryEntry["emotion"] = "calm";
    if (inputLower.includes("scared") || inputLower.includes("worried") || inputLower.includes("afraid")) {
      emotion = "concerned";
    } else if (inputLower.includes("happy") || inputLower.includes("excited") || inputLower.includes("great")) {
      emotion = "excited";
    } else if (inputLower.includes("sad") || inputLower.includes("depressed") || inputLower.includes("down")) {
      emotion = "concerned";
    }
    
    let response = "";
    const contextTemplates = responseTemplates[context] || responseTemplates["general"];
    
    // Find matching template
    for (const [keyword, template] of Object.entries(contextTemplates)) {
      if (inputLower.includes(keyword)) {
        response = template as string;
        break;
      }
    }
    
    if (!response) {
      response = contextTemplates["default"] || "Thank you for sharing that with me. I'm here to help and support you.";
    }
    
    // Add personal touch based on memories
    if (relevantMemories.length > 0) {
      response += ` I remember when we talked about this before - you're making such progress.`;
    }
    
    // Add outfit-based personality
    if (state.currentOutfit === "professional") {
      response += ` As a professional, I believe in continuous learning and growth.`;
    } else if (state.currentOutfit === "creative") {
      response += ` Creativity is the key to innovation and problem-solving.`;
    } else if (state.currentOutfit === "casual") {
      response += ` Sometimes the best solutions come from relaxed, open conversations.`;
    }
    
    dispatch({ type: 'SET_PROCESSING', payload: false });
    return response;
  };

  return (
    <AvatarContext.Provider value={{
      state,
      dispatch,
      getRelevantMemories,
      generateResponse
    }}>
      {children}
    </AvatarContext.Provider>
  );
}

function useAvatar() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
}

// ============================================================================
// AVATAR DISPLAY COMPONENT
// ============================================================================

interface AvatarDisplayProps {
  avatarUrl?: string;
  animations?: string[];
  currentOutfit?: string;
  onAnimationChange?: (animation: string) => void;
  characterName?: string;
}

const AvatarDisplay = ({
  avatarUrl = "https://api.dicebear.com/7.x/avataaars/svg?seed=avatar&backgroundColor=f4e4c1&skinColor=brown&hairColor=black&clothingColor=blue&accessoriesColor=gold",
  animations = ["wave", "talk", "think", "idle"],
  currentOutfit = "Default",
  onAnimationChange = () => {},
  characterName = "Avatar"
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
          <h3 className="text-xl font-bold">{characterName}</h3>
          <div className="text-sm text-muted-foreground">{currentOutfit}</div>
        </div>

        <div className="flex-1 relative flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 rounded-md overflow-hidden">
          <motion.div
            className="relative"
            animate={{
              scale: zoomLevel[0] / 100,
              y: isPlaying && currentAnimation === "wave" ? [0, -10, 0] : 0,
              rotate:
                isPlaying && currentAnimation === "think"
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
              alt={`${characterName} Avatar`}
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

            {isPlaying && currentAnimation === "think" && (
              <motion.div
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <div className="bg-blue-100 p-2 rounded-full shadow-md">
                  <span role="img" aria-label="thinking">
                    💭
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
                variant={currentAnimation === "think" ? "default" : "outline"}
                onClick={() => handleAnimationChange("think")}
              >
                <Zap className="h-4 w-4 mr-1" />
                Think
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ============================================================================
// AVATAR CUSTOMIZER COMPONENT
// ============================================================================

interface AvatarCustomizerProps {
  outfitCategories: OutfitCategory[];
  onOutfitChange?: (outfitId: string) => void;
  characterName?: string;
}

const AvatarCustomizer = ({
  outfitCategories,
  onOutfitChange,
  characterName = "Avatar"
}: AvatarCustomizerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(outfitCategories[0]?.id || "");
  const [selectedOutfit, setSelectedOutfit] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);

  const { dispatch } = useAvatar();

  const currentCategory = outfitCategories.find(cat => cat.id === selectedCategory);
  const currentOutfit = currentCategory?.items.find(item => item.id === selectedOutfit);

  const filteredItems = currentCategory?.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedOutfit("");
    setSearchQuery("");
  }, []);

  const handleOutfitChange = useCallback((outfitId: string) => {
    setSelectedOutfit(outfitId);
    setRecentlyUsed(prev => {
      const updated = [outfitId, ...prev.filter(id => id !== outfitId)].slice(0, 5);
      return updated;
    });
    dispatch({ type: 'SET_OUTFIT', payload: outfitId });
    onOutfitChange?.(outfitId);
  }, [dispatch, onOutfitChange]);

  const handleToggleFavorite = useCallback((outfitId: string) => {
    setFavorites(prev =>
      prev.includes(outfitId)
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  }, []);

  const renderRarityBadge = (rarity?: string) => {
    if (!rarity) return null;
    const rarityConfig = {
      common: { color: "bg-gray-100 text-gray-800", label: "Common" },
      rare: { color: "bg-blue-100 text-blue-800", label: "Rare" },
      legendary: { color: "bg-purple-100 text-purple-800", label: "Legendary" },
    };
    const config = rarityConfig[rarity as keyof typeof rarityConfig];
    if (!config) return null;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Palette className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">{characterName} Customizer</h1>
        <Badge variant="secondary" className="ml-2">v2.0</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Preview */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden bg-muted mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${characterName}&backgroundColor=f4e4c1&skinColor=brown&hairColor=black&clothingColor=blue&accessoriesColor=gold`}
                  alt={`${characterName} Preview`}
                  className="w-full h-full object-cover"
                />
              </div>

              {currentOutfit && (
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="font-medium">{currentOutfit.name}</h3>
                    {renderRarityBadge(currentOutfit.rarity)}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleToggleFavorite(currentOutfit.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(currentOutfit.id)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentOutfit.description}
                  </p>
                  {currentOutfit.tags && (
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {currentOutfit.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Outfit Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shirt className="h-5 w-5" />
                Outfit Selection
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search outfits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>

            <CardContent>
              <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
                <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4 w-full">
                  {outfitCategories.map(category => (
                    <TabsTrigger
                      key={category.id}
                      value={category.id}
                      className="flex items-center gap-1 text-xs"
                    >
                      {category.icon}
                      <span className="hidden sm:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {outfitCategories.map(category => (
                  <TabsContent key={category.id} value={category.id}>
                    {category.description && (
                      <div className="mb-4 p-3 bg-muted/50 rounded-md">
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    )}

                    <ScrollArea className="h-[500px] pr-4">
                      <RadioGroup
                        value={selectedOutfit}
                        onValueChange={handleOutfitChange}
                        className="space-y-4"
                      >
                        {filteredItems.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <RadioGroupItem value={item.id} id={item.id} />
                            <Label
                              htmlFor={item.id}
                              className="flex flex-1 items-center cursor-pointer"
                            >
                              <div className="flex items-center space-x-4 w-full">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage src={item.image} alt={item.name} />
                                  <AvatarFallback>
                                    {item.name.substring(0, 2)}
                                  </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-medium truncate">
                                      {item.name}
                                    </h3>
                                    {renderRarityBadge(item.rarity)}
                                    {favorites.includes(item.id) && (
                                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                                    )}
                                    {recentlyUsed.includes(item.id) && (
                                      <Badge variant="secondary" className="text-xs">
                                        Recent
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {item.description}
                                  </p>
                                  {item.tags && (
                                    <div className="flex flex-wrap gap-1">
                                      {item.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleToggleFavorite(item.id);
                                    }}
                                  >
                                    <Heart
                                      className={`h-3 w-3 ${
                                        favorites.includes(item.id)
                                          ? "fill-red-500 text-red-500"
                                          : "text-muted-foreground"
                                      }`}
                                    />
                                  </Button>
                                </div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {filteredItems.length === 0 && (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">
                            No outfits found matching your search.
                          </p>
                          <Button
                            variant="outline"
                            onClick={() => setSearchQuery("")}
                            className="mt-2"
                          >
                            Clear Search
                          </Button>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN MODULAR AVATAR COMPONENT
// ============================================================================

const ModularAvatarSystem: React.FC<ModularAvatarProps> = ({
  characterName,
  characterPersonality,
  characterVoice,
  defaultOutfit,
  avatarUrl,
  outfitCategories,
  responseTemplates,
  enableMemory = true,
  enableConversations = true,
  enableOutfitChanges = true,
  enableAnimations = true,
  onAvatarChange,
  onConversation,
  onOutfitChange,
  theme = "light",
  className = ""
}) => {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");

  return (
    <AvatarProvider characterName={characterName} responseTemplates={responseTemplates}>
      <div className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-background"} ${className}`}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Avatar Display */}
          <div className="flex-1">
            <AvatarDisplay
              avatarUrl={avatarUrl}
              currentOutfit={defaultOutfit}
              onAnimationChange={setCurrentAnimation}
              characterName={characterName}
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {characterName}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Personality</h4>
                  <p className="text-sm text-muted-foreground">{characterPersonality}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Voice</h4>
                  <p className="text-sm text-muted-foreground">{characterVoice}</p>
                </div>

                <div className="flex gap-2">
                  {enableOutfitChanges && (
                    <Button
                      onClick={() => setShowCustomizer(!showCustomizer)}
                      className="flex-1"
                    >
                      <Shirt className="h-4 w-4 mr-2" />
                      Customize
                    </Button>
                  )}
                  
                  {enableConversations && (
                    <Button variant="outline" className="flex-1">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Customizer Panel */}
        <AnimatePresence>
          {showCustomizer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              <AvatarCustomizer
                outfitCategories={outfitCategories}
                onOutfitChange={onOutfitChange}
                characterName={characterName}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AvatarProvider>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default ModularAvatarSystem;
export { AvatarProvider, useAvatar, AvatarDisplay, AvatarCustomizer };
export type { 
  ModularAvatarProps, 
  AvatarConfig, 
  OutfitCategory, 
  OutfitItem, 
  MemoryEntry,
  AvatarState 
};
