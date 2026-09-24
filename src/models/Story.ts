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
  rating: number;
  plays: number;
  image: string;
  category: string;
  subcategory: string;
  description: string;
  episodes: Episode[];
}

const EpisodeSchema = new Schema(
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
      default: "10:00",
    },

    audioUrl: {
      type: String,
      default: "",
    },

    locked: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const StorySchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    plays: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      default: "",
    },

    category: {
      type: String,
      default: "Fantasy",
    },

    subcategory: {
      type: String,
      default: "Adventure",
    },

    description: {
      type: String,
      default: "",
    },

    episodes: {
      type: [EpisodeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IStory>("Story", StorySchema);