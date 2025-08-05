
'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { BrainCircuit, Database, CloudSun, Siren, Landmark, Zap, ArrowRight, BarChartHorizontal, Target, Users, DollarSign, TrendingUp, Shield, Clock, Award, Star } from 'lucide-react';
import Link from 'next/link';

// Custom Baseball icon with enhanced design
const BaseballIcon = React.memo(({ size = 24, className = '', ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Baseball icon"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M6.34 17.66C7.8 19.1 9.79 20 12 20s4.2-.9 5.66-2.34" />
    <path d="M17.66 6.34C16.2 4.9 14.21 4 12 4s-4.2.9-5.66 2.34" />
  </svg>
));

BaseballIcon.displayName = 'BaseballIcon';

// Floating particles component
const FloatingParticles = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-orange-400/20 rounded-full animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`
        }}
      />
    ))}
  </div>
));

FloatingParticles.displayName = 'FloatingParticles';

// Enhanced interfaces
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
  gradient?: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
  color?: string;
}

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Enhanced animated element with multiple directions
const AnimatedElement: React.FC<AnimatedElementProps> = React.memo(({ 
  children, 
  delay = 0, 
  className = '',
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';
    
    switch (direction) {
      case 'up': return 'translate-y-8 opacity-0';
      case 'down': return '-translate-y-8 opacity-0';
      case 'left': return 'translate-x-8 opacity-0';
      case 'right': return '-translate-x-8 opacity-0';
      default: return 'translate-y-8 opacity-0';
    }
  };

  return (
    <div className={`transition-all duration-1000 ease-out ${getTransform()} ${className}`}>
      {children}
    </div>
  );
});

AnimatedElement.displayName = 'AnimatedElement';

// Enhanced FeatureCard with premium design
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ 
  icon, 
  title, 
  description, 
  delay = 0,
  gradient = 'from-orange-500/20 to-red-600/20'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedElement delay={delay}>
      <div 
        className={`group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-8 text-center transform transition-all duration-500 hover:-translate-y-4 hover:scale-105 hover:border-orange-400/60 hover:shadow-2xl hover:shadow-orange-500/20 overflow-hidden`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="article"
        tabIndex={0}
      >
        {/* Animated background glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
        
        {/* Icon container with enhanced animation */}
        <div className="relative mx-auto w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/30 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform duration-300">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400/20 to-red-500/20 animate-pulse" />
          <div className="relative z-10">{icon}</div>
        </div>
        
        <h3 className="relative z-10 text-xl font-bold text-white mb-4 group-hover:text-orange-100 transition-colors">
          {title}
        </h3>
        <p className="relative z-10 text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
          {description}
        </p>
      </div>
    </AnimatedElement>
  );
});

FeatureCard.displayName = 'FeatureCard';

// Enhanced StatCard with dynamic colors
const StatCard: React.FC<StatCardProps> = React.memo(({ 
  icon, 
  value, 
  label, 
  delay = 0,
  color = 'orange'
}) => {
  const colorMap = {
    orange: 'text-orange-400 border-orange-500/30 hover:border-orange-400/60 hover:shadow-orange-500/20',
    blue: 'text-blue-400 border-blue-500/30 hover:border-blue-400/60 hover:shadow-blue-500/20',
    green: 'text-green-400 border-green-500/30 hover:border-green-400/60 hover:shadow-green-500/20',
    purple: 'text-purple-400 border-purple-500/30 hover:border-purple-400/60 hover:shadow-purple-500/20'
  };

  return (
    <AnimatedElement delay={delay} direction="up">
      <div className={`group bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl rounded-xl p-6 text-center border ${colorMap[color]} hover:shadow-xl transition-all duration-300 hover:scale-105`}>
        <div className="mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          {icon}
        </div>
        <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
          {value}
        </div>
        <div className="text-gray-400 text-sm uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    </AnimatedElement>
  );
});

StatCard.displayName = 'StatCard';

// Enhanced CTA Button with premium styling
const CTAButton: React.FC<{
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}> = React.memo(({ children, href, className = '', variant = 'primary' }) => {
  const baseClasses = "group relative font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black overflow-hidden";
  
  const variantClasses = variant === 'primary' 
    ? "bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 focus:ring-orange-500/50"
    : "bg-transparent border-2 border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white focus:ring-orange-500/50";

  const content = (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        <span className="relative z-10">{children}</span>
      </>
  );

  if (href) {
      return (
          <Link href={href} className={`${baseClasses} ${variantClasses} ${className} inline-block`}>
              {content}
          </Link>
      );
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      type="button"
    >
      {content}
    </button>
  );
});

CTAButton.displayName = 'CTAButton';

// Premium testimonial component
const TestimonialCard: React.FC<{
  quote: string;
  author: string;
  role: string;
  rating: number;
  delay?: number;
}> = React.memo(({ quote, author, role, rating, delay = 0 }) => (
  <AnimatedElement delay={delay}>
    <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/70 backdrop-blur-xl border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/40 transition-all duration-300">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-300 italic mb-4">"{quote}"</p>
      <div>
        <p className="font-bold text-white">{author}</p>
        <p className="text-sm text-gray-400">{role}</p>
      </div>
    </div>
  </AnimatedElement>
));

TestimonialCard.displayName = 'TestimonialCard';

// Main component with spectacular design
const MLBSystemPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const statsData = useMemo(() => [
    { icon: <Database size={36} />, value: "10M+", label: "Data Points Analyzed", color: "orange" },
    { icon: <Target size={36} />, value: "94.2%", label: "Prediction Accuracy", color: "green" },
    { icon: <Users size={36} />, value: "15K+", label: "Active Users", color: "blue" },
    { icon: <DollarSign size={36} />, value: "$2.3M", label: "Total Winnings", color: "purple" }
  ], []);

  const featuresData = useMemo(() => [
    {
      icon: <BrainCircuit size={36} />,
      title: "AI-Powered Predictions",
      description: "Advanced machine learning algorithms analyze historical data, player performance, and countless variables to deliver highly accurate predictions.",
      gradient: "from-purple-500/20 to-pink-600/20"
    },
    {
      icon: <BarChartHorizontal size={36} />,
      title: "10M+ Data Points",
      description: "Access a massive database of historical and real-time information covering every aspect of MLB games and player statistics.",
      gradient: "from-blue-500/20 to-cyan-600/20"
    },
    {
      icon: <CloudSun size={36} />,
      title: "Real-Time Weather Tracking",
      description: "Understand how weather conditions will impact game outcomes with detailed meteorological analysis and predictions.",
      gradient: "from-green-500/20 to-emerald-600/20"
    },
    {
      icon: <Siren size={36} />,
      title: "Public Trap Detection",
      description: "Avoid common betting pitfalls and identify when public opinion is leading bettors astray with our trap detection system.",
      gradient: "from-red-500/20 to-rose-600/20"
    },
    {
      icon: <Landmark size={36} />,
      title: "Park Factors Analysis",
      description: "Comprehensive analysis of how each stadium's unique characteristics influence game outcomes and betting lines.",
      gradient: "from-yellow-500/20 to-amber-600/20"
    },
    {
      icon: <Zap size={36} />,
      title: "Live Game Updates",
      description: "Get real-time updates and in-game betting opportunities as conditions change throughout each game.",
      gradient: "from-indigo-500/20 to-violet-600/20"
    }
  ], []);

  const marketsData = useMemo(() => ({
    match: [
      "Match Winner", "Match Singles", "Match Home Runs",
      "Match Strikeouts", "Match Total Bases", "Match Doubles"
    ],
    team: [
      "Team Singles", "Team Doubles", "Team Stolen Bases",
      "Team RBI", "Team Hits"
    ],
    player: [
      "Player Hit", "Player RBI", "Player Single", "Player Run",
      "Player Home Run", "Player Total Bases", "Player Hits + Runs + RBIs"
    ]
  }), []);

  const testimonials = useMemo(() => [
    {
      quote: "This system completely changed my betting game. The accuracy is incredible!",
      author: "Mike Johnson",
      role: "Professional Bettor",
      rating: 5
    },
    {
      quote: "Finally, a system that actually works. Made my money back in the first week.",
      author: "Sarah Chen",
      role: "Sports Enthusiast",
      rating: 5
    },
    {
      quote: "The system is a must-have for any serious bettor. The AI predictions are spot on.",
      author: "David Rodriguez",
      role: "Data Analyst",
      rating: 5
    }
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mb-4 mx-auto" />
          <div className="text-orange-400 text-lg font-medium">Loading Rajib's MLB System...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden font-sans">
      {/* Enhanced background effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-600/40 via-red-500/30 to-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600/30 via-pink-500/20 to-orange-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-600/30 via-cyan-500/20 to-green-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s', animationDuration: '7s' }} />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gradient-to-br from-red-600/40 via-orange-500/30 to-yellow-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '9s' }} />
      </div>

      <FloatingParticles />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Premium Header */}
        <header className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20 backdrop-blur-sm">
          <AnimatedElement direction="right">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              <span className="text-white">RAJIB'S </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">
                MLB SYSTEM
              </span>
            </h1>
          </AnimatedElement>
          <AnimatedElement direction="left" delay={200}>
            <Link href="/login"
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-700 hover:border-orange-500/50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              Login
            </Link>
          </AnimatedElement>
        </header>

        {/* Spectacular Hero Section */}
        <section className="text-center pt-32 pb-20 px-4 relative">
          <AnimatedElement delay={300}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-2 mb-8">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">#1 AI-Powered MLB Prediction System</span>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={500}>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
              Beat the Sportsbook with <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 animate-pulse">
                AI-Powered MLB Predictions
              </span>
            </h2>
          </AnimatedElement>

          <AnimatedElement delay={700}>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Leverage <span className="text-orange-400 font-bold">10M+ data points</span>, advanced AI algorithms, and real-time analytics to make smarter betting decisions. Join thousands of winning players using our cutting-edge system.
            </p>
          </AnimatedElement>

          <AnimatedElement delay={900}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <CTAButton href="/signup" variant="primary">
                Try Rajib's MLB System FREE
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </CTAButton>
              <CTAButton variant="secondary">
                <Clock className="inline-block mr-2 w-5 h-5" />
                Watch 2-Min Demo
              </CTAButton>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={1100}>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Money Back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-400" />
                <span>15,000+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span>94.2% Win Rate</span>
              </div>
            </div>
          </AnimatedElement>
        </section>

        {/* Premium Stats Section */}
        <section className="px-4 pb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <StatCard 
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                delay={index * 150}
              />
            ))}
          </div>
        </section>

        {/* Enhanced Features Section */}
        <section className="px-4 py-20 relative">
          <div className="max-w-7xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Optimize Your Strategy Across 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500"> All Games</span>
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Our advanced AI system provides comprehensive analysis across every aspect of MLB betting
                </p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => (
                <FeatureCard 
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  gradient={feature.gradient}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Markets Section */}
        <section className="px-4 py-20 bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">18 Approved</span> Betting Markets
                </h2>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                  Access predictions across comprehensive market types covering matches, teams, and individual players
                </p>
              </div>
            </AnimatedElement>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <AnimatedElement delay={200}>
                <div className="bg-gradient-to-br from-orange-900/30 to-red-900/20 backdrop-blur-xl border border-orange-500/30 rounded-2xl p-8 hover:border-orange-400/60 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500/30 to-red-600/30 flex items-center justify-center text-orange-400 mr-4">
                      <BaseballIcon size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Match Markets</h3>
                      <p className="text-orange-300 font-medium">6 total markets</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {marketsData.match.map((market) => (
                      <div key={market} className="flex items-center text-gray-200 bg-gray-800/30 rounded-lg p-3 hover:bg-gray-700/40 transition-colors">
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">{market}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/20 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-8 hover:border-blue-400/60 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/30 flex items-center justify-center text-blue-400 mr-4">
                      <Users size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Team Markets</h3>
                      <p className="text-blue-300 font-medium">5 total markets</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {marketsData.team.map((market) => (
                      <div key={market} className="flex items-center text-gray-200 bg-gray-800/30 rounded-lg p-3 hover:bg-gray-700/40 transition-colors">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">{market}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={600}>
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/20 backdrop-blur-xl border border-green-500/30 rounded-2xl p-8 hover:border-green-400/60 transition-all duration-500">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center text-green-400 mr-4">
                      <Target size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Player Markets</h3>
                      <p className="text-green-300 font-medium">7 total markets</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {marketsData.player.map((market) => (
                      <div key={market} className="flex items-center text-gray-200 bg-gray-800/30 rounded-lg p-3 hover:bg-gray-700/40 transition-colors">
                        <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="font-medium">{market}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </section>

        {/* Premium Testimonials Section */}
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Winners</span> Say
                </h2>
                <p className="text-lg text-gray-300">Real results from real users</p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.author}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  rating={testimonial.rating}
                  delay={index * 200}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Final CTA Section */}
        <section className="text-center py-20 px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-red-600/10 to-yellow-600/10 blur-2xl" />
          <div className="relative z-10 max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400">Dominate</span> the Game?
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <p className="text-xl text-gray-300 mb-12">
                Join thousands of bettors who have transformed their strategy with our AI-powered system. Get instant access to winning predictions and start your journey to consistent profits today.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={400}>
              <CTAButton href="/signup" variant="primary" className="text-lg">
                Get Instant Access Now
                <ArrowRight className="inline-block ml-2 w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
              </CTAButton>
            </AnimatedElement>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MLBSystemPage;
