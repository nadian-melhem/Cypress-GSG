import { UserApiPayload } from "../API/Payload/UserApiPayload";
import { faker } from '@faker-js/faker';

export default class UserPayLoadInit{
  static inituser(): UserApiPayload{
    let userDetails : UserApiPayload= {
        user:{
          firstName: faker.string.uuid(),
          middleName: faker.string.uuid(),
          lastName: faker.string.uuid(),
          empPicture: null,
          employeeId: faker.number.int().toString(),
        }
    }
    return userDetails;
  }
}