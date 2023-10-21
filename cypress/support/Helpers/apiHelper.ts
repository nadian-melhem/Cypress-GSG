import CandidatePayloadInit from "../Initializers/CandidatePayloadInit";
import LoginDetailsPayLoadInit from "../Initializers/LoginDetailsPayloadInit";
import UserPayLoadInit from "../Initializers/UserPayloadInit"
export enum StatusCode {
    Success = 200,
}
export const Urls = {
    employees: '/web/index.php/api/v2/pim/employees',
    users: '/web/index.php/api/v2/admin/users',
    viewCandidates: '/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC',
    addCandidate: '/web/index.php/api/v2/recruitment/candidates',
    shortlistCandidate: '/web/index.php/api/v2/recruitment/candidates/',
    viewCandidateProfile: '/web/index.php/recruitment/addCandidate/',
    logout: 'web/index.php/auth/logout'
}
export class apiHelper {
    static addNewEmployeeViaAPI() {
        return cy.request({
            method: 'Post',
            url: Urls.employees,
            body: UserPayLoadInit.inituser()
        })
    }

    static createLoginDetails(user){
        return cy.request({
            method: 'Post',
            url: Urls.users,
            body: user
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
            return response.body.data
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

    static logout(){
        cy.visit(Urls.logout).wait(300)
    }



}