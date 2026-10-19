"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Chrome,
  Check,
  X,
} from "lucide-react";

import AuthLayout from "@/components/layouts/AuthLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!user.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!user.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Valid email is required";
    }
    if (user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSignup = async () => {
    try {
      if (!validateForm()) return;

      setError(null);
      setLoading(true);
      const response = await axios.post("/api/users/signup", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      console.log("Signup success", response.data);
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "Signup failed";
      console.log("Signup failed", errorMessage);
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0 &&
      user.confirmPassword.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }

    if (user.password) {
      checkPasswordStrength(user.password);
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

  const passwordRequirements = [
    { label: "At least 8 characters", met: user.password.length >= 8 },
    { label: "Mixed case letters", met: /[a-z]/.test(user.password) && /[A-Z]/.test(user.password) },
    { label: "Contains numbers", met: /\d/.test(user.password) },
    { label: "Contains special characters", met: /[!@#$%^&*]/.test(user.password) },
  ];

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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75" />
              <div className="relative w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
          </div>
          <p className="text-slate-400">
            Join us and experience premium security
          </p>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div variants={itemVariants}>
            <Alert type="error" dismissible onDismiss={() => setError(null)}>
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Signup Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-2 border-slate-700/50 hover:border-purple-500/30 transition-all duration-300">
            <CardContent className="pt-6">
              <motion.div
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Username Input */}
                <motion.div variants={itemVariants}>
                  <Input
                    id="username"
                    type="text"
                    label="Username"
                    placeholder="johndoe"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    icon={<User size={18} />}
                    error={errors.username}
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div variants={itemVariants}>
                  <Input
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    icon={<Mail size={18} />}
                    error={errors.email}
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
                    onChange={(e) => {
                      setUser({ ...user, password: e.target.value });
                      checkPasswordStrength(e.target.value);
                    }}
                    icon={<Lock size={18} />}
                    showPasswordToggle
                    error={errors.password}
                  />
                </motion.div>

                {/* Password Strength Indicator */}
                {user.password && (
                  <motion.div
                    variants={itemVariants}
                    className="space-y-2"
                  >
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`flex-1 h-2 rounded-full transition-all ${
                            i <= passwordStrength
                              ? i <= 2
                                ? "bg-red-500"
                                : i === 3
                                  ? "bg-yellow-500"
                                  : "bg-emerald-500"
                              : "bg-slate-700"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">
                      Password strength:{" "}
                      {passwordStrength <= 2
                        ? "Weak"
                        : passwordStrength === 3
                          ? "Fair"
                          : "Strong"}
                    </p>
                  </motion.div>
                )}

                {/* Password Requirements */}
                {user.password && (
                  <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 gap-2"
                  >
                    {passwordRequirements.map((req, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs"
                      >
                        {req.met ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-slate-500" />
                        )}
                        <span
                          className={
                            req.met ? "text-slate-300" : "text-slate-500"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Confirm Password Input */}
                <motion.div variants={itemVariants}>
                  <Input
                    id="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={user.confirmPassword}
                    onChange={(e) =>
                      setUser({ ...user, confirmPassword: e.target.value })
                    }
                    icon={<Lock size={18} />}
                    showPasswordToggle
                    error={errors.confirmPassword}
                  />
                </motion.div>

                {/* Signup Button */}
                <motion.div variants={itemVariants}>
                  <Button
                    onClick={onSignup}
                    disabled={buttonDisabled}
                    isLoading={loading}
                    width="full"
                    size="lg"
                    variant="primary"
                    className="group"
                  >
                    {!loading && (
                      <>
                        Create Account
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
            or sign up with
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </motion.div>

        {/* Social Signup */}
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </motion.div>

        {/* Security Note */}
        <motion.div
          variants={itemVariants}
          className="mt-6 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30"
        >
          <p className="text-xs text-slate-500 text-center">
            🔒 By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}