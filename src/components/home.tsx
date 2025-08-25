import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuntieMaeAvatar from "./AuntieMaeAvatar";
import DrFeelgoodAvatar from "./DrFeelgoodAvatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  ChefHat,
  Book,
  Palette,
  Play,
  Heart,
  Zap,
  Eye,
  Brain,
  Star,
  TrendingUp,
  Users,
  Sparkles,
} from "lucide-react";

const Home = () => {
  const featuredContent = [
    {
      type: "cooking",
      title:
        "Auntie Mae's Healing Kitchen - Birthday Tribute to Mary Ann Davis",
      subtitle: "SPECIAL EPISODE",
      description:
        "A heartfelt birthday tribute featuring healing comfort foods that nourish body and soul, honoring Mary Ann Davis's legacy",
      image:
        "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&q=80",
      badge: "TRENDING",
      category: "Cooking Show",
    },
    {
      type: "tour",
      title: "Inside Your Body: Graves' Disease Journey",
      subtitle: "IMMERSIVE EXPERIENCE",
      description:
        "Take a guided tour through your body to understand what's happening with Graves' disease",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      badge: "EXCLUSIVE",
      category: "Health Education",
    },
    {
      type: "fashion",
      title: "Sustainable Fashion Show - Healing Through Style",
      subtitle: "NEW SERIES",
      description:
        "Discover how fashion can be part of your healing journey with sustainable, confidence-boosting styles",
      image:
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80",
      badge: "NEW",
      category: "Fashion & Wellness",
    },
  ];

  const healthStories = [
    {
      title: "SHOCKING: What Doctors Don't Tell You About Thyroid Health!",
      subtitle: "Local Woman Discovers Secret to Managing Graves' Disease",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0200ba2fe65?w=400&q=80",
      category: "HEALTH SECRETS",
    },
    {
      title: "MIRACLE SPICES: Ancient Remedies That Actually Work",
      subtitle: "These Kitchen Staples Could Change Your Life Forever",
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
      category: "NATURAL HEALING",
    },
    {
      title: "CELEBRITY CHEF'S SECRET: How Auntie Mae Beat Her Diagnosis",
      subtitle: "From India to Detroit: A Journey of Healing Through Food",
      image:
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80",
      category: "INSPIRATION",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header - Netflix/National Enquirer mashup */}
      <header className="bg-gradient-to-r from-red-900 via-red-700 to-red-900 text-white p-4 shadow-2xl border-b-4 border-yellow-400">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="text-4xl md:text-5xl font-black font-serif text-yellow-400 drop-shadow-lg">
              The Black Women's Guide to Graves' Disease
            </div>
          </div>
          <nav className="hidden md:flex space-x-2">
            <Button
              variant="ghost"
              className="text-white hover:bg-red-800 border border-yellow-400"
            >
              <Play className="mr-2 h-4 w-4" /> WATCH NOW
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-red-800 border border-yellow-400"
            >
              <Heart className="mr-2 h-4 w-4" /> HEALTH TOUR
            </Button>
            <Button
              variant="ghost"
              className="text-white hover:bg-red-800 border border-yellow-400"
            >
              <ChefHat className="mr-2 h-4 w-4" /> RECIPES
            </Button>
            <Link to="/fashion-show">
              <Button
                variant="ghost"
                className="text-white hover:bg-red-800 border border-yellow-400"
              >
                <Palette className="mr-2 h-4 w-4" /> FASHION
              </Button>
            </Link>
          </nav>
        </div>

        {/* Breaking news ticker */}
        <div className="mt-2 bg-yellow-400 text-black py-1 overflow-hidden">
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-bold text-sm"
          >
            🚨 BREAKING: New Study Shows 85% of Black Women Undiagnosed with
            Thyroid Issues! • Auntie Mae's Secret Spice Blend Helps Thousands! •
            EXCLUSIVE: Inside Look at Graves' Disease Like Never Before! 🚨
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section - Netflix style */}
        <div className="relative h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1594736797933-d0200ba2fe65?w=1600&q=80"
              alt="Hero background"
              className="w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto h-full flex items-center">
            <div className="max-w-2xl p-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="bg-red-600 text-white mb-4 text-lg px-4 py-2">
                  🔥 MOST WATCHED
                </Badge>
                <h1 className="text-5xl md:text-7xl font-black mb-4 text-yellow-400 drop-shadow-2xl">
                  TAKE CONTROL
                </h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                  Your Body, Your Health, Your Power
                </h2>
                <p className="text-xl mb-8 text-gray-200 leading-relaxed">
                  Join thousands of Black women on a journey of understanding,
                  healing, and empowerment. From Auntie Mae's healing kitchen to
                  an unprecedented look inside your body.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/cooking-show">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg"
                    >
                      <Play className="mr-2 h-5 w-5" /> START YOUR JOURNEY
                    </Button>
                  </Link>
                  <Link to="/body-tour">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 text-lg"
                    >
                      <Heart className="mr-2 h-5 w-5" /> BODY TOUR
                    </Button>
                  </Link>
                  <Link to="/auntie-mae-ai">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black font-bold px-8 py-4 text-lg"
                    >
                      <Sparkles className="mr-2 h-5 w-5" /> TALK TO AUNTIE MAE
                    </Button>
                  </Link>

                </div>
              </motion.div>
            </div>

            {/* Avatar Display - Both Dr. Feelgood and Auntie Mae Side by Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block absolute right-4 lg:right-10 top-1/3 transform -translate-y-1/2"
            >
              <div className="flex flex-row space-x-4 lg:space-x-6">
                {/* Dr. Feelgood Avatar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-to-b from-blue-50 to-cyan-100 rounded-lg p-4 lg:p-6 shadow-elev-3 border-2 border-blue-400"
                >
                  <DrFeelgoodAvatar size="medium" showLabel={false} />
                  <div className="text-center mt-3 lg:mt-4">
                    <p className="text-sm lg:text-base font-bold text-gray-800">Dr. Feelgood</p>
                    <p className="text-xs text-gray-600">Your Medical Guide</p>
                  </div>
                </motion.div>
                
                {/* Auntie Mae Avatar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-gradient-to-b from-amber-50 to-orange-100 rounded-lg p-4 lg:p-6 shadow-elev-3 border-2 border-yellow-400"
                >
                  <AuntieMaeAvatar size="medium" showLabel={false} />
                  <div className="text-center mt-3 lg:mt-4">
                    <p className="text-sm lg:text-base font-bold text-gray-800">Auntie Mae</p>
                    <p className="text-xs text-gray-600">Your Health Guide</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Content - Netflix rows style */}
        <div className="container mx-auto px-4 py-12">
          {/* Main Featured Content */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-yellow-400 mb-8 flex items-center">
              <Star className="mr-3 h-8 w-8" /> FEATURED CONTENT
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredContent.map((content, index) => (
                <motion.div
                  key={content.type}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="bg-gray-900 border-red-600 border-2 overflow-hidden hover:scale-105 transition-transform duration-300">
                    <div className="relative">
                      <img
                        src={content.image}
                        alt={content.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold">
                        {content.badge}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-yellow-400 font-bold text-sm mb-1">
                          {content.subtitle}
                        </p>
                        <h3 className="text-white font-black text-xl mb-2">
                          {content.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-gray-300 mb-4">
                        {content.description}
                      </p>
                      <Link to={
                        content.type === "cooking" ? "/cooking-show" : 
                        content.type === "tour" ? "/body-tour" : 
                        "/fashion-show"
                      }>
                        <Button className="w-full bg-red-600 hover:bg-red-700 font-bold">
                          <Play className="mr-2 h-4 w-4" />
                          {content.type === "cooking"
                            ? "WATCH COOKING SHOW"
                            : content.type === "tour"
                            ? "START BODY TOUR"
                            : "WATCH FASHION SHOW"}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Health Stories - National Enquirer style */}
          <div className="mb-12">
            <h2 className="text-3xl font-black text-yellow-400 mb-8 flex items-center">
              <TrendingUp className="mr-3 h-8 w-8" /> SHOCKING HEALTH STORIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {healthStories.map((story, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-yellow-400 text-black border-4 border-red-600 overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                    <div className="relative">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-600 text-white font-black text-xs">
                        {story.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-black text-lg mb-2 leading-tight">
                        {story.title}
                      </h3>
                      <p className="text-sm font-bold text-red-800">
                        {story.subtitle}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-lg p-8">
            <h2 className="text-3xl font-black text-yellow-400 mb-6 text-center flex items-center justify-center">
              <Users className="mr-3 h-8 w-8" /> JOIN OUR COMMUNITY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-white mb-2">50K+</div>
                <div className="text-yellow-400 font-bold">
                  Sisters Supported
                </div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">1M+</div>
                <div className="text-yellow-400 font-bold">Recipes Shared</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2">95%</div>
                <div className="text-yellow-400 font-bold">Feel Empowered</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-4 border-yellow-400 text-white p-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-black text-yellow-400 mb-4">
                The Black Women's Guide
              </h2>
              <p className="text-gray-300 mb-4">
                Empowering Black women with knowledge, community, and healing
                through understanding Graves' disease.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  Join Community
                </Button>
                <Button
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                >
                  Get Support
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">
                Quick Links
              </h3>
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/body-tour"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Body Tour
                </Link>
                <Link
                  to="/cooking-show"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Auntie Mae's Kitchen
                </Link>
                <Link
                  to="/recipes"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Healing Recipes
                </Link>
                <Link
                  to="/fashion-show"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Fashion Show
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-yellow-400 mb-4">
                Support
              </h3>
              <div className="space-y-2">
                <Link
                  to="/about"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/community"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Community
                </Link>
                <Link
                  to="/resources"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Resources
                </Link>
                <Link
                  to="/contact"
                  className="block text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} The Black Women's Guide to Graves' Disease.
              <span className="text-yellow-400 font-bold">
                {" "}
                Healing Through Knowledge & Community.
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              This platform is for educational purposes. Always consult with
              healthcare professionals.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
