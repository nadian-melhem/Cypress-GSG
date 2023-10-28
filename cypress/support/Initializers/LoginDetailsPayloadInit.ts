import { LoginDetailsPayLoad } from "../API/Payload/LoginDetailsPayLoad";


export default class LoginDetailsPayLoadInit{
  static inituser(empNumber?:LoginDetailsPayLoad["empNumber"]): LoginDetailsPayLoad{
    const userDetails : LoginDetailsPayLoad= {
        username: "nadian"+ Math.floor(Math.random()*1000),
        password: "nadian123",
        status:true,
        userRoleId: 4,
        empNumber,
       
    }
    return userDetails;
  }
}