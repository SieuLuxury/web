'use client';

import { motion } from 'framer-motion';
import { Shield, CreditCard, Database, Zap, Users, TrendingUp } from 'lucide-react';

const HomePage = () => {
  const stats = [
    { label: 'Cards Checked', value: '2.5M+', icon: CreditCard, color: 'from-blue-500 to-cyan-500' },
    { label: 'Success Rate', value: '99.2%', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Users', value: '15K+', icon: Users, color: 'from-purple-500 to-pink-500' },
    { label: 'Response Time', value: '<1s', icon: Zap, color: 'from-orange-500 to-red-500' },
  ];

  const features = [
    {
      title: 'Advanced Security',
      description: 'Military-grade encryption and secure validation protocols',
      icon: Shield,
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Real-time Processing',
      description: 'Lightning-fast card validation with instant results',
      icon: Zap,
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      title: 'Comprehensive Database',
      description: 'Access to extensive BIN database and validation rules',
      icon: Database,
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 lg:py-20"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-3xl glass-strong flex items-center justify-center">
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-black mb-6 gradient-text">
            Welcome Home
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Premium Credit Card Validation System
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="btn-primary px-8 py-4 text-lg">
            Start Checking
          </button>
          <button className="btn-secondary px-8 py-4 text-lg">
            View Database
          </button>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="py-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="card text-center group hover:scale-105"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="py-12"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Choose Checker?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the most advanced card validation system with unmatched security and performance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.8 }}
                className="card group hover:scale-105"
              >
                <div className={`w-20 h-20 mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="py-12 lg:py-20"
      >
        <div className="glass-strong rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Checker for their card validation needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              <CreditCard className="w-5 h-5 mr-2" />
              Start Checking Cards
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              <Database className="w-5 h-5 mr-2" />
              Explore Database
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;