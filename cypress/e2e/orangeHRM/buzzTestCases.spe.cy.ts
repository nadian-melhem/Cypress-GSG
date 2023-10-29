import { BuzzPage } from "../../support/Page Object Models/BuzzPage"
import DashboardPage from "../../support/Page Object Models/DashboardPage"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Tests for Buzz Tab", () => {
    const dashboardObj: DashboardPage = new DashboardPage()
    const buzzPageObj: BuzzPage = new BuzzPage()
    beforeEach(() => {
        cy.login("Admin", "admin123")
        dashboardObj.openBuzzPage()
        cy.writeFile("cypress/fixtures/postText.txt",'Nadian-HelloWorld')  
    })

    it("verify the post is published", () =>{
        cy.fixture("postText").then((post: any) => {
        buzzPageObj.writePost(post)
        buzzPageObj.submitPost()
        buzzPageObj.verifyPostIsPublished(post)
    })
})

})