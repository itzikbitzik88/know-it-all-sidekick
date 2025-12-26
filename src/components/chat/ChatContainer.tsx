import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, User, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = async (content: string) => {
    const userMessage: Message = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    setInput("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      handleSend(input.trim());
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
        <form onSubmit={handleSubmit} className="flex items-end gap-2 p-2 bg-chat-input-bg rounded-xl border border-border">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
            placeholder="Ask me anything..."
            disabled={isTyping}
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 max-h-[120px]"
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="h-9 w-9 rounded-lg chat-gradient text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
