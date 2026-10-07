import dotenv from 'dotenv'

import connectDB, { disconnectFromMongoDB } from './config/db'
import Story from './models/Story'

dotenv.config()

const stories = [
  {
    id: '1',
    title: 'panchatantra కథలు',
    author: 'Hemanth',
    rating: 4.8,
    plays: 1200000,
    image: '/images/kaki-kunda.png',
    category: 'moral',
    subcategory: 'animal',

    description:
      'the moral stories for children are a collection of short stories that teach valuable life lessons and ethical values. These stories often feature animals as characters and convey important messages about honesty, kindness, friendship, and other virtues.',

    episodes: [

      {
        id: 'ep1',
        title: 'సింహం-ఎలుక కథ',
        duration: '0:46',
          audioUrl:
            '/audio/Stories/Moral Stories/సింహం – ఎలుక.wav',
        locked: false,
      },

      {
        id: 'ep2',
        title: 'కాకి-కుండ కథ',
        duration: '0:38',
          audioUrl:
            '/audio/Stories/Moral Stories/కాకి-కుండ.wav',
        locked: false,
      },
    ],
  },
]

const seedDatabase = async () => {
  try {
    await connectDB()

    for (const story of stories) {
      await Story.updateOne({ id: story.id }, { $set: story }, { upsert: true })
    }

    console.log('Stories inserted successfully')

    await disconnectFromMongoDB()

    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Seed error:', error)

    try {
      await disconnectFromMongoDB()
    } catch (disconnectError) {
      console.error('Error closing MongoDB connection:', disconnectError)
    }

    process.exitCode = 1
  }
}

seedDatabase()