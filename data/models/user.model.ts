import { model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import UserSchema from '../schemas/user.schema'
import { UserInterface, UserModelInterface, CreateAccountProfile } from '../../utils/interface'
import { createToken } from '../../utils/jwt-handler'
import { sendEmail } from '../../utils/email-handler'

UserSchema.statics.createAccount = async function (profile: CreateAccountProfile) {
  const User = await this.create({ ...profile })
  return User
}

UserSchema.pre('save', async function(next){
  const saltRounds = 10
  if(this.password.length < 15){
    // * hash the users password before we save it to the database

    this.password = await bcrypt.hash(this.password, saltRounds)

  }
})


UserSchema.post('save', async function(next){
  const token = createToken(this._id, process.env.JWT_SECRETE)
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
    if(result){
      let emailOpts = {
        to: email,
        from: 'noreply@digitalsagemedia.com',
        subject: 'Account Login',
        text: `Recent login activity on your account`
      }
      await sendEmail(emailOpts)
      return user
    }
    else {
      throw Error('incorrect password')
    }
  }

  throw Error('incorrect email, no user exists for this email')
}



UserSchema.statics.sendVerificationEmail = async function (id:string){
  const { email, _id } = await this.findById(id)
  const token = createToken(_id, process.env.JWT_EMAIL_VERIFICATION_SECRETE);
  const emailOpts = { 
    from: 'noreply@digitalsagemedia.con',
    to: email,
    subject: 'Verify your token',
    text: 'click this link to verify your '
  }
  await sendEmail(emailOpts)
}


const UserModel = model<UserInterface, UserModelInterface>('user', UserSchema);

export default UserModel;