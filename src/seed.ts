import mongoose from 'mongoose'
import dotenv from 'dotenv'

import Story from './models/Story'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined')
}

const stories = [
  {
    id: '1',
    title: 'panchatantra కథలు',
    author: 'Hemanth',
    rating: 4.8,
    plays: 1200000,
    image: '/images/story1.png',
    category: 'moral',
    subcategory: 'animal',

    description:
      'the moral stories for children are a collection of short stories that teach valuable life lessons and ethical values. These stories often feature animals as characters and convey important messages about honesty, kindness, friendship, and other virtues.',

    episodes: [
      {
        id: 'ep1',
        title: 'ఏనుగు-కుందేళ్ళ కథ',
        duration: '0:58',
          audioUrl:
            '/audio/Stories/Moral Stories/ఏనుగు – కుందేళ్లు.wav',
        locked: false,
      },

      {
        id: 'ep2',
        title: 'ఏనుగు-చీమ కథ',
        duration: '0:47',
          audioUrl:
            '/audio/Stories/Moral Stories/ఏనుగు – చీమలు.wav',
        locked: false,
      },

      {
        id: 'ep3',
        title: 'కాకి-నక్క కథ',
        duration: '0:43',
          audioUrl:
            '/audio/Stories/Moral Stories/కాకి – నక్క.wav',
        locked: false,
      },

      {
        id: 'ep4',
        title: 'కుక్క-ప్రతిబింబం కథ',
        duration: '0:42',
          audioUrl:
            '/audio/Stories/Moral Stories/కుక్క – ప్రతిబింబం.wav',
        locked: true,
      },

      {
        id: 'ep5',
        title: 'కోతి-మొసలి కథ',
        duration: '0:57',
          audioUrl:
            '/audio/Stories/Moral Stories/కోతి – మొసలి.wav',
        locked: true,
      },

      {
        id: 'ep6',
        title: 'తాబేలు-రెండు హంసలు కథ',
        duration: '1:01',
          audioUrl:
            '/audio/Stories/Moral Stories/తాబేలు – రెండు హంసలు.wav',
        locked: true,
      },

      {
        id: 'ep7',
        title: 'మేక-నక్క కథ',
        duration: '0:49',
          audioUrl:
            '/audio/Stories/Moral Stories/మేక – నక్క.wav',
        locked: true,
      },

      {
        id: 'ep8',
        title: 'రెండు పక్షులు-వేటగాడు కథ',
        duration: '0:53',
          audioUrl:
            '/audio/Stories/Moral Stories/రెండు పక్షులు – వేటగాడు.wav',
        locked: true,
      },

      {
        id: 'ep9',
        title: 'సింహం-ఎలుక కథ',
        duration: '0:53',
          audioUrl:
            '/audio/Stories/Moral Stories/సింహం – ఎలుక.wav',
        locked: true,
      },

      {
        id: 'ep10',
        title: 'కాకి-పాము కథ',
        duration: '0:53',
          audioUrl:
            '/audio/Stories/Moral Stories/కాకి – పాము.wav',
        locked: true,
      },
    ],
  },
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI)

    console.log('MongoDB Connected')

    // Remove existing stories
    await Story.deleteMany({})

    // Insert frontend stories
    await Story.insertMany(stories)

    console.log('Stories inserted successfully')

    await mongoose.disconnect()

    console.log('MongoDB connection closed')
  } catch (error) {
    console.error('Seed error:', error)

    await mongoose.disconnect()

    process.exit(1)
  }
}

seedDatabase()