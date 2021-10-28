import { ObjectId } from 'mongodb';
import { Document, Model } from 'mongoose';

export interface UserInterface extends Document {
  _id: ObjectId
  name: string
  email: string
  emailVerified: boolean
  phoneNumber: string
  displayImage: string
  gender: string
  password: string
  dob: string
  socialMediaInfo: socialMediaInfo
  createdAt: string
  token: string
  articles: string[]
  emailVerificationCode: number
  savedArticles: string[]
  updateSocialMediaInfo: (obj: socialMediaInfo) => Promise<string>
  updateGender: (gender: string) => Promise<string>
  updateDisplayImage: (imageUrl: string) => Promise<string>
  updatePhoneNumber: (phoneNumber: string) => Promise<string>
  verifyEmail: (code: number) => Promise<boolean>
  updateDOB: (dob: string) => Promise<string>
  createArticle: (article: CreateArticle) => Promise<ArticleInterface>
}

export type Gender = 'male' | 'female';

export type loginInfo = {
  email: string
  password: string
}

type createAccountReturnType = [ UserInterface, string]
export interface UserModelInterface extends Model<UserInterface>{
  createAccount: (profile: CreateAccountProfile) => Promise<createAccountReturnType>
  login: (info: loginInfo) => Promise<createAccountReturnType>
  sendVerificationEmail: (email: string) => Promise<string>
}


export type CreateAccountProfile = {
  name: string
  email: string
  phoneNumber: number
  gender: string
  password: string
}

export type socialMediaInfo = {
  facebook: string,
  twitter: string,
  instagram: string
}

export type CreateArticle = {
  title: string
  body: string
  tags: string[]
  _id?: string
  category: string
  author: string
  socialImage?: string
}

export interface ArticleInterface extends Document {
  _id: ObjectId
  title: string
  createdAt: string
  updatedAt: string
  body: string
  socialImage: string
  url: string
  tags: string[]
  category: string
  views: number
  readingTime: string
  likes: number
  dislikes: number
  saves: number
  thumbsUp: number
  author: string
  comments: string[]
  likeArticle: (userId: string, optn: string) => Promise<ArticleInterface>
  readArticle: (userId: string, optn: string) => Promise<ArticleInterface>
  saveArticle: (userId: string, optn: string) => Promise<ArticleInterface>
  thumbsUpArticle: (userId: string, optn: string) => Promise<ArticleInterface>
}

export interface ArticleModelInterface extends Model<ArticleInterface>{
  deleteArticle: (articleId: string) => Promise<string>
  getUserArticles: (author: string) => Promise<ArticleInterface[]>
  updateArticle: (article: CreateArticle) => Promise<ArticleInterface>
  createArticle: (article: CreateArticle) => Promise<ArticleInterface>
}

export interface CommentInterface extends Document {
  _id: ObjectId
  createdAt: string
  updatedAt: string
  body: string
  user: string
  article: string
}