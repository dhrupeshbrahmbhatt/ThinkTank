import React, { createContext, useContext, useState } from 'react';

const Portfolio2Context = createContext();

export const usePortfolio2 = () => {
    const context = useContext(Portfolio2Context);
    if (!context) {
        throw new Error('usePortfolio2 must be used within a Portfolio2Provider');
    }
    return context;
};

export const Portfolio2Provider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [portfolioData, setPortfolioData] = useState({
        personal: {
            name: "Alex Chen",
            title: "Frontend Developer & UI Designer",
            greeting: "Hello, I'm",
            description: "Crafting digital experiences with precision, elegance, and attention to detail. Passionate about creating interfaces that are both beautiful and functional."
        },
        about: {
            subtitle: "Passionate about creating",
            paragraphs: [
                "I'm a frontend developer with a keen eye for design and a passion for creating seamless user experiences. With a background in computer science and a love for clean, minimal aesthetics, I bridge the gap between design and development.",
                "My approach focuses on simplicity, performance, and attention to detail. I believe that great design is invisible – it just works."
            ],
            stats: [
                { label: "Years Experience", value: "2+" },
                { label: "Projects Completed", value: "15+" }
            ],
            values: [
                {
                    title: "Clean Code",
                    description: "Writing maintainable, scalable code that stands the test of time."
                },
                {
                    title: "User-Centric",
                    description: "Putting user experience at the heart of every design decision."
                },
                {
                    title: "Continuous Learning",
                    description: "Staying updated with the latest technologies and best practices."
                }
            ]
        },
        skills: [
            { name: "React", level: 90, category: "Frontend" },
            { name: "TypeScript", level: 85, category: "Frontend" },
            { name: "Next.js", level: 80, category: "Frontend" },
            { name: "Tailwind CSS", level: 95, category: "Styling" },
            { name: "Framer Motion", level: 88, category: "Animation" },
            { name: "Node.js", level: 75, category: "Backend" },
            { name: "Figma", level: 92, category: "Design" },
            { name: "Git", level: 90, category: "Tools" }
        ],
        projects: [
            {
                title: "E-Commerce Platform",
                description: "A modern, responsive e-commerce solution built with React and Node.js. Features include real-time inventory, secure payments, and an intuitive admin dashboard.",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                category: "Web Application",
                year: "2024"
            },
            {
                title: "Design System",
                description: "Comprehensive design system and component library for a fintech startup. Includes 50+ components, design tokens, and detailed documentation.",
                tech: ["React", "Storybook", "Figma", "TypeScript"],
                category: "Design System",
                year: "2024"
            },
            {
                title: "Analytics Dashboard",
                description: "Real-time analytics dashboard for tracking user behavior and business metrics. Features interactive charts and customizable widgets.",
                tech: ["Next.js", "D3.js", "PostgreSQL", "Redis"],
                category: "Dashboard",
                year: "2023"
            },
            {
                title: "Mobile Banking App",
                description: "Secure mobile banking application with biometric authentication, transaction history, and budget tracking features.",
                tech: ["React Native", "Firebase", "Node.js", "JWT"],
                category: "Mobile App",
                year: "2023"
            }
        ],
        contact: {
            title: "Let's create something amazing",
            subtitle: "Get In Touch",
            description: "I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to chat, I'd love to hear from you.",
            email: "alex.chen@example.com",
            phone: "+1 (555) 123-4567",
            location: "San Francisco, CA",
            social: [
                { name: "LinkedIn", icon: "💼", href: "#" },
                { name: "GitHub", icon: "🐙", href: "#" },
                { name: "Twitter", icon: "🐦", href: "#" },
                { name: "Dribbble", icon: "🏀", href: "#" }
            ]
        }
    });

    const updatePersonal = (field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            personal: {
                ...prev.personal,
                [field]: value
            }
        }));
    };

    const updateAbout = (field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            about: {
                ...prev.about,
                [field]: value
            }
        }));
    };

    const updateAboutParagraph = (index, value) => {
        setPortfolioData(prev => ({
            ...prev,
            about: {
                ...prev.about,
                paragraphs: prev.about.paragraphs.map((p, i) => i === index ? value : p)
            }
        }));
    };

    const updateAboutValue = (index, field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            about: {
                ...prev.about,
                values: prev.about.values.map((v, i) => 
                    i === index ? { ...v, [field]: value } : v
                )
            }
        }));
    };

    const updateSkill = (index, field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) => 
                i === index ? { ...skill, [field]: value } : skill
            )
        }));
    };

    const addSkill = () => {
        setPortfolioData(prev => ({
            ...prev,
            skills: [...prev.skills, { name: "New Skill", level: 50, category: "General" }]
        }));
    };

    const removeSkill = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const updateProject = (index, field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) => 
                i === index ? { ...project, [field]: value } : project
            )
        }));
    };

    const updateProjectTech = (projectIndex, techArray) => {
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.map((project, i) => 
                i === projectIndex ? { ...project, tech: techArray } : project
            )
        }));
    };

    const addProject = () => {
        setPortfolioData(prev => ({
            ...prev,
            projects: [...prev.projects, {
                title: "New Project",
                description: "Project description here...",
                tech: ["React"],
                category: "Web Application",
                year: "2024"
            }]
        }));
    };

    const removeProject = (index) => {
        setPortfolioData(prev => ({
            ...prev,
            projects: prev.projects.filter((_, i) => i !== index)
        }));
    };

    const updateContact = (field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                [field]: value
            }
        }));
    };

    const updateSocial = (index, field, value) => {
        setPortfolioData(prev => ({
            ...prev,
            contact: {
                ...prev.contact,
                social: prev.contact.social.map((social, i) => 
                    i === index ? { ...social, [field]: value } : social
                )
            }
        }));
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const exportData = () => {
        const dataStr = JSON.stringify(portfolioData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'portfolio-data.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const importData = (jsonData) => {
        try {
            const parsedData = JSON.parse(jsonData);
            setPortfolioData(parsedData);
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    };

    const value = {
        portfolioData,
        isEditMode,
        toggleEditMode,
        exportData,
        importData,
        updatePersonal,
        updateAbout,
        updateAboutParagraph,
        updateAboutValue,
        updateSkill,
        addSkill,
        removeSkill,
        updateProject,
        updateProjectTech,
        addProject,
        removeProject,
        updateContact,
        updateSocial
    };

    return (
        <Portfolio2Context.Provider value={value}>
            {children}
        </Portfolio2Context.Provider>
    );
};
