import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()

import { getUsers, createAccount, login, getUser, updatePhoneNumber, updateDOB, updateDisplayImage, updateSocialMediaInfo, updateGender, deleteUser } from './controllers/user/user.controller'
import ArticleMutations from "./controllers/article/article.controller";
import Articles from "./data/models/article.model";
import { ArticleQueries } from "./controllers/article/article.controller";
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
    comments: [String!]!
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

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User!
    updateDOB(id: String, dob: String): User!
    updateDisplayImage(id: String, imageUrl: String): User!
    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!
    updatePhoneNumber(id: String, phoneNumber: String): User!
    updateGender(id: String, gender: String): User!
    deleteAccount(id: String): User!
    createArticle(article: CreateArticleInput): Article
    updateArticle(article: CreateArticleInput): Article
    deleteArticle(article: CreateArticleInput): Article
    toggleLikes(articleId: String, userId: String, optn: String): Article
    toggleSaves(articleId: String, userId: String, optn: String): Article
    toggleViews(articleId: String, userId: String, optn: String): Article
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
    }
  },
  Query : {
    users (_: any, args: any, context: any) {
      // console.log(context.req.headers.usertoken);
      return getUsers()
    },
    user (_:any, { id }, context: any){
      return getUser(id)
    },
    ...ArticleQueries
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
    ...ArticleMutations
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

