import { apiHelper } from "../../support/Helpers/apiHelper"
import LoginDetailsPayLoadInit from "../../support/Initializers/LoginDetailsPayloadInit"
import DashboardPage from "../../support/Page Object Models/DashboardPage";
import LeavePage from "../../support/Page Object Models/LeavePage";
import LoginHomePage from "../../support/Page Object Models/loginHomePage";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})


describe("Final Automaton Task Test Cases", () => {
    const loginPageObj: LoginHomePage = new LoginHomePage();
    const dashboardPageObj: DashboardPage = new DashboardPage();
    const leavePageObj: LeavePage = new LeavePage() ;
    beforeEach(() => {
        cy.fixture("employeeInfo").as("empInfo")
        cy.visit('web/index.php/auth/login')
        cy.get("@empInfo").then((employeeData: any) => {
            loginPageObj.login(employeeData.loginUser, employeeData.loginPassword)
        })

    })
    it("add new employee to the system and apply a leave request,and the leave request is approve by the admin then the request status sholud appear as approved", () => {
        apiHelper.addNewEmployeeViaAPI().then((response) => {
            const user = LoginDetailsPayLoadInit.inituser(response.body.data.empNumber)
            apiHelper.createLoginDetails(user)
            apiHelper.addEntitlement(user.empNumber)
            dashboardPageObj.logout()
            cy.intercept('web/index.php/auth/login')
            loginPageObj.login(user.username, user.password)
            apiHelper.applyLeaveRequest().then((response2) => {
            dashboardPageObj.logout()
            cy.fixture("employeeInfo").as("empInfo")
            cy.visit('web/index.php/auth/login')
            cy.get("@empInfo").then((employeeData: any) => {
                loginPageObj.login(employeeData.loginUser, employeeData.loginPassword)
            })
            apiHelper.approveLeaveRequest(response2.body.data.id)
            dashboardPageObj.logout()
            cy.intercept('web/index.php/auth/login')
            loginPageObj.login(user.username, user.password)
            dashboardPageObj.openLeavePage()
            leavePageObj.checkLeaveStatus('Scheduled')
        })
         
        })

    })


    it.only("", () => {
        apiHelper.addVacancy().then((response) => {
            const filePath = 'cypress/fixtures/nadianResume.pdf'
            cy.visit('web/index.php/recruitment/addJobVacancy/' + response.body.data.id)
            leavePageObj.addAtachment(filePath)
            leavePageObj.verifyAtachmentIsAdded("nadian")
        })


    })

})