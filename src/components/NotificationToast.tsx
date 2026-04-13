import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, Trophy, Timer } from 'lucide-react';
import { io } from 'socket.io-client';

interface Notification {
  id: string;
  type: 'start' | 'end';
  message: string;
  timestamp: string;
}

export default function NotificationToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = io();

    socket.on('lottery_notification', (data: Omit<Notification, 'id'>) => {
      const newNotif = {
        ...data,
        id: Math.random().toString(36).substr(2, 9)
      };
      
      setNotifications(prev => [newNotif, ...prev].slice(0, 3));

      // Auto-remove after 8 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotif.id));
      }, 8000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="fixed top-4 left-4 right-4 z-[100] pointer-events-none flex flex-col gap-3">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto bg-card/95 backdrop-blur-md border border-blue-primary/30 rounded-2xl p-4 shadow-2xl shadow-blue-primary/20 flex gap-4 items-start relative overflow-hidden"
          >
            {/* Progress bar for auto-close */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
              className="absolute bottom-0 left-0 h-1 bg-blue-primary/50"
            />

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
              notif.type === 'start' ? 'bg-green-500/10 text-green-500' : 'bg-gold/10 text-gold'
            }`}>
              {notif.type === 'start' ? <Trophy size={20} /> : <Timer size={20} />}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-primary">
                  Notificação MOZA INV
                </h4>
                <button 
                  onClick={() => removeNotification(notif.id)}
                  className="text-text-muted hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-xs text-white font-medium leading-relaxed">
                {notif.message}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
