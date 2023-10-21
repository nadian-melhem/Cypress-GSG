import { UserApiPayload } from "../API/Payload/UserApiPayload"

declare global {
    namespace Cypress {
    interface Chainable<Subject>{
        addNewEmployee: typeof addNewEmployee
    }
}
}
function addNewEmployee(url: string, body: UserApiPayload){
   return cy.api({
    method:'Post',
    url: this.url,
    body: this.body
   })
}
Cypress.Commands.add('addNewEmployee', addNewEmployee)