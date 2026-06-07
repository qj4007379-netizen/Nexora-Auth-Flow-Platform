import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, MessageSquare, Lock, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm text-muted-foreground mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Trusted by thousands of users
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
              Send Messages{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Anonymously
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Share your thoughts freely without revealing your identity. 
              Create your unique link and start receiving honest messages from anyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="group">
                <Link href="/sign-up">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button variant="outline" size="lg" asChild>
                <Link href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Why Choose Mestry Message?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with privacy and simplicity in mind, offering a seamless experience for anonymous communication.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '0ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Complete Anonymity</CardTitle>
                <CardDescription>
                  Your identity is always protected. Senders can share honest thoughts without revealing who they are.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Instant Setup</CardTitle>
                <CardDescription>
                  Create your account in seconds and get your unique sharing link immediately. No complicated setup required.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure & Private</CardTitle>
                <CardDescription>
                  End-to-end encryption ensures your messages remain private. We never store or share your data.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Real-time Messages</CardTitle>
                <CardDescription>
                  Receive messages instantly as they're sent. Never miss an important thought from your audience.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Share Anywhere</CardTitle>
                <CardDescription>
                  Share your unique link on social media, websites, or anywhere else. One link works everywhere.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="group hover:shadow-lg transition-all duration-300 animate-slide-up" style={{ animationDelay: '500ms' }}>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Content Moderation</CardTitle>
                <CardDescription>
                  Full control over what messages you receive. Filter and block unwanted content easily.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="py-16 px-6">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
                Ready to Start?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already sharing and receiving anonymous messages.
              </p>
              <Button size="lg" asChild className="group">
                <Link href="/sign-up">
                  Create Your Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Mestry Message. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}