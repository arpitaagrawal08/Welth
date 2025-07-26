'use client';

import dynamic from 'next/dynamic';

// Dynamically load Chatbot component with SSR turned off
const Chatbot = dynamic(() => import('./chatbot'), { ssr: false });

const ChatbotWrapper = () => {
  return <Chatbot />;
};

export default ChatbotWrapper;
