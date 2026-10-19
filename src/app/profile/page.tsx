"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  LogOut,
  User,
  Shield,
  Bell,
  Settings,
  Copy,
  CheckCircle2,
  AlertCircle,
  Zap,
  Lock,
  Eye,
  Code2,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Alert } from "@/components/ui/Alert";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
      setUsername(res.data.data.username);
      setEmail(res.data.data.email);
    } catch (error: any) {
      toast.error("Failed to fetch user details");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedId(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation Bar */}
      <motion.nav
        className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75" />
              <div className="relative w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <span className="text-xl font-bold text-gradient">SecureAuth</span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Bell size={20} className="text-slate-400 hover:text-white" />
            </button>
            <button className="p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Settings size={20} className="text-slate-400 hover:text-white" />
            </button>
            <Button
              onClick={logout}
              isLoading={loading}
              variant="danger"
              size="sm"
              className="gap-2"
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        className="max-w-7xl mx-auto px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome back,{" "}
            <span className="text-gradient">{username || "User"}</span>
          </h1>
          <p className="text-lg text-slate-400">
            Your account is secure and verified ✓
          </p>
        </motion.div>

        {/* Profile Info Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {/* User ID Card */}
          <motion.div variants={itemVariants}>
            <Card className="hover:border-blue-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  <h3 className="font-semibold">User ID</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Your unique identifier</p>
                  {data ? (
                    <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <code className="text-xs font-mono text-blue-300 flex-1 truncate">
                        {data}
                      </code>
                      <button
                        onClick={() => copyToClipboard(data)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                      >
                        {copiedId ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Copy size={16} className="text-slate-400" />
                        )}
                      </button>
                    </div>
                  ) : (
                    <div className="h-10 bg-slate-800/50 rounded-lg animate-pulse" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Email Card */}
          <motion.div variants={itemVariants}>
            <Card className="hover:border-purple-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <h3 className="font-semibold">Email</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-slate-400">Verified email address</p>
                  {email ? (
                    <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <p className="text-sm font-mono text-purple-300 break-all">
                        {email}
                      </p>
                    </div>
                  ) : (
                    <div className="h-10 bg-slate-800/50 rounded-lg animate-pulse" />
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Security Status Card */}
          <motion.div variants={itemVariants}>
            <Card className="hover:border-emerald-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  <h3 className="font-semibold">Security Status</h3>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      Email Verified
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      Secure Password
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle size={16} className="text-amber-400" />
                    <span className="text-sm text-slate-300">
                      2FA Not Enabled
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold">Account Settings</h3>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full p-4 text-left rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-blue-500/30 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      Change Password
                    </p>
                    <p className="text-sm text-slate-400">
                      Update your password regularly
                    </p>
                  </div>
                  <Zap className="text-slate-500 group-hover:text-blue-400" />
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full p-4 text-left rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-purple-500/30 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                      Enable Two-Factor Authentication
                    </p>
                    <p className="text-sm text-slate-400">
                      Add extra security to your account
                    </p>
                  </div>
                  <Zap className="text-slate-500 group-hover:text-purple-400" />
                </motion.button>

                <motion.button
                  whileHover={{ x: 4 }}
                  className="w-full p-4 text-left rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-red-500/30 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="font-semibold text-white group-hover:text-red-400 transition-colors">
                      Delete Account
                    </p>
                    <p className="text-sm text-slate-400">
                      Permanently delete your account
                    </p>
                  </div>
                  <Zap className="text-slate-500 group-hover:text-red-400" />
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Debug Info */}
        <motion.div variants={itemVariants}>
          <Alert type="info" title="API Information">
            Your account data is being fetched from the API. All information is
            securely stored and encrypted.
          </Alert>
        </motion.div>
      </motion.main>
    </div>
  );
}