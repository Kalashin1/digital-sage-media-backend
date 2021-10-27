import { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'
import  { ArticleInterface } from '../../utils/interface'

const ArticleSchema: Schema<ArticleInterface> = new Schema<ArticleInterface>({
  title: {
    type: String,
    required: [true, 'Please the title of the articke.']
  },
  category: {
    type: String,
    required: [true, 'Please the category of the title.']
  },
  body: {
    type: String,
    required: [true, 'Please the body of the title.']
  },
  createdAt: {
    type: String,
    default: () => new Date().toString()
  },
  updatedAt: {
    type: String,
    default: () => new Date().toString()
  },
  tags: {
    type: [String],
    required: [true, 'Please the tags of the title.']
  },
  author: {
    type: String,
    required: [true, 'Please the author of the title.']
  },
  url: {
    type: String
  },
  dislikes: {
    type: Number,
    default: () => 0
  },
  likes: {
    type: Number,
    default: () => 0
  },
  views: {
    type: Number,
    default: () => 0
  },
  thumbsUp: {
    type: Number,
    default: () => 0
  },
  readingTime: {
    type: Number
  },
  comments: {
    type: [String]
  },
  saves: {
    type: Number,
    default: () => 0
  },
  socialImage: {
    type: String
  }
})

export default ArticleSchema