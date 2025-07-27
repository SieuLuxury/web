'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Lock, Zap, UserShield } from 'lucide-react';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTelegramLogin = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      setTimeout(() => {
        // Simulate redirect to home
        window.location.href = '/';
      }, 2000);
    }, 2500);
  };

  const features = [
    {
      icon: Lock,
      title: 'Secure',
      description: 'End-to-end encryption'
    },
    {
      icon: Zap,
      title: 'Fast',
      description: 'Lightning quick access'
    },
    {
      icon: UserShield,
      title: 'Private',
      description: 'Your data protected'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            animate={{
              y: [-20, -100],
              x: [0, Math.random() * 100 - 50],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%',
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            className="w-24 h-24 mx-auto mb-6 rounded-3xl glass-strong flex items-center justify-center relative overflow-hidden"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 opacity-20 rounded-3xl"
            />
            <Shield className="w-12 h-12 text-blue-400 relative z-10" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl font-black mb-4 gradient-text"
          >
            Checker
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-gray-300"
          >
            Premium Credit Card Validation System
          </motion.p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Telegram Section */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 opacity-50"
              />
              <i className="fab fa-telegram-plane text-4xl text-white relative z-10"></i>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-3xl font-bold text-white mb-4"
            >
              Welcome Back
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="text-gray-300 mb-8"
            >
              Sign in with your Telegram account to access premium features
            </motion.p>
          </div>

          {/* Login Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            onClick={handleTelegramLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: isLoading ? ['-100%', '100%'] : '-100%' }}
              transition={{ duration: 1.5, repeat: isLoading ? Infinity : 0 }}
            />
            
            <div className="flex items-center justify-center gap-3 relative z-10">
              <i className="fab fa-telegram-plane text-xl"></i>
              <span className="text-lg">
                {isLoading ? 'Connecting...' : 'Continue with Telegram'}
              </span>
              <motion.i
                className="fas fa-arrow-right"
                animate={{ x: isLoading ? 0 : [0, 5, 0] }}
                transition={{ duration: 1, repeat: isLoading ? 0 : Infinity }}
              />
            </div>
          </motion.button>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-4 mt-8"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                  className="text-center p-4 glass rounded-2xl hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-white text-sm mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <div className="text-center text-white">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
            />
            <p className="text-lg font-medium">Connecting to Telegram...</p>
          </div>
        </motion.div>
      )}

      {/* Success Overlay */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <motion.i
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
                className="fas fa-check text-2xl text-white"
              />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Welcome!</h3>
            <p className="text-gray-300">Successfully authenticated with Telegram</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoginPage;