//BackEnd\controllers\githubController.js
import { getGitHubData, getGitHubRepos } from "../services/githubServices.js";
// Export controller to fetch GitHub profile
export const fetchGithubData = async (req, res) => {
  try {
    const { username } = req.params;
    const profile = await getGitHubData(username);

    const cleanedData = {
      basicInfo: {
        fullName: profile.name || username,
        headline: profile.bio || "",
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
      },
      about: profile.bio || "",
      skills: [],
      education: [],
      experience: [],
      projects: [],
      certifications: [],
      achievements: [],
    };

    res.json(cleanedData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Export controller to fetch GitHub repos
export const fetchGithubRepos = async (req, res) => {
  try {
    const { username } = req.params;
    const repos = await getGitHubRepos(username);

    const projects = repos.slice(0, 5).map((r) => ({
      title: r.name,
      description: r.description || "",
      repo: r.html_url,
      live: r.homepage || null,
      tech: [r.language].filter(Boolean),
    }));

    res.json({ projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
