import { UserApiPayload } from "../API/Payload/UserApiPayload";
import { faker } from '@faker-js/faker';

export default class UserPayLoadInit{
  static inituser(): UserApiPayload{
    const userDetails : UserApiPayload= {
          firstName: faker.internet.userName(),
          middleName: faker.internet.userName(),
          lastName: faker.internet.userName(),
          empPicture: null,
          employeeId: Math.floor(Math.random()*100).toString()
       
    }
    return userDetails;
  }
}