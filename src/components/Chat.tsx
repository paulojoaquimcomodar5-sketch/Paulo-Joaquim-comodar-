import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, User as UserIcon, Headphones } from 'lucide-react';
import { User } from '../types';

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isAdmin?: boolean;
}

interface ChatProps {
  user: User;
  onClose: () => void;
}

export default function Chat({ user, onClose }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to the same host
    socketRef.current = io();

    socketRef.current.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Initial welcome message
    const welcome: Message = {
      id: 'welcome',
      sender: 'Suporte MOZA',
      text: 'Olá! Como podemos ajudar hoje?',
      timestamp: new Date().toISOString(),
      isAdmin: true,
    };
    setMessages([welcome]);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim() || !socketRef.current) return;

    const newMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: user.phone,
      text: inputText,
    };

    socketRef.current.emit('send_message', newMessage);
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-bg flex flex-col">
      <header className="p-4 bg-card border-b border-border flex items-center gap-4">
        <button onClick={onClose} className="text-text-muted hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-primary/10 flex items-center justify-center text-blue-primary border border-blue-primary/20">
            <Headphones size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">Suporte MOZA INV</h3>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Online</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isMe = msg.sender === user.phone;
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-lg ${
                isMe 
                  ? 'bg-blue-primary text-white rounded-tr-none' 
                  : 'bg-card border border-border text-white rounded-tl-none'
              }`}>
                {!isMe && <p className="text-[10px] font-bold text-blue-primary mb-1">{msg.sender}</p>}
                <p>{msg.text}</p>
                <p className={`text-[8px] mt-1 text-right ${isMe ? 'text-white/60' : 'text-text-muted'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      <div className="p-4 bg-card border-t border-border pb-safe">
        <div className="flex items-center gap-2 bg-[#0d1117] p-2 rounded-2xl border border-border">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escreva a sua mensagem..."
            className="flex-1 bg-transparent border-none text-white text-sm focus:ring-0 px-2"
          />
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-xl bg-blue-primary text-white flex items-center justify-center shadow-lg shadow-blue-primary/20 active:scale-95 transition-transform"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
