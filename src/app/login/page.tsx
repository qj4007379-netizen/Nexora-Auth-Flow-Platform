"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github, Chrome } from "lucide-react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onLogin = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Welcome back!");
      router.push("/profile");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || "Login failed";
      console.log("Login failed", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <AuthLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Card Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75" />
              <div className="relative w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          </div>
          <p className="text-slate-400">Sign in to your account to continue</p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div variants={itemVariants}>
            <Alert type="error" dismissible onDismiss={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Login Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-slate-700/50 hover:border-blue-500/30 transition-all duration-300">
            <CardContent className="pt-6">
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    icon={<Mail size={18} />}
                  />
                </motion.div>

                {/* Password Input */}
                <motion.div variants={itemVariants}>
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="••••••••"
                    value={user.password}
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                    icon={<Lock size={18} />}
                    showPasswordToggle
                  />
                </motion.div>

                {/* Forgot Password */}
                <motion.div variants={itemVariants} className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Login Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    isLoading={loading}
                    width="full"
                    size="lg"
                    className="group"
                  >
                    {!loading && (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="my-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <span className="text-xs text-slate-500 uppercase tracking-widest">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </motion.div>

        {/* Social Login */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="lg"
            width="full"
            className="flex items-center justify-center gap-2"
          >
            <Chrome className="w-5 h-5" />
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            width="full"
            className="flex items-center justify-center gap-2"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </Button>
        </motion.div>

        {/* Footer Links */}
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-blue-400 font-semibold hover:text-blue-300 transition-colors"
            >
              Create one
            </Link>
          </p>
        </motion.div>

        {/* Security Note */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
        >
          <p className="text-xs text-slate-500 text-center">
            🔒 Your data is encrypted and secure. We never share your information.
          </p>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}