import { Request, Response } from 'express'
import Story from '../models/Story'

// GET /api/stories
export const getStories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const stories = await Story.find().sort({ rating: -1 })

    res.status(200).json(stories)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to fetch stories',
    })
  }
}

// GET /api/stories/:id
export const getStoryById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const story = await Story.findOne({ id: req.params.id })

    if (!story) {
      res.status(404).json({
        message: 'Story not found',
      })

      return
    }

    res.status(200).json(story)
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to fetch story',
    })
  }
}

export const createStory = async (req: Request, res: Response) => {
  try {
    const story = await Story.create(req.body);

    res.status(201).json(story)
  } catch (error) {
    res.status(500).json({
      message: "Failed to create story",
      error,
    });
  }
};

export const updateStory = async (req: Request, res: Response) => {
  try {
    const story = await Story.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true },
    )

    if (!story) {
      res.status(404).json({ message: 'Story not found' })
      return
    }

    res.status(200).json(story)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update story',
      error,
    })
  }
}

export const deleteStory = async (req: Request, res: Response) => {
  try {
    const story = await Story.findOneAndDelete({ id: req.params.id })

    if (!story) {
      res.status(404).json({ message: 'Story not found' })
      return
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete story',
      error,
    })
  }
}

export const getAllStories = async (req: Request, res: Response) => {
  try {
    const stories = await Story.find();
    console.log(stories);
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stories",
      error,
    });
  }
};
