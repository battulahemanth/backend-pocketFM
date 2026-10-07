import { Router } from "express";

import {
  createStory,
  deleteStory,
  getAllStories,
  getStories,
  getStoryById,
  updateStory,
} from "../controllers/storyController";
import { upload } from "../middleware/upload";

const router = Router();

router.get("/", getStories);
router.get("/getAllStories", getAllStories);
router.get("/:id", getStoryById);
router.post("/", upload.any(), createStory);
router.put("/:id", upload.any(), updateStory);
router.delete("/:id", deleteStory);

export default router;