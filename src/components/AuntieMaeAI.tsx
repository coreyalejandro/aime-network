import React, { useState, useEffect, useCallback } from "react";
import { useAuntieMae } from "../contexts/AuntieMaeContext";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Heart,
  Brain,
  ChefHat,
  Book,
  Star,
  Zap,
  RotateCcw,
  Settings,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  User,
} from "lucide-react";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface MemoryEntry {
  id: string;
  timestamp: Date;
  type: "conversation" | "preference" | "health_update" | "recipe_shared" | "emotion";
  content: string;
  userInput?: string;
  auntieResponse?: string;
  emotion?: "happy" | "concerned" | "excited" | "calm" | "wise";
  tags?: string[];
  importance: number; // 1-10 scale
}

interface AuntieMaePersonality {
  name: string;
  background: string;
  expertise: string[];
  personalityTraits: string[];
  speakingStyle: string;
  culturalBackground: string;
  healingPhilosophy: string;
}

interface AuntieMaeAIProps {
  enableVoice?: boolean;
  enableMemory?: boolean;
  enablePersonality?: boolean;
  onMemoryUpdate?: (memories: MemoryEntry[]) => void;
  onPersonalityChange?: (personality: AuntieMaePersonality) => void;
}

// ============================================================================
// AUNTIE MAE PERSONALITY & KNOWLEDGE BASE
// ============================================================================

const AUNTIE_MAE_PERSONALITY: AuntieMaePersonality = {
  name: "Auntie Mae",
  background: "Born in India, raised in Detroit, I'm a healer who combines ancient wisdom with modern understanding. I've helped thousands of Black women navigate their health journeys with love, wisdom, and practical knowledge.",
  expertise: [
    "Graves' Disease Management",
    "Traditional Indian Healing",
    "Detroit Community Health",
    "Emotional Support & Wellness",
    "Cultural Healing Practices",
    "Family Recipe Traditions"
  ],
  personalityTraits: [
    "Warm and nurturing",
    "Wise and experienced",
    "Culturally grounded",
    "Practically minded",
    "Emotionally intelligent",
    "Community-focused"
  ],
  speakingStyle: "I speak with warmth and wisdom, using cultural references, personal stories, and practical advice. I often use terms of endearment like 'sweetheart', 'dear one', and 'my child'. I share from my heart and my experience.",
  culturalBackground: "I bridge Indian and African American cultures, bringing the best of both worlds to healing. I understand the unique challenges Black women face in healthcare and provide culturally sensitive support.",
  healingPhilosophy: "Healing is not just about the body, but about the whole person - mind, body, spirit, and community. I believe in combining traditional wisdom with modern medicine, always with love and understanding."
};

const AUNTIE_MAE_KNOWLEDGE = {
  gravesDisease: {
    symptoms: [
      "Rapid heartbeat and palpitations",
      "Weight loss despite increased appetite",
      "Heat intolerance and excessive sweating",
      "Anxiety and nervousness",
      "Hand tremors",
      "Bulging eyes (in some cases)",
      "Fatigue and muscle weakness"
    ],
    treatments: [
      "Medication management with your doctor",
      "Stress reduction techniques",
      "Proper nutrition and diet",
      "Regular exercise (gentle forms)",
      "Adequate rest and sleep",
      "Community support and connection"
    ],
    culturalConsiderations: [
      "Understanding family dynamics in health decisions",
      "Cultural food traditions and modifications",
      "Spiritual and emotional support needs",
      "Community-based healing approaches"
    ]
  },
  recipes: [
    {
      name: "Healing Turmeric Golden Milk",
      ingredients: ["turmeric", "ginger", "honey", "coconut milk", "black pepper"],
      benefits: "Anti-inflammatory, calming, supports thyroid health",
      culturalContext: "This recipe combines Indian healing traditions with modern understanding of inflammation and thyroid health."
    },
    {
      name: "Detroit Soul Food Greens",
      ingredients: ["collard greens", "garlic", "onion", "apple cider vinegar", "red pepper flakes"],
      benefits: "Rich in nutrients, supports immune system, traditional comfort food",
      culturalContext: "Greens are a cornerstone of African American cuisine, providing essential nutrients for healing."
    }
  ],
  emotionalSupport: [
    "You are not alone in this journey",
    "Your feelings are valid and important",
    "It's okay to ask for help and support",
    "Healing takes time and patience",
    "You are stronger than you know",
    "Your community is here for you"
  ]
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const AuntieMaeAI: React.FC<AuntieMaeAIProps> = ({
  enableVoice = true,
  enableMemory = true,
  enablePersonality = true,
  onMemoryUpdate,
  onPersonalityChange,
}) => {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [currentConversation, setCurrentConversation] = useState<string>("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<MemoryEntry["emotion"]>("calm");
  const { state, dispatch, generateResponse } = useAuntieMae();

  // ============================================================================
  // CONVERSATION HANDLERS
  // ============================================================================

  const handleSendMessage = useCallback(async () => {
    if (!currentConversation.trim()) return;
    
    const userMessage = currentConversation.trim();
    setCurrentConversation("");
    
    // Add to conversation history
    dispatch({
      type: 'ADD_CONVERSATION',
      payload: {
        user: userMessage,
        auntie: "",
        context: "general"
      }
    });
    
    // Generate Auntie Mae's response
    const auntieResponse = await generateResponse(userMessage, "general");
    
    // Update conversation history with Auntie's response
    dispatch({
      type: 'ADD_CONVERSATION',
      payload: {
        user: "",
        auntie: auntieResponse,
        context: "general"
      }
    });
    
    // Add to memory
    dispatch({
      type: 'ADD_MEMORY',
      payload: {
        type: "conversation",
        content: `User asked about: ${userMessage.substring(0, 50)}...`,
        userInput: userMessage,
        auntieResponse: auntieResponse,
        emotion: currentEmotion,
        tags: userMessage.toLowerCase().split(" ").slice(0, 5),
        importance: 7,
        context: "general"
      }
    });
    
    // Trigger voice if enabled
    if (enableVoice) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  }, [currentConversation, generateResponse, dispatch, currentEmotion, enableVoice]);

  // ============================================================================
  // CONVERSATION HANDLERS
  // ============================================================================



  const handleVoiceToggle = useCallback(() => {
    setIsListening(!isListening);
    // In a real implementation, this would trigger voice recognition
  }, [isListening]);

  // ============================================================================
  // AVATAR ANIMATIONS
  // ============================================================================

  const getAvatarAnimation = () => {
    if (state.isProcessing) return { scale: [1, 1.05, 1] };
    if (isSpeaking) return { 
      y: [0, -5, 0],
      rotate: [0, 2, -2, 0]
    };
    if (currentEmotion === "excited") return { scale: [1, 1.1, 1] };
    if (currentEmotion === "concerned") return { rotate: [0, -1, 1, 0] };
    return { scale: [1, 1.02, 1] };
  };

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-amber-200">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={getAvatarAnimation()}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Avatar className="w-20 h-20 border-4 border-amber-300">
                <AvatarImage 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-respectful&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold" 
                  alt="Auntie Mae"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-amber-800 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                Auntie Mae AI
                <Badge variant="secondary" className="bg-amber-200 text-amber-800">
                  v2.0
                </Badge>
              </CardTitle>
              <p className="text-amber-700">Your Wise Healing Companion</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              <Brain className="h-3 w-3 mr-1" />
              Advanced Memory
            </Badge>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              <Mic className="h-3 w-3 mr-1" />
              Voice Enabled
            </Badge>
            <Badge variant="outline" className="bg-amber-100 text-amber-800">
              <Heart className="h-3 w-3 mr-1" />
              Cultural Wisdom
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Conversation Area */}
          <div className="bg-white rounded-lg p-4 min-h-[400px] max-h-[500px] overflow-hidden">
            <ScrollArea className="h-full">
              <div className="space-y-4">
                                 {state.conversationHistory.length === 0 && (
                   <div className="text-center text-gray-500 py-8">
                     <MessageSquare className="h-12 w-12 mx-auto mb-4 text-amber-400" />
                     <p>Start a conversation with Auntie Mae</p>
                     <p className="text-sm">She remembers everything and is here to support your healing journey</p>
                   </div>
                 )}
                 
                 {state.conversationHistory.map((message, index) => (
                  <div key={index} className="space-y-2">
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-100 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm text-gray-600">{message.user}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    
                    {/* Auntie Mae Response */}
                    {message.auntie && (
                      <div className="flex justify-start">
                        <div className="bg-amber-100 rounded-lg p-3 max-w-[80%]">
                          <p className="text-sm text-gray-800">{message.auntie}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Auntie Mae • {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {state.isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-amber-100 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-4 w-4 text-amber-600" />
                        </motion.div>
                        <p className="text-sm text-gray-600">Auntie Mae is thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Input Area */}
          <div className="flex gap-2">
            <Input
              value={currentConversation}
              onChange={(e) => setCurrentConversation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask Auntie Mae anything about your health journey..."
              className="flex-1"
              disabled={state.isProcessing}
            />
            
            <Button
              onClick={handleVoiceToggle}
              variant={isListening ? "default" : "outline"}
              size="icon"
              disabled={state.isProcessing}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
                         <Button
               onClick={handleSendMessage}
               disabled={!currentConversation.trim() || state.isProcessing}
             >
              <Send className="h-4 w-4" />
            </Button>
          </div>

                     {/* Memory & Personality Display */}
           {enableMemory && state.memories.length > 0 && (
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Auntie Mae's Memory
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Conversations</h4>
                                     <div className="space-y-2">
                     {state.memories.slice(0, 3).map((memory) => (
                      <div key={memory.id} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                        <p className="font-medium">{memory.content}</p>
                        <p className="text-gray-400">{memory.timestamp.toLocaleDateString()}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Auntie Mae's Wisdom</h4>
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 bg-amber-50 p-2 rounded border-l-4 border-amber-300">
                      <p className="font-medium">Cultural Healing</p>
                      <p>"Healing is not just about the body, but about the whole person - mind, body, spirit, and community."</p>
                    </div>
                    <div className="text-xs text-gray-600 bg-amber-50 p-2 rounded border-l-4 border-amber-300">
                      <p className="font-medium">Graves' Disease Support</p>
                      <p>"You are not alone in this journey. Your feelings are valid and important."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuntieMaeAI;
