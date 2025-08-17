import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Heart,
  Brain,
  Eye,
  Zap,
} from "lucide-react";

interface TourSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: string;
  symptoms: string[];
  bodyPart: string;
}

const GravesDiseaseTour = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);

  const tourSections: TourSection[] = [
    {
      id: "thyroid",
      title: "The Thyroid: Tiny Gland, Big Drama",
      description:
        "Journey to the butterfly-shaped gland at the base of your neck",
      icon: <Zap className="h-6 w-6" />,
      content:
        "We start our tour at the base of your neck, where a small butterfly-shaped gland – your thyroid – resides. Normally, this gland is the steady metronome of your metabolism, quietly releasing just the right amount of thyroid hormone. But now, we see it lit up like a furnace.",
      symptoms: [
        "Goiter (enlarged thyroid)",
        "Heat intolerance",
        "Excessive sweating",
        "Weight loss despite increased appetite",
      ],
      bodyPart: "thyroid",
    },
    {
      id: "heart",
      title: "Heart in Overdrive",
      description:
        "Your heart beating hard and fast like a drummer on double speed",
      icon: <Heart className="h-6 w-6" />,
      content:
        "As we approach your heart, we see it's beating hard and fast, like a drummer on double speed. Those excess thyroid hormones are like adrenaline's hype squad: they cause your heart to race and pound, even when you're just sitting still.",
      symptoms: [
        "Rapid pulse",
        "Heart palpitations",
        "High blood pressure",
        "Shortness of breath",
      ],
      bodyPart: "heart",
    },
    {
      id: "brain",
      title: "The Brain and Nerves: Mind on High Alert",
      description:
        "Your brain's neurons lighting up like a switchboard on overdrive",
      icon: <Brain className="h-6 w-6" />,
      content:
        "Next, we drift upward into your brain, the command center. Here, the effects of all that extra thyroid hormone feel like someone hit the fast-forward button on your emotions and nerves. The brain's neurons are lighting up like a switchboard stuck on overdrive.",
      symptoms: [
        "Anxiety and nervousness",
        "Racing thoughts",
        "Insomnia",
        "Hand tremors",
      ],
      bodyPart: "brain",
    },
    {
      id: "eyes",
      title: "Eyes: Under Pressure",
      description:
        "Behind your eyes where immune cells swarm and cause inflammation",
      icon: <Eye className="h-6 w-6" />,
      content:
        "Now our tour takes a turn behind your eyes. Here we find another hotspot of Graves' disease. In some people, the same misguided immune attack on the thyroid also targets the tissues around the eyes. We see immune cells swarming and releasing inflammatory signals.",
      symptoms: [
        "Bulging eyes",
        "Dry, irritated eyes",
        "Double vision",
        "Eye pain",
      ],
      bodyPart: "eyes",
    },
  ];

  const currentTourSection = tourSections[currentSection];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            if (currentSection < tourSections.length - 1) {
              setCurrentSection(currentSection + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSection, tourSections.length]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextSection = () => {
    if (currentSection < tourSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setProgress(0);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setProgress(0);
    }
  };

  const getBodyVisualization = (bodyPart: string) => {
    const visualizations = {
      thyroid:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80",
      heart:
        "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800&q=80",
      brain:
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
      eyes: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    };
    return (
      visualizations[bodyPart as keyof typeof visualizations] ||
      visualizations.thyroid
    );
  };

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden">
      {/* IMAX-style immersive display */}
      <div className="relative w-full h-[70vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <img
                src={getBodyVisualization(currentTourSection.bodyPart)}
                alt={currentTourSection.title}
                className="w-full h-full object-cover opacity-60"
              />

              {/* Animated overlay effects */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/20 to-black/60" />

              {/* Pulsing effect for active body part */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl"
              />

              {/* Avatar guide */}
              <div className="absolute bottom-20 right-10">
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="bg-white/10 backdrop-blur-md rounded-full p-4"
                >
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=drfeelgood&backgroundColor=b6e3f4"
                    alt="Dr. FeelGood Avatar"
                    className="w-24 h-24 rounded-full"
                  />
                </motion.div>
                <div className="text-center mt-2">
                  <p className="text-sm font-medium">Dr. FeelGood</p>
                  <p className="text-xs text-gray-300">Your Guide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Section info overlay */}
        <div className="absolute top-10 left-10 max-w-md">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-black/70 backdrop-blur-md rounded-lg p-6"
          >
            <div className="flex items-center mb-3">
              <div className="text-red-400 mr-3">{currentTourSection.icon}</div>
              <Badge variant="destructive" className="bg-red-600">
                Section {currentSection + 1} of {tourSections.length}
              </Badge>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-red-400">
              {currentTourSection.title}
            </h2>
            <p className="text-gray-300 mb-4">
              {currentTourSection.description}
            </p>
            <p className="text-sm leading-relaxed">
              {currentTourSection.content}
            </p>
          </motion.div>
        </div>

        {/* Symptoms sidebar */}
        <div className="absolute top-10 right-10 max-w-xs">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-red-900/80 backdrop-blur-md rounded-lg p-4"
          >
            <h3 className="text-lg font-bold mb-3 text-red-300">Symptoms</h3>
            <ul className="space-y-2">
              {currentTourSection.symptoms.map((symptom, index) => (
                <motion.li
                  key={symptom}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm flex items-center"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2" />
                  {symptom}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="h-[30vh] bg-gradient-to-t from-black to-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Progress bar */}
          <div className="mb-4">
            <Progress value={progress} className="h-2 bg-gray-800" />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{currentTourSection.title}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevSection}
              disabled={currentSection === 0}
              className="text-white hover:bg-white/20"
            >
              <SkipBack className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/20 w-12 h-12"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextSection}
              disabled={currentSection === tourSections.length - 1}
              className="text-white hover:bg-white/20"
            >
              <SkipForward className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2 ml-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMuted(!isMuted)}
                className="text-white hover:bg-white/20"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Section navigation */}
          <div className="flex justify-center space-x-2">
            {tourSections.map((section, index) => (
              <Button
                key={section.id}
                variant={index === currentSection ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setCurrentSection(index);
                  setProgress(0);
                }}
                className={`text-xs ${
                  index === currentSection
                    ? "bg-red-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/20"
                }`}
              >
                {section.icon}
                <span className="ml-1 hidden md:inline">
                  {section.title.split(":")[0]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GravesDiseaseTour;
