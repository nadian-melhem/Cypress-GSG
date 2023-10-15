import CandidatePayloadInit from "../Initializers/CandidatePayloadInit";
import UserPayLoadInit from "../Initializers/UserPayloadInit"
export enum StatusCode {
    Success = 200,
}
export const Urls = {
    employees: '/web/index.php/api/v2/employees',
    viewCandidates: '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC',
    addCandidate: '/web/index.php/api/v2/recruitment/candidates',
    shortlistCandidate: '/web/index.php/api/v2/recruitment/candidates/',
    viewCandidateProfile: '/web/index.php/recruitment/addCandidate/'
}
export class apiHelper {
    static addNewEmployeeViaAPI() {
        return cy.request({
            method: 'Post',
            url: Urls.employees,
            body: UserPayLoadInit.inituser()
        })
    }

    static getTotalCandidatesRecordsViaAPI() {
        return cy.intercept(Urls.viewCandidates).as('interception').wait('@interception').then((interception) => {
            return interception.response.body.meta.total
        })
    }

    static addCandidateViaAPI() {
        return cy.request({
            method: 'Post',
            url: Urls.addCandidate,
            body: CandidatePayloadInit.initCandidate()
        }).then((response) => {
            return response.body.data.id
        })
    }

    static shortListCandidateViaAPI(id: String) {
        return cy.request({
            method: 'PUT',
            url: `${Urls.shortlistCandidate}${id}${"/shortlist"}`,
            body: {
                "note": null
            }
        })
    }

    static viewCandidatePageViaAPI(id: String) {
        return cy.visit(`${Urls.viewCandidateProfile}${id}`)
    }



}