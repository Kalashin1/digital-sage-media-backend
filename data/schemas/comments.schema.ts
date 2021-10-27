import { Schema } from 'mongoose'
import { CommentInterface } from '../../utils/interface'

const CommentSchema: Schema<CommentInterface> = new Schema<CommentInterface>({
  article: {
    type: String,
    required: [true, 'Please the article the comments belong to.']
  },
  createdAt: {
    type: String,
    default: () => new Date().toString()
  },
  updatedAt: {
    type: String,
    default: () => new Date().toString()
  },
  body: {
    type: String,
    required: [true, 'Please the body of the comment.']
  },
  user: {
    type: String,
    required: [true, 'Please the author of the title.']
  }
})