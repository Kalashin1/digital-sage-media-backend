import { model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import UserSchema from '../schemas/user.schema'
import Notifications from './notification';
import { UserInterface, UserModelInterface, CreateAccountProfile, Gender, socialMediaInfo } from '../../utils/interface'
import { createToken } from '../../utils/jwt-handler'
import { sendEmail } from '../../utils/email-handler'

UserSchema.statics.createAccount = async function (profile: CreateAccountProfile) {
  const User = await this.create({ ...profile })
  await Notifications.create({
    userId: User._id,
    body: `Your account has been successfully created!.`,
    type: "Account creation."
  })
  const token = createToken(User._id, process.env.JWT_SECRETE)
  return [ User, token ]
}

UserSchema.pre('save', async function(next){
  const saltRounds = 10
  if(this.password.length < 15){
    // * hash the users password before we save it to the database

    this.password = await bcrypt.hash(this.password, saltRounds)

  }
})


UserSchema.post('save', async function(next){
  const emailOpts = { 
    from: 'noreply@digitalsagemedia.com',
    to: this.email,
    subject: 'Account Creation',
    text: 'Your account has been created successfully'
  }
  await sendEmail(emailOpts);
})

UserSchema.statics.login = async function({email, password}) {
  const user = await this.findOne({email})
  //  param if user with the email exists then compare passowrds
  if(user){
    const result = await bcrypt.compare(password, user.password)
    const token = createToken(user._id, process.env.JWT_SECRETE)
    if(result){
      let emailOpts = {
        to: email,
        from: 'noreply@digitalsagemedia.com',
        subject: 'Account Login',
        text: `Recent login activity on your account`
      }
      // await sendEmail(emailOpts)
      await Notifications.create({
        userId: user._id,
        body: `There is a recent login activity on your account.`,
        type: "Account Login."
      })
      return [ user, token ]
    }
    else {
      throw Error('incorrect password')
    }
  }

  throw Error('incorrect email, no user exists for this email')
}



UserSchema.statics.sendVerificationEmail = async function (email:string){
  const user = await this.find({ email })
  if(email){
    const token = createToken(user._id, process.env.JWT_EMAIL_VERIFICATION_SECRETE);
    const emailVerificationCode = Math.floor(Math.random() * 100000)
    console.log(emailVerificationCode)
    await user.updateOne({ emailVerificationCode })
    const emailOpts = { 
      from: 'noreply@digitalsagemedia.con',
      to: user.email,
      subject: 'Verify your token',
      text: `verification code ${emailVerificationCode}.`
    }
    await sendEmail(emailOpts)
  } 
  throw Error('No user with that email!');
  
}

UserSchema.methods.verifyEmail = async function (code: number) {
  if (code === this.emailVerificationCode){
    await this.updateOne({ emailVerified: true })
    return true;
  }
  return false;
}

UserSchema.methods.updateGender = async function (gender: Gender){
  await this.update({ gender })
  return "Gender updated!"
}

UserSchema.methods.updateDisplayImage = async function (displayImage: string){
  await this.update({ displayImage })
  return 'display image updated!'
}

UserSchema.methods.updateDOB = async function (dob: string){
  await this.update({ dob })
  return 'date of birth updated!'
}

UserSchema.methods.updatePhoneNumber = async function (phoneNumber: string){
  await this.update({ phoneNumber })
  return 'Phone number updated!'
}

UserSchema.methods.updateSocialMediaInfo = async function (obj: socialMediaInfo){
  await this.update({ socialMediaInfo: obj })
  return 'Phone number updated!'
}

UserSchema.statics.followUser = async function (userId: string, followerId){
  const follower = await this.findById(followerId)
  let user = await this.findById(userId)
  if(follower){
    const followers = user.followers

    const foundFollower = followers.find(f => f === follower._id.toString())
    if(foundFollower){
      throw Error('that follower already exists')
    }
    console.log(user._id)
    await this.updateOne({ _id: userId }, { followers: [...followers, follower._id.toString()]})
    await this.updateOne({ _id: followerId }, { following: [...follower.following, follower._id.toString()]})
    await Notifications.create({
      userId: follower._id,
      body: `${user.name} started following you.`,
      type: "New follower."
    })
    user = await this.findById(userId)
    return user
  }
  throw Error('No user with that id!')
}

UserSchema.statics.unFollowUser = async function (userId: string, followerId){
  const follower = await this.findById(followerId)
  let user = await this.findById(userId)
  if(follower){
    const followers = user.followers
    const foundFollower = followers.find(f => f === follower._id.toString())
    if(foundFollower){
      await this.updateOne({ _id: user._id }, { followers: followers.filter(f => f !== foundFollower)})
      await this.updateOne({ _id: follower._id }, { following: follower.following.filter(f => f !== foundFollower)})
      user = await this.findById(user._id)
      return user
    }
    throw Error('No user with that id')
  }
}




const UserModel = model<UserInterface, UserModelInterface>('user', UserSchema);

export default UserModel;