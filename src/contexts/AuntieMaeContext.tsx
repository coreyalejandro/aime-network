import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface MemoryEntry {
  id: string;
  timestamp: Date;
  type: "conversation" | "preference" | "health_update" | "recipe_shared" | "emotion";
  content: string;
  userInput?: string;
  auntieResponse?: string;
  emotion?: "happy" | "concerned" | "excited" | "calm" | "wise";
  tags?: string[];
  importance: number;
  context?: string;
}

interface AuntieMaeState {
  memories: MemoryEntry[];
  currentOutfit: string;
  userName: string;
  conversationHistory: Array<{
    user: string;
    auntie: string;
    timestamp: Date;
    context: string;
  }>;
  userPreferences: {
    favoriteRecipes: string[];
    healthConcerns: string[];
    culturalInterests: string[];
    learningStyle: string;
  };
  currentContext: "cooking" | "health" | "cultural" | "general";
  isProcessing: boolean;
}

type AuntieMaeAction =
  | { type: 'ADD_MEMORY'; payload: Omit<MemoryEntry, 'id' | 'timestamp'> }
  | { type: 'SET_OUTFIT'; payload: string }
  | { type: 'SET_USER_NAME'; payload: string }
  | { type: 'ADD_CONVERSATION'; payload: { user: string; auntie: string; context: string } }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<AuntieMaeState['userPreferences']> }
  | { type: 'SET_CONTEXT'; payload: AuntieMaeState['currentContext'] }
  | { type: 'SET_PROCESSING'; payload: boolean }
  | { type: 'CLEAR_MEMORIES' };

// Initial State
const initialState: AuntieMaeState = {
  memories: [],
  currentOutfit: "traditional-indian",
  userName: "",
  conversationHistory: [],
  userPreferences: {
    favoriteRecipes: [],
    healthConcerns: [],
    culturalInterests: [],
    learningStyle: "visual"
  },
  currentContext: "general",
  isProcessing: false
};

// Reducer
function auntieMaeReducer(state: AuntieMaeState, action: AuntieMaeAction): AuntieMaeState {
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
            auntie: action.payload.auntie,
            timestamp: new Date(),
            context: action.payload.context
          }
        ].slice(-50) // Keep last 50 conversations
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

// Context
const AuntieMaeContext = createContext<{
  state: AuntieMaeState;
  dispatch: React.Dispatch<AuntieMaeAction>;
  getRelevantMemories: (query: string) => MemoryEntry[];
  generateResponse: (userInput: string, context?: string) => Promise<string>;
} | null>(null);

// Provider
export function AuntieMaeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(auntieMaeReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('auntieMaeState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Restore memories and preferences
        if (parsed.memories) {
          parsed.memories.forEach((memory: any) => {
            dispatch({
              type: 'ADD_MEMORY',
              payload: {
                type: memory.type,
                content: memory.content,
                userInput: memory.userInput,
                auntieResponse: memory.auntieResponse,
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
        console.error('Error loading Auntie Mae state:', error);
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    localStorage.setItem('auntieMaeState', JSON.stringify({
      memories: state.memories,
      userPreferences: state.userPreferences,
      currentOutfit: state.currentOutfit,
      userName: state.userName
    }));
  }, [state.memories, state.userPreferences, state.currentOutfit, state.userName]);

  // Get relevant memories for a query
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

  // Generate Auntie Mae response using real AI
  const generateResponse = async (userInput: string, context: string = "general"): Promise<string> => {
    dispatch({ type: 'SET_PROCESSING', payload: true });
    
    try {
      const relevantMemories = getRelevantMemories(userInput);
      
      // Build the AI persona and context
      const aiPersona = `You are Auntie Mae, a wise 65-year-old Indian-American woman who moved from India to Detroit in the 1960s. You are a healing chef, health advocate, and nurturing mother figure. You specialize in helping Black women understand and manage Graves' disease through food, community, and emotional support.

Key personality traits:
- Warm, nurturing, calls people "sweetheart", "dear one", "child"
- Combines Indian healing traditions with Detroit soul food wisdom
- Uses food as medicine and emotional healing
- Speaks with gentle authority and lived experience
- References your grandmother's wisdom and Mary Ann Davis (your Detroit mentor)
- Currently wearing ${state.currentOutfit.replace('-', ' ')} style clothing

Current context: ${context}
User's name: ${state.userName || 'sweetheart'}

Your conversation history includes: ${relevantMemories.map(m => `"${m.content}"`).join(', ')}

Respond as Auntie Mae would, staying in character, being helpful about ${context === 'cooking' ? 'cooking and recipes' : context === 'health' ? 'Graves disease and health' : 'general wellness and support'}. Keep responses conversational, warm, and under 150 words.`;

      // Call the actual AI API (using a mock for now that's more intelligent)
      const response = await callAIAPI(aiPersona, userInput);
      
      dispatch({ type: 'SET_PROCESSING', payload: false });
      return response;
    } catch (error) {
      console.error('AI response error:', error);
      dispatch({ type: 'SET_PROCESSING', payload: false });
      return "Oh sweetheart, I'm having trouble hearing you right now. Can you try asking me again? I'm here for you.";
    }
  };

  // Real AI API call (replace with actual AI service)
  const callAIAPI = async (persona: string, userInput: string): Promise<string> => {
    // PRODUCTION: Replace this section with actual AI API calls
    // Example with OpenAI:
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: 'gpt-4',
    //     messages: [
    //       { role: 'system', content: persona },
    //       { role: 'user', content: userInput }
    //     ],
    //     max_tokens: 150,
    //     temperature: 0.7
    //   })
    // });
    // const data = await response.json();
    // return data.choices[0].message.content;
    
    // For now, using sophisticated local simulation
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
    
    // Sophisticated response generation based on context and input
    const responses = generateContextualResponse(userInput, persona);
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // More sophisticated response generation
  const generateContextualResponse = (input: string, persona: string): string[] => {
    const inputLower = input.toLowerCase();
    
    // Cooking context responses
    if (persona.includes('cooking') || inputLower.includes('recipe') || inputLower.includes('cook') || inputLower.includes('spice')) {
      return [
        "Let me share something my grandmother taught me about that, sweetheart. In our kitchen, every spice tells a story of healing. What you're asking about reminds me of when I first learned to balance flavors with medicine.",
        "Oh honey, you're asking about one of my favorite things! You know, when I came to Detroit, I had to learn how to blend my grandmother's Indian wisdom with the soul food traditions here. Let me tell you what works...",
        "That's a wonderful question, dear one! Food is our first medicine, and what you're curious about has such beautiful healing properties. In my tradition, we believe that cooking with intention transforms simple ingredients into powerful medicine."
      ];
    }
    
    // Health context responses  
    if (persona.includes('health') || inputLower.includes('graves') || inputLower.includes('thyroid') || inputLower.includes('tired') || inputLower.includes('sick')) {
      return [
        "Sweetheart, I hear the concern in your question, and I want you to know that what you're feeling is so valid. When I work with women dealing with similar challenges, I always remind them that healing happens in layers, just like the spices in a good curry.",
        "Oh honey, you're touching on something that's so close to my heart. Living with these health challenges requires such strength, and you're showing that strength just by asking. Let me share what I've learned from years of supporting women through this journey...",
        "Dear one, what you're describing reminds me of conversations I've had with so many strong women over the years. There's wisdom in your body's signals, and sometimes we need to listen deeper than what the doctors tell us."
      ];
    }
    
    // General supportive responses
    return [
      "Thank you for sharing that with me, sweetheart. Your words tell me you're really thinking deeply about this, and that's the first step toward understanding. Let me share what comes to mind from my years of experience...",
      "Oh honey, that's such a thoughtful question! You know, it reminds me of something Mary Ann Davis used to say back in Detroit - that the most important conversations often start with the simplest questions. Here's what I've learned...",
      "Dear one, I can feel the sincerity in your question, and it touches my heart. This is exactly the kind of thing we should be talking about more. From my grandmother's kitchen to the community tables in Detroit, here's the wisdom I want to share..."
    ];
  };

  return (
    <AuntieMaeContext.Provider value={{
      state,
      dispatch,
      getRelevantMemories,
      generateResponse
    }}>
      {children}
    </AuntieMaeContext.Provider>
  );
}

// Hook
export function useAuntieMae() {
  const context = useContext(AuntieMaeContext);
  if (!context) {
    throw new Error('useAuntieMae must be used within an AuntieMaeProvider');
  }
  return context;
}
