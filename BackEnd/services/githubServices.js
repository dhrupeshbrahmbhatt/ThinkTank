import fetch from "node-fetch";

// Fetch GitHub profile
export const getGitHubData = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}`);
  if (!res.ok) throw new Error("GitHub user not found");
  return await res.json();
};

// Fetch GitHub repos
export const getGitHubRepos = async (username) => {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) throw new Error("GitHub repos not found");
  return await res.json();
};
