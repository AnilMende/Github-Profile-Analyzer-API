import express from "express";
import { analyzeProfile, getAllProfiles, getProfileByUsername } from "../controllers/githubController.js";

const router = express.Router();

router.post("/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profiles/:username", getProfileByUsername);

export default router;