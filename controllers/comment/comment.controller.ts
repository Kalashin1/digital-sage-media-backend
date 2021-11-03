import { CreateContextOptions } from "vm";
import Comments from "../../data/models/comment.model";
import UserModel from "../../data/models/user.model";
import { CommentInterface, CreateChildComment, CreateComment } from "../../utils/interface";

export const CommentQueries = {
  async comments(_: any, { articleId }){
    return await Comments.find({articleId})
  },
  async comment(_:any, { id }){
    return await Comments.findById(id)
  }
}


export const CommentMutations = {
  async createComment(_:any, { comment }){ 
    return await Comments.createComment(comment)
  },
  async editComment(_:any, { comment }){
    return await Comments.editComment(comment)
  },
  async deleteComment(_:any, { comment }){
    return await Comments.deleteComment(comment)
  },
  async likeComment(_:any, { userId, optn, commentId }){
    const Comment = await Comments.findById(commentId)
    return await Comment.likeComment(userId, optn)
  },
  async createChildComment(_:any, { comment }){
    const Comment = await Comments.findById(comment.parentCommentId);
    if(Comment){
      return await Comment.comment(comment)
    }
    throw Error('No comment exists with that id')
  }
}

export const Comment = {
  async comments(parent: any){
    const comments = Comments.find({ parentCommentId: parent._id})
    return comments
  },
  async user(parent: CommentInterface){
    const User = await UserModel.findById(parent.userId)
    return User
  }
}