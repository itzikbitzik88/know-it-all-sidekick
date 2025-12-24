import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

// Mock responses - will be replaced with RAG later
const mockResponses = [
  "Based on the documents I've analyzed, here's what I found relevant to your question. The information suggests that this topic has multiple facets worth exploring.",
  "Great question! From the knowledge base, I can see that this is a common inquiry. Let me break down the key points for you.",
  "I've searched through the available resources and found some interesting insights. The main takeaway is that context matters significantly in these situations.",
  "Looking at the relevant documents, I can provide you with a comprehensive answer. There are several factors to consider here.",
  "That's an interesting query! Based on my analysis of the available information, here's what stands out as most relevant to your needs.",
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate RAG response delay
    await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, assistantMessage]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="w-10 h-10 rounded-xl chat-gradient flex items-center justify-center shadow-md shadow-primary/20">
          <MessageCircle className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Knowledge Assistant</h1>
          <p className="text-xs text-muted-foreground">Ask questions about your documents</p>
        </div>
      </motion.header>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-6 space-y-4 scrollbar-thin"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="w-16 h-16 rounded-2xl chat-gradient flex items-center justify-center shadow-lg shadow-primary/20 mb-6">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Welcome to Knowledge Assistant
            </h2>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              I can help you find information from your documents. Ask me anything
              and I'll search through your knowledge base to provide relevant answers.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {["What can you help me with?", "How does this work?", "Show me an example"].map(
                (suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                  >
                    {suggestion}
                  </button>
                )
              )}
            </div>
          </motion.div>
        ) : (
          <>
            {messages.map((message, index) => (
              <ChatMessage key={message.id} message={message} index={index} />
            ))}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 pb-6 pt-2">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};
