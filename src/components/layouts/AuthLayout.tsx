
'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Shield,
  Lock,
  CheckCircle2,
  Zap,
} from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'End-to-end encrypted credentials',
    },
    {
      icon: Lock,
      title: 'Password Recovery',
      description: 'Email-verified password reset',
    },
    {
      icon: CheckCircle2,
      title: 'Email Verification',
      description: 'Instant email confirmation',
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Lightning-quick performance',
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Left Side - Branding & Features */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-950 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse" />
          <div
            className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl bottom-0 right-0 animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Logo & Main Content */}
        <motion.div
          className="relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75" />
              <div className="relative w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              SecureAuth
            </span>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Premium Authentication
            </h1>

            <p className="text-lg text-slate-400 mb-8">
              Experience world-class security with modern, elegant design.
            </p>
          </motion.div>
        </motion.div>

        {/* Features List */}
        <motion.div
          className="relative z-10 grid grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group"
              >
                <div className="p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 cursor-default">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>

                    <h3 className="font-semibold text-sm text-slate-200 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-sm text-slate-500"
        >
          <p>🔒 Your data is encrypted and secure</p>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        >
          {title && (
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
          )}

          {subtitle && (
            <p className="text-slate-400 mb-6">{subtitle}</p>
          )}

          {/* Form Container */}
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
