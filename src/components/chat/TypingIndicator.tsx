import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 justify-start"
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full chat-gradient flex items-center justify-center shadow-sm">
        <Bot className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="bg-chat-assistant-bg text-chat-assistant-text rounded-2xl rounded-bl-md shadow-sm border border-border px-4 py-3">
        <div className="flex gap-1.5 items-center h-5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
