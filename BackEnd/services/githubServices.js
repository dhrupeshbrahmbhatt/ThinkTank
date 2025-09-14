import fetch from "node-fetch";
import { analyzeReadmeWithLLM } from "../helpers/llmParser.js";

// Check if we're hitting GitHub API rate limit
const checkRateLimit = (response) => {
  if (response.status === 403) {
    const rateLimitRemaining = response.headers.get('x-ratelimit-remaining');
    if (rateLimitRemaining === '0') {
      throw new Error("GitHub API rate limit exceeded. Please try again later.");
    }
  }
};

// Fetch GitHub profile with enhanced data
export const getGitHubData = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  
  if (!res.ok) {
    checkRateLimit(res);
    throw new Error(`GitHub user not found: ${res.status}`);
  }
  
  return await res.json();
};

// Fetch all GitHub repos for a user
export const getGitHubRepos = async (username) => {
  const allRepos = [];
  let page = 1;
  const perPage = 100; // Maximum allowed by GitHub API
  
  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?page=${page}&per_page=${perPage}&sort=updated`
    );
    
    if (!res.ok) {
      checkRateLimit(res);
      throw new Error(`GitHub repos not found: ${res.status}`);
    }
    
    const repos = await res.json();
    
    if (repos.length === 0) break;
    
    allRepos.push(...repos);
    
    // If we got less than perPage repos, we've reached the end
    if (repos.length < perPage) break;
    
    page++;
  }
  
  return allRepos;
};

// Fetch README content for a specific repository with LLM analysis
export const getRepoReadme = async (owner, repo) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!res.ok) {
      // README not found is common, don't throw error
      if (res.status === 404) {
        return null;
      }
      checkRateLimit(res);
      throw new Error(`Failed to fetch README: ${res.status}`);
    }
    
    const readmeData = await res.json();
    
    // Decode base64 content
    let readmeContent = null;
    if (readmeData.content && readmeData.encoding === 'base64') {
      readmeContent = Buffer.from(readmeData.content, 'base64').toString('utf-8');
    } else {
      readmeContent = readmeData.content || null;
    }
    
    return readmeContent;
  } catch (error) {
    // Return null for any README fetch errors to avoid breaking the main flow
    console.warn(`Could not fetch README for ${owner}/${repo}:`, error.message);
    return null;
  }
};

// Fetch README content and analyze it with LLM
export const getRepoReadmeWithAnalysis = async (owner, repo) => {
  try {
    const readmeContent = await getRepoReadme(owner, repo);
    
    if (!readmeContent) {
      return {
        content: null,
        analysis: {
          summary: "",
          features: [],
          tech: []
        }
      };
    }
    
    // Analyze README with Gemini LLM
    const analysis = await analyzeReadmeWithLLM(readmeContent, repo);
    
    return {
      content: readmeContent,
      analysis
    };
  } catch (error) {
    console.warn(`Could not analyze README for ${owner}/${repo}:`, error.message);
    return {
      content: null,
      analysis: {
        summary: "",
        features: [],
        tech: []
      }
    };
  }
};

// Fetch repository languages
export const getRepoLanguages = async (owner, repo) => {
  try {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    
    if (!res.ok) {
      if (res.status === 404) {
        return {};
      }
      checkRateLimit(res);
      return {};
    }
    
    return await res.json();
  } catch (error) {
    console.warn(`Could not fetch languages for ${owner}/${repo}:`, error.message);
    return {};
  }
};
