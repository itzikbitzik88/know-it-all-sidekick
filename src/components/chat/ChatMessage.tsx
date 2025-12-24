import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatMessageProps {
  message: Message;
  index: number;
}

export const ChatMessage = ({ message, index }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full chat-gradient flex items-center justify-center shadow-sm">
          <Bot className="w-4 h-4 text-primary-foreground" />
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-chat-user-bg text-chat-user-text rounded-br-md"
            : "bg-chat-assistant-bg text-chat-assistant-text rounded-bl-md shadow-sm border border-border"
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-secondary-foreground" />
        </div>
      )}
    </motion.div>
  );
};
