import { fa } from "@faker-js/faker";
import AddVacancyPayload from "../API/Payload/AddVacancyPayload";

export default class AddVacancyPayloadInit {
    static initVacancy(): AddVacancyPayload {
        let vacancy: AddVacancyPayload = {
            name: "string",
            jobTitleId: 1,
            employeeId: 2,
            numOfPositions: 3,
            description: "string",
            status: true,
            isPublished: false
        }
        return vacancy
    }

}