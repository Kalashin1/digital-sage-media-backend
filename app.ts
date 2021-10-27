import { ApolloServer , gql } from "apollo-server";
import * as mongoose from 'mongoose';
require('dotenv').config()

import { getUsers, createAccount, login } from './controllers/user/user.controller'

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
    createdAt: String!
  }

  type Query {
    users: [User!]!
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

  type Mutation{
    createAccount(profile: CreateAccount): User!
    login(loginInfo: LoginInfo): User
  }
`

const resolvers = {
  Query : {
    users () {
      return getUsers()
    }
  },

  Mutation: {
    async createAccount(_:any, { profile }, context: any){
      const User = await createAccount(profile);
      return User
    },
    async login(_:any, { loginInfo }, context: any){
      const User = await login(loginInfo)
      return User
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then((_result: any) => server.listen().then(({ url }) => {
  console.log(url)
}))
.catch(err => console.log(err))

