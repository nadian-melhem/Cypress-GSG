import { CandidateApiPayload } from "../API/Payload/CandidateApiPayload"
import { UserApiPayload } from "../API/Payload/UserApiPayload"
import ViewCandidatePage from "../Page Object Models/ViewCandidatePage"

declare global {
    namespace Cypress {
    interface Chainable<Subject>{
        addNewEmployee: typeof addNewEmployee
        interceptCandidateRecords: typeof interceptCandidateRecords
        addCandidate: typeof addCandidate
    }
}
}

function addNewEmployee(url: string, body: UserApiPayload){
   return cy.request({
    method:'Post',
    url: this.url,
    body: this.body
   })
}

function interceptCandidateRecords(url: string){
    return cy.intercept(url).as('interception').wait('@interception').then((interception) => {
    }).its('body')
}

function addCandidate(url: string, body: CandidateApiPayload){{
    return cy.request({
        method:'Post',
        url: url,
        body:  body
    }).then((response) => {
        return response.body.data.id
    })
}}
