import mongoose, { Schema, Document } from "mongoose";

interface Episode {
  id: string;
  title: string;
  duration: string;
  audioUrl: string;
  locked: boolean;
}

export interface IStory extends Document {
  id: string;
  title: string;
  author: string;
  description: string;
  episodes: Episode[];
  image: string;
  rating: number;
  plays: number;
  category: string;
  subcategory: string;
  createdAt: Date;
  updatedAt: Date;
}

const episodeSchema = new Schema<Episode>(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    locked: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const storySchema = new Schema<IStory>(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    episodes: {
      type: [episodeSchema],
      default: [],
    },

    image: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      default: 0,
    },

    plays: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "",
    },

    subcategory: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model<IStory>("Story", storySchema);

export default Story;
