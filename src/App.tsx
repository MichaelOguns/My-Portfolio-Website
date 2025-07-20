import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Github, ExternalLink, Mail, Linkedin, Code, Briefcase, GraduationCap, Star, Download, MapPin, Calendar, Award, Users, Zap, Target } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  image: string;
  year: string;
  category: 'project' | 'education' | 'experience' | 'achievement';
  featured?: boolean;
  impact?: string;
  duration?: string;
  teamSize?: number;
  colors: string[]; // Add color theme for each project
}

const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Task Management Platform',
    description: 'Revolutionary full-stack application leveraging machine learning for intelligent task prioritization, automated scheduling, and productivity insights. Features real-time collaboration, natural language processing for task creation, and predictive analytics.',
    tech: ['React', 'Node.js', 'TensorFlow.js', 'PostgreSQL', 'Docker', 'AWS', 'Socket.io'],
    github: '#',
    demo: '#',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2024',
    category: 'project',
    featured: true,
    impact: '40% productivity increase for beta users',
    duration: '6 months',
    teamSize: 4,
    colors: ['#1e40af', '#3b82f6', '#60a5fa'] // Blue theme for AI/Tech
  },
  {
    id: '2',
    title: 'Computer Science Graduation',
    description: 'Bachelor of Science in Computer Science with Magna Cum Laude honors. Specialized in Artificial Intelligence, Software Engineering, and Distributed Systems. Completed advanced coursework in machine learning, algorithms, and system design.',
    tech: ['Machine Learning', 'Algorithms', 'System Design', 'Software Engineering', 'Database Systems', 'Computer Networks'],
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2024',
    category: 'education',
    impact: 'GPA: 3.9/4.0',
    duration: '4 years',
    colors: ['#ea580c', '#f97316', '#fb923c'] // Orange theme for education
  },
  {
    id: '3',
    title: 'Dean\'s List Achievement',
    description: 'Recognized for academic excellence with consistent placement on the Dean\'s List for outstanding scholastic achievement. Maintained top 5% class ranking throughout final two years.',
    tech: ['Academic Excellence', 'Leadership', 'Research'],
    image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2024',
    category: 'achievement',
    impact: 'Top 5% of graduating class',
    colors: ['#eab308', '#f59e0b', '#fbbf24'] // Gold theme for achievement
  },
  {
    id: '4',
    title: 'Real-time Collaborative Platform',
    description: 'Scalable real-time messaging and collaboration platform with end-to-end encryption, file sharing, video conferencing, and advanced security features. Architected to handle 10,000+ concurrent users with sub-100ms latency.',
    tech: ['React', 'Socket.io', 'Redis', 'WebRTC', 'AWS', 'Kubernetes', 'MongoDB'],
    github: '#',
    demo: '#',
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2023',
    category: 'project',
    featured: true,
    impact: '10,000+ concurrent users supported',
    duration: '8 months',
    teamSize: 6,
    colors: ['#7c3aed', '#8b5cf6', '#a78bfa'] // Purple theme for collaboration
  },
  {
    id: '5',
    title: 'Senior Software Engineer Intern',
    description: 'Led development of microservices architecture for e-commerce platform at TechCorp. Optimized API performance by 60%, implemented CI/CD pipelines, and mentored junior developers. Contributed to cloud migration strategy.',
    tech: ['Java', 'Spring Boot', 'Kubernetes', 'AWS', 'MongoDB', 'Jenkins', 'Docker'],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2023',
    category: 'experience',
    impact: '60% API performance improvement',
    duration: '6 months',
    teamSize: 12,
    colors: ['#059669', '#10b981', '#34d399'] // Green theme for work experience
  },
  {
    id: '6',
    title: 'Blockchain Voting System',
    description: 'Secure, transparent, and immutable voting platform leveraging blockchain technology. Features smart contracts for vote validation, IPFS for decentralized storage, and real-time result visualization with zero downtime guarantee.',
    tech: ['Solidity', 'React', 'Web3.js', 'IPFS', 'Ethereum', 'Truffle', 'MetaMask'],
    github: '#',
    demo: '#',
    image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2023',
    category: 'project',
    impact: '100% vote integrity guaranteed',
    duration: '4 months',
    teamSize: 3,
    colors: ['#dc2626', '#ef4444', '#f87171'] // Red theme for blockchain/security
  },
  {
    id: '7',
    title: 'Machine Learning Research Assistant',
    description: 'Conducted cutting-edge research on deep learning applications in medical imaging. Developed novel CNN architectures for automated diagnosis, published research paper, and presented findings at international conference.',
    tech: ['Python', 'PyTorch', 'OpenCV', 'NumPy', 'Jupyter', 'CUDA', 'TensorBoard'],
    image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2022',
    category: 'experience',
    impact: 'Published research paper',
    duration: '1 year',
    teamSize: 5,
    colors: ['#0d9488', '#14b8a6', '#5eead4'] // Teal theme for research
  },
  {
    id: '8',
    title: 'E-commerce Analytics Dashboard',
    description: 'Comprehensive business intelligence platform for online retailers. Features real-time sales tracking, customer behavior analysis, predictive analytics, and automated reporting with interactive data visualizations.',
    tech: ['Vue.js', 'D3.js', 'Python', 'Flask', 'MySQL', 'Apache Kafka', 'Elasticsearch'],
    github: '#',
    demo: '#',
    image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1200',
    year: '2022',
    category: 'project',
    impact: '25% increase in sales insights',
    duration: '5 months',
    teamSize: 4,
    colors: ['#be185d', '#db2777', '#f472b6'] // Pink theme for analytics
  }
];

const skills = [
  { name: 'React/TypeScript', level: 95 },
  { name: 'Node.js/Python', level: 90 },
  { name: 'Machine Learning', level: 85 },
  { name: 'Cloud Architecture', level: 88 },
  { name: 'Database Design', level: 92 },
  { name: 'DevOps/CI/CD', level: 80 }
];

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    
    // Enhanced scroll behavior for landing page slide-behind effect
    const handleScrollBehavior = () => {
      const heroSection = heroRef.current;
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollProgress = Math.min(window.scrollY / heroHeight, 1);
        
        // Apply transform to create slide-behind effect
        heroSection.style.transform = `translateY(${scrollProgress * -50}px) scale(${1 - scrollProgress * 0.1})`;
        heroSection.style.opacity = `${1 - scrollProgress * 0.3}`;
      }
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScrollBehavior);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollBehavior);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, entry.target.id]));
            
            // Update current project for background changes
            const projectId = entry.target.id.replace('project-', '');
            const projectIndex = projects.findIndex(p => p.id === projectId);
            if (projectIndex !== -1) {
              setCurrentProjectIndex(projectIndex);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'project': return <Code className="w-5 h-5" />;
      case 'experience': return <Briefcase className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      default: return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'project': return 'from-blue-500 via-cyan-500 to-purple-600';
      case 'experience': return 'from-emerald-500 via-teal-500 to-green-600';
      case 'education': return 'from-orange-500 via-red-500 to-pink-600';
      case 'achievement': return 'from-yellow-500 via-amber-500 to-orange-600';
      default: return 'from-blue-500 via-cyan-500 to-purple-600';
    }
  };

  const parallaxOffset = scrollY * 0.5;
  const mouseParallaxX = (mousePosition.x - window.innerWidth / 2) * 0.01;
  const mouseParallaxY = (mousePosition.y - window.innerHeight / 2) * 0.01;

  // Calculate gradient position based on scroll and current project
  const getGradientPosition = () => {
    // Calculate progress through the timeline (0 to 1)
    const timelineSection = document.getElementById('timeline');
    if (!timelineSection) return 0;
    
    const timelineTop = timelineSection.offsetTop;
    const timelineHeight = timelineSection.offsetHeight;
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - timelineTop + window.innerHeight) / (timelineHeight + window.innerHeight)));
    
    // Combine with current project index for smoother transitions
    const projectProgress = currentProjectIndex / Math.max(1, projects.length - 1);
    
    // Blend scroll position with project progress for smooth transitions
    return (scrollProgress * 0.7) + (projectProgress * 0.3);
  };

  // Get current project's color theme
  const getCurrentProjectColors = () => {
    const currentProject = projects[currentProjectIndex];
    return currentProject ? currentProject.colors : ['#1e40af', '#3b82f6', '#60a5fa']; // Default blue
  };

  // Create dynamic gradient based on current project
  const getDynamicGradient = () => {
    const colors = getCurrentProjectColors();
    const position = getGradientPosition();
    
    // Interpolate between projects for smooth transitions
    let nextColors = colors;
    if (currentProjectIndex < projects.length - 1) {
      nextColors = projects[currentProjectIndex + 1].colors;
    }
    
    return `linear-gradient(135deg, 
      ${colors[0]} 0%,
      ${colors[1]} 30%,
      ${colors[2]} 60%,
      ${nextColors[0]} 100%
    )`;
  };

  return (
    <div className="text-white min-h-screen overflow-x-hidden relative">
      {/* Dynamic Gradient Background that changes with projects */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{ 
          zIndex: -1,
          background: getDynamicGradient(),
          backgroundSize: '100% 100%',
        }}
      />
      
      {/* Animated Background Particles with dynamic colors */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {[...Array(20)].map((_, i) => {
          const colors = getCurrentProjectColors();
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          return (
            <div
              key={i}
              className={`absolute animate-pulse opacity-20`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
              }}
            >
              <div 
                className="w-2 h-2 rounded-full blur-sm"
                style={{ backgroundColor: randomColor }}
              />
            </div>
          );
        })}
      </div>

      {/* Enhanced Hero Section with Profile Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden perspective-2000">
        {/* Profile Image Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'grayscale(30%) brightness(0.3)',
            transform: `scale(${1 + scrollY * 0.0005}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        
        {/* Gradient Overlay for text readability */}
        <div 
          className="absolute inset-0 z-5"
          style={{
            background: `linear-gradient(135deg, 
              ${getCurrentProjectColors()[0]}CC 0%,
              ${getCurrentProjectColors()[1]}99 50%,
              ${getCurrentProjectColors()[2]}CC 100%
            )`,
          }}
        />
        
        {/* 3D Layered Backgrounds */}
        <div className="absolute inset-0 z-10 transform-style-3d">
          {/* Floating 3D Cubes with dynamic colors */}
          {[...Array(15)].map((_, i) => {
            const colors = getCurrentProjectColors();
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            return (
              <div
                key={i}
                className="absolute animate-float opacity-10"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 6}s`,
                  transform: `translateZ(${Math.random() * 200 - 100}px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`,
                }}
              >
                <div 
                  className="w-8 h-8 transform rotate-45 shadow-lg"
                  style={{
                    background: `linear-gradient(45deg, ${randomColor}, ${colors[(Math.floor(Math.random() * colors.length))]})`,
                    transform: `rotateX(45deg) rotateY(45deg) translateZ(${Math.random() * 50}px)`,
                  }}
                />
              </div>
            );
          })}
          
          {/* 3D Animated Grid with dynamic colors */}
          <div className="absolute inset-0 opacity-20">
            <div 
              className="absolute inset-0 transition-all duration-1000 transform-style-3d"
              style={{
                backgroundImage: `linear-gradient(${getCurrentProjectColors()[0]}20 1px, transparent 1px), linear-gradient(90deg, ${getCurrentProjectColors()[0]}20 1px, transparent 1px)`,
                backgroundSize: '50px 50px',
                transform: `translate3d(${mouseParallaxX}px, ${mouseParallaxY}px, -50px) rotateX(${scrollY * 0.02}deg)`,
              }}
            />
          </div>
          
          {/* Layered Geometric Shapes with dynamic colors */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(8)].map((_, i) => {
              const colors = getCurrentProjectColors();
              return (
                <div
                  key={i}
                  className="absolute animate-tilt"
                  style={{
                    left: `${(i * 15) + 10}%`,
                    top: `${(i % 2) * 60 + 20}%`,
                    animationDelay: `${i * 1.5}s`,
                    transform: `translateZ(${i * 30 - 60}px) perspective(500px)`,
                  }}
                >
                  <div 
                    className="w-20 h-20 transform rotate-45 backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, ${colors[1]}30 100%)`,
                      border: `1px solid ${colors[0]}50`,
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <div 
            className="transform transition-all duration-1000"
            style={{
              transform: `translateY(${scrollY * 0.3}px) rotateX(${scrollY * 0.05}deg) perspective(1000px)`,
            }}
          >
            {/* Enhanced 3D Floating Elements (replacing profile image) */}
            <div className="relative mb-12 perspective-1000">
              <div 
                className="relative mx-auto w-48 h-48 md:w-56 md:h-56 mb-8 transform-style-3d"
                style={{
                  transform: `translateY(${mouseParallaxY * 3}px) translateX(${mouseParallaxX * 3}px) rotateX(${scrollY * 0.02}deg) rotateY(${mouseParallaxX * 0.1}deg) translateZ(50px)`,
                }}
              >
                {/* Multiple 3D Rings at different depths with dynamic colors */}
                <div className="absolute inset-0 animate-spin-slow transform-style-3d">
                  <div 
                    className="absolute inset-0 rounded-full border-2 animate-pulse"
                    style={{ 
                      borderColor: `${getCurrentProjectColors()[0]}50`,
                      transform: 'translateZ(20px)' 
                    }} 
                  />
                </div>
                <div className="absolute inset-2 animate-spin-slower transform-style-3d">
                  <div 
                    className="absolute inset-0 rounded-full border"
                    style={{ 
                      borderColor: `${getCurrentProjectColors()[1]}40`,
                      transform: 'translateZ(10px)' 
                    }} 
                  />
                </div>
                <div className="absolute inset-4 animate-spin transform-style-3d" style={{ animationDuration: '15s' }}>
                  <div 
                    className="absolute inset-0 rounded-full border"
                    style={{ 
                      borderColor: `${getCurrentProjectColors()[2]}30`,
                      transform: 'translateZ(-10px)' 
                    }} 
                  />
                </div>
                
                {/* 3D Floating Particles with dynamic colors */}
                {[...Array(12)].map((_, i) => {
                  const colors = getCurrentProjectColors();
                  const randomColor = colors[Math.floor(Math.random() * colors.length)];
                  return (
                    <div
                      key={i}
                      className="absolute animate-float opacity-60"
                      style={{
                        left: `${20 + (i * 30) % 80}%`,
                        top: `${10 + (i * 25) % 80}%`,
                        animationDelay: `${i * 0.3}s`,
                        animationDuration: `${3 + i * 0.2}s`,
                        transform: `translateZ(${(i % 3) * 20 + 10}px) rotateY(${i * 30}deg)`,
                      }}
                    >
                      <div 
                        className="w-3 h-3 rounded-full blur-sm shadow-lg"
                        style={{ 
                          background: `linear-gradient(45deg, ${randomColor}, ${colors[(i + 1) % colors.length]})`
                        }}
                      />
                    </div>
                  );
                })}
                
                {/* Enhanced 3D Glow Effects with dynamic colors */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 blur-xl animate-pulse"
                  style={{ 
                    background: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]})`,
                    transform: 'translateZ(-20px)' 
                  }} 
                />
                <div 
                  className="absolute inset-2 rounded-full opacity-15 blur-2xl animate-pulse"
                  style={{ 
                    background: `linear-gradient(45deg, ${getCurrentProjectColors()[1]}, ${getCurrentProjectColors()[2]})`,
                    transform: 'translateZ(-30px)', 
                    animationDelay: '1s' 
                  }} 
                />
              </div>
            </div>

            {/* Enhanced 3D Name with Dynamic Colors */}
            <div className="relative mb-8 perspective-1000">
              <div className="relative transform-style-3d">
                {/* Multiple shadow layers for extreme 3D depth with dynamic colors */}
                <h1 
                  className="absolute text-6xl md:text-8xl font-black transform" 
                  style={{ 
                    color: `${getCurrentProjectColors()[0]}20`,
                    transform: 'translate3d(8px, 8px, -40px)' 
                  }}
                >
                  John Doe
                </h1>
                <h1 
                  className="absolute text-6xl md:text-8xl font-black transform" 
                  style={{ 
                    color: `${getCurrentProjectColors()[1]}30`,
                    transform: 'translate3d(6px, 6px, -30px)' 
                  }}
                >
                  John Doe
                </h1>
                <h1 
                  className="absolute text-6xl md:text-8xl font-black transform" 
                  style={{ 
                    color: `${getCurrentProjectColors()[2]}40`,
                    transform: 'translate3d(4px, 4px, -20px)' 
                  }}
                >
                  John Doe
                </h1>
                <h1 className="absolute text-6xl md:text-8xl font-black text-white/5 transform" style={{ transform: 'translate3d(2px, 2px, -10px)' }}>
                  John Doe
                </h1>
                
                {/* Main 3D Text with dynamic gradient */}
                <h1 
                  className="relative text-6xl md:text-8xl font-black bg-gradient-to-r bg-clip-text text-transparent transform-gpu transition-transform duration-300 hover:scale-105"
                  style={{ 
                    backgroundImage: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]}, ${getCurrentProjectColors()[2]})`,
                    transform: `translateZ(20px) rotateX(${scrollY * 0.01}deg) rotateY(${mouseParallaxX * 0.05}deg)`,
                    textShadow: `
                      0 0 10px ${getCurrentProjectColors()[0]}80,
                      0 0 20px ${getCurrentProjectColors()[1]}60,
                      0 0 30px ${getCurrentProjectColors()[2]}40
                    `
                  }}
                >
                  John Doe
                </h1>
              </div>
            </div>

            {/* Enhanced Subtitle */}
            <div className="mb-8">
              <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
                Computer Science Graduate
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-400">
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Full-Stack Developer
                </span>
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Problem Solver
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  San Francisco, CA
                </span>
              </div>
            </div>

            {/* Enhanced 3D Skills Preview */}
            <div className="mb-12 max-w-4xl mx-auto perspective-1000">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {skills.slice(0, 6).map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="card-3d bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 transform-style-3d group cursor-pointer"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      transform: `translateY(${scrollY * 0.1}px) translateZ(0px)`,
                    }}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const x = (mousePosition.x - rect.left - rect.width / 2) / 10;
                      const y = (mousePosition.y - rect.top - rect.height / 2) / 10;
                      e.currentTarget.style.transform = `rotateX(${-y}deg) rotateY(${x}deg) translateZ(20px) scale(1.05)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
                    }}
                  >
                    {/* 3D Card Front */}
                    <div className="backface-hidden">
                      <div className="text-sm font-medium text-gray-300 mb-3 group-hover:text-white transition-colors duration-300">
                        {skill.name}
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                          <div 
                            className="h-3 rounded-full transition-all duration-1000 relative overflow-hidden"
                            style={{ 
                              width: `${skill.level}%`,
                              background: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]})`
                            }}
                          >
                            {/* Animated shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse" />
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 mt-2 text-right">
                          {skill.level}%
                        </div>
                      </div>
                    </div>
                    
                    {/* 3D Depth Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-z-[-5px]" />
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10 flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <a href="#timeline" className="group px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl">
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  View Timeline
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {[
                { icon: Mail, href: '#', label: 'Email' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }) => (
                <a 
                  key={label}
                  href={href}
                  className="group p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-sm text-gray-400 font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Enhanced Timeline Section */}
      <section id="timeline" className="relative py-32 z-30">
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-20 relative z-40">
            <h2 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-1000"
              style={{
                backgroundImage: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]}, ${getCurrentProjectColors()[2]})`
              }}
            >
              My Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              From recent achievements to foundational experiences - a timeline of growth, learning, and innovation
            </p>
          </div>

          <div className="space-y-24 relative z-40">
            {projects.map((project, index) => (
              <div
                key={project.id}
                id={`project-${project.id}`}
                data-animate
                className="relative"
              >
                {/* Year Badge */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-4">
                    <div 
                      className="h-px flex-1 w-20 transition-all duration-1000"
                      style={{
                        background: `linear-gradient(to right, transparent, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[0]})`
                      }}
                    ></div>
                    <div className={`px-6 py-3 bg-gradient-to-r ${getCategoryColor(project.category)} rounded-full text-white font-bold text-lg shadow-lg`}>
                      {project.year}
                    </div>
                    <div 
                      className="h-px flex-1 w-20 transition-all duration-1000"
                      style={{
                        background: `linear-gradient(to left, transparent, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[0]})`
                      }}
                    ></div>
                  </div>
                </div>

                {/* Project Card */}
                <div 
                  className={`max-w-4xl mx-auto transform transition-all duration-1000 perspective-1000 ${
                    visibleItems.has(`project-${project.id}`) 
                      ? 'translate-y-0 opacity-100 scale-100' 
                      : 'translate-y-32 opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div 
                    className="group bg-gray-800/80 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10 transform-style-3d cursor-pointer"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'rotateX(5deg) rotateY(-5deg) translateZ(30px) scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px) scale(1)';
                    }}
                  >
                    {/* Enhanced dynamic glow effect with 3D depth */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`} style={{ transform: 'translateZ(-10px)' }} />
                    <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(project.category)} opacity-0 group-hover:opacity-5 transition-opacity duration-700 rounded-3xl blur-xl`} style={{ transform: 'translateZ(-20px)' }} />
                    
                    {/* Image and Content Layout */}
                    <div className={`grid ${index % 2 === 0 ? 'md:grid-cols-2' : 'md:grid-cols-2'} gap-0`}>
                      {/* Image Section */}
                      <div className={`relative overflow-hidden h-80 md:h-96 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent" />
                        
                        {/* Category Icon */}
                        <div className="absolute top-6 left-6">
                          <div className={`p-3 bg-gradient-to-r ${getCategoryColor(project.category)} rounded-full shadow-lg`}>
                            {getCategoryIcon(project.category)}
                          </div>
                        </div>

                        {/* Featured Badge */}
                        {project.featured && (
                          <div className="absolute top-6 right-6">
                            <div className="px-4 py-2 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-400/30 flex items-center gap-2">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-sm font-medium">Featured</span>
                            </div>
                          </div>
                        )}

                        {/* Category Badge */}
                        <div className="absolute bottom-6 left-6">
                          <span className="px-4 py-2 text-sm font-medium rounded-full bg-gray-900/80 backdrop-blur-sm text-gray-200 border border-gray-600/50 capitalize">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                          {project.title}
                        </h3>
                        
                        <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                          {project.description}
                        </p>

                        {/* Project Stats */}
                        {(project.impact || project.duration || project.teamSize) && (
                          <div className="grid grid-cols-1 gap-4 mb-8">
                            {project.impact && (
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/20 rounded-lg">
                                  <Target className="w-5 h-5 text-green-400" />
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Impact</span>
                                  <div className="text-green-400 font-semibold">{project.impact}</div>
                                </div>
                              </div>
                            )}
                            {project.duration && (
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                  <Calendar className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Duration</span>
                                  <div className="text-blue-400 font-semibold">{project.duration}</div>
                                </div>
                              </div>
                            )}
                            {project.teamSize && (
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-purple-500/20 rounded-lg">
                                  <Users className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Team Size</span>
                                  <div className="text-purple-400 font-semibold">{project.teamSize} members</div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map((tech) => (
                            <span 
                              key={tech}
                              className="px-3 py-2 text-sm bg-gray-700/50 rounded-lg text-gray-300 border border-gray-600/50 hover:border-gray-500/50 hover:bg-gray-600/50 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        {(project.github || project.demo) && (
                          <div className="flex gap-4">
                            {project.github && (
                              <a 
                                href={project.github}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 rounded-xl hover:bg-gray-600/50 transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-gray-500/50"
                              >
                                <Github className="w-5 h-5" />
                                <span className="font-medium">View Code</span>
                              </a>
                            )}
                            {project.demo && (
                              <a 
                                href={project.demo}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 hover:scale-105"
                              >
                                <ExternalLink className="w-5 h-5" />
                                <span className="font-medium">Live Demo</span>
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

          {/* Bottom Section Divider */}
          <div className="mt-32 flex items-center justify-center">
            <div className="flex items-center gap-4">
              <div 
                className="h-px flex-1 w-32 transition-all duration-1000"
                style={{
                  background: `linear-gradient(to right, transparent, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[0]})`
                }}
              ></div>
              <div className="px-6 py-3 bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-600/50">
                <span className="text-gray-400 font-medium">End of Journey</span>
              </div>
              <div 
                className="h-px flex-1 w-32 transition-all duration-1000"
                style={{
                  background: `linear-gradient(to left, transparent, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[0]})`
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-20 border-t border-gray-700/50 z-30">
        {/* Footer Background Overlay */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
        
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12 relative z-40">
            <h3 
              className="text-4xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent transition-all duration-1000"
              style={{
                backgroundImage: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]})`
              }}
            >
              Let's Create Something Extraordinary
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm passionate about solving complex problems and building innovative solutions. 
              Let's discuss how we can work together to bring your ideas to life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <a 
                href="#" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get In Touch
                </span>
              </a>
              <a 
                href="#" 
                className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </span>
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-8 mb-12 relative z-40">
            {[
              { icon: Mail, href: 'mailto:john@example.com', label: 'Email' },
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' }
            ].map(({ icon: Icon, href, label }) => (
              <a 
                key={label}
                href={href}
                className="group p-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-110 hover:bg-white/10"
                aria-label={label}
              >
                <Icon className="w-7 h-7 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="text-center text-gray-500 text-sm relative z-40">
            <p className="mb-2">© 2024 John Doe. Crafted with passion and precision.</p>
            <p>Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>

      {/* 3D Floating Progress Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 perspective-1000">
        <div 
          className="relative w-2 h-32 bg-gray-700/30 rounded-full backdrop-blur-sm border border-gray-600/20 transform-style-3d"
          style={{
            transform: `rotateX(${scrollY * 0.05}deg) translateZ(10px)`,
          }}
        >
          {/* Progress Fill */}
          <div 
            className="absolute bottom-0 left-0 w-full rounded-full transition-all duration-300"
            style={{ 
              height: `${Math.min(100, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
              background: `linear-gradient(to top, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]})`,
              transform: 'translateZ(5px)',
            }}
          />
          
          {/* 3D Progress Indicator Dot */}
          <div 
            className="absolute w-4 h-4 rounded-full shadow-lg transform -translate-x-1 border-2 border-white/20 animate-pulse"
            style={{ 
              top: `${Math.min(90, (scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)}%`,
              background: `linear-gradient(45deg, ${getCurrentProjectColors()[0]}, ${getCurrentProjectColors()[1]})`,
              transform: `translateX(-50%) translateZ(15px) rotateY(${scrollY * 0.1}deg)`,
            }}
          />
          
          {/* Floating particles around indicator */}
          {[...Array(3)].map((_, i) => {
            const colors = getCurrentProjectColors();
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-60 animate-float"
                style={{
                  backgroundColor: colors[i % colors.length],
                  right: `${10 + i * 8}px`,
                  top: `${40 + i * 15}%`,
                  animationDelay: `${i * 0.8}s`,
                  transform: `translateZ(${i * 5 + 5}px)`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* 3D Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50 perspective-1000">
        <button 
          className="group relative w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-xl transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 transform-style-3d"
          style={{
            transform: `translateZ(20px) rotateX(${scrollY * 0.02}deg) rotateY(${mouseParallaxX * 0.1}deg)`,
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(30px) rotateX(10deg) rotateY(-10deg) scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `translateZ(20px) rotateX(${scrollY * 0.02}deg) rotateY(${mouseParallaxX * 0.1}deg) scale(1)`;
          }}
        >
          {/* Multiple 3D layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ transform: 'translateZ(-5px)' }} />
          <div className="absolute inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ transform: 'translateZ(-10px)' }} />
          
          {/* Arrow Icon with 3D effect */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <ChevronDown className="w-6 h-6 text-white transform rotate-180 transition-transform duration-300 group-hover:scale-110" style={{ transform: 'translateZ(5px) rotate(180deg)' }} />
          </div>
          
          {/* Animated ring around button */}
          <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-0 group-hover:opacity-100" style={{ transform: 'translateZ(25px)' }} />
        </button>
      </div>
    </div>
  );
}

export default App;