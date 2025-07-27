'use client';

import { motion } from 'framer-motion';
import { CreditCard, DollarSign, Zap, Shield, CheckCircle } from 'lucide-react';

const TopupPage = () => {
  const packages = [
    {
      name: 'Starter',
      price: '$9.99',
      credits: '1,000',
      features: ['Basic validation', 'Email support', '24/7 access'],
      popular: false,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      price: '$29.99',
      credits: '5,000',
      features: ['Advanced validation', 'Priority support', 'API access', 'Custom limits'],
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      price: '$99.99',
      credits: '25,000',
      features: ['Premium validation', 'Dedicated support', 'Full API access', 'Custom integration'],
      popular: false,
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl glass-strong flex items-center justify-center">
          <CreditCard className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-4xl lg:text-5xl font-black mb-4 gradient-text">
          Top Up Credits
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose the perfect plan for your card validation needs
        </p>
      </motion.section>

      {/* Pricing Cards */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="py-12"
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              className={`card relative overflow-hidden group ${
                pkg.popular ? 'ring-2 ring-purple-500/50 scale-105' : ''
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${pkg.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${pkg.popular ? 'mt-8' : ''}`}>
                <DollarSign className="w-10 h-10 text-white" />
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-black text-white">{pkg.price}</span>
                  <span className="text-gray-400 ml-2">one-time</span>
                </div>
                <div className="glass rounded-lg p-3 mb-6">
                  <span className="text-2xl font-bold text-green-400">{pkg.credits}</span>
                  <span className="text-gray-300 ml-2">credits</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                pkg.popular 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg hover:shadow-purple-500/25' 
                  : 'btn-primary'
              }`}>
                Purchase Now
              </button>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="py-12"
      >
        <div className="glass-strong rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose Our Credits?
            </h2>
            <p className="text-xl text-gray-300">
              Premium features and unmatched reliability
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Instant Activation',
                description: 'Credits are added to your account immediately after purchase'
              },
              {
                icon: Shield,
                title: 'Secure Payment',
                description: 'All transactions are encrypted and processed securely'
              },
              {
                icon: CreditCard,
                title: 'Flexible Usage',
                description: 'Use credits for any validation service at your own pace'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default TopupPage;