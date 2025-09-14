// utils/readmeParser.js - Helper functions for parsing README content

/**
 * Extract a summary from README content (3-4 sentences)
 * @param {string} readmeText - The README content
 * @returns {string} - Extracted summary
 */
export const extractSummary = (readmeText) => {
  if (!readmeText) return "";
  
  // Remove markdown formatting and get clean text
  const cleanText = readmeText
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // Replace links with text
    .replace(/#{1,6}\s*/g, '') // Remove headers
    .replace(/\*\*([^*]*)\*\*/g, '$1') // Remove bold
    .replace(/\*([^*]*)\*/g, '$1') // Remove italic
    .replace(/^\s*[-*+]\s+/gm, '') // Remove bullet points
    .replace(/^\s*\d+\.\s+/gm, '') // Remove numbered lists
    .trim();

  // Split into sentences and take first 3-4
  const sentences = cleanText
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 10); // Filter out very short sentences
  
  return sentences.slice(0, 4).join('. ') + (sentences.length > 0 ? '.' : '');
};

/**
 * Extract features from README content
 * @param {string} readmeText - The README content
 * @returns {string[]} - Array of features
 */
export const extractFeatures = (readmeText) => {
  if (!readmeText) return [];
  
  const features = [];
  const lines = readmeText.split('\n');
  
  let inFeaturesSection = false;
  const featureKeywords = /^(##?\s*)?(features?|functionality|capabilities|what\s+it\s+does|key\s+features)/i;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if we're entering a features section
    if (featureKeywords.test(line)) {
      inFeaturesSection = true;
      continue;
    }
    
    // Stop if we hit another section header
    if (inFeaturesSection && line.match(/^#{1,6}\s+/)) {
      break;
    }
    
    // Extract bullet points or numbered items
    if (inFeaturesSection) {
      const bulletMatch = line.match(/^\s*[-*+]\s+(.+)/);
      const numberMatch = line.match(/^\s*\d+\.\s+(.+)/);
      
      if (bulletMatch) {
        features.push(bulletMatch[1].replace(/\*\*([^*]*)\*\*/g, '$1').trim());
      } else if (numberMatch) {
        features.push(numberMatch[1].replace(/\*\*([^*]*)\*\*/g, '$1').trim());
      }
    }
  }
  
  // If no features section found, look for general bullet points in first part of README
  if (features.length === 0) {
    const firstHalf = lines.slice(0, Math.min(50, lines.length));
    for (const line of firstHalf) {
      const bulletMatch = line.match(/^\s*[-*+]\s+(.+)/);
      if (bulletMatch && bulletMatch[1].length > 10) {
        features.push(bulletMatch[1].replace(/\*\*([^*]*)\*\*/g, '$1').trim());
      }
    }
  }
  
  return features.slice(0, 10); // Limit to 10 features
};

/**
 * Extract tech stack/skills from README content
 * @param {string} readmeText - The README content
 * @returns {string[]} - Array of technologies/skills
 */
export const extractSkills = (readmeText) => {
  if (!readmeText) return [];
  
  const skillsSet = new Set();
  const text = readmeText.toLowerCase();
  
  // Common tech stack keywords
  const techKeywords = [
    // Frontend
    'react', 'vue', 'angular', 'svelte', 'nextjs', 'next.js', 'nuxt', 'gatsby',
    'html', 'css', 'javascript', 'typescript', 'jsx', 'tsx', 'sass', 'scss',
    'tailwind', 'bootstrap', 'material-ui', 'mui', 'chakra-ui', 'styled-components',
    
    // Backend
    'node.js', 'nodejs', 'express', 'fastify', 'koa', 'nest.js', 'nestjs',
    'python', 'django', 'flask', 'fastapi', 'ruby', 'rails', 'php', 'laravel',
    'java', 'spring', 'c#', 'asp.net', 'go', 'gin', 'rust', 'actix',
    
    // Databases
    'mongodb', 'mysql', 'postgresql', 'sqlite', 'redis', 'firebase', 'supabase',
    'prisma', 'mongoose', 'sequelize', 'typeorm',
    
    // Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'heroku', 'vercel', 'netlify',
    'github actions', 'gitlab ci', 'jenkins', 'terraform', 'ansible',
    
    // Tools & Others
    'git', 'webpack', 'vite', 'rollup', 'babel', 'eslint', 'prettier',
    'jest', 'cypress', 'playwright', 'testing-library', 'storybook',
    'graphql', 'rest api', 'websocket', 'socket.io', 'jwt', 'oauth',
    'stripe', 'paypal', 'twilio', 'sendgrid'
  ];
  
  // Look for tech keywords in the text
  for (const tech of techKeywords) {
    const regex = new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(text)) {
      // Normalize the tech name
      const normalizedTech = tech
        .split(/[-.\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      skillsSet.add(normalizedTech);
    }
  }
  
  // Look for package.json dependencies mentioned
  const packageJsonMatch = text.match(/"dependencies"[\s\S]*?"devDependencies"/);
  if (packageJsonMatch) {
    const deps = packageJsonMatch[0];
    for (const tech of techKeywords) {
      if (deps.includes(`"${tech}"`)) {
        const normalizedTech = tech
          .split(/[-.\s]+/)
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('');
        skillsSet.add(normalizedTech);
      }
    }
  }
  
  return Array.from(skillsSet);
};

/**
 * Generate an auto-summary from repository data when bio is not available
 * @param {Array} repos - Array of repository objects
 * @returns {string} - Generated summary
 */
export const generateAutoSummary = (repos) => {
  if (!repos || repos.length === 0) {
    return "Developer with experience in various technologies and projects.";
  }
  
  // Get most used languages
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });
  
  const topLanguages = Object.entries(languages)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([lang]) => lang);
  
  const repoCount = repos.length;
  const publicRepos = repos.filter(repo => !repo.private).length;
  
  let summary = "Developer";
  
  if (topLanguages.length > 0) {
    summary += ` specializing in ${topLanguages.join(', ')}`;
  }
  
  summary += ` with ${publicRepos} public repositories`;
  
  if (repoCount > 10) {
    summary += ", demonstrating extensive experience in software development";
  } else if (repoCount > 5) {
    summary += ", showing solid programming experience";
  }
  
  summary += ". Passionate about building innovative solutions and contributing to open-source projects.";
  
  return summary;
};
