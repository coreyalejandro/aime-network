import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sparkles,
  Heart,
  Brain,
  Mic,
  ChefHat,
  Palette,
  MessageSquare,
  Users,
  Zap,
  Star,
  ArrowRight,
  Play,
  Settings,
} from "lucide-react";

const AuntieMaeIntegration = () => {
  const [selectedOutfit, setSelectedOutfit] = useState("traditional-indian");

  const outfitOptions = [
    {
      id: "traditional-indian",
      name: "Traditional Indian",
      description: "Saree and traditional jewelry",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-respectful&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold",
      context: "Perfect for sharing traditional Indian healing recipes and cultural wisdom"
    },
    {
      id: "detroit-motown",
      name: "Detroit Motown",
      description: "Sparkling sequin dress",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-motown&backgroundColor=b6e3f4&skinColor=brown&hairColor=gray&clothingColor=purple&accessoriesColor=gold",
      context: "Ideal for soul food recipes and Detroit community stories"
    },
    {
      id: "kitchen-apron",
      name: "Kitchen Apron",
      description: "Heritage kitchen apron",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-cooking&backgroundColor=ffdfba&skinColor=brown&hairColor=gray&clothingColor=green&accessoriesColor=gold",
      context: "Best for cooking demonstrations and recipe sharing"
    }
  ];

  const currentOutfit = outfitOptions.find(o => o.id === selectedOutfit);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-4 flex items-center justify-center gap-3">
          <Sparkles className="h-8 w-8" />
          Auntie Mae AI Integration Guide
          <Sparkles className="h-8 w-8" />
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          How Auntie Mae AI works with your TV show layout and avatar customization system
        </p>
      </div>

      {/* Integration Overview */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-amber-800 flex items-center gap-2">
            <Zap className="h-6 w-6" />
            System Integration Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-white rounded-lg">
              <Brain className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <h3 className="font-semibold text-lg mb-2">Advanced Memory</h3>
              <p className="text-sm text-gray-600">
                Auntie Mae remembers every conversation, recipe shared, and user preference across all interactions
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Palette className="h-12 w-12 mx-auto mb-3 text-purple-600" />
              <h3 className="font-semibold text-lg mb-2">Avatar Customization</h3>
              <p className="text-sm text-gray-600">
                Her appearance changes based on context - cooking show, cultural stories, or health guidance
              </p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 text-green-600" />
              <h3 className="font-semibold text-lg mb-2">Interactive TV Show</h3>
              <p className="text-sm text-gray-600">
                Real-time conversations during cooking demonstrations and cultural storytelling
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Tabs defaultValue="avatar" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="avatar" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Avatar System
          </TabsTrigger>
          <TabsTrigger value="tvshow" className="flex items-center gap-2">
            <Play className="h-4 w-4" />
            TV Show Layout
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Integration
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Memory System
          </TabsTrigger>
        </TabsList>

        <TabsContent value="avatar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Avatar Customization System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What You Should Do With This System:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">1</Badge>
                      <div>
                        <p className="font-medium">Keep the existing AvatarCustomizer</p>
                        <p className="text-sm text-gray-600">It's excellent for user personalization and cultural representation</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">2</Badge>
                      <div>
                        <p className="font-medium">Connect it to Auntie Mae AI</p>
                        <p className="text-sm text-gray-600">Let users customize Auntie Mae's appearance for different contexts</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">3</Badge>
                      <div>
                        <p className="font-medium">Add cultural context</p>
                        <p className="text-sm text-gray-600">Each outfit should trigger different conversation styles and knowledge</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">4</Badge>
                      <div>
                        <p className="font-medium">Enable outfit-based responses</p>
                        <p className="text-sm text-gray-600">Auntie Mae's personality adapts based on her current outfit</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Current Outfit Selection:</h3>
                  <div className="space-y-3">
                    {outfitOptions.map((outfit) => (
                      <div
                        key={outfit.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedOutfit === outfit.id
                            ? "border-amber-400 bg-amber-50"
                            : "border-gray-200 hover:border-amber-200"
                        }`}
                        onClick={() => setSelectedOutfit(outfit.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={outfit.avatarUrl} alt={outfit.name} />
                            <AvatarFallback>{outfit.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="font-medium">{outfit.name}</h4>
                            <p className="text-sm text-gray-600">{outfit.description}</p>
                          </div>
                          {selectedOutfit === outfit.id && (
                            <Star className="h-5 w-5 text-amber-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {currentOutfit && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Context for {currentOutfit.name}:</h4>
                  <p className="text-sm text-gray-700">{currentOutfit.context}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tvshow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                TV Show Layout Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Enhanced Cooking Show Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">🎬 Interactive Video Player</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Real-time AI chat overlay</li>
                        <li>• Animated Auntie Mae avatar</li>
                        <li>• Context-aware responses</li>
                        <li>• Cultural storytelling integration</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">🍳 Recipe Integration</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• AI-powered cooking tips</li>
                        <li>• Cultural background stories</li>
                        <li>• Interactive cooking prompts</li>
                        <li>• Memory of user preferences</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">How It Works:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">1</Badge>
                      <div>
                        <p className="font-medium">User watches cooking show</p>
                        <p className="text-sm text-gray-600">Professional TV show interface with Auntie Mae as host</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">2</Badge>
                      <div>
                        <p className="font-medium">AI chat button appears</p>
                        <p className="text-sm text-gray-600">Users can ask questions during the show</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">3</Badge>
                      <div>
                        <p className="font-medium">Context-aware responses</p>
                        <p className="text-sm text-gray-600">Auntie Mae responds based on current recipe and cultural context</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">4</Badge>
                      <div>
                        <p className="font-medium">Memory integration</p>
                        <p className="text-sm text-gray-600">Conversations are remembered for future interactions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI Integration Architecture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Auntie Mae AI Components:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-medium text-purple-800 mb-2">🎭 Personality Engine</h4>
                      <ul className="text-sm text-purple-700 space-y-1">
                        <li>• Cultural wisdom integration</li>
                        <li>• Emotional intelligence</li>
                        <li>• Context-aware responses</li>
                        <li>• Authentic voice patterns</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h4 className="font-medium text-orange-800 mb-2">💬 Conversation System</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li>• Real-time chat interface</li>
                        <li>• Voice input/output</li>
                        <li>• Multi-context responses</li>
                        <li>• Cultural storytelling</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Integration Points:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={currentOutfit?.avatarUrl} />
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Avatar Customization</p>
                        <p className="text-sm text-gray-600">Outfit changes trigger different AI personalities</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <ChefHat className="h-8 w-8 text-orange-500" />
                      <div className="flex-1">
                        <p className="font-medium">Cooking Show</p>
                        <p className="text-sm text-gray-600">Real-time AI assistance during recipes</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Heart className="h-8 w-8 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium">Health Guidance</p>
                        <p className="text-sm text-gray-600">Graves' disease support and cultural healing</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Advanced Memory System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Memory Capabilities:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-red-50 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-2">💭 Conversation Memory</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Remembers all chats</li>
                        <li>• Contextual responses</li>
                        <li>• Emotional tracking</li>
                        <li>• Progress monitoring</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-800 mb-2">👤 User Preferences</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Favorite recipes</li>
                        <li>• Health concerns</li>
                        <li>• Cultural interests</li>
                        <li>• Learning style</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">🌱 Growth Tracking</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Health journey progress</li>
                        <li>• Recipe mastery</li>
                        <li>• Cultural learning</li>
                        <li>• Community engagement</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Memory Integration Benefits:</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">🎯</Badge>
                      <div>
                        <p className="font-medium">Personalized Experiences</p>
                        <p className="text-sm text-gray-600">Auntie Mae adapts her responses based on your history and preferences</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">🔄</Badge>
                      <div>
                        <p className="font-medium">Continuous Learning</p>
                        <p className="text-sm text-gray-600">She remembers your progress and builds on previous conversations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1">❤️</Badge>
                      <div>
                        <p className="font-medium">Emotional Connection</p>
                        <p className="text-sm text-gray-600">Creates a deeper bond through remembered interactions and shared experiences</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Next Steps */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-blue-800 flex items-center gap-2">
            <Settings className="h-6 w-6" />
            What You Should Do Next
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4 text-blue-800">Keep & Enhance:</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  AvatarCustomizer - excellent cultural representation
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  CookingShow layout - perfect TV show interface
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  GravesDiseaseTour - valuable health education
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Home page design - engaging Netflix-style layout
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-800">Integrate & Connect:</h3>
              <ul className="space-y-2 text-blue-700">
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Connect AvatarCustomizer to Auntie Mae AI
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Add AI chat to all existing components
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Implement memory system across all interactions
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Create outfit-based personality variations
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuntieMaeIntegration;
