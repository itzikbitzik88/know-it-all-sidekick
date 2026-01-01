import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "בהתבסס על המסמכים שניתחתי, הנה מה שמצאתי רלוונטי לשאלתך. המידע מצביע על כך שלנושא זה יש היבטים מרובים שכדאי לחקור.",
  "שאלה מצוינת! ממאגר הידע, אני יכול לראות שזו פנייה נפוצה. הרשה לי לפרט את הנקודות העיקריות עבורך.",
  "חיפשתי במשאבים הזמינים ומצאתי כמה תובנות מעניינות. המסקנה העיקרית היא שההקשר חשוב מאוד.",
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
      {/* WhatsApp-style header */}
      <div className="bg-primary px-4 py-3 flex items-center gap-3 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xl">
          🍇
        </div>
        <div className="flex-1">
          <h1 className="text-primary-foreground font-semibold text-base">עוזר גפן</h1>
          <p className="text-primary-foreground/80 text-xs">מאגר הספקים של משרד החינוך</p>
        </div>
      </div>

      {/* Chat area with wallpaper */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2 chat-wallpaper">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl mb-4">
              🍇
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">ברוכים הבאים לעוזר גפן</h2>
            <p className="text-muted-foreground max-w-md text-sm mb-5">
              שאלו אותי כל שאלה ואחפש במאגר הספקים של משרד החינוך כדי לספק תשובות רלוונטיות.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["במה אתה יכול לעזור לי?", "איך זה עובד?", "הראה לי דוגמה"].map((s) => (
                <button 
                  key={s} 
                  onClick={() => handleSend(s)} 
                  className="px-3 py-2 text-sm bg-card text-foreground rounded-full hover:bg-secondary transition-colors shadow-sm border border-border"
                >
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
                className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-chat-user-bg text-chat-user-text rounded-lg rounded-tr-none"
                      : "bg-chat-assistant-bg text-chat-assistant-text rounded-lg rounded-tl-none"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <span className="text-xs mb-1 block text-primary font-medium">🍇 עוזר גפן</span>
                  )}
                  {msg.content}
                </div>
              </motion.div>
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-end">
                  <div className="bg-chat-assistant-bg rounded-lg rounded-tl-none shadow-sm px-3 py-2 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* WhatsApp-style input area */}
      <div className="px-2 py-2 bg-muted">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <div className="flex-1 bg-card rounded-full border border-border px-4 py-2">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
              placeholder="הקלד הודעה..."
              disabled={isTyping}
              rows={1}
              className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 max-h-[120px]"
            />
          </div>
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isTyping} 
            className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
          >
            <Send className="h-5 w-5 rotate-180" />
          </Button>
        </form>
      </div>
    </div>
  );
};
