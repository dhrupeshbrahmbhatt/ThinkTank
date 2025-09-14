import express from "express";
import { fetchGithubData, fetchGithubRepos } from "../controllers/githubController.js";

const router = express.Router();

// Route for GitHub profile
router.get("/profile/:username", fetchGithubData);

// Route for GitHub repos
router.get("/repos/:username", fetchGithubRepos);

export default router;
