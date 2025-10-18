import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Briefcase, Code, Mail, LogOut, Plus, 
  Edit, Trash2, X, Save, MessageSquare, Quote, Star
} from 'lucide-react';

export default function AdminDashboard({ onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, testimonials: 0 });
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [modalType, setModalType] = useState('');

  const [projectForm, setProjectForm] = useState({
    title: '', description: '', technologies: '', image: '', github: '', live: ''
  });

  const [skillForm, setSkillForm] = useState({
    name: '', level: 50, category: 'Frontend'
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', company: '', message: '', avatar: '', rating: 5
  });

  useEffect(() => {
    const demoProjects = [{
      _id: '1', title: 'E-Commerce Platform', description: 'Full-stack shopping platform',
      technologies: ['React', 'Node.js', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=300',
      github: '#', live: '#'
    }];

    const demoSkills = [
      { _id: '1', name: 'React', level: 90, category: 'Frontend' },
      { _id: '2', name: 'Node.js', level: 85, category: 'Backend' }
    ];

    const demoContacts = [{
      _id: '1', name: 'John Doe', email: 'john@example.com',
      message: 'Great portfolio!', status: 'new', createdAt: new Date()
    }];

    const demoTestimonials = [{
      _id: '1', name: 'Sarah Johnson', role: 'Product Manager', company: 'Tech Corp',
      message: 'Excellent work!',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff',
      rating: 5
    }];

    setProjects(demoProjects);
    setSkills(demoSkills);
    setContacts(demoContacts);
    setTestimonials(demoTestimonials);
    setStats({
      projects: demoProjects.length,
      skills: demoSkills.length,
      messages: demoContacts.length,
      testimonials: demoTestimonials.length
    });
  }, []);

  const handleAddProject = () => {
    setModalType('project');
    setEditingItem(null);
    setProjectForm({ title: '', description: '', technologies: '', image: '', github: '', live: '' });
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setModalType('project');
    setEditingItem(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      image: project.image,
      github: project.github,
      live: project.live
    });
    setShowModal(true);
  };

  const handleSaveProject = () => {
    const projectData = {
      ...projectForm,
      technologies: projectForm.technologies.split(',').map(t => t.trim())
    };

    if (editingItem) {
      setProjects(projects.map(p => p._id === editingItem._id ? { ...p, ...projectData } : p));
    } else {
      setProjects([...projects, { _id: Date.now().toString(), ...projectData }]);
    }
    setShowModal(false);
    alert('Project saved!');
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Delete this project?')) {
      setProjects(projects.filter(p => p._id !== id));
    }
  };

  const handleAddSkill = () => {
    setModalType('skill');
    setEditingItem(null);
    setSkillForm({ name: '', level: 50, category: 'Frontend' });
    setShowModal(true);
  };

  const handleSaveSkill = () => {
    if (editingItem) {
      setSkills(skills.map(s => s._id === editingItem._id ? { ...s, ...skillForm } : s));
    } else {
      setSkills([...skills, { _id: Date.now().toString(), ...skillForm }]);
    }
    setShowModal(false);
    alert('Skill saved!');
  };

  const handleAddTestimonial = () => {
    setModalType('testimonial');
    setEditingItem(null);
    setTestimonialForm({ name: '', role: '', company: '', message: '', avatar: '', rating: 5 });
    setShowModal(true);
  };

  const handleSaveTestimonial = () => {
    const newTestimonial = { 
      _id: Date.now().toString(), 
      ...testimonialForm,
      avatar: testimonialForm.avatar || `https://ui-avatars.com/api/?name=${testimonialForm.name}&background=8b5cf6&color=fff`
    };
    
    if (editingItem) {
      setTestimonials(testimonials.map(t => t._id === editingItem._id ? { ...t, ...testimonialForm } : t));
    } else {
      setTestimonials([...testimonials, newTestimonial]);
    }
    setShowModal(false);
    alert('Testimonial saved!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-slate-900/80 backdrop-blur-md border-r border-purple-500/20 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'projects', icon: Briefcase, label: 'Projects' },
            { id: 'skills', icon: Code, label: 'Skills' },
            { id: 'testimonials', icon: Quote, label: 'Testimonials' },
            { id: 'messages', icon: MessageSquare, label: 'Messages', badge: stats.messages }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id ? 'bg-purple-600 text-white' : 'text-gray-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={onLogout}
          className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg transition text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Projects', value: stats.projects, icon: Briefcase, color: 'purple' },
                { label: 'Skills', value: stats.skills, icon: Code, color: 'purple' },
                { label: 'Messages', value: stats.messages, icon: Mail, color: 'purple' },
                { label: 'Testimonials', value: stats.testimonials, icon: Quote, color: 'purple' }
              ].map(stat => (
                <div key={stat.label} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 mb-2">{stat.label}</p>
                      <p className="text-4xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className="p-4 bg-purple-600/20 rounded-lg">
                      <stat.icon size={32} className="text-purple-400" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Recent Messages</h3>
                {contacts.slice(0, 3).map(contact => (
                  <div key={contact._id} className="mb-4 pb-4 border-b border-purple-500/20 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-white">{contact.name}</p>
                        <p className="text-sm text-gray-400">{contact.email}</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300">
                        {contact.status}
                      </span>
                    </div>
                    <p className="text-gray-300">{contact.message}</p>
                  </div>
                ))}
              </div>

              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Recent Testimonials</h3>
                {testimonials.slice(0, 2).map(testimonial => (
                  <div key={testimonial._id} className="mb-4 pb-4 border-b border-purple-500/20 last:border-0">
                    <div className="flex items-start gap-3 mb-2">
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-10 h-10 rounded-full" />
                      <div className="flex-1">
                        <p className="font-semibold text-white">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">{testimonial.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Manage Projects</h2>
              <button onClick={handleAddProject} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                <Plus size={20} />
                Add Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map(project => (
                <div key={project._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20">
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditProject(project)} className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition">
                        <Edit size={18} />
                        Edit
                      </button>
                      <button onClick={() => handleDeleteProject(project._id)} className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                        <Trash2 size={18} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Manage Skills</h2>
              <button onClick={handleAddSkill} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                <Plus size={20} />
                Add Skill
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map(skill => (
                <div key={skill._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-400">{skill.category}</p>
                    </div>
                    <span className="text-2xl font-bold text-purple-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3 mb-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full" style={{ width: `${skill.level}%` }} />
                  </div>
                  <button onClick={() => { if (window.confirm('Delete?')) setSkills(skills.filter(s => s._id !== skill._id)); }} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Manage Testimonials</h2>
              <button onClick={handleAddTestimonial} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition">
                <Plus size={20} />
                Add Testimonial
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map(testimonial => (
                <div key={testimonial._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-2 border-purple-500" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                      <p className="text-purple-400">{testimonial.role}</p>
                      <p className="text-sm text-gray-400">{testimonial.company}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.message}"</p>
                  <button onClick={() => { if (window.confirm('Delete?')) setTestimonials(testimonials.filter(t => t._id !== testimonial._id)); }} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Contact Messages</h2>
            <div className="space-y-4">
              {contacts.map(contact => (
                <div key={contact._id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                      <p className="text-gray-400">{contact.email}</p>
                      <p className="text-sm text-gray-500">{new Date(contact.createdAt).toLocaleString()}</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-900/30 rounded-full text-sm text-purple-300">{contact.status}</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <p className="text-gray-300">{contact.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit' : 'Add'} {modalType === 'project' ? 'Project' : modalType === 'skill' ? 'Skill' : 'Testimonial'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {modalType === 'project' && (
              <div className="space-y-4">
                <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Title" />
                <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" rows={3} placeholder="Description" />
                <input type="text" value={projectForm.technologies} onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Technologies (comma-separated)" />
                <input type="text" value={projectForm.image} onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Image URL" />
                <input type="text" value={projectForm.github} onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="GitHub URL" />
                <input type="text" value={projectForm.live} onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Live URL" />
                <button onClick={handleSaveProject} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition">
                  <Save size={20} />
                  Save Project
                </button>
              </div>
            )}

            {modalType === 'skill' && (
              <div className="space-y-4">
                <input type="text" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Skill Name" />
                <div>
                  <label className="block text-gray-300 mb-2">Level ({skillForm.level}%)</label>
                  <input type="range" min="0" max="100" value={skillForm.level} onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })} className="w-full" />
                </div>
                <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white">
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Database</option>
                  <option>Tools</option>
                </select>
                <button onClick={handleSaveSkill} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition">
                  <Save size={20} />
                  Save Skill
                </button>
              </div>
            )}

            {modalType === 'testimonial' && (
              <div className="space-y-4">
                <input type="text" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Name" />
                <input type="text" value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Role" />
                <input type="text" value={testimonialForm.company} onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Company" />
                <textarea value={testimonialForm.message} onChange={(e) => setTestimonialForm({ ...testimonialForm, message: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" rows={4} placeholder="Message" />
                <input type="text" value={testimonialForm.avatar} onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 text-white" placeholder="Avatar URL (optional)" />
                <div>
                  <label className="block text-gray-300 mb-2">Rating ({testimonialForm.rating} stars)</label>
                  <div className="flex items-center gap-2">
                    <input type="range" min="1" max="5" value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })} className="flex-1" />
                    <div className="flex gap-1">
                      {[...Array(testimonialForm.rating)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <button onClick={handleSaveTestimonial} className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg transition">
                  <Save size={20} />
                  Save Testimonial
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}