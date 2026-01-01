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
    <main id="main-content" className="flex flex-col h-full" role="main">
      {/* Chat area with wallpaper - full height without header */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-wallpaper"
        role="log"
        aria-live="polite"
        aria-label="היסטוריית הצ'אט"
      >
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full text-center px-4"
          >
            <div 
              className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-5"
              role="img"
              aria-label="לוגו גפן צ'אט"
            >
              🍇
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">ברוכים הבאים לגפן צ'אט</h1>
            <p className="text-muted-foreground max-w-md text-lg mb-6 leading-relaxed">
              שאלו אותי כל שאלה ואחפש במאגר הספקים של משרד החינוך כדי לספק תשובות רלוונטיות.
            </p>
            <nav aria-label="שאלות לדוגמה" className="flex flex-wrap gap-3 justify-center">
              {["במה אתה יכול לעזור לי?", "איך זה עובד?", "הראה לי דוגמה"].map((s) => (
                <button 
                  key={s} 
                  onClick={() => handleSend(s)} 
                  className="px-4 py-3 text-base bg-card text-foreground rounded-full hover:bg-secondary transition-colors shadow-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`שאל: ${s}`}
                >
                  {s}
                </button>
              ))}
            </nav>
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
                <article
                  className={`max-w-[85%] px-4 py-3 text-base shadow-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-chat-user-bg text-chat-user-text rounded-2xl rounded-tr-sm"
                      : "bg-chat-assistant-bg text-chat-assistant-text rounded-2xl rounded-tl-sm"
                  }`}
                  aria-label={msg.role === "user" ? "ההודעה שלך" : "תשובת גפן צ'אט"}
                >
                  {msg.role === "assistant" && (
                    <span className="text-sm mb-2 block text-primary font-semibold">🍇 גפן צ'אט</span>
                  )}
                  {msg.content}
                </article>
              </motion.div>
            ))}
            <AnimatePresence>
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  className="flex justify-end"
                  aria-label="גפן צ'אט מקליד..."
                >
                  <div className="bg-chat-assistant-bg rounded-2xl rounded-tl-sm shadow-sm px-4 py-3 flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Input area */}
      <div className="px-3 py-3 bg-muted border-t border-border">
        <form onSubmit={handleSubmit} className="flex items-end gap-3" role="search" aria-label="שלח הודעה">
          <div className="flex-1 bg-card rounded-full border border-border px-5 py-3">
            <label htmlFor="chat-input" className="sr-only">הקלד הודעה</label>
            <textarea
              id="chat-input"
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSubmit(e))}
              placeholder="הקלד הודעה..."
              disabled={isTyping}
              rows={1}
              className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50 max-h-[120px]"
              aria-describedby="input-hint"
            />
            <span id="input-hint" className="sr-only">לחץ Enter לשליחה או Shift+Enter לשורה חדשה</span>
          </div>
          <Button 
            type="submit" 
            size="icon" 
            disabled={!input.trim() || isTyping} 
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="שלח הודעה"
          >
            <Send className="h-5 w-5 rotate-180" aria-hidden="true" />
          </Button>
        </form>
      </div>
    </main>
  );
};
