import { faker } from "@faker-js/faker";
import AddVacancyPayload from "../API/Payload/AddVacancyPayload";

export default class AddVacancyPayloadInit {
    static initVacancy(employeeId: AddVacancyPayload["employeeId"]): AddVacancyPayload {
        let vacancy: AddVacancyPayload = {
            name: faker.internet.userName(),
            jobTitleId: 1,
            employeeId,
            numOfPositions: 3,
            description: "",
            status: true,
            isPublished: false
        }
        return vacancy
    }

}