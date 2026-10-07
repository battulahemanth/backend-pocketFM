import { Request, Response } from 'express'
import Story, { type IStory } from '../models/Story'

// GET /api/stories
export const getStories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const stories = await Story.find().sort({ rating: -1 })

    res.status(200).json(stories)
  } catch (error) {
    console.error('Get stories error:', error)

    res.status(500).json({
      message: 'Failed to fetch stories',
    })
  }
}

// GET /api/stories/getAllStories
export const getAllStories = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const stories = await Story.find()

    res.status(200).json(stories)
  } catch (error) {
    console.error('Get all stories error:', error)

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
    const story = await Story.findOne({
      id: req.params.id,
    })

    if (!story) {
      res.status(404).json({
        message: 'Story not found',
      })
      return
    }

    res.status(200).json(story)
  } catch (error) {
    console.error('Get story by ID error:', error)

    res.status(500).json({
      message: 'Failed to fetch story',
    })
  }
}

// POST /api/stories
export const createStory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const story = await Story.create(req.body)

    res.status(201).json({
      message: 'Story created successfully',
      story,
    })
  } catch (error) {
    console.error('Create story error:', error)

    res.status(500).json({
      message: 'Failed to create story',
      error,
    })
  }
}

// PUT /api/stories/:id
export const updateStory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fields = [
      'title',
      'author',
      'description',
      'episodes',
      'image',
      'rating',
      'plays',
      'category',
      'subcategory',
    ] as const satisfies readonly (keyof IStory)[]

    const updates = Object.fromEntries(
      fields
        .filter((field) =>
          Object.prototype.hasOwnProperty.call(req.body, field)
        )
        .map((field) => [field, req.body[field]])
    )

    const story = await Story.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    )

    if (!story) {
      res.status(404).json({
        message: 'Story not found',
      })
      return
    }

    res.status(200).json({
      message: 'Story updated successfully',
      story,
    })
  } catch (error) {
    console.error('Update story error:', error)

    res.status(500).json({
      message: 'Failed to update story',
    })
  }
}

// DELETE /api/stories/:id
export const deleteStory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const story = await Story.findOneAndDelete({
      id: req.params.id,
    })

    if (!story) {
      res.status(404).json({
        message: 'Story not found',
      })
      return
    }

    res.status(200).json({
      message: 'Story deleted successfully',
      story,
    })
  } catch (error) {
    console.error('Delete story error:', error)

    res.status(500).json({
      message: 'Failed to delete story',
      error,
    })
  }
}