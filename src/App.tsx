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
  Zap,
  Target,
  Layers,
  Globe,
  Cpu,
  Database,
  Cloud,
  Terminal,
} from "lucide-react";
import ThreeDCubeCanvas from "./ThreeDCubeCanvas";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  year: string;
  category: "project" | "education" | "experience" | "achievement";
  featured?: boolean;
  impact?: string;
  duration?: string;
  teamSize?: number;
}

const projects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Task Management Platform",
    description:
      "Revolutionary full-stack application leveraging machine learning for intelligent task prioritization, automated scheduling, and productivity insights. Features real-time collaboration, natural language processing for task creation, and predictive analytics.",
    tech: [
      "React",
      "Node.js",
      "TensorFlow.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Socket.io",
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    year: "2024",
    category: "project",
    featured: true,
    impact: "40% productivity increase for beta users",
    duration: "6 months",
    teamSize: 4,
  },
  {
    id: "2",
    title: "Computer Science Graduation",
    description:
      "Bachelor of Science in Computer Science with Magna Cum Laude honors. Specialized in Artificial Intelligence, Software Engineering, and Distributed Systems. Completed advanced coursework in machine learning, algorithms, and system design.",
    tech: [
      "Machine Learning",
      "Algorithms",
      "System Design",
      "Software Engineering",
      "Database Systems",
      "Computer Networks",
    ],
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    year: "2024",
    category: "education",
    impact: "GPA: 3.9/4.0",
    duration: "4 years",
  },
  {
    id: "3",
    title: "Dean's List Achievement",
    description:
      "Recognized for academic excellence with consistent placement on the Dean's List for outstanding scholastic achievement. Maintained top 5% class ranking throughout final two years.",
    tech: ["Academic Excellence", "Leadership", "Research"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
    year: "2024",
    category: "achievement",
    impact: "Top 5% of graduating class",
  },
  {
    id: "4",
    title: "Real-time Collaborative Platform",
    description:
      "Scalable real-time messaging and collaboration platform with end-to-end encryption, file sharing, video conferencing, and advanced security features. Architected to handle 10,000+ concurrent users with sub-100ms latency.",
    tech: [
      "React",
      "Socket.io",
      "Redis",
      "WebRTC",
      "AWS",
      "Kubernetes",
      "MongoDB",
    ],
    github: "#",
    demo: "#",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
    year: "2023",
    category: "project",
    featured: true,
    impact: "10,000+ concurrent users supported",
    duration: "8 months",
    teamSize: 6,
  },
  {
    id: "5",
    title: "Senior Software Engineer Intern",
    description:
      "Led development of microservices architecture for e-commerce platform at TechCorp. Optimized API performance by 60%, implemented CI/CD pipelines, and mentored junior developers. Contributed to cloud migration strategy.",
    tech: [
      "Java",
      "Spring Boot",
      "Kubernetes",
      "AWS",
      "MongoDB",
      "Jenkins",
      "Docker",
    ],
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800",
    year: "2023",
    category: "experience",
    impact: "60% API performance improvement",
    duration: "6 months",
    teamSize: 12,
  },
];

const skills = [
  { name: "React/TypeScript", level: 95, icon: Code },
  { name: "Node.js/Python", level: 90, icon: Terminal },
  { name: "Machine Learning", level: 85, icon: Cpu },
  { name: "Cloud Architecture", level: 88, icon: Cloud },
  { name: "Database Design", level: 92, icon: Database },
  { name: "DevOps/CI/CD", level: 80, icon: Layers },
];

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("hero");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Animated background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Smaller particles, random group sizes
    const particleCount = 120;
    const groupSizes = [6, 5]; // 6 for flower, 5 for fish
    const colors = [
      "#3b82f6",
      "#a78bfa",
      "#06b6d4",
      "#f472b6",
      "#f59e42",
      "#22d3ee",
    ];

    type Particle = {
      x: number;
      y: number;
      tx: number;
      ty: number;
      vx: number;
      vy: number;
      color: string;
      folded: boolean;
      group: number;
      groupSize: number;
    };

    // Create particles and assign to random groups
    const particles: Particle[] = [];
    let group = 0;
    let i = 0;
    while (i < particleCount) {
      const groupSize =
        groupSizes[Math.floor(Math.random() * groupSizes.length)];
      for (let j = 0; j < groupSize && i < particleCount; j++, i++) {
        // Each particle gets a random folded position anywhere on the canvas
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          tx: Math.random() * canvas.width,
          ty: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: colors[i % colors.length],
          folded: false,
          group,
          groupSize,
        });
      }
      group++;
    }

    function foldGroup(group: number, fold: boolean) {
      particles.forEach((p) => {
        if (p.group === group) {
          p.folded = fold;
        }
      });
    }

    function origamiWave() {
      for (let g = 0; g < group; g++) {
        setTimeout(() => foldGroup(g, true), g * 100);
        setTimeout(() => foldGroup(g, false), g * 100 + 500);
      }
    }

    let lastWave = Date.now();

    function drawFlower(
      ctx: CanvasRenderingContext2D,
      groupParticles: Particle[]
    ) {
      // Draw petals
      groupParticles.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      // Draw center
      const center = groupParticles[0];
      ctx.beginPath();
      ctx.arc(center.tx, center.ty, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.shadowColor = center.color;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    function drawFish(
      ctx: CanvasRenderingContext2D,
      groupParticles: Particle[]
    ) {
      // Body (ellipse)
      const body = groupParticles[0];
      ctx.save();
      ctx.translate(body.tx, body.ty);
      ctx.rotate(Math.random() * Math.PI * 2);
      ctx.beginPath();
      ctx.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = body.color;
      ctx.globalAlpha = 0.8;
      ctx.fill();
      ctx.globalAlpha = 1;
      // Tail (triangle)
      ctx.beginPath();
      ctx.moveTo(7, 0);
      ctx.lineTo(18, -7);
      ctx.lineTo(18, 7);
      ctx.closePath();
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move particles
      particles.forEach((p) => {
        if (p.folded) {
          p.x += (p.tx - p.x) * 0.08;
          p.y += (p.ty - p.y) * 0.08;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }
      });

      // Draw animal/flower shapes
      for (let g = 0; g < group; g++) {
        const groupParticles = particles.filter((p) => p.group === g);
        if (groupParticles.length === groupParticles[0]?.groupSize) {
          if (groupParticles.length === 6) {
            drawFlower(ctx, groupParticles);
          } else if (groupParticles.length === 5) {
            drawFish(ctx, groupParticles);
          }
        }
      }

      // Draw particles (smaller)
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Trigger origami wave every 3 seconds
      if (Date.now() - lastWave > 3000) {
        origamiWave();
        lastWave = Date.now();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

      {/* Quantum Entanglement Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0" />

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
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors duration-300">
              Resume
            </button>
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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
              </div>

              {/* Floating particles around image */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${Math.cos((i * Math.PI) / 3) * 120 + 50}%`,
                    top: `${Math.sin((i * Math.PI) / 3) * 120 + 50}%`,
                    animationDelay: `${i * 0.5}s`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full opacity-60" />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            John Doe
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Full-Stack Developer & Computer Science Graduate
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <span className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm border border-gray-700">
              <MapPin className="inline w-4 h-4 mr-2" />
              San Francisco, CA
            </span>
            <span className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full text-sm border border-gray-700">
              <Zap className="inline w-4 h-4 mr-2" />
              Available for hire
            </span>
          </div>

          <div className="flex justify-center gap-4 mb-16">
            <a
              href="#contact"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="#timeline"
              className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium border border-gray-700 transition-all duration-300 hover:scale-105"
            >
              View Projects
            </a>
          </div>

          <div className="flex justify-center gap-6">
            {[Github, Linkedin, Mail].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110"
              >
                <Icon className="w-5 h-5" />
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
                technologies. My journey in tech has been driven by curiosity
                and a desire to create meaningful solutions that make a
                difference.
              </p>
              <p className="text-gray-400 mb-8 leading-relaxed">
                With expertise spanning from front-end frameworks to cloud
                architecture, I bring a holistic approach to software
                development. I thrive in collaborative environments and am
                always eager to tackle new challenges that push the boundaries
                of what's possible.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    4+
                  </div>
                  <div className="text-sm text-gray-400">
                    Years of Experience
                  </div>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    15+
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
                          className="aspect-square bg-gray-900/50 rounded-xl flex items-center justify-center hover:bg-gray-900/80 transition-colors duration-300"
                        >
                          <Icon className="w-8 h-8 text-blue-400" />
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
      <section id="skills" className="py-20 relative z-10 bg-gray-900/50">
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
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors duration-300">
                        <skill.icon className="w-5 h-5 text-blue-400" />
                      </div>
                      <h3 className="font-semibold">{skill.name}</h3>
                    </div>
                    <span className="text-sm text-gray-400">
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
      <section id="timeline" className="py-20 relative z-10">
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
                          project.teamSize) && (
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
                          </div>
                        )}

                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.tech.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 text-xs bg-gray-900/50 rounded-full text-gray-300 border border-gray-700"
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
                        {(project.github || project.demo) && (
                          <div className="flex gap-4">
                            {project.github && (
                              <a
                                href={project.github}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 rounded-lg hover:bg-gray-900/80 transition-all duration-300 text-sm"
                              >
                                <Github className="w-4 h-4" />
                                View Code
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg hover:bg-blue-500/30 transition-all duration-300 text-sm"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
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
      <section id="contact" className="py-20 relative z-10 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl text-gray-400 mb-12">
            I'm always interested in hearing about new opportunities and
            exciting projects.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            <a
              href="mailto:john@example.com"
              className="px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
            <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium border border-gray-700 transition-all duration-300 hover:scale-105 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Download Resume
            </button>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "mailto:john@example.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-3 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
          <p>
            © 2024 John Doe. Built with React, TypeScript, and Tailwind CSS.
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
        <ChevronDown className="w-5 h-5 transform rotate-180" />
      </button>
    </div>
  );
}

export default App;
