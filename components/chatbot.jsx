"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import axios from "axios";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm WelthBot, your assistant for managing expenses with Welth. Ask me anything!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [welthContext, setWelthContext] = useState("");
  const [isContextReady, setIsContextReady] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadTextContext = async () => {
      try {
        const res = await fetch("/Info.txt");
        const text = await res.text();
        setWelthContext(text);
        setIsContextReady(true);
      } catch (err) {
        console.error("Failed to load context:", err);
      }
    };
    loadTextContext();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  const findAnswer = async (input) => {
    if (!welthContext.trim()) return "Welth context is missing. Please try again.";

    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `You are WelthBot, an AI assistant for Welth. Use the following context to answer questions about Welth. Provide URLs as plain text. If the question is unrelated, say so.

Context:
${welthContext}

User: ${input}`,
                },
              ],
            },
          ],
        },
        {
          headers: { "Content-Type": "application/json" },
          params: { key: process.env.NEXT_PUBLIC_GEMINI_API_KEY}
        }
      );

      return formatWithLinks(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Gemini API error:", error.response?.data || error.message);
      return "Sorry, I couldn't process that request. Please try again.";
    }
  };

  const handleSendMessage = async () => {
    const input = inputValue.trim();
    if (!input) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    const botText = await findAnswer(input);
    const botMessage = {
      id: Date.now().toString() + "-bot",
      text: botText,
      isBot: true,
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Floating Chat Button
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </button>
    );

  // Chat UI
  return (
    <div className={`fixed bottom-8 right-8 w-80 ${isMinimized ? "h-14" : "h-96"} z-50`}>
      <div className="bg-gray-900/95 border border-gray-700 rounded-xl shadow-xl h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-teal-500/20 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Bot className="text-white h-5 w-5" />
            <h2 className="text-white text-sm font-semibold">WelthBot</h2>
          </div>
          <div className="flex gap-1">
            <button onClick={() => setIsMinimized(!isMinimized)}><Minimize2 className="text-gray-400 w-4 h-4" /></button>
            <button onClick={() => setIsOpen(false)}><X className="text-gray-400 w-4 h-4" /></button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm text-white">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div className={`px-3 py-2 rounded-2xl max-w-[80%] ${msg.isBot ? "bg-gray-800" : "bg-gradient-to-r from-blue-500 to-teal-500 text-white"}`}>
                    {typeof msg.text === "string" ? msg.text : msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-gray-400 italic">WelthBot is typing...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={!isContextReady}
                  placeholder={isContextReady ? "Ask about Welth..." : "Loading context..."}
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 text-white text-sm placeholder-gray-400"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || !isContextReady}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 flex items-center justify-center"
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
