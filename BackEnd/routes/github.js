import express from "express";
import { fetchGithubData, fetchGithubRepos, fetchEnrichedGithubProfile } from "../controllers/githubController.js";

const router = express.Router();

// Route for GitHub profile (basic)
router.get("/profile/:username", fetchGithubData);

// Route for GitHub repos (enhanced with README analysis)
router.get("/repos/:username", fetchGithubRepos);

// Route for complete enriched GitHub profile (profile + repos with README analysis)
router.get("/enriched/:username", fetchEnrichedGithubProfile);

export default router;
