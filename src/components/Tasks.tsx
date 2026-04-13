import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Users, Share2, Calendar, ChevronRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Task {
  id: number;
  title: string;
  reward: number;
  icon: React.ElementType;
  description: string;
  completed: boolean;
}

interface TasksProps {
  onCompleteTask: (reward: number) => void;
}

export default function Tasks({ onCompleteTask }: TasksProps) {
  const [showToast, setShowToast] = useState<{ show: boolean; reward: number; title: string }>({
    show: false,
    reward: 0,
    title: ''
  });

  const [localTasks, setLocalTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Check-in Diário',
      reward: 5,
      icon: Calendar,
      description: 'Receba o seu bónus diário por entrar na app.',
      completed: false,
    },
    {
      id: 2,
      title: 'Convidar Amigo',
      reward: 50,
      icon: Users,
      description: 'Ganhe bónus por cada amigo que se registar com o seu código.',
      completed: false,
    },
    {
      id: 3,
      title: 'Partilhar no WhatsApp',
      reward: 10,
      icon: Share2,
      description: 'Partilhe o seu link de convite no seu estado.',
      completed: false,
    },
  ]);

  const handleTaskAction = (task: Task) => {
    if (task.completed) return;
    
    // Update local state
    setLocalTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: true } : t));

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00a2ff', '#e3b341', '#ffffff']
    });

    onCompleteTask(task.reward);
    
    // Show custom toast
    setShowToast({ show: true, reward: task.reward, title: task.title });
    
    setTimeout(() => {
      setShowToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  return (
    <div className="pb-24 p-6 relative">
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="fixed top-10 left-6 right-6 z-[110] bg-card border-2 border-green-500/50 p-4 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)] flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <Trophy size={28} />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Tarefa Concluída!</p>
              <h4 className="text-sm font-bold text-white">{showToast.title}</h4>
              <p className="text-xs text-text-muted">Ganhou <span className="text-green-400 font-bold">+{showToast.reward} MT</span></p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="mb-8">
        <h2 className="text-2xl font-bold text-blue-primary tracking-tighter mb-2">Centro de Tarefas</h2>
        <p className="text-text-muted text-sm">Conclua tarefas diárias para aumentar o seu saldo.</p>
      </header>

      <div className="space-y-4">
        {localTasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              backgroundColor: task.completed ? 'rgba(34, 197, 94, 0.05)' : 'rgba(22, 27, 34, 1)',
              borderColor: task.completed ? 'rgba(34, 197, 94, 0.3)' : 'rgba(48, 54, 61, 1)'
            }}
            whileTap={task.completed ? {} : { scale: 0.98 }}
            onClick={() => handleTaskAction(task)}
            className={`p-4 rounded-2xl border flex items-center gap-4 transition-colors ${
              task.completed ? 'cursor-default' : 'cursor-pointer hover:border-blue-primary/50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              task.completed ? 'bg-green-500/20 text-green-500' : 'bg-blue-primary/10 text-blue-primary'
            }`}>
              <AnimatePresence mode="wait">
                {task.completed ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="icon" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <task.icon size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className={`font-bold text-sm transition-colors ${task.completed ? 'text-text-muted line-through' : 'text-white'}`}>
                  {task.title}
                </h4>
                <span className={`font-mono font-bold text-xs transition-colors ${task.completed ? 'text-text-muted' : 'text-green-400'}`}>
                  {task.completed ? 'CONCLUÍDO' : `+${task.reward} MT`}
                </span>
              </div>
              <p className="text-[10px] text-text-muted mt-1 leading-tight">{task.description}</p>
            </div>

            <div className="text-text-muted">
              {task.completed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-green-500"
                >
                  <CheckCircle2 size={18} />
                </motion.div>
              ) : (
                <ChevronRight size={18} />
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-blue-primary/5 rounded-3xl border border-blue-primary/20 text-center">
        <CheckCircle2 className="mx-auto text-blue-primary mb-3" size={32} />
        <h3 className="font-bold mb-1">Dica de Ganhos</h3>
        <p className="text-xs text-text-muted">
          Quanto maior o seu nível VIP, maiores serão as recompensas das tarefas especiais!
        </p>
      </div>
    </div>
  );
}
