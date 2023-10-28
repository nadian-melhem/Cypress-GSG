import { CandidateApiPayload } from "../API/Payload/CandidateApiPayload"
import { UserApiPayload } from "../API/Payload/UserApiPayload"
import ViewCandidatePage from "../Page Object Models/ViewCandidatePage"
import LoginHomePage from "../Page Object Models/loginHomePage"

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login: typeof login,
            logout: typeof logout

        }
    }
}
function login(username ?, password ?) {
    cy.visit('web/index.php/auth/login')
    LoginHomePage.login(username, password)
}
function logout(){
    cy.get('.oxd-userdropdown-tab > .oxd-icon').click()
    cy.get(':nth-child(4) > .oxd-userdropdown-link').click()
}


Cypress.Commands.add("login", login)
Cypress.Commands.add("logout", logout)

