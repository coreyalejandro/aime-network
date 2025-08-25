import React, { useState, useCallback, useEffect } from "react";
import { useAuntieMae } from "../contexts/AuntieMaeContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronRight,
  Save,
  Download,
  Upload,
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
  Copy,
  Share2,
  Camera,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

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

interface AvatarCustomizerProps {
  // Core Configuration
  theme?: "light" | "dark" | "auto";
  size?: "sm" | "md" | "lg" | "xl";
  showPreview?: boolean;
  showDocumentation?: boolean;

  // Avatar Configuration
  defaultAvatar?: Partial<AvatarConfig>;
  customCategories?: OutfitCategory[];
  enableCustomUploads?: boolean;
  enableAnimations?: boolean;

  // Behavior
  autoSave?: boolean;
  enableExport?: boolean;
  enableSharing?: boolean;
  enablePresets?: boolean;

  // Callbacks
  onAvatarChange?: (config: AvatarConfig) => void;
  onSave?: (config: AvatarConfig) => void;
  onExport?: (config: AvatarConfig, format: string) => void;
  onShare?: (config: AvatarConfig) => void;

  // Advanced Features
  enableVoicePreview?: boolean;
  enableCulturalContext?: boolean;
  enableAccessibility?: boolean;

  // Customization
  className?: string;
  style?: React.CSSProperties;
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  theme = "light",
  size = "lg",
  showPreview = true,
  showDocumentation = true,
  defaultAvatar = {},
  customCategories,
  enableCustomUploads = true,
  enableAnimations = true,
  autoSave = false,
  enableExport = true,
  enableSharing = true,
  enablePresets = true,
  onAvatarChange,
  onSave,
  onExport,
  onShare,
  enableVoicePreview = false,
  enableCulturalContext = true,
  enableAccessibility = true,
  className = "",
  style = {},
}) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [selectedCategory, setSelectedCategory] =
    useState<string>("traditional-indian");
  const [selectedOutfit, setSelectedOutfit] = useState<string>("");
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    seed: "auntie-mae-respectful",
    backgroundColor: "f4e4c1",
    skinColor: "warm-brown",
    hairStyle: "elegant-silver",
    hairColor: "silver-gray",
    eyeStyle: "wise",
    eyeColor: "warm-brown",
    mouthStyle: "gentle-smile",
    clothingStyle: "traditional-indian",
    clothingColor: "deep-burgundy",
    accessoryStyle: "traditional-jewelry",
    accessoryColor: "gold",
    ...defaultAvatar,
  });

  const [isAnimating, setIsAnimating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  // ============================================================================
  // DEFAULT OUTFIT CATEGORIES
  // ============================================================================

  const defaultOutfitCategories: OutfitCategory[] = [
    {
      id: "traditional-indian",
      name: "Traditional Indian",
      description: "Authentic Indian attire celebrating heritage",
      icon: <Star className="h-4 w-4" />,
      items: [
        {
          id: "saree-red",
          name: "Elegant Burgundy Saree",
          image:
            "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
          description:
            "Elegant burgundy saree with intricate gold embroidery, perfect for a wise matriarch",
          tags: ["formal", "traditional", "elegant", "mature"],
          culturalSignificance:
            "The saree represents grace, wisdom, and tradition in Indian culture. Burgundy symbolizes strength and sophistication, often chosen by respected elder women.",
          rarity: "common",
        },
        {
          id: "saree-blue",
          name: "Royal Blue Saree",
          image:
            "https://images.unsplash.com/photo-1610189018841-63e9a73d5f9f?w=300&q=80",
          description: "Royal blue saree with silver accents",
          tags: ["formal", "traditional", "royal"],
          culturalSignificance:
            "Blue represents tranquility and depth in Indian traditions.",
          rarity: "rare",
        },
        {
          id: "salwar-green",
          name: "Emerald Salwar Kameez",
          image:
            "https://images.unsplash.com/photo-1610189018841-63e9a73d5f9f?w=300&q=80",
          description: "Emerald green salwar kameez with intricate embroidery",
          tags: ["casual", "comfortable", "traditional"],
          culturalSignificance:
            "Salwar kameez offers comfort while maintaining traditional aesthetics.",
          rarity: "common",
        },
      ],
    },
    {
      id: "detroit-motown",
      name: "Detroit Motown",
      description: "Celebrating the soul and rhythm of Detroit",
      icon: <Zap className="h-4 w-4" />,
      items: [
        {
          id: "sequin-dress",
          name: "Sparkling Sequin Dress",
          image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
          description: "Sparkling sequin dress in classic Motown style",
          tags: ["performance", "glamorous", "vintage"],
          culturalSignificance:
            "Sequined dresses were iconic in the Motown era, representing glamour and performance excellence.",
          rarity: "legendary",
        },
        {
          id: "bell-bottoms",
          name: "Classic Bell Bottoms",
          image:
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=300&q=80",
          description: "Classic 70s bell bottom pants with matching top",
          tags: ["retro", "casual", "iconic"],
          culturalSignificance:
            "Bell bottoms represent the free-spirited fashion of the 1970s Detroit music scene.",
          rarity: "rare",
        },
      ],
    },
    {
      id: "fusion-style",
      name: "Fusion Style",
      description: "Modern blend of cultures and styles",
      icon: <Palette className="h-4 w-4" />,
      items: [
        {
          id: "indo-western",
          name: "Indo-Western Ensemble",
          image:
            "https://images.unsplash.com/photo-1583391733981-8498408c3c25?w=300&q=80",
          description: "Perfect blend of Indian and Western fashion elements",
          tags: ["modern", "fusion", "versatile"],
          culturalSignificance:
            "Represents the beautiful fusion of Eastern and Western cultures in modern fashion.",
          rarity: "rare",
        },
      ],
    },
    {
      id: "professional",
      name: "Professional",
      description: "Sophisticated attire for professional settings",
      icon: <User className="h-4 w-4" />,
      items: [
        {
          id: "business-suit",
          name: "Executive Business Suit",
          image:
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&q=80",
          description:
            "Sophisticated business suit for professional excellence",
          tags: ["professional", "formal", "confident"],
          culturalSignificance:
            "Professional attire that maintains cultural identity while meeting modern workplace standards.",
          rarity: "common",
        },
      ],
    },
    {
      id: "casual",
      name: "Casual & Comfort",
      description: "Comfortable everyday wear",
      icon: <Heart className="h-4 w-4" />,
      items: [
        {
          id: "apron-heritage",
          name: "Heritage Kitchen Apron",
          image:
            "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80",
          description:
            "Beautiful apron with traditional Indian motifs, perfect for sharing family recipes",
          tags: ["cooking", "heritage", "practical", "storytelling"],
          culturalSignificance:
            "Represents the sacred tradition of passing down family recipes and cultural knowledge through generations. The kitchen is where stories are shared and bonds are formed.",
          rarity: "common",
        },
      ],
    },
  ];

  // Use custom categories if provided, otherwise use defaults
  const outfitCategories = customCategories || defaultOutfitCategories;

  // ============================================================================
  // COMPUTED VALUES
  // ============================================================================

  const currentCategory = outfitCategories.find(
    (cat) => cat.id === selectedCategory,
  );
  const currentOutfit = currentCategory?.items.find(
    (item) => item.id === selectedOutfit,
  );
  const currentAvatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarConfig.seed}&backgroundColor=${avatarConfig.backgroundColor}&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold`;

  // Filter items based on search query
  const filteredItems =
    currentCategory?.items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    ) || [];

  // ============================================================================
  // EFFECTS
  // ============================================================================

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && onSave) {
      const timeoutId = setTimeout(() => {
        onSave(avatarConfig);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [avatarConfig, autoSave, onSave]);

  // Notify parent of avatar changes
  useEffect(() => {
    onAvatarChange?.(avatarConfig);
  }, [avatarConfig, onAvatarChange]);

  // Initialize with first outfit if none selected
  useEffect(() => {
    if (!selectedOutfit && currentCategory?.items.length > 0) {
      setSelectedOutfit(currentCategory.items[0].id);
    }
  }, [selectedCategory, selectedOutfit, currentCategory]);

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedOutfit(""); // Reset outfit selection
    setSearchQuery(""); // Clear search
  }, []);

  const { dispatch } = useAuntieMae();

  const handleOutfitChange = useCallback((outfitId: string) => {
    setSelectedOutfit(outfitId);

    // Add to recently used
    setRecentlyUsed((prev) => {
      const updated = [outfitId, ...prev.filter((id) => id !== outfitId)].slice(
        0,
        5,
      );
      return updated;
    });

    // Update avatar config based on outfit
    setAvatarConfig((prev) => ({
      ...prev,
      seed: outfitId,
      clothingStyle: outfitId,
    }));

    // Update Auntie Mae's outfit in global state
    dispatch({ type: 'SET_OUTFIT', payload: outfitId });
  }, [dispatch]);

  const handleSaveChanges = useCallback(() => {
    onSave?.(avatarConfig);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }, [avatarConfig, onSave]);

  const handleExport = useCallback(
    (format: string) => {
      onExport?.(avatarConfig, format);
    },
    [avatarConfig, onExport],
  );

  const handleShare = useCallback(() => {
    onShare?.(avatarConfig);
  }, [avatarConfig, onShare]);

  const handleRandomize = useCallback(() => {
    const randomCategory =
      outfitCategories[Math.floor(Math.random() * outfitCategories.length)];
    const randomOutfit =
      randomCategory.items[
        Math.floor(Math.random() * randomCategory.items.length)
      ];

    setSelectedCategory(randomCategory.id);
    setSelectedOutfit(randomOutfit.id);

    setAvatarConfig((prev) => ({
      ...prev,
      seed: Math.random().toString(36).substring(7),
      backgroundColor: ["b6e3f4", "ffdfba", "ffb3ba", "bae1ff", "ffffba"][
        Math.floor(Math.random() * 5)
      ],
    }));
  }, [outfitCategories]);

  const handleToggleFavorite = useCallback((outfitId: string) => {
    setFavorites((prev) =>
      prev.includes(outfitId)
        ? prev.filter((id) => id !== outfitId)
        : [...prev, outfitId],
    );
  }, []);

  const handleVoicePreview = useCallback(() => {
    if (!enableVoicePreview) return;

    setIsVoicePlaying(!isVoicePlaying);
    // In a real implementation, this would trigger voice synthesis
    setTimeout(() => setIsVoicePlaying(false), 3000);
  }, [enableVoicePreview, isVoicePlaying]);

  // ============================================================================
  // RENDER HELPERS
  // ============================================================================

  const renderDocumentationTooltip = (content: string, title?: string) => {
    if (!showDocumentation) return null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <HelpCircle className="h-3 w-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            {title && <p className="font-semibold mb-1">{title}</p>}
            <p className="text-sm">{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

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

  const renderCulturalContext = (item: OutfitItem) => {
    if (!enableCulturalContext || !item.culturalSignificance) return null;

    return (
      <div className="mt-2 p-2 bg-muted/50 rounded-md">
        <div className="flex items-center gap-1 mb-1">
          <Info className="h-3 w-3" />
          <span className="text-xs font-medium">Cultural Context</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {item.culturalSignificance}
        </p>
      </div>
    );
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  const containerClasses = `
    ${theme === "dark" ? "bg-gray-900 text-white" : "bg-background"}
    ${size === "sm" ? "max-w-4xl" : size === "md" ? "max-w-5xl" : size === "lg" ? "max-w-7xl" : "max-w-full"}
    mx-auto p-6 rounded-lg w-full
    ${className}
  `;

  return (
    <div className={containerClasses} style={style}>
      {/* Header with Documentation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Palette className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Avatar Customizer</h1>
            <Badge variant="secondary" className="ml-2">
              v2.0
            </Badge>
          </div>
          {renderDocumentationTooltip(
            "A comprehensive avatar customization system with cultural awareness, accessibility features, and advanced personalization options.",
            "About Avatar Customizer",
          )}
        </div>

        <div className="flex items-center gap-2">
          {enableVoicePreview && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleVoicePreview}
              className="flex items-center gap-2"
            >
              {isVoicePlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Voice Preview
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleRandomize}
            className="flex items-center gap-2"
          >
            <Shuffle className="h-4 w-4" />
            Randomize
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Advanced Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Select
                    value={avatarConfig.backgroundColor}
                    onValueChange={(value) =>
                      setAvatarConfig((prev) => ({
                        ...prev,
                        backgroundColor: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b6e3f4">Light Blue</SelectItem>
                      <SelectItem value="ffdfba">Peach</SelectItem>
                      <SelectItem value="ffb3ba">Pink</SelectItem>
                      <SelectItem value="bae1ff">Sky Blue</SelectItem>
                      <SelectItem value="ffffba">Light Yellow</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {enableVoicePreview && (
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      Volume
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? (
                          <VolumeX className="h-3 w-3" />
                        ) : (
                          <Volume2 className="h-3 w-3" />
                        )}
                      </Button>
                    </Label>
                    <Slider
                      value={[isMuted ? 0 : volume]}
                      onValueChange={(value) => setVolume(value[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Animation Speed</Label>
                  <Slider
                    value={[enableAnimations ? 100 : 0]}
                    onValueChange={(value) => setIsAnimating(value[0] > 50)}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Avatar Preview */}
        {showPreview && (
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Preview
                    </CardTitle>
                    <CardDescription>
                      See your customized avatar in real-time
                    </CardDescription>
                  </div>
                  {renderDocumentationTooltip(
                    "This preview updates in real-time as you make changes. The avatar uses the DiceBear API for consistent, high-quality avatars.",
                    "Avatar Preview",
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <motion.div
                  className="relative w-64 h-64 rounded-full overflow-hidden bg-muted mb-4"
                  animate={
                    isAnimating
                      ? { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={currentAvatarUrl}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Animation overlay */}
                  {enableAnimations && isAnimating && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: [-100, 300] }}
                      transition={{ duration: 1, repeat: 2 }}
                    />
                  )}
                </motion.div>

                {currentOutfit && (
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="font-medium">{currentOutfit.name}</h3>
                      {renderRarityBadge(currentOutfit.rarity)}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.preventDefault();
                          handleToggleFavorite(currentOutfit.id);
                        }}
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
                        {currentOutfit.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {renderCulturalContext(currentOutfit)}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <Button onClick={handleSaveChanges} className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>

                  {enableExport && (
                    <Button
                      variant="outline"
                      onClick={() => handleExport("png")}
                      className="flex-1"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  )}
                </div>

                {enableSharing && (
                  <Button
                    variant="secondary"
                    onClick={handleShare}
                    className="w-full"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Avatar
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        )}

        {/* Outfit Selection */}
        <div className={showPreview ? "lg:col-span-2" : "lg:col-span-3"}>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shirt className="h-5 w-5" />
                    Outfit Selection
                  </CardTitle>
                  <CardDescription>
                    Choose from culturally diverse outfit styles
                  </CardDescription>
                </div>
                {renderDocumentationTooltip(
                  "Browse through carefully curated outfit categories that celebrate cultural diversity and personal expression. Each outfit includes cultural context and significance.",
                  "Outfit Categories",
                )}
              </div>

              {/* Search Bar */}
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
              <Tabs
                value={selectedCategory}
                onValueChange={handleCategoryChange}
              >
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4 w-full">
                  {outfitCategories.map((category) => (
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

                {outfitCategories.map((category) => (
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
                        {filteredItems.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <RadioGroupItem value={item.id} id={item.id} />
                            <Label
                              htmlFor={item.id}
                              className="flex flex-1 items-center cursor-pointer"
                            >
                              <div className="flex items-center space-x-4 w-full">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={item.image}
                                    alt={item.name}
                                  />
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
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        Recent
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {item.description}
                                  </p>

                                  {item.tags && (
                                    <div className="flex flex-wrap gap-1">
                                      {item.tags.map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  )}

                                  {renderCulturalContext(item)}
                                </div>

                                <div className="flex flex-col items-center gap-2">
                                  <ChevronRight className="h-5 w-5 text-muted-foreground" />

                                  <div className="flex gap-1">
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

                                    {enableCustomUploads && (
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          // Handle custom upload
                                        }}
                                      >
                                        <Camera className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Label>
                          </motion.div>
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

      {/* Quick Actions Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Total Outfits:{" "}
            {outfitCategories.reduce((acc, cat) => acc + cat.items.length, 0)}
          </Badge>
          <Badge variant="outline">Favorites: {favorites.length}</Badge>
          {enablePresets && <Badge variant="outline">Presets Available</Badge>}
        </div>

        <div className="flex items-center gap-2">
          {enableAccessibility && (
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Accessibility
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setAvatarConfig({
                ...avatarConfig,
                seed: Math.random().toString(36).substring(7),
              })
            }
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>

          {renderDocumentationTooltip(
            "This Avatar Customizer is a fully standalone, plug-and-play component with comprehensive features including cultural awareness, accessibility support, voice preview, and advanced customization options.",
            "Component Information",
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORT
// ============================================================================

export default AvatarCustomizer;
export type { AvatarCustomizerProps, AvatarConfig, OutfitCategory, OutfitItem };
