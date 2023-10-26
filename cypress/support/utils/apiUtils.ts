import { CandidateApiPayload } from "../API/Payload/CandidateApiPayload"
import { UserApiPayload } from "../API/Payload/UserApiPayload"
import ViewCandidatePage from "../Page Object Models/ViewCandidatePage"
import LoginHomePage from "../Page Object Models/loginHomePage"

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            loginAsAdmin: typeof loginAsAdmin

        }
    }
}
function loginAsAdmin() {
    cy.fixture("employeeInfo").as("empInfo")
    cy.visit('web/index.php/auth/login')
    cy.get("@empInfo").then((employeeData: any) => {
        LoginHomePage.login(employeeData.loginUser, employeeData.loginPassword)
    })
}

Cypress.Commands.add("loginAsAdmin", loginAsAdmin)

