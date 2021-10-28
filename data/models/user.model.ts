import { model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import UserSchema from '../schemas/user.schema'
import { UserInterface, UserModelInterface, CreateAccountProfile, Gender, socialMediaInfo } from '../../utils/interface'
import { createToken } from '../../utils/jwt-handler'
import { sendEmail } from '../../utils/email-handler'

UserSchema.statics.createAccount = async function (profile: CreateAccountProfile) {
  const User = await this.create({ ...profile })
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


const UserModel = model<UserInterface, UserModelInterface>('user', UserSchema);

export default UserModel;