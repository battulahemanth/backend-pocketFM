import express from "express";
import { getAllStories } from "../controllers/storyController";

const router = express.Router();

router.get("/getAllStories", getAllStories);

export default router;