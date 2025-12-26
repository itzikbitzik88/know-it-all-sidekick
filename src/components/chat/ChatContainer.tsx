import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, User, MessageCircle } from "lucide-react";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "Based on the documents I've analyzed, here's what I found relevant to your question. The information suggests that this topic has multiple facets worth exploring.",
  "Great question! From the knowledge base, I can see that this is a common inquiry. Let me break down the key points for you.",
  "I've searched through the available resources and found some interesting insights. The main takeaway is that context matters significantly.",
];

export const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const fullResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    const assistantId = (Date.now() + 1).toString();
    
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }]);
    setIsTyping(false);

    for (let i = 0; i < fullResponse.length; i++) {
      await new Promise((r) => setTimeout(r, 15));
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: fullResponse.slice(0, i + 1) } : m))
      );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="w-14 h-14 rounded-2xl chat-gradient flex items-center justify-center shadow-lg shadow-primary/20 mb-5">
              <MessageCircle className="w-7 h-7 text-primary-foreground" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Welcome to Knowledge Assistant</h2>
            <p className="text-muted-foreground max-w-md text-sm">
              Ask me anything and I'll search through your knowledge base to provide relevant answers.
            </p>
            <div className="flex flex-wrap gap-2 mt-5 justify-center">
              {["What can you help me with?", "How does this work?", "Show me an example"].map((s) => (
                <button key={s} onClick={() => handleSend(s)} className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full chat-gradient flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-chat-user-bg text-chat-user-text rounded-br-sm"
                      : "bg-chat-assistant-bg text-chat-assistant-text rounded-bl-sm border border-border"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 text-secondary-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full chat-gradient flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <div className="bg-chat-assistant-bg rounded-xl rounded-bl-sm border border-border px-3 py-2 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
      <div className="px-4 pb-4 pt-2">
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
};
