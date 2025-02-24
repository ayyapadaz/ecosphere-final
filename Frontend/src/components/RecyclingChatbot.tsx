import { useRef, useEffect, useState } from 'react';
import { Send, Image as ImageIcon, Loader, X, Smile, Paperclip, MoreHorizontal, ArrowLeft } from 'lucide-react';
import { useChat } from '../contexts/ChatContext';
import { motion, AnimatePresence } from 'framer-motion';

export function RecyclingChatbot() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    analyzeImage,
    clearChat
  } = useChat();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{
    data: string;
    url: string;
  } | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    
    if (selectedImage) {
      // Send image with context text
      await analyzeImage(selectedImage.data, selectedImage.url, input);
      setSelectedImage(null);
    } else {
      // Send text only
      await sendMessage(input);
    }
    
    setInput('');
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageData = reader.result as string;
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage({ data: imageData, url: imageUrl });
    };
    reader.readAsDataURL(file);
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-600 to-emerald-500 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Smile className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Recycling Assistant</h2>
              <p className="text-xs text-green-100">Ask questions about recycling materials</p>
            </div>
          </div>
          <button 
            onClick={clearChat}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-3 bg-red-50 text-red-700 text-sm overflow-hidden"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-6">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Smile className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Welcome to Recycling Assistant</h3>
            <p className="text-sm max-w-md">
              Ask questions about recycling materials, upload images of items, or get sustainability tips.
            </p>
          </div>
        )}
        
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-100'
              }`}
            >
              {message.imageUrl && (
                <div className="mb-2 rounded-lg overflow-hidden">
                  <img
                    src={message.imageUrl}
                    alt="Uploaded"
                    className="max-w-full object-cover"
                    style={{ maxHeight: '200px' }}
                  />
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {typeof message.content === 'string' 
                  ? message.content 
                  : message.content.map(c => c.text).join(' ')}
              </p>
              <div className={`text-xs mt-1 text-right ${message.role === 'user' ? 'text-green-100' : 'text-gray-400'}`}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected Image Preview */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-3 border-t bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img 
                  src={selectedImage.url} 
                  alt="Selected" 
                  className="h-16 w-auto rounded-md object-cover border border-gray-200"
                />
                <button
                  onClick={removeSelectedImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-700">
                  Image selected
                </p>
                <p className="text-xs text-gray-500">
                  Add a question about this image
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="p-3 border-t bg-white">
        <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-gray-100"
              disabled={isLoading}
              title="Upload image"
            >
              <ImageIcon className="h-5 w-5" />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-green-600 transition-colors rounded-full hover:bg-gray-100"
              disabled={isLoading}
              title="Attach file"
            >
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder={selectedImage 
              ? "Ask about this image..." 
              : "Ask about recycling materials..."
            }
            className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm py-2"
            disabled={isLoading}
          />
          
          <button
            onClick={handleSend}
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className={`p-2 rounded-full transition-all ${
              (!input.trim() && !selectedImage) || isLoading
                ? 'bg-gray-200 text-gray-400'
                : 'bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-md hover:shadow-lg'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-2 px-2">
          <p className="text-xs text-gray-400 text-center">
            Powered by AI • Your recycling assistant
          </p>
        </div>
      </div>
    </div>
  );
} 