import React, { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  Github,
  ExternalLink,
  Mail,
  Linkedin,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  Download,
  MapPin,
  Calendar,
  Award,
  Users,
  User,
  FileText,
  FileImage,
  Play,
  Zap,
  Target,
  Layers,
  Globe,
  Cpu,
  Database,
  Cloud,
  Terminal,
} from "lucide-react";

// ML-Themed Particle Background Component
const MLParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear any existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle system configuration
    const particleCount = 120;
    const colors = [
      "#3b82f6", // Blue
      "#06b6d4", // Cyan
      "#8b5cf6", // Purple
      "#10b981", // Emerald
      "#f59e0b", // Amber
      "#ef4444", // Red
      "#ffffff", // White
    ];

    interface Particle {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      originalX: number;
      originalY: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      isForming: boolean;
      formationProgress: number;
      connectionStrength: number;
      pulsePhase: number;
    }

    interface Connection {
      from: number;
      to: number;
      strength: number;
      active: boolean;
    }

    // Robot/Neural Network formation patterns
    const formations = {
      robot: [
        // Head (rectangle-ish)
        { x: 0.5, y: 0.25, connections: [1, 2, 3, 4] },
        { x: 0.45, y: 0.2, connections: [0, 2] },
        { x: 0.55, y: 0.2, connections: [0, 1] },
        { x: 0.45, y: 0.3, connections: [0, 4] },
        { x: 0.55, y: 0.3, connections: [0, 3] },
        // Body center
        { x: 0.5, y: 0.45, connections: [0, 6, 7, 8, 9] },
        { x: 0.42, y: 0.4, connections: [5, 7] },
        { x: 0.58, y: 0.4, connections: [5, 6] },
        { x: 0.42, y: 0.5, connections: [5, 9] },
        { x: 0.58, y: 0.5, connections: [5, 8] },
        // Arms
        { x: 0.3, y: 0.45, connections: [6, 11] },
        { x: 0.2, y: 0.52, connections: [10] },
        { x: 0.7, y: 0.45, connections: [7, 13] },
        { x: 0.8, y: 0.52, connections: [12] },
        // Legs
        { x: 0.46, y: 0.65, connections: [8, 15] },
        { x: 0.44, y: 0.8, connections: [14] },
        { x: 0.54, y: 0.65, connections: [9, 17] },
        { x: 0.56, y: 0.8, connections: [16] },
      ],
      neuralNetwork: [
        // Input layer
        { x: 0.15, y: 0.25, connections: [3, 4, 5, 6] },
        { x: 0.15, y: 0.4, connections: [3, 4, 5, 6] },
        { x: 0.15, y: 0.55, connections: [3, 4, 5, 6] },
        // Hidden layer 1
        { x: 0.35, y: 0.2, connections: [7, 8, 9, 10] },
        { x: 0.35, y: 0.35, connections: [7, 8, 9, 10] },
        { x: 0.35, y: 0.5, connections: [7, 8, 9, 10] },
        { x: 0.35, y: 0.65, connections: [7, 8, 9, 10] },
        // Hidden layer 2
        { x: 0.55, y: 0.25, connections: [11, 12] },
        { x: 0.55, y: 0.375, connections: [11, 12] },
        { x: 0.55, y: 0.5, connections: [11, 12] },
        { x: 0.55, y: 0.625, connections: [11, 12] },
        // Output layer
        { x: 0.75, y: 0.35, connections: [] },
        { x: 0.75, y: 0.55, connections: [] },
      ],
      dataFlow: [
        // Data sources
        { x: 0.1, y: 0.3, connections: [3, 4] },
        { x: 0.1, y: 0.5, connections: [3, 4, 5] },
        { x: 0.1, y: 0.7, connections: [4, 5] },
        // Processing layer
        { x: 0.3, y: 0.25, connections: [6, 7] },
        { x: 0.3, y: 0.5, connections: [6, 7, 8] },
        { x: 0.3, y: 0.75, connections: [7, 8] },
        // Analysis nodes
        { x: 0.5, y: 0.2, connections: [9, 10] },
        { x: 0.5, y: 0.5, connections: [9, 10, 11] },
        { x: 0.5, y: 0.8, connections: [10, 11] },
        // Decision layer
        { x: 0.7, y: 0.35, connections: [12] },
        { x: 0.7, y: 0.55, connections: [12] },
        { x: 0.7, y: 0.65, connections: [12] },
        // Output
        { x: 0.9, y: 0.5, connections: [] },
      ],
      molecularStructure: [
        // Central atom
        { x: 0.5, y: 0.5, connections: [1, 2, 3, 4, 5, 6] },
        // Ring structure
        { x: 0.6, y: 0.4, connections: [0, 2, 7] },
        { x: 0.65, y: 0.55, connections: [0, 1, 3] },
        { x: 0.5, y: 0.7, connections: [0, 2, 4] },
        { x: 0.35, y: 0.55, connections: [0, 3, 5] },
        { x: 0.4, y: 0.4, connections: [0, 4, 6] },
        { x: 0.5, y: 0.3, connections: [0, 5, 1] },
        // Outer connections
        { x: 0.75, y: 0.3, connections: [1] },
        { x: 0.8, y: 0.65, connections: [2] },
        { x: 0.5, y: 0.85, connections: [3] },
        { x: 0.2, y: 0.65, connections: [4] },
        { x: 0.25, y: 0.3, connections: [5] },
        { x: 0.5, y: 0.15, connections: [6] },
      ],
    };

    const formationNames = Object.keys(
      formations
    ) as (keyof typeof formations)[];
    let currentFormation = 0;
    let formationTimer = 0;
    const formationDuration = 6000; // 6 seconds per formation
    const transitionDuration = 2000; // 2 seconds transition

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: Math.random() * canvas.width,
        targetY: Math.random() * canvas.height,
        originalX: Math.random() * canvas.width,
        originalY: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.5 + 1,
        isForming: false,
        formationProgress: 0,
        connectionStrength: 0,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const connections: Connection[] = [];

    const updateFormation = () => {
      const formationName =
        formationNames[currentFormation % formationNames.length];
      const formation = formations[formationName];
      connections.length = 0;

      // Assign particles to formation positions
      formation.forEach((point, index) => {
        if (index < particles.length) {
          const particle = particles[index];
          particle.targetX = point.x * canvas.width;
          particle.targetY = point.y * canvas.height;
          particle.isForming = true;
          particle.connectionStrength = 1;

          // Create connections
          point.connections.forEach((targetIndex) => {
            if (targetIndex < particles.length) {
              connections.push({
                from: index,
                to: targetIndex,
                strength: 0,
                active: true,
              });
            }
          });
        }
      });

      // Set remaining particles to wander
      for (let i = formation.length; i < particles.length; i++) {
        particles[i].isForming = false;
        particles[i].targetX = Math.random() * canvas.width;
        particles[i].targetY = Math.random() * canvas.height;
        particles[i].connectionStrength = 0;
      }
    };

    const disperseFormation = () => {
      particles.forEach((particle) => {
        particle.isForming = false;
        particle.targetX = Math.random() * canvas.width;
        particle.targetY = Math.random() * canvas.height;
        particle.connectionStrength = 0;
      });

      connections.forEach((connection) => {
        connection.active = false;
      });
    };

    // Initialize first formation
    updateFormation();

    const animate = () => {
      // Check if canvas and context are still valid
      if (!canvas || !ctx) return;

      // Properly clear the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Reset all canvas states to prevent accumulation
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";

      formationTimer += 16; // ~60fps

      // Handle formation transitions
      if (formationTimer >= formationDuration + transitionDuration) {
        currentFormation++;
        updateFormation();
        formationTimer = 0;
      } else if (formationTimer >= formationDuration) {
        // Disperse current formation
        if (formationTimer === formationDuration + 16) {
          disperseFormation();
        }
      }

      // Update particles
      particles.forEach((particle) => {
        const dx = particle.targetX - particle.x;
        const dy = particle.targetY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (particle.isForming && distance > 3) {
          // Smooth movement towards formation
          particle.x += dx * 0.025;
          particle.y += dy * 0.025;
          particle.formationProgress = Math.min(
            1,
            particle.formationProgress + 0.02
          );
        } else if (!particle.isForming) {
          // Free floating behavior
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.formationProgress = Math.max(
            0,
            particle.formationProgress - 0.015
          );

          // Boundary handling with smooth bounce
          if (particle.x < 0 || particle.x > canvas.width) {
            particle.vx *= -0.8;
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
          if (particle.y < 0 || particle.y > canvas.height) {
            particle.vy *= -0.8;
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }

          // Gentle attraction to new targets
          if (distance > 5) {
            particle.x += dx * 0.002;
            particle.y += dy * 0.002;
          }

          // Occasionally pick new targets
          if (Math.random() < 0.008) {
            particle.targetX = Math.random() * canvas.width;
            particle.targetY = Math.random() * canvas.height;
          }
        }

        particle.pulsePhase += 0.04;
      });

      // Update connections
      connections.forEach((connection) => {
        if (connection.active) {
          const fromParticle = particles[connection.from];
          const toParticle = particles[connection.to];

          if (fromParticle && toParticle) {
            const dx = toParticle.x - fromParticle.x;
            const dy = toParticle.y - fromParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Strengthen connection as particles get closer to formation
            const avgProgress =
              (fromParticle.formationProgress + toParticle.formationProgress) /
              2;
            connection.strength = Math.min(
              1,
              avgProgress * (250 / Math.max(distance, 40))
            );
          }
        } else {
          connection.strength = Math.max(0, connection.strength - 0.03);
        }
      });

      // Draw connections first (behind particles)
      connections.forEach((connection) => {
        if (connection.strength > 0.15) {
          const fromParticle = particles[connection.from];
          const toParticle = particles[connection.to];

          if (fromParticle && toParticle) {
            ctx.save(); // Save context state

            const gradient = ctx.createLinearGradient(
              fromParticle.x,
              fromParticle.y,
              toParticle.x,
              toParticle.y
            );

            const alpha = Math.floor(connection.strength * 100);
            gradient.addColorStop(
              0,
              fromParticle.color + alpha.toString(16).padStart(2, "0")
            );
            gradient.addColorStop(
              1,
              toParticle.color + alpha.toString(16).padStart(2, "0")
            );

            ctx.strokeStyle = gradient;
            ctx.lineWidth = connection.strength * 1.2;
            ctx.globalCompositeOperation = "lighter";
            ctx.globalAlpha = connection.strength * 0.8;

            ctx.beginPath();
            ctx.moveTo(fromParticle.x, fromParticle.y);
            ctx.lineTo(toParticle.x, toParticle.y);
            ctx.stroke();

            ctx.restore(); // Restore context state
          }
        }
      });

      // Draw particles with controlled effects
      particles.forEach((particle) => {
        ctx.save(); // Save context state for each particle

        const pulseSize = particle.size + Math.sin(particle.pulsePhase) * 0.3;
        const alpha = particle.isForming
          ? 0.8 + Math.sin(particle.pulsePhase) * 0.1
          : 0.4 + Math.sin(particle.pulsePhase) * 0.1;

        // Draw glow effect for forming particles only
        if (particle.isForming && particle.formationProgress > 0.5) {
          ctx.shadowColor = particle.color;
          ctx.shadowBlur = pulseSize * 2;
          ctx.globalAlpha = alpha * 0.4;

          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, pulseSize * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }

        // Reset shadow for core particle
        ctx.shadowBlur = 0;
        ctx.shadowColor = "transparent";
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;

        // Core particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fill();

        // Small inner highlight
        ctx.globalAlpha = alpha * 0.6;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(
          particle.x - pulseSize * 0.25,
          particle.y - pulseSize * 0.25,
          pulseSize * 0.2,
          0,
          Math.PI * 2
        );
        ctx.fill();

        ctx.restore(); // Restore context state
      });

      // Special effects for different formations
      const currentFormationName =
        formationNames[currentFormation % formationNames.length];

      // Neural network data pulses
      if (currentFormationName === "neuralNetwork") {
        connections.forEach((connection) => {
          if (connection.strength > 0.6 && Math.random() < 0.01) {
            const fromParticle = particles[connection.from];
            const toParticle = particles[connection.to];

            if (fromParticle && toParticle) {
              ctx.save();

              const t = Math.random();
              const pulseX =
                fromParticle.x + (toParticle.x - fromParticle.x) * t;
              const pulseY =
                fromParticle.y + (toParticle.y - fromParticle.y) * t;

              ctx.fillStyle = "#00ff88";
              ctx.shadowColor = "#00ff88";
              ctx.shadowBlur = 4;
              ctx.globalAlpha = 0.8;
              ctx.beginPath();
              ctx.arc(pulseX, pulseY, 1.5, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();
            }
          }
        });
      }

      // Data flow animation
      if (currentFormationName === "dataFlow") {
        connections.forEach((connection) => {
          if (connection.strength > 0.5 && Math.random() < 0.015) {
            const fromParticle = particles[connection.from];
            const toParticle = particles[connection.to];

            if (fromParticle && toParticle) {
              ctx.save();

              const t = 0.2 + Math.random() * 0.6;
              const flowX =
                fromParticle.x + (toParticle.x - fromParticle.x) * t;
              const flowY =
                fromParticle.y + (toParticle.y - fromParticle.y) * t;

              ctx.fillStyle = "#3b82f6";
              ctx.shadowColor = "#3b82f6";
              ctx.shadowBlur = 3;
              ctx.globalAlpha = 0.7;
              ctx.beginPath();
              ctx.arc(flowX, flowY, 1, 0, Math.PI * 2);
              ctx.fill();

              ctx.restore();
            }
          }
        });
      }

      // Store the animation frame ID and continue the loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start the animation
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      // Cancel animation frame on cleanup
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at 30% 20%, #0f0f23 0%, #0a0a14 50%, #000000 100%)",
      }}
    />
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

const projects: Project[] = [
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
    video: {
      url: "animation.mp4",
      isExternal: false,
    },
    poster: "3D-Trajectory-Deconfliction.pdf",
    year: "2024",
    category: "experience",
    impact: "60% path efficiency improvement",
    duration: "2 months",
    soloProject: true,
    featured: true,
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

const skills = [
  { name: "Python/FastAPI", level: 92, icon: Terminal },
  { name: "Machine Learning/AI", level: 88, icon: Cpu },
  { name: "React/JavaScript", level: 85, icon: Code },
  { name: "Database Systems", level: 90, icon: Database },
  { name: "PHP/Web Development", level: 82, icon: Globe },
  { name: "Docker/DevOps", level: 78, icon: Layers },
];

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.remove("theme-dark", "theme-light");
    document.body.classList.add(
      theme === "dark" ? "theme-dark" : "theme-light"
    );
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Determine active section
      const sections = ["hero", "about", "skills", "timeline", "contact"];
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

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "project":
        return <Code className="w-5 h-5" />;
      case "experience":
        return <Briefcase className="w-5 h-5" />;
      case "education":
        return <GraduationCap className="w-5 h-5" />;
      case "achievement":
        return <Award className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "project":
        return "from-blue-500 to-cyan-500";
      case "experience":
        return "from-emerald-500 to-teal-500";
      case "education":
        return "from-orange-500 to-red-500";
      case "achievement":
        return "from-yellow-500 to-amber-500";
      default:
        return "from-blue-500 to-cyan-500";
    }
  };

  const mouseParallaxX = (mousePosition.x - window.innerWidth / 2) * 0.02;
  const mouseParallaxY = (mousePosition.y - window.innerHeight / 2) * 0.02;

  return (
    <div
      className={`min-h-screen overflow-x-hidden relative bg-main text-main`}
    >
      {/* Theme Selector Dropdown */}
      <div className="fixed top-6 left-6 z-50 flex items-center gap-2">
        <label
          htmlFor="theme-select"
          className="text-sm text-muted font-medium"
        >
          Theme:
        </label>
        <select
          id="theme-select"
          value={theme}
          onChange={(e) => setTheme(e.target.value as "dark" | "light")}
          className="px-3 py-2 rounded-lg bg-section text-main border border-gray-700 focus:outline-none"
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      {/* ML-Themed Particle Background */}
      <MLParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              MO
            </div>
            <div className="hidden md:flex gap-8">
              {["About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.toLowerCase()
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item}
                </a>
              ))}
            </div>
            <a
              href={`${import.meta.env.BASE_URL}cv/CV.pdf`}
              download="Michael-Ogunrinde-CV.pdf"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors duration-300 inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download My CV
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          {/* Profile Image with 3D Frame */}
          <div className="relative mb-12 flex justify-center">
            <div
              className="relative transform-style-3d"
              style={{
                transform: `rotateX(${mouseParallaxY * 0.5}deg) rotateY(${
                  mouseParallaxX * 0.5
                }deg)`,
              }}
            >
              {/* 3D Frame layers */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md" />

              {/* Profile Image Container */}
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-800 shadow-2xl">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4E03AQGTYi4db1LpYw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1697993129490?e=1760572800&v=beta&t=4cr2p7X6N9qhdWOydp_qN-0ZRs0i1lAwlLFYl8OCZMQ"
                  alt="Michael Ogunrinde"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              </div>

              {/* Floating particles around image */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.cos((i * Math.PI) / 4) * 130 + 50}%`,
                    top: `${Math.sin((i * Math.PI) / 4) * 130 + 50}%`,
                    animationDelay: `${i * 0.4}s`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-70 shadow-lg shadow-blue-400/50" />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Michael Ogunrinde
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-4">
            Full-Stack Developer & Computer Science Graduate
          </p>

          <p className="text-lg text-blue-400 mb-8 font-medium">
            Specialising in AI/ML & Modern Web Technologies
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm border border-gray-700">
              <MapPin className="inline w-4 h-4 mr-2" />
              Sheffield, UK
            </span>
            <span className="px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-full text-sm border border-green-500/50">
              <Zap className="inline w-4 h-4 mr-2" />
              Available for hire
            </span>
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium border border-gray-700 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
          </div>

          <div className="flex justify-center gap-6">
            {[
              {
                icon: Github,
                href: "https://github.com/MichaelOguns?tab=repositories",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/michael-ayomide-ogunrinde/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:Michael.Ogunrinde@outlook.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110 group"
                aria-label={label}
              >
                <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-6 h-6 animate-bounce text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div
              data-animate
              id="about-text"
              className={`transform transition-all duration-1000 ${
                visibleItems.has("about-text")
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <h2 className="text-4xl font-bold mb-6">About Me</h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                I'm a passionate full-stack developer with a recent Computer
                Science degree and a strong foundation in modern web
                technologies and machine learning. My journey in tech has been
                driven by curiosity and a desire to create intelligent solutions
                that make a difference.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                With expertise spanning from front-end frameworks to AI/ML
                systems, and backend frameworks. I bring a balanced approach to
                software development, machine learning engineering, data
                sceince... I thrive in collaborative environments and am always
                eager to tackle new challenges that push the boundaries of
                what's possible with technology.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    3+
                  </div>
                  <div className="text-sm text-gray-400">
                    Years of Experience
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-green-500/50 transition-colors duration-300">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    10+
                  </div>
                  <div className="text-sm text-gray-400">
                    Projects Completed
                  </div>
                </div>
              </div>
            </div>

            <div
              data-animate
              id="about-visual"
              className={`transform transition-all duration-1000 ${
                visibleItems.has("about-visual")
                  ? "translate-x-0 opacity-100"
                  : "translate-x-20 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-3xl opacity-20" />
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                  <div className="grid grid-cols-3 gap-4">
                    {[Globe, Code, Cloud, Database, Cpu, Terminal].map(
                      (Icon, index) => (
                        <div
                          key={index}
                          className="aspect-square bg-gray-900/50 rounded-xl flex items-center justify-center hover:bg-gray-900/80 transition-all duration-300 group"
                        >
                          <Icon className="w-8 h-8 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative z-10 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Technical Skills
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                data-animate
                id={`skill-${index}`}
                className={`transform transition-all duration-700 ${
                  visibleItems.has(`skill-${index}`)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                        <skill.icon className="w-5 h-5 text-blue-400 group-hover:text-cyan-400 transition-colors duration-300" />
                      </div>
                      <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000"
                      style={{
                        width: visibleItems.has(`skill-${index}`)
                          ? `${skill.level}%`
                          : "0%",
                        transitionDelay: `${index * 100 + 300}ms`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="projects" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Projects & Experience
          </h2>

          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={project.id}
                data-animate
                id={`project-${project.id}`}
                className={`relative transform transition-all duration-1000 ${
                  visibleItems.has(`project-${project.id}`)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-20 opacity-0"
                }`}
              >
                {/* Year display - floating to the side */}
                <div
                  className={`absolute top-0 ${
                    index % 2 === 0
                      ? "left-0 lg:-left-20"
                      : "right-0 lg:-right-20"
                  } hidden lg:block`}
                >
                  <div className="text-6xl font-bold text-gray-800">
                    {project.year}
                  </div>
                </div>

                {/* Year for mobile - centered */}
                <div className="text-center mb-8 lg:hidden">
                  <div className="text-4xl font-bold text-gray-700">
                    {project.year}
                  </div>
                </div>

                {/* Project card */}
                <div className="max-w-5xl mx-auto">
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10">
                    <div
                      className={`grid md:grid-cols-2 gap-0 ${
                        index % 2 === 0 ? "" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Image Section */}
                      <div
                        className={`relative h-80 md:h-full overflow-hidden ${
                          index % 2 === 0 ? "" : "md:order-2"
                        }`}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />

                        {/* Category badge */}
                        <div className="absolute top-6 left-6">
                          <div
                            className={`p-3 bg-gradient-to-r ${getCategoryColor(
                              project.category
                            )} rounded-xl shadow-lg`}
                          >
                            {getCategoryIcon(project.category)}
                          </div>
                        </div>

                        {project.featured && (
                          <div className="absolute top-6 right-6 px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30 flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-yellow-400">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div
                        className={`p-8 md:p-10 flex flex-col justify-center ${
                          index % 2 === 0 ? "" : "md:order-1"
                        }`}
                      >
                        <div className="mb-4">
                          <span className="text-sm text-gray-400 uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        <h3 className="text-3xl font-bold mb-4">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Stats Grid */}
                        {(project.impact ||
                          project.duration ||
                          project.teamSize ||
                          project.soloProject) && (
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {project.impact && (
                              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                                <Target className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                <div className="text-xs text-gray-400">
                                  Impact
                                </div>
                                <div className="text-sm font-semibold text-green-400">
                                  {project.impact}
                                </div>
                              </div>
                            )}
                            {project.duration && (
                              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                                <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                <div className="text-xs text-gray-400">
                                  Duration
                                </div>
                                <div className="text-sm font-semibold text-blue-400">
                                  {project.duration}
                                </div>
                              </div>
                            )}
                            {project.teamSize && (
                              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                                <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                                <div className="text-xs text-gray-400">
                                  Team
                                </div>
                                <div className="text-sm font-semibold text-purple-400">
                                  {project.teamSize}
                                </div>
                              </div>
                            )}
                            {project.soloProject && (
                              <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                                <User className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                                <div className="text-xs text-gray-400">
                                  Solo
                                </div>
                                <div className="text-sm font-semibold text-orange-400">
                                  Dev
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-gray-900/50 rounded-full text-gray-300 border border-gray-700 hover:border-blue-500/50 transition-colors duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tech.length > 5 && (
                            <span className="px-3 py-1 text-xs bg-gray-900/50 rounded-full text-gray-400 border border-gray-700">
                              +{project.tech.length - 5} more
                            </span>
                          )}
                        </div>

                        {/* Actions */}
                        {(project.github ||
                          project.demo ||
                          project.article ||
                          project.poster ||
                          project.video) && (
                          <div className="flex gap-4">
                            {project.github && (
                              <a
                                href={project.github}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all duration-300 text-sm group"
                              >
                                <Github className="w-4 h-4 group-hover:text-blue-400 transition-colors duration-300" />
                                View Code
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm group"
                              >
                                <ExternalLink className="w-4 h-4 group-hover:text-cyan-400 transition-colors duration-300" />
                                Live Demo
                              </a>
                            )}
                            {project.article && (
                              <a
                                href={project.article}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-lg hover:bg-green-500/30 transition-all duration-300 text-sm group"
                              >
                                <FileText className="w-4 h-4 group-hover:text-green-400 transition-colors duration-300" />
                                Read Article
                              </a>
                            )}
                            {project.poster && (
                              <a
                                href={`${import.meta.env.BASE_URL}posters/${
                                  project.poster
                                }`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-lg hover:bg-purple-500/30 transition-all duration-300 text-sm group"
                              >
                                <FileImage className="w-4 h-4 group-hover:text-purple-400 transition-colors duration-300" />
                                View Poster
                              </a>
                            )}
                            {project.video && (
                              <a
                                href={
                                  project.video.isExternal
                                    ? project.video.url
                                    : `${import.meta.env.BASE_URL}videos/${
                                        project.video.url
                                      }`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg hover:bg-red-500/30 transition-all duration-300 text-sm group"
                              >
                                <Play className="w-4 h-4 group-hover:text-red-400 transition-colors duration-300" />
                                Watch Video
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative z-10 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm always interested in hearing about new opportunities and
            exciting projects involving AI, ML, and cutting-edge web
            technologies.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="mailto:Michael.Ogunrinde@outlook.com"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-500/25"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            <a
              href={`${import.meta.env.BASE_URL}cv/CV.pdf`}
              download="Michael-Ogunrinde-CV.pdf"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium border border-gray-700 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>

          <div className="flex justify-center gap-6">
            {[
              {
                icon: Github,
                href: "https://github.com/MichaelOguns?tab=repositories",
                label: "GitHub",
              },
              {
                icon: Linkedin,
                href: "https://www.linkedin.com/in/michael-ayomide-ogunrinde/",
                label: "LinkedIn",
              },
              {
                icon: Mail,
                href: "mailto:Michael.Ogunrinde@outlook.com",
                label: "Email",
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110 group"
                aria-label={label}
              >
                <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-300" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>
            © 2025 Michael Ogunrinde. Built with React, TypeScript, and Tailwind
            CSS.
          </p>
          <p className="mt-2 text-xs">
            Background animations powered by intelligent particle systems
          </p>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="relative w-1 h-32 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
            style={{
              height: `${Math.min(
                100,
                (scrollY / (document.body.scrollHeight - window.innerHeight)) *
                  100
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-8 p-4 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition-all duration-300 z-40 ${
          scrollY > 300
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ChevronDown className="w-5 h-5 transform rotate-180" />a
      </button>
    </div>
  );
}

export default App;
