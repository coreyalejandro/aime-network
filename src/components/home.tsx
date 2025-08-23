import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import AvatarDisplay from "./AvatarDisplay";
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
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
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
  ];

  const healthStories = [
    {
      title: "SHOCKING: What Doctors Don't Tell You About Thyroid Health!",
      subtitle: "Local Woman Discovers Secret to Managing Graves' Disease",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&q=80",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
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
              Dr. FeelGood's
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-bold text-red-200">
                BLACK WOMEN'S GUIDE TO
              </div>
              <div className="text-2xl font-black text-yellow-300">
                GRAVES' DISEASE
              </div>
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
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600&q=80"
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
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg"
                  >
                    <Play className="mr-2 h-5 w-5" /> START YOUR JOURNEY
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-bold px-8 py-4 text-lg"
                  >
                    <Heart className="mr-2 h-5 w-5" /> BODY TOUR
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Avatar Display - smaller and positioned */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block absolute right-10 top-1/2 transform -translate-y-1/2"
            >
              <div className="scale-75">
                <AvatarDisplay
                  avatarUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=auntie-mae-respectful&backgroundColor=f4e4c1&skinColor=brown&hairColor=gray&clothingColor=red&accessoriesColor=gold"
                  currentOutfit="Traditional Indian Heritage"
                />
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <Button className="w-full bg-red-600 hover:bg-red-700 font-bold">
                        <Play className="mr-2 h-4 w-4" />
                        {content.type === "cooking"
                          ? "WATCH COOKING SHOW"
                          : "START BODY TOUR"}
                      </Button>
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
                Dr. FeelGood's Guide
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
              © {new Date().getFullYear()} Black Women's Dr. FeelGood's Guide
              to Graves' Disease.
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
