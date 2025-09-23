import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  ChevronDown,
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Code,
  Briefcase,
  GraduationCap,
  Download,
  MapPin,
  Award,
  User,
  FileText,
  Play,
  Target,
  Globe,
  Cpu,
  Database,
  Terminal,
  ArrowRight,
  Palette,
  X,
} from "lucide-react";

// Completely self-contained loading typewriter with button
const LoadingTypewriter: React.FC<{
  onEnterPortfolio: () => void;
  theme: (typeof themes)[keyof typeof themes];
}> = ({ onEnterPortfolio, theme }) => {
  const [displayText, setDisplayText] = useState({
    name1: "",
    name2: "",
    title: "",
    showTitle: false,
    showButton: false,
    completed: false,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentStep = 0;

    const steps = [
      // Type "Michael" (7 characters)
      ...Array.from("Michael").map((char) => () => {
        setDisplayText((prev) => ({ ...prev, name1: prev.name1 + char }));
      }),
      // Pause after "Michael"
      () => {},
      // Type "Ogunrinde" (9 characters)
      ...Array.from("Ogunrinde").map((char) => () => {
        setDisplayText((prev) => ({ ...prev, name2: prev.name2 + char }));
      }),
      // Show title area and pause
      () => {
        setDisplayText((prev) => ({ ...prev, showTitle: true }));
      },
      // Type title (33 characters)
      ...Array.from("AI Engineer & Full-Stack Developer").map((char) => () => {
        setDisplayText((prev) => ({ ...prev, title: prev.title + char }));
      }),
      // Show button
      () => {
        setDisplayText((prev) => ({
          ...prev,
          showButton: true,
          completed: true,
        }));
      },
    ];

    const executeStep = () => {
      if (currentStep < steps.length) {
        steps[currentStep]();
        currentStep++;

        // Fast but visible typewriter effect
        let delay = 50; // Very fast typing
        if (currentStep === 8) delay = 150; // Brief pause after "Michael"
        else if (currentStep === 18) delay = 200; // Brief pause before title
        else if (currentStep > 18 && currentStep < steps.length - 1)
          delay = 40; // Super fast for title
        else if (currentStep === steps.length - 1) delay = 200; // Brief pause before button

        timeoutId = setTimeout(executeStep, delay);
      }
    };

    // Start immediately
    timeoutId = setTimeout(executeStep, 300);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // Empty dependency array - runs once only, never re-runs

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 min-h-32 md:min-h-40">
          <div
            className={`bg-gradient-to-r ${theme.intro.text} bg-clip-text text-transparent`}
          >
            <div>
              {displayText.name1}
              {displayText.name1.length < 7 &&
                displayText.name2.length === 0 && (
                  <span className={`animate-pulse ${theme.intro.accent}`}>
                    |
                  </span>
                )}
            </div>
            <div>
              {displayText.name2}
              {displayText.name1.length === 7 &&
                displayText.name2.length < 9 &&
                !displayText.showTitle && (
                  <span className={`animate-pulse ${theme.intro.accent}`}>
                    |
                  </span>
                )}
            </div>
          </div>
        </h1>

        {displayText.showTitle && (
          <p
            className={`text-xl md:text-2xl ${theme.intro.accent} font-light min-h-8`}
          >
            {displayText.title}
            {displayText.title.length < 33 && !displayText.completed && (
              <span className={`animate-pulse ${theme.intro.accent}`}>|</span>
            )}
          </p>
        )}
      </div>

      {/* Button appears internally with smooth animation */}
      {displayText.showButton && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
            delay: 0.2,
          }}
        >
          <motion.p
            className={`${theme.intro.accent} text-sm mb-6 opacity-75`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            Ready to explore my work?
          </motion.p>
          <motion.button
            onClick={onEnterPortfolio}
            className={`group px-10 py-4 bg-gradient-to-r ${theme.intro.button} text-white rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg inline-flex items-center gap-3`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

// Hero-specific programming background component
const HeroProgrammingBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const heroSection = canvas.parentElement;
      if (heroSection) {
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Programming-related code snippets
    const codeSnippets = [
      "const developer = 'Michael Ogunrinde';",
      "function innovate() {",
      "  return creative_solutions;",
      "}",
      "class AIResearcher {",
      "  constructor() {",
      "    this.passion = 'unlimited';",
      "    this.skills = ['ML', 'AI', 'Full-Stack'];",
      "  }",
      "}",
      "import { experience } from './google-deepmind';",
      "const achievements = ['First Class Honours'];",
      "// Building intelligent systems",
      "export default innovation;",
      "async function solve(challenge) {",
      "  const solution = await research();",
      "  return breakthrough;",
      "}",
      "machine_learning = True",
      "def create_impact():",
      "    return game_changing_solutions",
      "SELECT success FROM opportunities",
      "WHERE passion = 'technology';",
      "git commit -m 'Ready for next challenge'",
      "docker run --name future-tech",
      "npm install --save expertise",
      "pip install intelligence",
    ];

    const typingElements: Array<{
      x: number;
      y: number;
      text: string;
      currentIndex: number;
      speed: number;
      opacity: number;
      fontSize: number;
      color: string;
      isComplete: boolean;
      pauseTime: number;
    }> = [];

    // Create more visible typing elements
    for (let i = 0; i < 12; i++) {
      typingElements.push({
        x: Math.random() * (canvas.width - 400),
        y: Math.random() * (canvas.height - 100) + 50,
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        currentIndex: 0,
        speed: Math.random() * 2 + 1.5, // Slightly faster typing
        opacity: Math.random() * 0.25 + 0.15, // More visible (15-40% opacity)
        fontSize: Math.random() * 6 + 14, // Larger text
        color: [
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#06b6d4",
          "#10b981",
          "#f59e0b",
        ][Math.floor(Math.random() * 6)],
        isComplete: false,
        pauseTime: 0,
      });
    }

    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw typing elements
      typingElements.forEach((element) => {
        if (!element.isComplete) {
          element.currentIndex += (element.speed * deltaTime) / 1000;

          if (element.currentIndex >= element.text.length) {
            element.isComplete = true;
            element.pauseTime = currentTime + 2000 + Math.random() * 3000; // Pause 2-5 seconds
          }
        } else {
          if (currentTime > element.pauseTime) {
            element.text =
              codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            element.currentIndex = 0;
            element.isComplete = false;
            element.x = Math.random() * (canvas.width - 400);
            element.y = Math.random() * (canvas.height - 100) + 50;
            element.opacity = Math.random() * 0.25 + 0.15;
          }
        }

        // Draw the text with better visibility
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        ctx.font = `500 ${element.fontSize}px 'JetBrains Mono', 'Fira Code', 'Consolas', monospace`;

        const displayText = element.text.substring(
          0,
          Math.floor(element.currentIndex)
        );
        ctx.fillText(displayText, element.x, element.y);

        // Draw blinking cursor
        if (!element.isComplete && Math.floor(currentTime / 600) % 2 === 0) {
          const textWidth = ctx.measureText(displayText).width;
          ctx.fillRect(
            element.x + textWidth,
            element.y - element.fontSize,
            2,
            element.fontSize
          );
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

// Clean background for other sections
const ProfessionalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Programming-related code snippets and elements
    const codeSnippets = [
      "const developer = 'Michael';",
      "function innovate() {",
      "  return solutions;",
      "}",
      "class AIResearcher {",
      "  constructor() {",
      "    this.passion = true;",
      "  }",
      "}",
      "import { skills } from './experience';",
      "const projects = [];",
      "// Building the future",
      "export default creativity;",
      "async function solve(problem) {",
      "  const solution = await think();",
      "  return solution;",
      "}",
      "machine_learning = True",
      "def create_impact():",
      "    return innovation",
      "SELECT * FROM opportunities;",
      "git commit -m 'Professional growth'",
      "docker run --name success",
      "npm install expertise",
    ];

    const typingElements: Array<{
      x: number;
      y: number;
      text: string;
      currentIndex: number;
      speed: number;
      opacity: number;
      fontSize: number;
      color: string;
      isComplete: boolean;
      pauseTime: number;
    }> = [];

    // Create typing elements
    for (let i = 0; i < 8; i++) {
      typingElements.push({
        x: Math.random() * (canvas.width - 300),
        y: Math.random() * (canvas.height - 100),
        text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        currentIndex: 0,
        speed: Math.random() * 3 + 1, // Characters per second
        opacity: Math.random() * 0.12 + 0.03,
        fontSize: Math.random() * 4 + 12,
        color: ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981"][
          Math.floor(Math.random() * 5)
        ],
        isComplete: false,
        pauseTime: 0,
      });
    }

    let lastTime = 0;

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return;

      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw typing elements
      typingElements.forEach((element) => {
        if (!element.isComplete) {
          // Update typing progress
          element.currentIndex += (element.speed * deltaTime) / 1000;

          if (element.currentIndex >= element.text.length) {
            element.isComplete = true;
            element.pauseTime = currentTime + 3000 + Math.random() * 2000; // Pause for 3-5 seconds
          }
        } else {
          // Check if it's time to restart
          if (currentTime > element.pauseTime) {
            element.text =
              codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            element.currentIndex = 0;
            element.isComplete = false;
            element.x = Math.random() * (canvas.width - 300);
            element.y = Math.random() * (canvas.height - 100);
            element.opacity = Math.random() * 0.12 + 0.03;
          }
        }

        // Draw the text
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        ctx.font = `${element.fontSize}px 'JetBrains Mono', 'Fira Code', 'Consolas', monospace`;

        const displayText = element.text.substring(
          0,
          Math.floor(element.currentIndex)
        );
        ctx.fillText(displayText, element.x, element.y);

        // Draw cursor if still typing
        if (!element.isComplete && Math.floor(currentTime / 500) % 2 === 0) {
          const textWidth = ctx.measureText(displayText).width;
          ctx.fillRect(
            element.x + textWidth,
            element.y - element.fontSize,
            2,
            element.fontSize
          );
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Canvas for animated code snippets only */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  article?: string;
  poster?: string;
  video?: {
    url: string;
    isExternal: boolean;
  };
  image: string;
  year: string;
  category: "project" | "education" | "experience" | "achievement";
  featured?: boolean;
  impact?: string;
  duration?: string;
  teamSize?: number;
  soloProject?: boolean;
}

const experiences: Project[] = [
  // Work Experience
  {
    id: "2",
    title: "Google DeepMind Internship",
    description:
      "Extended an existing 2D trajectory deconfliction algorithm into 3D space. Implemented conflict detection and resolution in three-dimensional environments, added advanced obstacle avoidance, and evaluated scalability and efficiency compared to the 2D counterpart. Developed custom algorithms for safe and efficient multi-agent path planning in complex 3D environments.",
    tech: [
      "Python",
      "Numpy",
      "Matplotlib",
      "PyTorch",
      "Jupyter",
      "Pandas",
      "ipyvolume",
    ],
    image:
      "https://media.licdn.com/dms/image/v2/D4E22AQGOtVk-C88liw/feedshare-shrink_2048_1536/B4EZWoavlgGwAo-/0/1742287343682?e=1760572800&v=beta&t=thqYMVQF9Su6y_nPznyQeVinzid20y8bAX0AvqdQa4Y",
    article: "https://www.cst.cam.ac.uk/opportunity-great-people-me",
    poster: "3D-Trajectory-Deconfliction.pdf",
    year: "2024",
    category: "experience",
    impact: "60% path efficiency improvement",
    duration: "2 months",
    soloProject: true,
    featured: true,
  },

  // Education
  {
    id: "4",
    title: "Computer Science Graduation",
    description:
      "Bachelor of Science in Computer Science with First Class honors. Specialised in Artificial Intelligence, Machine Learning, and Software Engineering. Completed advanced coursework in machine learning, algorithms, and system design.",
    tech: [
      "Machine Learning",
      "Algorithms",
      "System Design",
      "Software Engineering",
      "Database Systems",
      "Computer Networks",
    ],
    image:
      "https://latestlogo.com/wp-content/uploads/2024/02/shield-of-sheffield-hallam-university.png",
    year: "2025",
    category: "education",
    impact: "First Class Honours (4.0/4.0 GPA)",
    duration: "3 years",
  },

  // Projects
  {
    id: "1",
    title:
      "AI Tutor System for Personalised Learning and Adaptive Feedback (Multi-Agent System)",
    description:
      "An intelligent tutoring platform designed for Year 6 maths students. It leverages a multi-agent architecture with specialised agents for question generation, hint creation, and adaptive feedback. The system integrates Deep Knowledge Tracing (DKT+) models to track student mastery, detect learning styles, and personalise study plans. Built with FastAPI, PostgreSQL, and a React frontend, it provides adaptive daily practice, weekly reviews, and personalised feedback.",
    tech: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "PyTorch",
      "DKT+",
      "Multi-Agent System",
      "Ollama (Mistral, DeepSeek)",
      "Docker",
    ],
    poster: "AI-Tutor-Report.pdf",
    video: {
      url: "https://youtu.be/AH-kctlz2pk",
      isExternal: true,
    },
    image: `${import.meta.env.BASE_URL}images/image.png`,
    year: "2025",
    category: "project",
    featured: true,
    impact:
      "Adaptive learning tailored to student strengths and weaknesses in real time",
    duration: "2 months",
    soloProject: true,
  },
  {
    id: "3",
    title: "Sentimental Product Analysis (E-commerce)",
    description:
      "Developed a web application for analysing product sentiment in e-commerce. The platform enables users to manage products, submit and view reviews, and visualise sentiment analysis results. Features include user authentication, product management, and interactive dashboards for admins and viewers.",
    tech: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript", "XAMPP"],
    image: `${import.meta.env.BASE_URL}images/AnalyzeThis.png`,
    year: "2023",
    category: "project",
    featured: true,
    impact:
      "Streamlined e-commerce product management with sentiment analysis insights for data-driven decisions",
    duration: "1 month",
    soloProject: true,
    video: {
      url: "https://youtu.be/p7i85aXAszA",
      isExternal: true,
    },
  },
  {
    id: "5",
    title: "The Gym Website",
    description:
      "Created a modern website for DaBeast Gym, providing membership management, trainer profiles, and online sign-up for new and existing members. Features responsive design and comprehensive gym management functionality.",
    tech: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript", "XAMPP"],
    image: `${import.meta.env.BASE_URL}images/THE GYM.jpg`,
    year: "2022",
    category: "project",
    impact: "Streamlined gym membership and information access for users",
    duration: "1 month",
    soloProject: true,
    video: {
      url: "https://youtu.be/cYltxHcs0ys",
      isExternal: true,
    },
  },
  {
    id: "6",
    title: "Car Dash NEA Project",
    description:
      "Developed a custom Windows Forms application combining the fast-paced mechanics of 'Dashy Crashy' with zombie survival game elements. Features dynamic obstacle generation, progressive difficulty scaling, and resource management systems for an engaging arcade-survival hybrid experience.",
    tech: ["C#", "Windows Forms", "SQL", "Object-Oriented Programming"],
    image: `${import.meta.env.BASE_URL}images/Car-Dash.png`,
    video: {
      url: "https://www.youtube.com/watch?v=69XcBreeZno&list=PLO9ZXbzwUuk9zv4nGlTZJm_kdqvSj4MW5&index=4",
      isExternal: true,
    },
    year: "2022",
    category: "project",
    duration: "2 months",
    impact: "Demonstrated game development and object-oriented design skills",
    soloProject: true,
  },
];

const skillCategories = [
  {
    category: "Programming Languages",
    icon: Terminal,
    skills: [
      {
        name: "Python",
        experience: "3+ years",
        projects: ["AI Tutor", "DeepMind Internship", "ML Research"],
      },
      {
        name: "JavaScript/TypeScript",
        experience: "2+ years",
        projects: ["AI Tutor Frontend", "Portfolio Sites"],
      },
      {
        name: "C#",
        experience: "2 years",
        projects: ["Car Dash Game", "Windows Applications"],
      },
      {
        name: "PHP",
        experience: "2 years",
        projects: ["E-commerce Platform", "Gym Website"],
      },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: Cpu,
    skills: [
      {
        name: "PyTorch",
        experience: "2+ years",
        projects: ["AI Tutor System", "DeepMind Research"],
      },
      {
        name: "Deep Knowledge Tracing",
        experience: "1 year",
        projects: ["AI Tutor Multi-Agent System"],
      },
      {
        name: "Multi-Agent Systems",
        experience: "1 year",
        projects: ["Personalized Learning Platform"],
      },
      {
        name: "Research & Development",
        experience: "2+ years",
        projects: ["3D Trajectory Planning", "AI Education"],
      },
    ],
  },
  {
    category: "Web Development",
    icon: Globe,
    skills: [
      {
        name: "React",
        experience: "2+ years",
        projects: ["AI Tutor", "Portfolio Sites"],
      },
      {
        name: "FastAPI",
        experience: "1+ years",
        projects: ["AI Tutor Backend", "API Development"],
      },
      {
        name: "Full-Stack Development",
        experience: "3+ years",
        projects: ["Multiple Web Applications"],
      },
      {
        name: "Responsive Design",
        experience: "3+ years",
        projects: ["All Web Projects"],
      },
    ],
  },
  {
    category: "Data & Infrastructure",
    icon: Database,
    skills: [
      {
        name: "PostgreSQL/MySQL",
        experience: "3+ years",
        projects: ["AI Tutor", "E-commerce", "Gym Website"],
      },
      {
        name: "Docker",
        experience: "1+ years",
        projects: ["AI Tutor Deployment", "Development Environments"],
      },
      {
        name: "System Design",
        experience: "2+ years",
        projects: ["Multi-Agent Architecture", "Scalable Applications"],
      },
      {
        name: "Data Analysis",
        experience: "2+ years",
        projects: ["Sentiment Analysis", "Student Progress Tracking"],
      },
    ],
  },
];

const achievements = [
  {
    title: "First Class Honours",
    description: "BSc Computer Science, Sheffield Hallam University",
    year: "2025",
  },
  {
    title: "Google DeepMind Internship",
    description: "Research in 3D trajectory deconfliction algorithms",
    year: "2024",
  },
  {
    title: "AI Research/Project",
    description: "Multi-agent systems for personalised learning",
    year: "2025",
  },
];

// Theme definitions
const themes = {
  blue: {
    name: "Ocean Blue",
    intro: {
      background: "from-slate-900 via-blue-950 to-indigo-950",
      text: "from-white via-blue-100 to-indigo-100",
      accent: "text-blue-200",
      button:
        "from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800",
      particles: "bg-blue-300/30",
      borders: "border-blue-500/40",
    },
    main: {
      background: "from-slate-100 via-blue-50 to-indigo-50",
      nav: "bg-white/85",
      text: "text-gray-800",
      textMuted: "text-gray-500",
      accent: "from-blue-600 to-indigo-600",
      accentText: "text-blue-700",
      button:
        "from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700",
      card: "bg-white",
      cardHover: "hover:bg-blue-50/50",
      border: "border-gray-200",
      shadow: "shadow-lg shadow-blue-100/10",
    },
  },
  emerald: {
    name: "Forest Green",
    intro: {
      background: "from-slate-900 via-emerald-950 to-teal-950",
      text: "from-white via-emerald-100 to-teal-100",
      accent: "text-emerald-200",
      button:
        "from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800",
      particles: "bg-emerald-300/30",
      borders: "border-emerald-500/40",
    },
    main: {
      background: "from-slate-100 via-emerald-50 to-teal-50",
      nav: "bg-white/85",
      text: "text-gray-800",
      textMuted: "text-gray-500",
      accent: "from-emerald-600 to-teal-600",
      accentText: "text-emerald-700",
      button:
        "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700",
      card: "bg-white",
      cardHover: "hover:bg-emerald-50/50",
      border: "border-gray-200",
      shadow: "shadow-lg shadow-emerald-100/10",
    },
  },
  sunset: {
    name: "Sunset Orange",
    intro: {
      background: "from-slate-900 via-orange-950 to-red-950",
      text: "from-white via-orange-100 to-red-100",
      accent: "text-orange-200",
      button:
        "from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800",
      particles: "bg-orange-300/30",
      borders: "border-orange-500/40",
    },
    main: {
      background: "from-slate-100 via-orange-50 to-red-50",
      nav: "bg-white/85",
      text: "text-gray-800",
      textMuted: "text-gray-500",
      accent: "from-orange-600 to-red-600",
      accentText: "text-orange-700",
      button:
        "from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700",
      card: "bg-white",
      cardHover: "hover:bg-orange-50/50",
      border: "border-gray-200",
      shadow: "shadow-lg shadow-orange-100/10",
    },
  },
  purple: {
    name: "Royal Purple",
    intro: {
      background: "from-slate-900 via-purple-950 to-indigo-950",
      text: "from-white via-purple-100 to-indigo-100",
      accent: "text-purple-200",
      button:
        "from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800",
      particles: "bg-purple-300/30",
      borders: "border-purple-500/40",
    },
    main: {
      background: "from-slate-100 via-purple-50 to-indigo-50",
      nav: "bg-white/85",
      text: "text-gray-800",
      textMuted: "text-gray-500",
      accent: "from-purple-600 to-indigo-600",
      accentText: "text-purple-700",
      button:
        "from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
      card: "bg-white",
      cardHover: "hover:bg-purple-50/50",
      border: "border-gray-200",
      shadow: "shadow-lg shadow-purple-100/10",
    },
  },
  dark: {
    name: "Dark Mode",
    intro: {
      background: "from-gray-950 via-slate-950 to-black",
      text: "from-white via-gray-100 to-slate-100",
      accent: "text-gray-200",
      button:
        "from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800",
      particles: "bg-gray-300/30",
      borders: "border-gray-500/40",
    },
    main: {
      background: "from-gray-950 via-slate-950 to-black",
      nav: "bg-gray-900/90",
      text: "text-gray-100",
      textMuted: "text-gray-400",
      accent: "from-gray-500 to-slate-500",
      accentText: "text-gray-300",
      button:
        "from-gray-700 to-slate-700 hover:from-gray-800 hover:to-slate-800",
      card: "bg-gray-800",
      cardHover: "hover:bg-gray-700",
      border: "border-gray-700",
      shadow: "shadow-lg shadow-gray-900/20",
    },
  },
};

function ProfessionalApp() {
  const [activeSection, setActiveSection] = useState("hero");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);

  // Close theme selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isThemeSelectorOpen && !target.closest("[data-theme-selector]")) {
        setIsThemeSelectorOpen(false);
      }
    };

    if (isThemeSelectorOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isThemeSelectorOpen]);

  const getCookie = (name: string) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? decodeURIComponent(match[2]) : null;
  };
  const setCookie = (name: string, value: string, days = 365) => {
    const expires = new Date(
      Date.now() + days * 24 * 60 * 60 * 1000
    ).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(
      value
    )}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>(() => {
    try {
      const saved = getCookie("portfolio_theme");
      if (saved && saved in themes) return saved as keyof typeof themes;
    } catch {}
    return "blue";
  });

  useEffect(() => {
    try {
      setCookie("portfolio_theme", currentTheme);
    } catch {}
  }, [currentTheme]);

  // Contact form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle portfolio entry with smooth transition
  const handleEnterPortfolio = () => {
    setIsTransitioning(true);
    // After exit animation completes, show main content
    setTimeout(() => {
      setIsLoading(false);
      setShowMainContent(true);
    }, 800); // Match the exit animation duration
  };

  // Loading animation sequence
  useEffect(() => {
    // Start the name typing after initial delay
    setTimeout(() => setAnimationPhase(1), 800);

    // Phases 2 and 3 are now controlled by typewriter completion callbacks
    // No auto-advance - user must click to enter
  }, []);

  // Keep navigation highlight via scroll without storing scrollY
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "experience",
        "skills",
        "projects",
        "contact",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Loading Screen Component with exit animation
  const LoadingScreen = () => (
    <motion.div
      className={`fixed inset-0 z-[100] bg-gradient-to-br ${themes[currentTheme].intro.background} flex items-center justify-center`}
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={
        isTransitioning
          ? {
              opacity: 0,
              scale: 0.95,
              y: -50,
            }
          : {
              opacity: 1,
              scale: 1,
              y: 0,
            }
      }
      transition={{
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1], // Custom easing for smooth feel
      }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 ${themes[currentTheme].intro.particles} rounded-full`}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10">
        {/* Self-Contained Typewriter with Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            animationPhase >= 1
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {
                  opacity: 0,
                  y: 20,
                }
          }
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <LoadingTypewriter
            onEnterPortfolio={handleEnterPortfolio}
            theme={themes[currentTheme]}
          />
        </motion.div>
      </div>

      {/* Animated corner elements */}
      <motion.div
        className={`absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2 ${themes[currentTheme].intro.borders}`}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2 ${themes[currentTheme].intro.borders}`}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </motion.div>
  );

  // Validate email
  const isValidEmail = (email: string) =>
    /[^\s@]+@[^\s@]+\.[^\s@]+/.test(email);

  // Handle contact form submit
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!formName.trim() || !formEmail.trim() || !formMessage.trim()) {
      setFormError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(formEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const endpoint =
        (import.meta as any).env?.VITE_FORMSPREE_ENDPOINT ||
        (import.meta as any).env?.VITE_FORM_ENDPOINT ||
        "";
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName,
            email: formEmail,
            message: formMessage,
          }),
        });
        if (!res.ok) throw new Error("Failed to send message");
        setFormSuccess("Thanks! Your message has been sent.");
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      } else {
        // Fallback to mailto
        const subject = encodeURIComponent(
          `Portfolio Contact from ${formName}`
        );
        const body = encodeURIComponent(
          `Name: ${formName}\nEmail: ${formEmail}\n\n${formMessage}`
        );
        window.location.href = `mailto:Michael.Ogunrinde@outlook.com?subject=${subject}&body=${body}`;
        setFormSuccess("Opening your email client...");
      }
    } catch (err) {
      setFormError("Sorry, something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${themes[currentTheme].main.background} ${themes[currentTheme].main.text} relative overflow-x-hidden`}
    >
      {/* Container for overlapping content */}
      <div className="relative w-full h-full">
        {/* Loading Screen with exit animation */}
        <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

        {/* Main Content with entry animation */}
        <AnimatePresence>
          {showMainContent && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              initial={{
                opacity: 0,
                y: 50,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
                delay: 0.2, // Small delay after intro exits
              }}
            >
              <ProfessionalBackground />

              {/* Mobile-Friendly Theme Selector */}
              <div
                className="fixed bottom-6 right-6 z-[60]"
                data-theme-selector
              >
                {/* Theme Toggle Button */}
                <motion.button
                  onClick={() => setIsThemeSelectorOpen(!isThemeSelectorOpen)}
                  className={`p-3 rounded-full bg-gradient-to-r ${
                    themes[currentTheme].main.button
                  } text-white border ${
                    themes[currentTheme].main.border
                  } shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-${themes[
                    currentTheme
                  ].main.accentText.replace("text-", "")}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Palette className="w-5 h-5" />
                </motion.button>{" "}
                {/* Theme Palette Panel */}
                <AnimatePresence>
                  {isThemeSelectorOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`absolute bottom-16 right-0 bg-gradient-to-br ${themes[currentTheme].intro.background} rounded-xl shadow-lg border ${themes[currentTheme].intro.borders} p-3 sm:p-4 backdrop-blur-md w-auto sm:min-w-[200px] sm:max-w-[320px]`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className={`text-sm font-semibold ${themes[currentTheme].intro.text} hidden sm:block bg-gradient-to-r bg-clip-text text-transparent`}
                        >
                          Choose Theme
                        </h3>
                        <button
                          onClick={() => setIsThemeSelectorOpen(false)}
                          className={`p-1 rounded-full hover:bg-white/10 transition-colors ${themes[currentTheme].intro.accent} ml-auto`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex sm:hidden flex-col gap-2 items-center">
                        {Object.entries(themes).map(([key, theme]) => (
                          <motion.button
                            key={key}
                            onClick={() => {
                              setCurrentTheme(key as keyof typeof themes);
                              setIsThemeSelectorOpen(false);
                            }}
                            className={`w-8 h-8 rounded-full transition-all duration-200 border-2 ${
                              currentTheme === key
                                ? "border-blue-500 shadow-md"
                                : `border-transparent hover:border-${themes[
                                    currentTheme
                                  ].main.accentText.replace("text-", "")}/50`
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={theme.name}
                          >
                            <div
                              className={`w-full h-full rounded-full ${
                                key === "blue"
                                  ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                  : key === "emerald"
                                  ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                                  : key === "sunset"
                                  ? "bg-gradient-to-r from-orange-500 to-red-600"
                                  : key === "purple"
                                  ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                                  : "bg-gradient-to-r from-gray-500 to-slate-600"
                              }`}
                            />
                          </motion.button>
                        ))}
                      </div>

                      {/* Desktop layout with names */}
                      <div className="hidden sm:grid grid-cols-2 gap-2">
                        {Object.entries(themes).map(([key, theme]) => (
                          <motion.button
                            key={key}
                            onClick={() => {
                              setCurrentTheme(key as keyof typeof themes);
                              setIsThemeSelectorOpen(false);
                            }}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                              currentTheme === key
                                ? `border-blue-500 ${themes[currentTheme].main.card} shadow-md`
                                : `${themes[currentTheme].main.border} ${themes[currentTheme].main.cardHover}`
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className={`w-4 h-4 rounded-full ${
                                  key === "blue"
                                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                                    : key === "emerald"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-600"
                                    : key === "sunset"
                                    ? "bg-gradient-to-r from-orange-500 to-red-600"
                                    : key === "purple"
                                    ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                                    : "bg-gradient-to-r from-gray-500 to-slate-600"
                                }`}
                              />
                              <span
                                className={`text-xs font-medium ${themes[currentTheme].main.text}`}
                              >
                                {theme.name}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Modern Navigation */}
              <nav
                className={`fixed top-0 left-0 right-0 z-50 ${themes[currentTheme].main.nav} backdrop-blur-xl border-b ${themes[currentTheme].main.border} shadow-lg shadow-black/5`}
              >
                <div className="max-w-7xl mx-auto px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${themes[currentTheme].main.accent} bg-clip-text text-transparent`}
                    >
                      Michael Ogunrinde
                    </div>
                    <div
                      className={`hidden md:flex gap-1 ${themes[currentTheme].main.card}/80 backdrop-blur-sm rounded-full p-1 border ${themes[currentTheme].main.border}`}
                    >
                      {["About", "Experience", "Skills", "Contact"].map(
                        (item) => {
                          const isActive = activeSection === item.toLowerCase();

                          let navItemClass =
                            "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ";

                          if (isActive) {
                            navItemClass += `${themes[currentTheme].main.card} ${themes[currentTheme].main.accentText} shadow-sm`;
                          } else {
                            navItemClass += `${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} hover:bg-white/50`;
                          }

                          return (
                            <a
                              key={item}
                              href={`#${item.toLowerCase()}`}
                              className={navItemClass}
                            >
                              {item}
                            </a>
                          );
                        }
                      )}
                    </div>
                    <a
                      href={`${import.meta.env.BASE_URL}cv/CV.pdf`}
                      download="Michael-Ogunrinde-CV.pdf"
                      className={`px-6 py-3 bg-gradient-to-r ${themes[currentTheme].main.button} text-white rounded-full font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5`}
                    >
                      <Download className="w-4 h-4" />
                      Download CV
                    </a>
                  </div>
                </div>
              </nav>

              {/* Modern Hero Section */}
              <section
                id="hero"
                className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden"
              >
                {/* Hero section inherits background from main container */}

                {/* Animated gradient orbs */}
                <div
                  className={`absolute top-1/4 left-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    currentTheme === "blue"
                      ? "bg-gradient-to-r from-blue-400/10 to-indigo-400/10"
                      : currentTheme === "emerald"
                      ? "bg-gradient-to-r from-emerald-400/10 to-teal-400/10"
                      : currentTheme === "sunset"
                      ? "bg-gradient-to-r from-orange-400/10 to-red-400/10"
                      : currentTheme === "purple"
                      ? "bg-gradient-to-r from-purple-400/10 to-indigo-400/10"
                      : "bg-gradient-to-r from-gray-400/10 to-slate-400/10"
                  }`}
                ></div>
                <div
                  className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse ${
                    currentTheme === "blue"
                      ? "bg-gradient-to-r from-indigo-400/10 to-blue-400/10"
                      : currentTheme === "emerald"
                      ? "bg-gradient-to-r from-teal-400/10 to-cyan-400/10"
                      : currentTheme === "sunset"
                      ? "bg-gradient-to-r from-red-400/10 to-pink-400/10"
                      : currentTheme === "purple"
                      ? "bg-gradient-to-r from-indigo-400/10 to-blue-400/10"
                      : "bg-gradient-to-r from-slate-400/10 to-gray-400/10"
                  }`}
                  style={{ animationDelay: "2s" }}
                ></div>

                {/* Programming background for hero section only */}
                <HeroProgrammingBackground />

                {/* Modern grid pattern */}
                <div
                  className="absolute inset-0 opacity-[0.02] pointer-events-none"
                  style={{
                    backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
                    backgroundSize: "40px 40px",
                  }}
                ></div>

                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                  <div data-animate id="hero-content">
                    {/* Modern profile section */}
                    <div className="relative mb-12">
                      <div className="w-40 h-40 mx-auto mb-8 relative">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${themes[currentTheme].main.accent} rounded-full animate-spin-slow`}
                        ></div>
                        <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-2xl">
                          <img
                            src={`${
                              import.meta.env.BASE_URL
                            }images/image1.jpeg`}
                            alt="Michael Ogunrinde"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="128" height="128" fill="#3B82F6"/>
                          <circle cx="64" cy="45" r="20" fill="white"/>
                          <path d="M30 100c0-18.8 15.2-34 34-34s34 15.2 34 34v10H30v-10z" fill="white"/>
                        </svg>
                      `)}`;
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Modern typography */}
                    <div className="space-y-6 mb-12">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 ${themes[currentTheme].main.card} ${themes[currentTheme].main.accentText} rounded-full text-sm font-medium mb-4 border ${themes[currentTheme].main.border}`}
                      >
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Available for opportunities
                      </div>

                      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
                        <span
                          className={`bg-gradient-to-r ${themes[currentTheme].main.accent} bg-clip-text text-transparent`}
                        >
                          Michael
                        </span>
                        <br />
                        <span
                          className={`bg-gradient-to-r ${themes[currentTheme].main.accent} bg-clip-text text-transparent`}
                        >
                          Ogunrinde
                        </span>
                      </h1>

                      <div className="space-y-4">
                        <p
                          className={`text-xl md:text-2xl font-semibold ${themes[currentTheme].main.textMuted}`}
                        >
                          AI Engineer & Full-Stack Developer
                        </p>

                        <p
                          className={`text-base ${themes[currentTheme].main.textMuted} max-w-3xl mx-auto leading-relaxed`}
                        >
                          Building intelligent systems that solve real business
                          problems. I create custom AI models and integrate them
                          into practical applications - from personalized
                          learning platforms to enterprise solutions that drive
                          measurable impact.
                        </p>
                      </div>
                    </div>

                    {/* Modern CTA buttons */}
                    <div
                      className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-1200 ${
                        isLoading
                          ? "opacity-0 transform translate-y-12"
                          : "opacity-100 transform translate-y-0"
                      }`}
                    >
                      <a
                        href="#contact"
                        className={`group px-8 py-4 bg-gradient-to-r ${
                          themes[currentTheme].main.button
                        } text-white rounded-full font-medium transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themes[
                          currentTheme
                        ].main.accentText.replace("text-", "")}`}
                      >
                        <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Let's Connect
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href="#experience"
                        className={`group px-8 py-4 ${
                          themes[currentTheme].main.card
                        }/80 backdrop-blur-sm border ${
                          themes[currentTheme].main.border
                        } hover:border-${themes[
                          currentTheme
                        ].main.accentText.replace("text-", "")} ${
                          themes[currentTheme].main.textMuted
                        } hover:${
                          themes[currentTheme].main.accentText
                        } rounded-full font-medium transition-all duration-300 inline-flex items-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themes[
                          currentTheme
                        ].main.accentText.replace("text-", "")}`}
                      >
                        <Code className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Explore My Work
                      </a>
                    </div>

                    {/* Modern stats */}
                    <div
                      className={`grid grid-cols-3 gap-8 max-w-md mx-auto mb-12 transition-all duration-1000 delay-1400 ${
                        isLoading
                          ? "opacity-0 transform translate-y-12"
                          : "opacity-100 transform translate-y-0"
                      }`}
                    >
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${themes[currentTheme].main.accentText} mb-1`}
                        >
                          3+
                        </div>
                        <div className="text-sm text-gray-500">
                          Years Experience
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${themes[currentTheme].main.accentText} mb-1`}
                        >
                          6+
                        </div>
                        <div className="text-sm text-gray-500">
                          Projects Delivered
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${themes[currentTheme].main.accentText} mb-1`}
                        >
                          1st
                        </div>
                        <div className="text-sm text-gray-500">
                          Class Honours
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex justify-center gap-6 transition-all duration-1000 delay-1600 ${
                        isLoading
                          ? "opacity-0 transform translate-y-12"
                          : "opacity-100 transform translate-y-0"
                      }`}
                    >
                      <a
                        href="https://github.com/MichaelOguns?tab=repositories"
                        className={`${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} transition-colors duration-300`}
                        aria-label="GitHub"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/michael-ayomide-ogunrinde/"
                        className={`${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} transition-colors duration-300`}
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a
                        href="mailto:Michael.Ogunrinde@outlook.com"
                        className={`${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} transition-colors duration-300`}
                        aria-label="Email"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown
                      className={`w-6 h-6 ${themes[currentTheme].main.textMuted}`}
                    />
                  </div>
                </div>
              </section>
              {/* Modern About Section */}
              <section
                id="about"
                className="py-32 relative z-10 overflow-hidden"
              >
                <div className="max-w-6xl mx-auto px-6">
                  <div data-animate id="about-content">
                    <div className="text-center mb-20">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-2 ${themes[currentTheme].main.card} ${themes[currentTheme].main.accentText} rounded-full text-sm font-medium mb-6 border ${themes[currentTheme].main.border}`}
                      >
                        <User className="w-4 h-4" />
                        About Me
                      </div>
                      <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <span
                          className={`bg-gradient-to-r ${themes[currentTheme].main.accent} bg-clip-text text-transparent`}
                        >
                          Passionate About
                        </span>
                        <br />
                        <span
                          className={`bg-gradient-to-r ${themes[currentTheme].main.accent} bg-clip-text text-transparent`}
                        >
                          Innovation
                        </span>
                      </h2>
                      <div
                        className={`w-32 h-1 bg-gradient-to-r ${themes[currentTheme].main.accent} mx-auto rounded-full`}
                      ></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <h3
                          className={`text-xl font-bold ${themes[currentTheme].main.text} mb-6`}
                        >
                          Passionate About Innovation
                        </h3>
                        <p
                          className={`${themes[currentTheme].main.textMuted} mb-6 text-base leading-relaxed`}
                        >
                          As a recent Computer Science graduate with First Class
                          Honours, I bring a unique blend of academic excellence
                          and practical experience. My internship at Google
                          DeepMind provided invaluable insights into advanced AI
                          research, while my personal projects demonstrate my
                          ability to translate complex concepts into real-world
                          solutions.
                        </p>
                        <p className="text-gray-600 mb-6 text-base leading-relaxed">
                          I specialised in machine learning, full-stack
                          development, and creating intelligent systems that
                          solve meaningful problems. My approach combines
                          rigorous technical skills with creative
                          problem-solving to deliver impactful results.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                          <div
                            className={`text-center p-4 ${themes[currentTheme].main.card} rounded-lg ${themes[currentTheme].main.shadow} border ${themes[currentTheme].main.border}`}
                          >
                            <div
                              className={`text-2xl font-bold ${themes[currentTheme].main.accentText} mb-2`}
                            >
                              3+
                            </div>
                            <div
                              className={`text-sm ${themes[currentTheme].main.textMuted}`}
                            >
                              Years Experience
                            </div>
                          </div>
                          <div
                            className={`text-center p-4 ${themes[currentTheme].main.card} rounded-lg ${themes[currentTheme].main.shadow} border ${themes[currentTheme].main.border}`}
                          >
                            <div
                              className={`text-2xl font-bold ${themes[currentTheme].main.accentText} mb-2`}
                            >
                              10+
                            </div>
                            <div
                              className={`text-sm ${themes[currentTheme].main.textMuted}`}
                            >
                              Projects Completed
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3
                          className={`text-xl font-bold ${themes[currentTheme].main.text} mb-6`}
                        >
                          Key Achievements
                        </h3>
                        {achievements.map((achievement, _) => (
                          <div
                            key={_}
                            className={`flex items-start gap-4 p-4 ${
                              themes[currentTheme].main.card
                            } rounded-lg ${
                              themes[currentTheme].main.shadow
                            } border ${
                              themes[currentTheme].main.border
                            } hover:border-${themes[
                              currentTheme
                            ].main.accentText.replace(
                              "text-",
                              ""
                            )} transition-colors duration-300`}
                          >
                            <div className="flex-shrink-0">
                              <Award
                                className={`w-6 h-6 ${themes[currentTheme].main.accentText}`}
                              />
                            </div>
                            <div>
                              <h4
                                className={`font-semibold ${themes[currentTheme].main.text} mb-1`}
                              >
                                {achievement.title}
                              </h4>
                              <p
                                className={`${themes[currentTheme].main.textMuted} text-sm mb-2`}
                              >
                                {achievement.description}
                              </p>
                              <span
                                className={`text-xs ${themes[currentTheme].main.accentText} font-medium`}
                              >
                                {achievement.year}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience Section */}
              <section id="experience" className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                  <div data-animate id="experience-content">
                    <div className="text-center mb-16">
                      <h2
                        className={`text-4xl font-extrabold ${themes[currentTheme].main.text} mb-4`}
                      >
                        Professional Journey
                      </h2>
                      <div
                        className={`w-24 h-1 bg-gradient-to-r ${themes[currentTheme].main.accent} mx-auto mb-6 rounded-full`}
                      ></div>
                      <p
                        className={`${themes[currentTheme].main.textMuted} max-w-2xl mx-auto text-base`}
                      >
                        Explore my professional experience across different
                        areas of expertise
                      </p>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                      {[
                        { key: "all", label: "All", icon: "🌟" },
                        {
                          key: "experience",
                          label: "Work Experience",
                          icon: "💼",
                        },
                        { key: "education", label: "Education", icon: "🎓" },
                        { key: "project", label: "Projects", icon: "🚀" },
                        {
                          key: "achievement",
                          label: "Achievements",
                          icon: "🏆",
                        },
                      ].map((category) => (
                        <button
                          key={category.key}
                          onClick={() => setActiveCategory(category.key)}
                          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                            activeCategory === category.key
                              ? `bg-gradient-to-r ${themes[currentTheme].main.button} text-white shadow-md`
                              : `${themes[currentTheme].main.card} ${
                                  themes[currentTheme].main.textMuted
                                } ${
                                  themes[currentTheme].main.cardHover
                                } hover:${
                                  themes[currentTheme].main.accentText
                                } border ${
                                  themes[currentTheme].main.border
                                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themes[
                                  currentTheme
                                ].main.accentText.replace("text-", "")}`
                          }`}
                        >
                          <span>{category.icon}</span>
                          <span>{category.label}</span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              activeCategory === category.key
                                ? "bg-white/20 text-white"
                                : `${themes[currentTheme].main.card} ${themes[currentTheme].main.textMuted} border ${themes[currentTheme].main.border}`
                            }`}
                          >
                            {category.key === "all"
                              ? experiences.length
                              : experiences.filter(
                                  (exp) => exp.category === category.key
                                ).length}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Experience Cards - Scrollable Container */}
                    <div className="max-h-[800px] overflow-y-auto pr-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {experiences
                        .filter(
                          (exp) =>
                            activeCategory === "all" ||
                            exp.category === activeCategory
                        )
                        .map((experience, _) => (
                          <div
                            key={experience.id}
                            className={`${
                              themes[currentTheme].main.card
                            } rounded-xl ${
                              themes[currentTheme].main.shadow
                            } border ${
                              themes[currentTheme].main.border
                            } overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-${themes[
                              currentTheme
                            ].main.accentText.replace(
                              "text-",
                              ""
                            )} focus-within:ring-2 focus-within:ring-${themes[
                              currentTheme
                            ].main.accentText.replace(
                              "text-",
                              ""
                            )} focus-within:ring-offset-2 focus-within:ring-offset-${
                              themes[currentTheme].main.background
                                .split(" ")[0]
                                .split("-")[2]
                            }`}
                            data-animate
                            id={`experience-${experience.id}`}
                          >
                            <div className="md:flex">
                              <div className="md:w-1/3">
                                <div className="h-64 md:h-full relative overflow-hidden">
                                  <img
                                    src={experience.image}
                                    alt={experience.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="400" height="300" fill="#F8FAFC"/>
                                <rect x="150" y="100" width="100" height="100" rx="8" fill="#E2E8F0"/>
                                <circle cx="200" cy="130" r="15" fill="#94A3B8"/>
                                <path d="M175 160h50l-10 20h-30l-10-20z" fill="#94A3B8"/>
                              </svg>
                            `)}`;
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                                </div>
                              </div>
                              <div className="md:w-2/3 p-8">
                                <div className="flex items-center gap-3 mb-4">
                                  <div
                                    className={`flex-shrink-0 w-10 h-10 ${themes[currentTheme].main.card} rounded-lg flex items-center justify-center border ${themes[currentTheme].main.border}`}
                                  >
                                    {experience.category === "experience" && (
                                      <Briefcase
                                        className={`w-5 h-5 ${themes[currentTheme].main.accentText}`}
                                      />
                                    )}
                                    {experience.category === "education" && (
                                      <GraduationCap
                                        className={`w-5 h-5 ${themes[currentTheme].main.accentText}`}
                                      />
                                    )}
                                    {experience.category === "project" && (
                                      <Code
                                        className={`w-5 h-5 ${themes[currentTheme].main.accentText}`}
                                      />
                                    )}
                                    {experience.category === "achievement" && (
                                      <Award
                                        className={`w-5 h-5 ${themes[currentTheme].main.accentText}`}
                                      />
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <h3
                                        className={`text-xl font-semibold ${themes[currentTheme].main.text} flex items-center gap-2`}
                                      >
                                        {experience.title}
                                        {experience.featured && (
                                          <span
                                            className="text-yellow-500"
                                            title="Featured"
                                          >
                                            ⭐
                                          </span>
                                        )}
                                      </h3>
                                      <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                                          experience.category === "experience"
                                            ? "bg-green-100 text-green-700"
                                            : experience.category ===
                                              "education"
                                            ? "bg-purple-100 text-purple-700"
                                            : experience.category === "project"
                                            ? "bg-blue-100 text-blue-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}
                                      >
                                        {experience.category
                                          .charAt(0)
                                          .toUpperCase() +
                                          experience.category.slice(1)}
                                      </span>
                                    </div>
                                    <p
                                      className={`text-sm ${themes[currentTheme].main.textMuted}`}
                                    >
                                      {experience.year} • {experience.duration}
                                    </p>
                                  </div>
                                </div>

                                <p
                                  className={`${themes[currentTheme].main.textMuted} mb-6 leading-relaxed`}
                                >
                                  {experience.description}
                                </p>

                                {experience.impact && (
                                  <div
                                    className={`mb-6 p-4 ${themes[currentTheme].main.card} border ${themes[currentTheme].main.border} rounded-lg`}
                                  >
                                    <div className="flex items-center gap-2 mb-2">
                                      <Target
                                        className={`w-4 h-4 ${themes[currentTheme].main.accentText}`}
                                      />
                                      <span
                                        className={`text-sm font-medium ${themes[currentTheme].main.accentText}`}
                                      >
                                        Impact
                                      </span>
                                    </div>
                                    <p
                                      className={`text-sm ${themes[currentTheme].main.textMuted}`}
                                    >
                                      {experience.impact}
                                    </p>
                                  </div>
                                )}

                                <div className="mb-6">
                                  <h4
                                    className={`text-sm font-medium ${themes[currentTheme].main.text} mb-3`}
                                  >
                                    {experience.category === "education"
                                      ? "Subjects & Skills"
                                      : "Technologies Used"}
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {experience.tech.slice(0, 6).map((tech) => (
                                      <span
                                        key={tech}
                                        className={`px-3 py-1 ${themes[currentTheme].main.card} ${themes[currentTheme].main.accentText} text-xs font-medium rounded-full border ${themes[currentTheme].main.border}`}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                    {experience.tech.length > 6 && (
                                      <span
                                        className={`px-3 py-1 ${themes[currentTheme].main.card} ${themes[currentTheme].main.textMuted} text-xs font-medium rounded-full border ${themes[currentTheme].main.border}`}
                                      >
                                        +{experience.tech.length - 6} more
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                  {experience.demo && (
                                    <a
                                      href={experience.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themes[currentTheme].main.button} text-white text-sm font-medium rounded-lg transition-colors duration-300`}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Live Demo
                                    </a>
                                  )}
                                  {experience.github && (
                                    <a
                                      href={experience.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-2 px-4 py-2 border ${themes[currentTheme].main.border} hover:${themes[currentTheme].main.accentText} ${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} text-sm font-medium rounded-lg transition-colors duration-300`}
                                    >
                                      <Github className="w-4 h-4" />
                                      Source Code
                                    </a>
                                  )}
                                  {experience.video && (
                                    <a
                                      href={experience.video.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-2 px-4 py-2 border ${themes[currentTheme].main.border} hover:${themes[currentTheme].main.accentText} ${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} text-sm font-medium rounded-lg transition-colors duration-300`}
                                    >
                                      <Play className="w-4 h-4" />
                                      Demo Video
                                    </a>
                                  )}
                                  {experience.article && (
                                    <a
                                      href={experience.article}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-2 px-4 py-2 border ${themes[currentTheme].main.border} hover:${themes[currentTheme].main.accentText} ${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} text-sm font-medium rounded-lg transition-colors duration-300`}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                      Article
                                    </a>
                                  )}
                                  {experience.poster && (
                                    <a
                                      href={`${
                                        import.meta.env.BASE_URL
                                      }posters/${experience.poster}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={`inline-flex items-center gap-2 px-4 py-2 border ${themes[currentTheme].main.border} hover:${themes[currentTheme].main.accentText} ${themes[currentTheme].main.textMuted} hover:${themes[currentTheme].main.accentText} text-sm font-medium rounded-lg transition-colors duration-300`}
                                    >
                                      <FileText className="w-4 h-4" />
                                      Research Paper
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section id="skills" className="py-20 relative z-10">
                <div className="max-w-6xl mx-auto px-6">
                  <div data-animate id="skills-content">
                    <div className="text-center mb-16">
                      <h2
                        className={`text-4xl font-extrabold ${themes[currentTheme].main.text} mb-4`}
                      >
                        Technical Expertise
                      </h2>
                      <div
                        className={`w-24 h-1 bg-gradient-to-r ${themes[currentTheme].main.accent} mx-auto mb-6 rounded-full`}
                      ></div>
                      <p
                        className={`${themes[currentTheme].main.textMuted} max-w-2xl mx-auto text-base`}
                      >
                        Skills developed through hands-on experience in real
                        projects and professional work
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {skillCategories.map((category, _) => (
                        <div
                          key={category.category}
                          className={`${
                            themes[currentTheme].main.card
                          } p-6 rounded-xl ${
                            themes[currentTheme].main.shadow
                          } border ${
                            themes[currentTheme].main.border
                          } transition-all duration-500 hover:shadow-xl hover:border-${themes[
                            currentTheme
                          ].main.accentText.replace("text-", "")}`}
                          data-animate
                          id={`skill-category-${_}`}
                          style={{
                            transitionDelay: `${_ * 100}ms`,
                          }}
                        >
                          <div className="flex items-center gap-3 mb-6">
                            <div
                              className={`flex-shrink-0 w-12 h-12 ${themes[currentTheme].main.card} rounded-lg flex items-center justify-center border ${themes[currentTheme].main.border}`}
                            >
                              <category.icon
                                className={`w-6 h-6 ${themes[currentTheme].main.accentText}`}
                              />
                            </div>
                            <h3
                              className={`text-lg font-semibold ${themes[currentTheme].main.text}`}
                            >
                              {category.category}
                            </h3>
                          </div>

                          <div className="space-y-4">
                            {category.skills.map((skill, _) => (
                              <div
                                key={skill.name}
                                className={`border-l-2 border-${themes[
                                  currentTheme
                                ].main.accentText.replace(
                                  "text-",
                                  ""
                                )}/20 pl-4`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <h4
                                    className={`font-medium ${themes[currentTheme].main.text}`}
                                  >
                                    {skill.name}
                                  </h4>
                                  <span
                                    className={`text-xs ${themes[currentTheme].main.card} ${themes[currentTheme].main.accentText} px-2 py-1 rounded-full border ${themes[currentTheme].main.border}`}
                                  >
                                    {skill.experience}
                                  </span>
                                </div>
                                <div
                                  className={`text-sm ${themes[currentTheme].main.textMuted} mb-2`}
                                >
                                  <span className="font-medium">Used in:</span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {skill.projects.slice(0, 3).map((project) => (
                                    <span
                                      key={project}
                                      className={`text-xs ${themes[currentTheme].main.card} ${themes[currentTheme].main.textMuted} px-2 py-1 rounded-md border ${themes[currentTheme].main.border}`}
                                    >
                                      {project}
                                    </span>
                                  ))}
                                  {skill.projects.length > 3 && (
                                    <span
                                      className={`text-xs ${themes[currentTheme].main.card} ${themes[currentTheme].main.textMuted} px-2 py-1 rounded-md border ${themes[currentTheme].main.border}`}
                                    >
                                      +{skill.projects.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-20 relative z-10">
                <div className="max-w-4xl mx-auto px-6">
                  <div data-animate id="contact-content">
                    <div className="text-center mb-16">
                      <h2
                        className={`text-4xl font-extrabold ${themes[currentTheme].main.text} mb-4`}
                      >
                        Get In Touch
                      </h2>
                      <div
                        className={`w-24 h-1 bg-gradient-to-r ${themes[currentTheme].main.accent} mx-auto mb-6 rounded-full`}
                      ></div>
                      <p
                        className={`${themes[currentTheme].main.textMuted} max-w-2xl mx-auto text-base`}
                      >
                        I'm always interested in new opportunities and
                        collaborations. Let's discuss how we can work together.
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <div>
                        <h3
                          className={`text-xl font-bold ${themes[currentTheme].main.text} mb-6`}
                        >
                          Let's Connect
                        </h3>
                        <p
                          className={`${themes[currentTheme].main.textMuted} mb-8 text-base leading-relaxed`}
                        >
                          Whether you're looking for a talented developer, have
                          a project in mind, or just want to chat about
                          technology and innovation, I'd love to hear from you.
                        </p>

                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-12 h-12 ${themes[currentTheme].main.card} rounded-lg flex items-center justify-center border ${themes[currentTheme].main.border}`}
                            >
                              <Mail
                                className={`w-6 h-6 ${themes[currentTheme].main.accentText}`}
                              />
                            </div>
                            <div>
                              <p
                                className={`font-semibold ${themes[currentTheme].main.text}`}
                              >
                                Email
                              </p>
                              <a
                                href="mailto:Michael.Ogunrinde@outlook.com"
                                className={`${themes[currentTheme].main.accentText} hover:opacity-80 text-base`}
                              >
                                Michael.Ogunrinde@outlook.com
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-12 h-12 ${themes[currentTheme].main.card} rounded-lg flex items-center justify-center border ${themes[currentTheme].main.border}`}
                            >
                              <Linkedin
                                className={`w-6 h-6 ${themes[currentTheme].main.accentText}`}
                              />
                            </div>
                            <div>
                              <p
                                className={`font-semibold ${themes[currentTheme].main.text}`}
                              >
                                LinkedIn
                              </p>
                              <a
                                href="https://www.linkedin.com/in/michael-ayomide-ogunrinde/"
                                className={`${themes[currentTheme].main.accentText} hover:opacity-80 text-base`}
                              >
                                linkedin.com/in/michael-ayomide-ogunrinde/
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div
                              className={`flex-shrink-0 w-12 h-12 ${themes[currentTheme].main.card} rounded-lg flex items-center justify-center border ${themes[currentTheme].main.border}`}
                            >
                              <MapPin
                                className={`w-6 h-6 ${themes[currentTheme].main.accentText}`}
                              />
                            </div>
                            <div>
                              <p
                                className={`font-semibold ${themes[currentTheme].main.text}`}
                              >
                                Location
                              </p>
                              <p
                                className={`${themes[currentTheme].main.textMuted} text-base`}
                              >
                                Sheffield, UK
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`${themes[currentTheme].main.card} p-8 rounded-xl ${themes[currentTheme].main.shadow} border ${themes[currentTheme].main.border}`}
                      >
                        <form
                          className="space-y-6"
                          onSubmit={handleContactSubmit}
                        >
                          <div>
                            <label
                              htmlFor="name"
                              className={`block text-sm font-medium ${themes[currentTheme].main.text} mb-2`}
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              className={`w-full px-4 py-3 border ${themes[currentTheme].main.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${themes[currentTheme].main.card} ${themes[currentTheme].main.text}`}
                              placeholder="Your name"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="email"
                              className={`block text-sm font-medium ${themes[currentTheme].main.text} mb-2`}
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formEmail}
                              onChange={(e) => setFormEmail(e.target.value)}
                              className={`w-full px-4 py-3 border ${themes[currentTheme].main.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 ${themes[currentTheme].main.card} ${themes[currentTheme].main.text}`}
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>

                          <div>
                            <label
                              htmlFor="message"
                              className={`block text-sm font-medium ${themes[currentTheme].main.text} mb-2`}
                            >
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              rows={5}
                              value={formMessage}
                              onChange={(e) => setFormMessage(e.target.value)}
                              className={`w-full px-4 py-3 border ${themes[currentTheme].main.border} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300 resize-none ${themes[currentTheme].main.card} ${themes[currentTheme].main.text}`}
                              placeholder="Tell me about your project or opportunity..."
                              required
                            ></textarea>
                          </div>

                          {formError && (
                            <div className="text-red-600 text-sm">
                              {formError}
                            </div>
                          )}
                          {formSuccess && (
                            <div className="text-green-600 text-sm">
                              {formSuccess}
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 bg-gradient-to-r ${
                              themes[currentTheme].main.button
                            } text-white font-medium rounded-lg transition-colors duration-300 inline-flex items-center justify-center gap-2 ${
                              isSubmitting
                                ? "opacity-70 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <ArrowRight
                              className={`w-5 h-5 ${
                                isSubmitting ? "animate-pulse" : ""
                              }`}
                            />
                            {isSubmitting ? "Sending..." : "Send Message"}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <footer
                className={`py-12 ${
                  currentTheme === "dark" ? "bg-black" : "bg-gray-900"
                } text-white relative z-10`}
              >
                <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-4">
                      Michael Ogunrinde
                    </div>
                    <p className="text-gray-400 mb-6">
                      Computer Science Graduate & AI Researcher
                    </p>
                    <div className="flex justify-center gap-6 mb-8">
                      <a
                        href="https://github.com/MichaelOguns?tab=repositories"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        aria-label="GitHub"
                      >
                        <Github className="w-6 h-6" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/michael-ayomide-ogunrinde/"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="w-6 h-6" />
                      </a>
                      <a
                        href="mailto:Michael.Ogunrinde@outlook.com"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                        aria-label="Email"
                      >
                        <Mail className="w-6 h-6" />
                      </a>
                    </div>
                    <div className="border-t border-gray-800 pt-8">
                      <p className="text-gray-400 text-sm">
                        © 2025 Michael Ogunrinde. All rights reserved.
                      </p>
                    </div>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <SpeedInsights />
    </div>
  );
}

export default ProfessionalApp;
