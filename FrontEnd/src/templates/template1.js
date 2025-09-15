import React, { useState, useEffect, useRef } from 'react';
import './template1.css';

const template1 = () => {
  const [activeSection, setActiveSection] = useState('about');
  const sectionRefs = {
    about: useRef(null),
    services: useRef(null),
    stats: useRef(null),
    skills: useRef(null)
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="portfolio-container">
      <Header />
      <div className="main-content">
        <Sidebar activeSection={activeSection} />
        <div className="content-sections">
          <AboutSection ref={sectionRefs.about} />
          <ServicesSection ref={sectionRefs.services} />
          <StatsSection ref={sectionRefs.stats} />
          <SkillsSection ref={sectionRefs.skills} />
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="name-title animate-fade-in">Willimes Parker</h1>
        <p className="role-subtitle animate-slide-up">Graphic Designer, HTML Coder, PHP Programmer and Project Manager</p>
        <div className="availability-badges animate-slide-up">
          <span className="badge start-consulting">Start Consulting</span>
          <span className="badge available-freelance">Available for Freelance</span>
        </div>
      </div>
    </header>
  );
};

const Sidebar = ({ activeSection }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-content">
        <div className="profile-image">
          <div className="image-placeholder"></div>
        </div>
        <nav className="sidebar-nav">
          <a href="#about" className={activeSection === 'about' ? 'nav-item active' : 'nav-item'}>
            <span>About Me</span>
          </a>
          <a href="#services" className={activeSection === 'services' ? 'nav-item active' : 'nav-item'}>
            <span>Services</span>
          </a>
          <a href="#stats" className={activeSection === 'stats' ? 'nav-item active' : 'nav-item'}>
            <span>Statistics</span>
          </a>
          <a href="#skills" className={activeSection === 'skills' ? 'nav-item active' : 'nav-item'}>
            <span>Skills</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <p>© 2023 Willimes Parker</p>
        </div>
      </div>
    </aside>
  );
};

const AboutSection = React.forwardRef((props, ref) => {
  return (
    <section id="about" className="section about-section" ref={ref}>
      <div className="section-content">
        <h2 className="section-title animate-on-scroll">About Me</h2>
        <p className="about-description animate-on-scroll">
          I like creating a cool design project.
        </p>
        <button className="download-cv-btn animate-on-scroll">Download CV</button>
        
        <div className="about-stats animate-on-scroll">
          <div className="stat">
            <span className="stat-number">1</span>
            <span className="stat-label">Year of Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">6</span>
            <span className="stat-label">Projects Completed</span>
          </div>
        </div>
        
        <div className="personal-info animate-on-scroll">
          <div className="info-item">
            <span className="info-label">Age:</span>
            <span className="info-value">29</span>
          </div>
          <div className="info-item">
            <span className="info-label">Residence:</span>
            <span className="info-value">USA</span>
          </div>
          <div className="info-item">
            <span className="info-label">Address:</span>
            <span className="info-value">88 Some Street, Some Town</span>
          </div>
          <div className="info-item">
            <span className="info-label">E-mail:</span>
            <span className="info-value">email@example.com</span>
          </div>
          <div className="info-item">
            <span className="info-label">Phone:</span>
            <span className="info-value">+023123.456.789</span>
          </div>
          <div className="info-item">
            <span className="info-label">Freelance:</span>
            <span className="info-value available">Available</span>
          </div>
        </div>
      </div>
    </section>
  );
});

const ServicesSection = React.forwardRef((props, ref) => {
  return (
    <section id="services" className="section services-section" ref={ref}>
      <div className="section-content">
        <h2 className="section-title animate-on-scroll">WHAT WE DO</h2>
        <h3 className="section-subtitle animate-on-scroll">Our Services</h3>
        <div className="services-grid">
          <div className="service-card animate-on-scroll">
            <div className="service-icon">🎨</div>
            <h4 className="service-title">Graphic Design</h4>
            <p className="service-description">Creating visual concepts to communicate ideas that inspire, inform, and captivate consumers.</p>
          </div>
          <div className="service-card animate-on-scroll">
            <div className="service-icon">💻</div>
            <h4 className="service-title">Web Development</h4>
            <p className="service-description">Building and maintaining websites to ensure they perform reliably with optimal user experience.</p>
          </div>
          <div className="service-card animate-on-scroll">
            <div className="service-icon">📱</div>
            <h4 className="service-title">App Development</h4>
            <p className="service-description">Designing and building mobile applications for various platforms with intuitive interfaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
});

const StatsSection = React.forwardRef((props, ref) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (count < 10000) {
      const timer = setTimeout(() => {
        setCount(prev => Math.min(prev + 100, 10000));
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <section id="stats" className="section stats-section" ref={ref}>
      <div className="section-content">
        <div className="stats-container animate-on-scroll">
          <div className="stat-circle">
            <span className="stat-number">{count.toLocaleString()}</span>
            <span className="stat-label">Happy Satisfied Customers</span>
          </div>
          <p className="stats-description">
            Vestibulum vitae lorim tellus nec dui dictum lorim viverra ac, pioce ullm rat lorse ipsom ullme urnes occitctm Vesti itee lorim tellus nec dui dictum lorim viverra a eros ac, pl rat lorse ipsom lorimes aui erdum, erdum. Vestibulum vi rat lorse ipsom lorimes aui erdum, erdum.
          </p>
        </div>
      </div>
    </section>
  );
});

const SkillsSection = React.forwardRef((props, ref) => {
  const skills = [
    { name: 'Graphic Design', percentage: 50 },
    { name: 'Development', percentage: 75 },
    { name: 'Marketing Ideas', percentage: 38 },
    { name: 'Web Management', percentage: 63 }
  ];

  return (
    <section id="skills" className="section skills-section" ref={ref}>
      <div className="section-content">
        <h2 className="section-title animate-on-scroll">Skills</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <SkillBar 
              key={index} 
              name={skill.name} 
              percentage={skill.percentage} 
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

const SkillBar = ({ name, percentage, delay }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsAnimated(true);
      }
    }, { threshold: 0.5 });

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
    <div className="skill-item animate-on-scroll" ref={barRef} style={{ animationDelay: `${delay}s` }}>
      <div className="skill-header">
        <span className="skill-name">{name}</span>
        <span className="skill-percentage">{percentage}%</span>
      </div>
      <div className="skill-bar">
        <div 
          className="skill-progress" 
          style={{ width: isAnimated ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default template1;