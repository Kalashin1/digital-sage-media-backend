import { Schema } from 'mongoose'
import { CommentInterface } from '../../utils/interface'

const CommentSchema: Schema<CommentInterface> = new Schema<CommentInterface>({
  articleId: {
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
  userId: {
    type: String,
    required: [true, 'Please the author of the title.']
  },
  parentCommentId: {
    type: String
  },
  likes: {
    type: Number,
    default: () => 0
  }
})

export default CommentSchema