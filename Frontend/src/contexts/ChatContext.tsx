import React, { createContext, useContext, useState, useCallback } from 'react';
import { groqApi, ChatMessage } from '../api/groq';

interface ExtendedChatMessage extends ChatMessage {
  imageUrl?: string; // For displaying uploaded images
}

interface ChatContextType {
  messages: ExtendedChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  analyzeImage: (imageData: string, imageUrl: string, question?: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ExtendedChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const userMessage: ExtendedChatMessage = { role: 'user', content };
      setMessages(prev => [...prev, userMessage]);

      const response = await groqApi.chat([...messages, userMessage]);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const analyzeImage = useCallback(async (imageData: string, imageUrl: string, question?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const defaultQuestion = "What recyclable materials do you see in this image? Please provide detailed information about their recyclability and potential uses.";
      const userQuestion = question || defaultQuestion;

      // Add user's image message with context
      const userMessage: ExtendedChatMessage = {
        role: 'user',
        content: userQuestion,
        imageUrl: imageUrl
      };
      setMessages(prev => [...prev, userMessage]);

      const response = await groqApi.analyzeImage(
        imageData,
        userQuestion
      );

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isLoading, 
        error, 
        sendMessage, 
        analyzeImage, 
        clearChat 
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
} 