
import React, { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/ui/CodeBlock";
import { Message } from "@/types/chat";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

interface ChatInterfaceProps {
  className?: string;
  initialMessages?: Message[];
}

const ChatInterface = ({ className, initialMessages = [] }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { projectId } = useParams<{ projectId: string }>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const savePromptHistory = async (prompt: string) => {
    if (!user || !projectId) return;
    
    try {
      await supabase.from("prompt_history").insert({
        user_id: user.id,
        project_id: projectId,
        prompt: prompt
      });
    } catch (error) {
      console.error("Failed to save prompt:", error);
    }
  };

  const saveResponseToHistory = async (userPrompt: string, responseContent: string) => {
    if (!user || !projectId) return;
    
    try {
      await supabase.from("prompt_history").update({
        response: responseContent
      })
      .eq("user_id", user.id)
      .eq("project_id", projectId)
      .eq("prompt", userPrompt);
    } catch (error) {
      console.error("Failed to save response:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      content: input,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Save prompt to history if we're in a project
    if (user && projectId) {
      await savePromptHistory(input);
    }

    // Simulate AI response - in a real app, this would call an API
    setTimeout(async () => {
      let response: Message;
      
      // Demo responses based on input keywords
      if (input.toLowerCase().includes("create") || input.toLowerCase().includes("build")) {
        const responseContent = `
import React, { useState } from 'react';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Add a new task..."
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="p-2 border-b">
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
`;
        response = {
          id: Date.now() + 1,
          sender: "ai",
          content: responseContent,
          type: "code",
          language: "typescript",
        };
      } else if (
        input.toLowerCase().includes("button") || 
        input.toLowerCase().includes("style") ||
        input.toLowerCase().includes("design")
      ) {
        const responseContent = `
import React from 'react';

export const GradientButton = () => {
  return (
    <button className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 hover:from-purple-600 hover:via-blue-600 hover:to-indigo-600 text-white font-medium py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">
      Click me!
    </button>
  );
};
`;
        response = {
          id: Date.now() + 1,
          sender: "ai",
          content: responseContent,
          type: "code",
          language: "typescript",
        };
      } else {
        response = {
          id: Date.now() + 1,
          sender: "ai",
          content: "I understand what you're looking for. Let me generate the code for that feature. Would you like a React component or a full page implementation?",
          type: "text",
        };
      }
      
      // Save response to history if we're in a project
      if (user && projectId) {
        await saveResponseToHistory(userMessage.content, response.content);
      }
      
      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 2000);
  };

  return (
    <div className={`flex flex-col h-full rounded-lg overflow-hidden ${className}`}>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {message.type === "code" ? (
                <CodeBlock code={message.content} language={message.language} />
              ) : (
                <p className="text-sm">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-secondary max-w-[80%] p-4 rounded-lg">
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Describe what you want to build..."
            className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={handleSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
