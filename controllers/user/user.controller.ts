import UserModel from '../../data/models/user.model';
import { CreateAccountProfile } from '../../utils/interface'

export const createAccount = async (profile: CreateAccountProfile) => {
  try {
    const user = await UserModel.createAccount(profile)
    return user
  } catch (error) {
    console.log(error)
  }
}

type loginInfo = {
  email: string
  password: string
}

export const login = async (info: loginInfo){
  try {
    const user = await UserModel.login(info);
    return user
  } catch (error) {
    console.log(error)
  }
}

export const getUsers = async () => {
  try {
    const Users = await UserModel.find({});
    return Users
  } catch (error) {
    console.log(error)
  }
}
