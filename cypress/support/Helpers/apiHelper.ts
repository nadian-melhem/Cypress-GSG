import AddEntitlementPayloadInit from "../Initializers/AddEntitlementPayloadInit";
import CandidatePayloadInit from "../Initializers/CandidatePayloadInit";
import { LeaveRequestPayloadInit } from "../Initializers/LeaveRequestPayloadInit";
import UserPayLoadInit from "../Initializers/UserPayloadInit"
import AddVacancyPayloadInit from "../Initializers/addVacancyPayloadInit";
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
    logout: 'web/index.php/auth/logout',
    addEntitlement: '/web/index.php/api/v2/leave/leave-entitlements',
    applyLeaveRequest: 'web/index.php/api/v2/leave/leave-requests',
    approveLeaveRequest: 'web/index.php/api/v2/leave/employees/leave-requests/',
    addVacancy: 'web/index.php/api/v2/recruitment/vacancies',
    addTimeSheet: 'web/index.php/api/v2/time/timesheets/',
    getTimeSheetId: 'web/index.php/api/v2/time/timesheets/default?date=2023-10-28',
    submitTimeSheet: '/web/index.php/api/v2/time/timesheets/'
}
export class apiHelper {
    static addNewEmployeeViaAPI(emplooyee) {
        return cy.request({
            method: 'Post',
            url: Urls.employees,
            body: emplooyee
        })
    }

    static createLoginDetails(user) {
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
                note: null
            }

        })
    }

    static viewCandidatePageViaAPI(id: String) {
        return cy.visit(`${Urls.viewCandidateProfile}${id}`)
    }

    static logout() {
        cy.visit(Urls.logout).wait(300)
    }

    static addEntitlement(empNumber) {
        return cy.request({
            method: 'POST',
            url: Urls.addEntitlement,
            body: AddEntitlementPayloadInit.initEntitlement(empNumber)
        })
    }

    static applyLeaveRequest() {
        return cy.request({
            method: 'POST',
            url: Urls.applyLeaveRequest,
            body: LeaveRequestPayloadInit.initLeaveRequest()
        })
    }

    static approveLeaveRequest(leaveId) {
        return cy.request({
            method: 'PUT',
            url: `${Urls.approveLeaveRequest}${leaveId}`,
            body: {
                action: "APPROVE"
            }
        })

    }

    static addVacancy(employeeId: number){
        return cy.request({
            method: "POST",
            url: Urls.addVacancy,
            body: AddVacancyPayloadInit.initVacancy(employeeId)
        })

    }

    static getDefaultTimeSheetId(){
        return cy.request({
            method:"GET",
            url: Urls.getTimeSheetId
        })

    }

    static addTimeSheet(id){
        return cy.request({
            method: "PUT",
            url : Urls.addTimeSheet + id +'/entries' ,
            body: {
                "entries": [
                  {
                    "projectId": 2,
                    "activityId": 12,
                    "dates": {
                      "2023-10-23": {
                        "duration": "05:00"
                      },
                      "2023-10-24": {
                        "duration": "05:00"
                      },
                      "2023-10-25": {
                        "duration": "05:00"
                      },
                      "2023-10-26": {
                        "duration": "05:00"
                      },
                      "2023-10-27": {
                        "duration": "05:00"
                      },
                      "2023-10-28": {
                        "duration": "05:00"
                      },
                      "2023-10-29": {
                        "duration": "05:00"
                      }
                    }
                  }
                ],
                "deletedEntries": [
                  {
                    "projectId": 3,
                    "activityId": 19
                  }
                ]
              }
        })

    }

    static submitTimeSheet(id){
        return cy.request({
            method: 'PUT',
            url: Urls.submitTimeSheet + id,
            body: {
                action:"SUBMIT"
            }
        })
    }



}