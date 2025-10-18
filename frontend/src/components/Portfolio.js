import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Briefcase, User, Send, Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch data
  useEffect(() => {
    // In real app: replace with actual API calls
    setProjects([
      {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Full-stack online shopping platform with payment integration',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop',
        github: '#',
        live: '#'
      },
      {
        id: 2,
        title: 'Task Management App',
        description: 'Collaborative task manager with real-time updates',
        technologies: ['React', 'Express', 'Socket.io', 'MongoDB'],
        image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop',
        github: '#',
        live: '#'
      },
      {
        id: 3,
        title: 'Social Media Dashboard',
        description: 'Analytics dashboard for tracking social media metrics',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop',
        github: '#',
        live: '#'
      }
    ]);

    setSkills([
      { name: 'React', level: 90 },
      { name: 'Node.js', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'JavaScript', level: 90 },
      { name: 'Tailwind CSS', level: 88 }
    ]);

    setTestimonials([
      {
        id: 1,
        name: 'Sarah Johnson',
        role: 'Product Manager',
        company: 'Tech Corp',
        message: 'Working with this developer was an absolute pleasure. The attention to detail and commitment to delivering high-quality work exceeded our expectations!',
        avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
        rating: 5
      },
      {
        id: 2,
        name: 'Michael Chen',
        role: 'CTO',
        company: 'StartUp Inc',
        message: 'Exceptional technical skills combined with great communication. The project was delivered on time and the code quality was outstanding!',
        avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=ec4899&color=fff',
        rating: 5
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'CEO',
        company: 'Digital Agency',
        message: 'A true professional! They provided valuable insights that improved our overall product. Amazing experience!',
        avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=8b5cf6&color=fff',
        rating: 5
      }
    ]);
  }, []);

  // Auto-play testimonials
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // In real app: await axios.post('http://localhost:5000/api/contact', formData)
    alert('Message sent! (Connect to backend API to actually send)');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize hover:text-purple-400 transition ${
                    activeSection === item ? 'text-purple-400' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              {['home', 'about', 'skills', 'projects', 'testimonials', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-2 capitalize hover:bg-purple-900/30 rounded"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 inline-block">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 mx-auto">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <User size={64} className="text-purple-400" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            Full Stack Developer
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Building modern web applications with MERN Stack
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition">
              <Github size={24} />
            </a>
            <a href="#" className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition">
              <Linkedin size={24} />
            </a>
            <a href="#" className="p-3 bg-purple-600 hover:bg-purple-700 rounded-full transition">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <User className="text-purple-400" />
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer specializing in the MERN stack (MongoDB, Express.js, React, Node.js). 
              With a strong foundation in JavaScript and modern web technologies, I create responsive, user-friendly 
              applications that solve real-world problems. I love learning new technologies and building projects that 
              make a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Code className="text-purple-400" />
            Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{skill.name}</span>
                  <span className="text-purple-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Briefcase className="text-purple-400" />
            Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all hover:transform hover:scale-105"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                    >
                      <Github size={20} />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
                    >
                      <ExternalLink size={20} />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Quote className="text-purple-400" />
              Testimonials
            </h2>
            <p className="text-gray-400 text-lg">What clients say about working with me</p>
          </div>

          {testimonials.length > 0 && (
            <>
              <div className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-purple-500/20 relative">
                  <div className="flex gap-1 mb-6 justify-center">
                    {[...Array(testimonials[currentTestimonialIndex].rating)].map((_, i) => (
                      <Star key={i} size={24} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic text-center">
                    "{testimonials[currentTestimonialIndex].message}"
                  </p>

                  <div className="flex items-center gap-4 justify-center">
                    <img
                      src={testimonials[currentTestimonialIndex].avatar}
                      alt={testimonials[currentTestimonialIndex].name}
                      className="w-16 h-16 rounded-full border-2 border-purple-500"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonialIndex].name}</h4>
                      <p className="text-purple-400">{testimonials[currentTestimonialIndex].role}</p>
                      <p className="text-gray-400 text-sm">{testimonials[currentTestimonialIndex].company}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition"
                >
                  <ChevronLeft size={24} />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTestimonialIndex(index);
                      setIsAutoPlaying(false);
                    }}
                    className={`transition-all ${
                      index === currentTestimonialIndex
                        ? 'w-12 h-3 bg-purple-600'
                        : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                    } rounded-full`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Mail className="text-purple-400" />
            Get In Touch
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 transition resize-none"
                placeholder="Your message..."
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
            >
              <Send size={20} />
              Send Message
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-purple-500/20">
        <p>&copy; 2025 Portfolio. Built with MERN Stack.</p>
      </footer>
    </div>
  );
}