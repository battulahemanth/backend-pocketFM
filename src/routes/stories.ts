import express from "express";
import Story from "../models/Story";

const router = express.Router();


// ============================
// GET ALL STORIES
// ============================
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });

    res.status(200).json(stories);
  } catch (error) {
    console.error("GET STORIES ERROR:", error);

    res.status(500).json({
      message: "Failed to get stories",
    });
  }
});


// ============================
// ADD NEW STORY
// ============================
router.post("/", async (req, res) => {
  try {
    console.log("Story received:", req.body);

    const story = await Story.create(req.body);

    console.log("Story saved:", story);

    res.status(201).json(story);
  } catch (error) {
    console.error("ADD STORY ERROR:", error);

    res.status(500).json({
      message: "Failed to add story",
      error,
    });
  }
});


// ============================
// UPDATE STORY
// ============================
router.put("/:id", async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json(story);
  } catch (error) {
    console.error("UPDATE STORY ERROR:", error);

    res.status(500).json({
      message: "Failed to update story",
    });
  }
});


// ============================
// DELETE STORY
// ============================
router.delete("/:id", async (req, res) => {
  try {
    const story = await Story.findOneAndDelete({
      id: req.params.id,
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    res.status(200).json({
      message: "Story deleted successfully",
    });
  } catch (error) {
    console.error("DELETE STORY ERROR:", error);

    res.status(500).json({
      message: "Failed to delete story",
    });
  }
});


export default router;