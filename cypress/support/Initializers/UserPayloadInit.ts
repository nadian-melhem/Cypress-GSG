import { UserApiPayload } from "../API/Payload/UserApiPayload";
//import { faker } from '@faker-js/faker';

export default class UserPayLoadInit{
  static inituser(): UserApiPayload{
    let userDetails : UserApiPayload= {
          firstName: "nnnnnn",
          middleName: "nmnmnmn",
          lastName: "kkk",
          empPicture: null,
          employeeId: "14",
       
    }
    return userDetails;
  }
}