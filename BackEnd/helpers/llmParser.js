// helpers/llmParser.js - Gemini LLM integration for README analysis
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ---------------------- MAIN FUNCTIONS ----------------------

export const analyzeReadmeWithLLM = async (readmeContent, repoName = '') => {
  try {
    if (!readmeContent || readmeContent.trim().length === 0) {
      return {
        summary: "",
        features: [],
        tech: []
      };
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
Analyze this README content for a GitHub repository${repoName ? ` named "${repoName}"` : ''} and return ONLY a valid JSON object with the following structure:

{
  "summary": "A concise 2-3 sentence description of what this project does",
  "features": ["Key feature 1", "Key feature 2", "Key feature 3"],
  "tech": ["Technology 1", "Framework 2", "Tool 3"]
}

Guidelines:
- summary: Focus on the main purpose and functionality
- features: Extract 3-5 key features or capabilities (if available)
- tech: List technologies, frameworks, programming languages, and tools mentioned
- Return ONLY the JSON object, no additional text
- If information is not available, use empty arrays or empty strings

README Content:
${readmeContent.slice(0, 8000)} ${readmeContent.length > 8000 ? '...[truncated]' : ''}
`;

    const result = await model.generateContent(prompt);

    // ✅ safer extraction from Gemini response
    let text = "";
    if (result.response?.candidates?.length > 0) {
      text = result.response.candidates[0].content.parts[0].text;
    } else {
      text = result.response.text?.() || "";
    }

    const analysisResult = parseGeminiResponse(text);
    return analysisResult;
  } catch (error) {
    console.warn(`LLM analysis failed for ${repoName}:`, error.message);
    return {
      summary: "",
      features: [],
      tech: []
    };
  }
};

// ---------------------- HELPERS ----------------------

const parseGeminiResponse = (response) => {
  try {
    let cleanResponse = response.trim();
    cleanResponse = cleanResponse.replace(/```json\s*/g, '');
    cleanResponse = cleanResponse.replace(/```\s*/g, '');

    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) cleanResponse = jsonMatch[0];

    const parsed = JSON.parse(cleanResponse);

    return {
      summary: typeof parsed.summary === 'string' ? parsed.summary.trim() : "",
      features: Array.isArray(parsed.features)
        ? parsed.features.filter(f => typeof f === 'string' && f.trim().length > 0).slice(0, 10)
        : [],
      tech: Array.isArray(parsed.tech)
        ? parsed.tech.filter(t => typeof t === 'string' && t.trim().length > 0).slice(0, 20)
        : []
    };
  } catch (parseError) {
    console.warn('Failed to parse Gemini response:', parseError.message);
    return extractFallbackData(response);
  }
};

const extractFallbackData = (response) => {
  const fallback = { summary: "", features: [], tech: [] };
  try {
    const sentences = response.split(/[.!?]+/).filter(s => s.trim().length > 10);
    if (sentences.length > 0) {
      fallback.summary = sentences.slice(0, 2).join('. ').trim() + '.';
    }

    const bulletPoints = response.match(/[-*•]\s*([^\n]+)/g);
    if (bulletPoints) {
      fallback.features = bulletPoints
        .map(bp => bp.replace(/^[-*•]\s*/, '').trim())
        .filter(f => f.length > 0)
        .slice(0, 5);
    }

    const techKeywords = [
      'React', 'Vue', 'Angular', 'Node.js', 'Express', 'MongoDB', 'MySQL',
      'PostgreSQL', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C++',
      'Docker', 'Kubernetes', 'AWS', 'Azure', 'Firebase', 'Next.js', 'Nuxt'
    ];
    fallback.tech = techKeywords.filter(tech =>
      response.toLowerCase().includes(tech.toLowerCase())
    ).slice(0, 10);
  } catch (error) {
    console.warn('Fallback extraction failed:', error.message);
  }
  return fallback;
};

export const generateEnhancedAbout = async (profile, repos) => {
  try {
    if (profile.bio && profile.bio.trim().length > 0) {
      return profile.bio;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const repoContext = repos.slice(0, 10).map(repo => ({
      name: repo.name,
      description: repo.description || '',
      language: repo.language || '',
      stars: repo.stargazers_count || 0
    }));

    const prompt = `
Based on this GitHub profile information, generate a professional "about" section (2-3 sentences):

Profile: ${profile.name || profile.login}
Location: ${profile.location || 'Not specified'}
Public Repos: ${profile.public_repos || 0}
Followers: ${profile.followers || 0}

Top Repositories:
${repoContext.map(repo => `- ${repo.name}: ${repo.description} (${repo.language}, ${repo.stars} stars)`).join('\n')}

Generate a concise, professional about section that highlights their development expertise and interests. Return only the about text, no additional formatting.
`;

    const result = await model.generateContent(prompt);
    let about = "";
    if (result.response?.candidates?.length > 0) {
      about = result.response.candidates[0].content.parts[0].text.trim();
    } else {
      about = result.response.text?.().trim() || "";
    }

    return about || `Developer with ${profile.public_repos || 0} public repositories, showcasing expertise in various technologies and contributing to the open-source community.`;
  } catch (error) {
    console.warn('Failed to generate enhanced about section:', error.message);
    const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];
    return `Developer specializing in ${languages.slice(0, 3).join(', ')} with ${profile.public_repos || 0} public repositories.`;
  }
};

// ---------------------- SAFE FALLBACK ----------------------

/**
 * Ensure a safe summary is always returned
 * @param {string} readmeSummary
 * @returns {string}
 */
export const getSafeReadmeSummary = (readmeSummary) => {
  return readmeSummary && readmeSummary.trim().length > 0
    ? readmeSummary
    : "No README present";
};
