'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  CreditCard, 
  Shield, 
  Wrench, 
  Settings, 
  Database,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';

interface NavigationProps {
  user?: {
    name: string;
    avatar?: string;
    credits: string;
  };
}

const Navigation = ({ user = { name: 'SieuLuxury', credits: '∞' } }: NavigationProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCheckersMenu, setShowCheckersMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Topup', href: '/topup', icon: CreditCard },
    { name: 'Checkers', href: '#', icon: Shield, hasSubmenu: true },
    { name: 'Tools', href: '#', icon: Wrench, hasSubmenu: true },
    { name: 'Database', href: '/database', icon: Database },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const checkerItems = [
    { name: 'Stripe Auth', href: '/checkers/stripe-auth' },
    { name: 'Braintree Auth', href: '/checkers/braintree-auth' },
    { name: 'Shopify Auto', href: '/checkers/shopify-auto' },
  ];

  const toolItems = [
    { name: 'BIN Lookup', href: '/tools/bin-lookup' },
    { name: '3DS Lookup', href: '/tools/3ds-lookup' },
    { name: 'Card Generator', href: '/tools/card-generator' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const handleSubmenuClick = (type: 'checkers' | 'tools') => {
    if (type === 'checkers') {
      setShowCheckersMenu(true);
      setShowToolsMenu(false);
    } else {
      setShowToolsMenu(true);
      setShowCheckersMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setShowCheckersMenu(false);
      setShowToolsMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex fixed top-0 left-0 h-full w-80 glass-strong z-50 flex-col">
        <div className="p-6">
          {/* Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl glass flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">Checker</h1>
              <p className="text-sm text-gray-400">Premium System</p>
            </div>
          </div>

          {/* User Info */}
          <div className="glass rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{user.name}</h3>
                <div className="glass rounded-lg px-2 py-1 mt-1">
                  <span className="text-xs text-green-400 font-medium">Credits: {user.credits}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              if (item.hasSubmenu) {
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuClick(item.name.toLowerCase() as 'checkers' | 'tools');
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      active
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/25'
                        : 'hover:bg-white/5 hover:translate-x-2'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
                    <span className={`font-medium ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {item.name}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                    active
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-2 border-blue-500/50 shadow-lg shadow-blue-500/25'
                      : 'hover:bg-white/5 hover:translate-x-2'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'}`} />
                  <span className={`font-medium ${active ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-6">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 group">
            <LogOut className="w-5 h-5 text-red-400" />
            <span className="font-medium text-red-400">Logout</span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 glass-strong z-50 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {user.name.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{user.name}</h3>
                <span className="text-xs text-green-400">Credits: {user.credits}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg glass">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
              <button className="p-2 rounded-lg glass">
                <LogOut className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 glass-strong z-50">
          <div className="flex items-center justify-around py-2">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              if (item.hasSubmenu) {
                return (
                  <button
                    key={item.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubmenuClick(item.name.toLowerCase() as 'checkers' | 'tools');
                    }}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                      active ? 'bg-blue-500/20' : 'hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-400'}`} />
                    <span className={`text-xs ${active ? 'text-blue-400' : 'text-gray-400'}`}>
                      {item.name}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300 ${
                    active ? 'bg-blue-500/20' : 'hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-400'}`} />
                  <span className={`text-xs ${active ? 'text-blue-400' : 'text-gray-400'}`}>
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Submenu Modals */}
      <AnimatePresence>
        {(showCheckersMenu || showToolsMenu) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => {
              setShowCheckersMenu(false);
              setShowToolsMenu(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-3xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {showCheckersMenu ? 'Checkers' : 'Tools'}
                </h3>
                <button
                  onClick={() => {
                    setShowCheckersMenu(false);
                    setShowToolsMenu(false);
                  }}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-3">
                {(showCheckersMenu ? checkerItems : toolItems).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block p-4 rounded-xl glass hover:bg-white/10 transition-all duration-300 group"
                    onClick={() => {
                      setShowCheckersMenu(false);
                      setShowToolsMenu(false);
                    }}
                  >
                    <span className="font-medium text-white group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;