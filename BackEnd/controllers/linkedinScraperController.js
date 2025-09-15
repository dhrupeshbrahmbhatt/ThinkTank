// controllers/linkedinScraperController.js - LinkedIn Scraper Controller
import { scrapeLinkedInProfile, isValidLinkedInUrl, extractVanityName, delay } from '../services/linkedinScraper.js';

//  * Return fake LinkedIn profile data for testing
//  * POST /api/linkedin-scraper/mock
//  * Body: { url: "https://www.linkedin.com/in/any-username/" }

export const getMockProfileData = async (req, res) => {
  try {
    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required',
        example: { url: 'https://www.linkedin.com/in/maurya-sumit-25a14437b/' }
      });
    }

    const { url } = req.body;

    // Extract vanity name from URL for realistic mock data
    const vanityName = url ? extractVanityName(url) : 'test-user';

    // Generate realistic fake data based on your schema
    const mockProfile = {
      id: vanityName || 'maurya-sumit-25a14437b',
      firstName: 'Sumit',
      lastName: 'Maurya',
      headline: 'B.Tech Computer Science Student | Full-stack Developer | AI Enthusiast',
      profilePicture: 'https://media.licdn.com/dms/image/D4D03AQHxK2tQ8vR5Pw/profile-displayphoto-shrink_400_400/0/1234567890123?e=1234567890&v=beta&t=abcdef123456',
      location: 'India',
      positions: [
        {
          title: 'Full-stack Developer',
          company: 'Freelance',
          dates: 'Jun 2023 - Present',
          description: 'Developed scalable web applications using React, Node.js, and MongoDB. Built REST APIs...'
        },
        {
          title: 'Software Engineering Intern',
          company: 'Tech Startup Inc.',
          dates: 'Jan 2023 - May 2023',
          description: 'Worked on frontend development using React and TypeScript. Implemented responsive UI...'
        },
        {
          title: 'Web Development Intern',
          company: 'Digital Solutions Ltd.',
          dates: 'Jun 2022 - Dec 2022',
          description: 'Created dynamic websites using HTML, CSS, JavaScript. Collaborated with design team...'
        }
      ],
      education: [
        {
          school: 'Indian Institute of Technology',
          degree: 'Bachelor of Technology',
          fieldOfStudy: 'Computer Science and Engineering',
          dates: '2020 - 2024'
        },
        {
          school: 'Delhi Public School',
          degree: 'Higher Secondary Certificate',
          fieldOfStudy: 'Science (PCM)',
          dates: '2018 - 2020'
        }
      ],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB'],
      accomplishments: {
        projects: [
          {
            name: 'AI-Powered Portfolio Website',
            description: 'Built a dynamic portfolio website with AI integration using React, Node.js, and OpenAI API. Features include automated content generation and responsive design.'
          },
          {
            name: 'E-commerce Platform',
            description: 'Developed a full-stack e-commerce solution with payment integration, user authentication, and admin dashboard using MERN stack.'
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Developer Associate',
            issuer: 'Amazon Web Services',
            date: '2023-08-15'
          },
          {
            name: 'Full Stack Web Development',
            issuer: 'freeCodeCamp',
            date: '2023-03-20'
          }
        ]
      }
    };

    // Add some randomization for different URLs
    if (vanityName && vanityName !== 'maurya-sumit-25a14437b') {
      mockProfile.id = vanityName;
      mockProfile.firstName = 'John';
      mockProfile.lastName = 'Doe';
      mockProfile.headline = 'Software Engineer | React Developer | Tech Enthusiast';
      mockProfile.location = 'San Francisco, CA';
      mockProfile.positions[0].company = 'Tech Corp';
      mockProfile.education[0].school = 'Stanford University';
    }

    console.log(`Returning mock data for: ${url || 'default profile'}`);

    res.json(mockProfile);

  } catch (error) {
    console.error('Mock data error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to generate mock profile data',
      error: error.message
    });
  }
};

/**
 * Get LinkedIn profile data (using mock data for prototype)
 * POST /api/linkedin-scraper/profile
 * Body: { url: "https://www.linkedin.com/in/maurya-sumit-25a14437b/" }
 */
export const scrapeProfileByUrl = async (req, res) => {
  try {
    // Debug logging
    console.log('Request body:', req.body);
    console.log('Request headers:', req.headers);

    // Check if request body exists
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: 'Request body is required',
        example: { url: 'https://www.linkedin.com/in/maurya-sumit-25a14437b/' }
      });
    }

    const { url } = req.body;
    console.log('Extracted URL:', url);

    // Validate input
    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'LinkedIn profile URL is required',
        example: 'https://www.linkedin.com/in/maurya-sumit-25a14437b/',
        received: req.body
      });
    }

    // Validate LinkedIn URL format
    if (!isValidLinkedInUrl(url)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid LinkedIn profile URL format',
        provided: url,
        expected: 'https://www.linkedin.com/in/username'
      });
    }

    console.log(`Returning prototype data for LinkedIn profile: ${url}`);

    // Extract vanity name from URL for realistic mock data
    const vanityName = extractVanityName(url);

    // Generate realistic fake data for prototype demonstration
    const mockProfile = {
      id: vanityName || 'maurya-sumit-25a14437b',
      firstName: 'Sumit',
      lastName: 'Maurya',
      headline: 'B.Tech Computer Science Student | Full-stack Developer | AI Enthusiast',
      profilePicture: 'https://media.licdn.com/dms/image/D4D03AQHxK2tQ8vR5Pw/profile-displayphoto-shrink_400_400/0/1234567890123?e=1234567890&v=beta&t=abcdef123456',
      location: 'India',
      positions: [
        {
          title: 'Full-stack Developer',
          company: 'Freelance',
          dates: 'Jun 2023 - Present',
          description: 'Developed scalable web applications using React, Node.js, and MongoDB. Built REST APIs...'
        },
        {
          title: 'Software Engineering Intern',
          company: 'Tech Startup Inc.',
          dates: 'Jan 2023 - May 2023',
          description: 'Worked on frontend development using React and TypeScript. Implemented responsive UI...'
        },
        {
          title: 'Web Development Intern',
          company: 'Digital Solutions Ltd.',
          dates: 'Jun 2022 - Dec 2022',
          description: 'Created dynamic websites using HTML, CSS, JavaScript. Collaborated with design team...'
        }
      ],
      education: [
        {
          school: 'Indian Institute of Technology',
          degree: 'Bachelor of Technology',
          fieldOfStudy: 'Computer Science and Engineering',
          dates: '2020 - 2024'
        },
        {
          school: 'Delhi Public School',
          degree: 'Higher Secondary Certificate',
          fieldOfStudy: 'Science (PCM)',
          dates: '2018 - 2020'
        }
      ],
      skills: ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB'],
      accomplishments: {
        projects: [
          {
            name: 'AI-Powered Portfolio Website',
            description: 'Built a dynamic portfolio website with AI integration using React, Node.js, and OpenAI API. Features include automated content generation and responsive design.'
          },
          {
            name: 'E-commerce Platform',
            description: 'Developed a full-stack e-commerce solution with payment integration, user authentication, and admin dashboard using MERN stack.'
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Developer Associate',
            issuer: 'Amazon Web Services',
            date: '2023-08-15'
          },
          {
            name: 'Full Stack Web Development',
            issuer: 'freeCodeCamp',
            date: '2023-03-20'
          }
        ]
      }
    };

    // Add some variation based on different URLs for demo purposes
    if (vanityName && vanityName !== 'maurya-sumit-25a14437b') {
      mockProfile.id = vanityName;
      mockProfile.firstName = 'John';
      mockProfile.lastName = 'Doe';
      mockProfile.headline = 'Software Engineer | React Developer | Tech Enthusiast';
      mockProfile.location = 'San Francisco, CA';
      mockProfile.positions[0].company = 'Tech Corp';
      mockProfile.education[0].school = 'Stanford University';
      mockProfile.skills = ['React', 'TypeScript', 'AWS', 'Docker', 'GraphQL'];
      mockProfile.accomplishments.projects[0].name = 'Cloud-Native Application';
      mockProfile.accomplishments.projects[0].description = 'Built a scalable microservices architecture using AWS, Docker, and Kubernetes for high-traffic applications.';
    }

    // Return the mock profile data directly in the required schema format
    res.json(mockProfile);

  } catch (error) {
    console.error('Profile data error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get LinkedIn profile data',
      error: error.message
    });
  }
};
