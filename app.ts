import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()

import { getUsers, createAccount, login, getUser, updatePhoneNumber, updateDOB, updateDisplayImage, updateSocialMediaInfo, updateGender, deleteUser } from './controllers/user/user.controller'
import ArticleMutations from "./controllers/article/article.controller";
import Articles from "./data/models/article.model";
import { ArticleQueries, Article } from "./controllers/article/article.controller";
import { CommentQueries, CommentMutations, Comment } from "./controllers/comment/comment.controller";
import UserModel from "./data/models/user.model";
const url = 'mongodb://localhost:27017/disme'

const typeDefs = gql`
  type User {
    name: String!
    _id: ID!
    email: String!
    emailVerified: String!
    phoneNumber: String!
    displayImage: String!
    gender: String!
    dob: String!
    token: String!
    createdAt: String!
    socialMediaInfo: _SocialMediaInfo
    savedArticles: [Article]
    articles: [Article]
    followers: [User]!
    following: [User]!
  }

  type Article {
    _id: ID
    title: String!
    createdAt: String!
    updatedAt: String!
    body: String!
    socialImage: String!
    url: String!
    tags: [String!]!
    category: String!
    views: Int!
    readingTime: String!
    likes: Int!
    dislikes: Int!
    saves: Int!
    thumbsUp: Int!
    author: String!
    comments: [Comment!]!
  }

  type Comment {
    _id: ID
    createdAt: String!
    updatedAt: String!
    body: String!
    userId: String!
    parentCommentId: String
    articleId: String!
    likes: Int!
    comments: [Comment]!
  }

  type _SocialMediaInfo {
    facebook: String!
    twitter: String!
    instagram: String!
  }

  type Query {
    users: [User!]!
    user(id: String): User!
    articles: [Article!]!
    article(id: String): Article!
    comments(articleId: String): [Comment!]!
    comment(id: String): Comment!
  }

  input CreateAccount {
    name: String
    email: String
    phoneNumber: String
    gender: String
    password: String
  }

  input LoginInfo{
    email: String
    password: String
  }

  input SocialMediaInfo {
    facebook: String
    twitter: String
    instagram: String
  }

  input CreateArticleInput {
    title: String!
    body: String!
    tags: [String!]!
    category: String!
    author: String!
    socialImage: String
    _id: String
  }

  input CreateComment {
    _id: ID
    userId: String!
    articleId: String!
    body: String!
    parentCommentId: String
  }

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User!
    updateDOB(id: String, dob: String): User!
    updateDisplayImage(id: String, imageUrl: String): User!
    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!
    updatePhoneNumber(id: String, phoneNumber: String): User!
    updateGender(id: String, gender: String): User!
    deleteAccount(id: String): User!
    followUser(userId: String, followerId: String): User!
    unFollowUser(userId: String, followerId: String): User!
    createArticle(article: CreateArticleInput): Article
    updateArticle(article: CreateArticleInput): Article
    deleteArticle(article: CreateArticleInput): Article
    toggleLikes(articleId: String, userId: String, optn: String): Article
    toggleSaves(articleId: String, userId: String, optn: String): Article
    toggleViews(articleId: String, userId: String, optn: String): Article
    createComment(comment: CreateComment): Comment
    editComment(comment: CreateComment): Comment
    deleteComment(comment: CreateComment): Comment
    createChildComment(comment: CreateComment): Comment 
    likeComment(userId: String, optn: String, commentId: String): Comment
  }
`

const resolvers = {
  User: {
    async articles (parent: any){
      return await Articles.getUserArticles(parent._id)
    },
    async savedArticles(parent:any){
      const articles = parent.savedArticles.map(async (article) => {
        return Articles.findById(article)
      })
      return articles
    },
    async followers(parent:any){
      return parent.followers.map(f => UserModel.findById(f))
    },
    async following(parent:any){
      return parent.following.map(f => UserModel.findById(f))
    }
  },
  Article,
  Comment,
  Query : {
    users (_: any, args: any, context: any) {
      // console.log(context.req.headers.usertoken);
      return getUsers()
    },
    user (_:any, { id }, context: any){
      return getUser(id)
    },
    ...ArticleQueries,
    ...CommentQueries
  },

  Mutation: {
    async createAccount(_:any, { profile }, context: any){
      const [ User, token ] = await createAccount(profile);
      User.token = token
      return User
    },
    async login(_:any, { loginInfo }, context: any){
      const [ user, token ] = await login(loginInfo)
      user.token = token
      return user
    },
    async updatePhoneNumber(_: any, { phoneNumber, id }, context){
      return await updatePhoneNumber(id, phoneNumber)
    },
    async updateDOB(_: any, { dob, id }, context){
      return await updateDOB(id, dob)
    },
    async updateDisplayImage(_: any, { imageUrl, id }, context){
      return await updateDisplayImage(id, imageUrl)
    },
    async updateGender(_: any, { gender, id }, context){
      return await updateGender(id, gender)
    },
    async updateSocialMediaInfo(_: any, { socialMediaInfo, id }, context){
      return await updateSocialMediaInfo(id, socialMediaInfo)
    },
    async deleteAccount(_:any, { id }, context){
      const user = getUser(id)
      if(user) {
        await deleteUser(id)
        return user
      }
    },
    async followUser(_:any, { userId, followerId }){
      const user = await UserModel.followUser(userId, followerId)
      console.log(user)
      return user
    },
    async unFollowUser(_:any, { userId, followerId }){
      return await UserModel.unFollowUser(userId, followerId)
    },
    ...ArticleMutations,
    ...CommentMutations
  }
}

const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: ({ req, res }) => ({ req, res }) 
})

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true})
.then((_result: any) => server.listen().then(({ url }) => {
  console.log(url)
}))
.catch(err => console.log(err))

