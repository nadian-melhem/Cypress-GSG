import { LoginDetailsPayLoad } from "../API/Payload/LoginDetailsPayLoad";


export default class LoginDetailsPayLoadInit{
  static inituser(empNumber?): LoginDetailsPayLoad{
    let userDetails : LoginDetailsPayLoad= {
        username: "nadian"+ Math.floor(Math.random()*100),
        password: "nadian123",
        status:true,
        userRoleId: 4,
        empNumber: empNumber,
       
    }
    return userDetails;
  }
}