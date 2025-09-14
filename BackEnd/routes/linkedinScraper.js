// routes/linkedinScraper.js - LinkedIn Scraper Routes
import express from 'express';
import { scrapeProfileByUrl, getMockProfileData } from '../controllers/linkedinScraperController.js';

const router = express.Router();

// Mock/fake data endpoint for testing
router.post('/mock', getMockProfileData);

// Scrape profile by URL (POST with URL in body)
router.post('/profile', scrapeProfileByUrl);

export default router;
