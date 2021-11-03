import Notifications from "../../data/models/notification";
import UserModel from "../../data/models/user.model";

export const NotificationQueries = {
  async notifications(){
    return await Notifications.find({})
  },
  async notification(_:any, { id }){
    return await Notifications.findById(id)
  },
  async usersNotifications(_:any, { userId }){
    return await Notifications.findUserNotifications(userId)
  },
  async usersUnReadNotifications(_:any, { userId }){
    return await Notifications.getUnReadNotifications(userId)
  }
}

export const NotificationMutations = {
  async markNotificationAsRead(_: any, { id }){
    let Notification = await Notifications.findById(id)
    await Notification.markAsRead()
    return Notification
  },
  async markMultipleNotificationsAsRead(_: any, { ids }){
    await Notifications.markMutlipleAsRead(ids)
    return "Notifications marked"
  }
}
export const Notification = {
  async user(_:any){
    const User = await UserModel.findById(_.userId);
    return User
  }
}