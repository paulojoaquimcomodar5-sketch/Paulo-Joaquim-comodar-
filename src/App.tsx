/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, Screen } from './types';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Lottery from './components/Lottery';
import Tasks from './components/Tasks';
import VIP from './components/VIP';
import Team from './components/Team';
import Profile from './components/Profile';
import Chat from './components/Chat';
import CompanyInfo from './components/CompanyInfo';
import SecuritySettings from './components/SecuritySettings';
import GeneralSettings from './components/GeneralSettings';
import PaymentModal from './components/PaymentModal';
import WithdrawModal from './components/WithdrawModal';
import NotificationToast from './components/NotificationToast';
import NavBar from './components/NavBar';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('dashboard');
  };

  const handleCompleteTask = (reward: number) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        balance: prev.balance + reward
      };
    });
  };

  const handleSpin = (cost: number, prize: number | string) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      let newBalance = prev.balance - cost;
      let newTickets = prev.tickets;
      
      if (cost === 0) {
        newTickets -= 1;
      }

      if (typeof prize === 'number') {
        newBalance += prize;
      } else if (prize === 'ticket') {
        newTickets += 1;
      }

      return {
        ...prev,
        balance: newBalance,
        tickets: newTickets
      };
    });
  };

  const handleWithdraw = (amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, balance: prev.balance - amount };
    });
  };

  if (!user) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-bg text-white">
      <NotificationToast />
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user} 
          onOpenPayment={() => setIsPaymentOpen(true)} 
          onOpenLottery={() => setCurrentScreen('lottery')}
          onOpenWithdraw={() => setIsWithdrawOpen(true)}
          onOpenCompany={() => setCurrentScreen('company')}
        />
      )}

      {currentScreen === 'lottery' && (
        <Lottery 
          balance={user.balance} 
          tickets={user.tickets} 
          onSpin={handleSpin}
          onClose={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'tasks' && (
        <Tasks onCompleteTask={handleCompleteTask} />
      )}

      {currentScreen === 'vip' && (
        <VIP 
          currentLevel={user.level} 
          onOpenPayment={() => setIsPaymentOpen(true)} 
        />
      )}

      {currentScreen === 'team' && (
        <Team inviteCode={user.inviteCode} />
      )}

      {currentScreen === 'profile' && (
        <Profile 
          user={user} 
          onLogout={handleLogout} 
          onOpenPayment={() => setIsPaymentOpen(true)} 
          onOpenChat={() => setCurrentScreen('chat')}
          onOpenSecurity={() => setCurrentScreen('security')}
          onOpenSettings={() => setCurrentScreen('settings')}
        />
      )}

      {currentScreen === 'chat' && (
        <Chat 
          user={user} 
          onClose={() => setCurrentScreen('profile')} 
        />
      )}

      {currentScreen === 'security' && (
        <SecuritySettings onBack={() => setCurrentScreen('profile')} />
      )}

      {currentScreen === 'settings' && (
        <GeneralSettings onBack={() => setCurrentScreen('profile')} />
      )}

      {currentScreen === 'company' && (
        <CompanyInfo onClose={() => setCurrentScreen('dashboard')} />
      )}

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
      />

      <WithdrawModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
        balance={user.balance}
        onWithdraw={handleWithdraw}
      />

      {currentScreen !== 'lottery' && 
       currentScreen !== 'security' && 
       currentScreen !== 'settings' && 
       currentScreen !== 'company' && (
        <NavBar 
          currentScreen={currentScreen} 
          onNavigate={setCurrentScreen} 
        />
      )}
    </div>
  );
}
