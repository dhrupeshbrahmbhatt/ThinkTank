import express from "express";
import authController from "../controllers/authController.js"; // default import
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// Auth routes (wrap methods)
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/refresh", (req, res) => authController.refresh(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

// Protected route
router.get("/me", authenticateToken, (req, res) => authController.getProfile(req, res));

export default router;
