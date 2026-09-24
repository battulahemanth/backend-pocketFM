import { Router } from 'express'

import {
  createStory,
  updateStory,
  deleteStory,
  getStories,
  getStoryById,
  getAllStories
} from '../controllers/storyController'

const router = Router()

router.get("/", getStories);

router.get("/getAllStories", getAllStories);

router.get("/:id", getStoryById);

router.post("/", createStory);

router.put("/:id", updateStory);

router.delete("/:id", deleteStory);

export default router