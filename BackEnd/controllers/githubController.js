//BackEnd\controllers\githubController.js
import { getGitHubData, getGitHubRepos, getRepoReadmeWithAnalysis, getRepoLanguages } from "../services/githubServices.js";
import { generateEnhancedAbout } from "../helpers/llmParser.js";

// Export controller to fetch GitHub profile with enriched data
export const fetchGithubData = async (req, res) => {
  try {
    const { username } = req.params;
    const [profile, repos] = await Promise.all([
      getGitHubData(username),
      getGitHubRepos(username)
    ]);

    // Generate enhanced about section using LLM
    const about = await generateEnhancedAbout(profile, repos);

    // Aggregate skills from all repositories (will be enhanced with LLM data later)
    const allSkills = new Set();
    
    // Add primary languages from repos
    repos.forEach(repo => {
      if (repo.language) {
        allSkills.add(repo.language);
      }
    });

    const cleanedData = {
      basicInfo: {
        fullName: profile.name || username,
        headline: profile.bio || "Developer",
        location: profile.location || "",
        email: null,
        phone: null,
        profileImage: profile.avatar_url,
        social: {
          github: profile.html_url,
          linkedin: null,
          twitter: profile.twitter_username
            ? `https://twitter.com/${profile.twitter_username}`
            : null,
          portfolio: profile.blog || null,
        },
        // Enhanced profile data
        followers: profile.followers || 0,
        following: profile.following || 0,
        publicRepos: profile.public_repos || 0,
      },
      about,
      skills: Array.from(allSkills),
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      achievements: [],
    };

    res.json(cleanedData);
  } catch (error) {
    if (error.message.includes("rate limit")) {
      res.status(429).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// Export controller to fetch GitHub repos with enhanced project data
export const fetchGithubRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const repos = await getGitHubRepos(username);

    // Process all repositories with LLM-powered README analysis
    const projectPromises = repos.map(async (repo) => {
      const [readmeData, languages] = await Promise.all([
        getRepoReadmeWithAnalysis(repo.owner.login, repo.name),
        getRepoLanguages(repo.owner.login, repo.name)
      ]);

      // Extract tech stack from languages and LLM analysis
      const techFromLanguages = Object.keys(languages);
      const techFromLLM = readmeData.analysis.tech || [];
      const allTech = [...new Set([...techFromLanguages, ...techFromLLM])];

      // Build enhanced project object
      const project = {
        title: repo.name,
        description: repo.description || readmeData.analysis.summary || "",
        repo: repo.html_url,
        live: repo.homepage || null,
        tech: allTech,
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        lastUpdated: repo.updated_at,
        createdAt: repo.created_at,
        isPrivate: repo.private
      };

      // Add LLM-derived data
      project.readmeSummary = readmeData.analysis.summary || "";
      project.features = readmeData.analysis.features || [];

      return project;
    });

    // Wait for all projects to be processed
    const projects = await Promise.all(projectPromises);

    // Aggregate all unique skills across repositories
    const allSkills = new Set();
    projects.forEach(project => {
      project.tech.forEach(tech => allSkills.add(tech));
    });

    // Sort projects by stars and last updated date
    const sortedProjects = projects
      .filter(project => !project.isPrivate) // Only include public repos
      .sort((a, b) => {
        // First sort by stars (descending)
        if (b.stars !== a.stars) {
          return b.stars - a.stars;
        }
        // Then by last updated (most recent first)
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      });

    res.json({ 
      projects: sortedProjects,
      skills: Array.from(allSkills),
      totalRepos: repos.length,
      publicRepos: sortedProjects.length
    });
  } catch (error) {
    if (error.message.includes("rate limit")) {
      res.status(429).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// Export controller to fetch complete enriched GitHub profile (profile + repos)
export const fetchEnrichedGithubProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const [profile, repos] = await Promise.all([
      getGitHubData(username),
      getGitHubRepos(username)
    ]);

    // Process all repositories with LLM-powered README analysis
    const projectPromises = repos.map(async (repo) => {
      const [readmeData, languages] = await Promise.all([
        getRepoReadmeWithAnalysis(repo.owner.login, repo.name),
        getRepoLanguages(repo.owner.login, repo.name)
      ]);

      // Extract tech stack from languages and LLM analysis
      const techFromLanguages = Object.keys(languages);
      const techFromLLM = readmeData.analysis.tech || [];
      const allTech = [...new Set([...techFromLanguages, ...techFromLLM])];

      // Build enhanced project object
      const project = {
        title: repo.name,
        description: repo.description || readmeData.analysis.summary || "",
        repo: repo.html_url,
        live: repo.homepage || null,
        tech: allTech
      };

      // Add LLM-derived data
      project.readmeSummary = readmeData.analysis.summary || "";
      project.features = readmeData.analysis.features || [];

      return project;
    });

    // Wait for all projects to be processed
    const allProjects = await Promise.all(projectPromises);

    // Filter to only public repositories and sort by relevance
    const publicProjects = allProjects
      .filter((_, index) => !repos[index].private)
      .sort((a, b) => {
        const repoA = repos.find(r => r.name === a.title);
        const repoB = repos.find(r => r.name === b.title);
        
        // Sort by stars first, then by last updated
        if (repoB.stargazers_count !== repoA.stargazers_count) {
          return repoB.stargazers_count - repoA.stargazers_count;
        }
        return new Date(repoB.updated_at) - new Date(repoA.updated_at);
      });

    // Aggregate all unique skills across repositories
    const allSkills = new Set();
    
    // Add skills from repository languages
    repos.forEach(repo => {
      if (repo.language) {
        allSkills.add(repo.language);
      }
    });

    // Add skills extracted from READMEs
    publicProjects.forEach(project => {
      project.tech.forEach(tech => allSkills.add(tech));
    });

    // Generate enhanced about section using LLM
    const about = await generateEnhancedAbout(profile, repos);

    // Build the final enriched profile response
    const enrichedProfile = {
      basicInfo: {
        fullName: profile.name || username,
        headline: profile.bio || "Developer",
        location: profile.location || "",
        profileImage: profile.avatar_url,
        social: {
          github: profile.html_url,
          linkedin: "",
          twitter: profile.twitter_username
            ? `https://twitter.com/${profile.twitter_username}`
            : "",
          portfolio: profile.blog || ""
        },
        followers: profile.followers || 0,
        following: profile.following || 0,
        publicRepos: profile.public_repos || 0
      },
      about,
      skills: Array.from(allSkills),
      projects: publicProjects,
      education: [],
      experience: [],
      certifications: [],
      achievements: []
    };

    res.json(enrichedProfile);
  } catch (error) {
    if (error.message.includes("rate limit")) {
      res.status(429).json({ success: false, message: error.message });
    } else {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};
