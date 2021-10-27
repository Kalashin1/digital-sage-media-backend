import { Schema } from 'mongoose'
import { UserInterface } from '../../utils/interface'
import { isEmail, isPassword } from '../../utils/validators'

const UserSchema: Schema<UserInterface> = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, 'Please provide your name.']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    validate: isEmail,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide your password.'],
    validate: isPassword,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please provide your number.']
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  dob: {
    type: String
  },
  displayImage: {
    type: String
  },
  socialMediaInfo: {
    twitter: {type: String},
    facebook: {type: String},
    instagram: {type: String}
  },
  gender: {
    type: String,
    required: [true, 'Please provide your gender']
  },
  createdAt: {
    type: String,
    default: () => new Date().toString()
  }
})


export default UserSchema