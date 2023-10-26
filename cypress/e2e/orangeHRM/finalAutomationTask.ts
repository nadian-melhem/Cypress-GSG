import { apiHelper } from "../../support/Helpers/apiHelper"
import LoginDetailsPayLoadInit from "../../support/Initializers/LoginDetailsPayloadInit"
import DashboardPage from "../../support/Page Object Models/DashboardPage";
import LeavePage from "../../support/Page Object Models/LeavePage";
import LoginHomePage from "../../support/Page Object Models/loginHomePage";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})


describe("Final Automaton Task Test Cases", () => {
    const dashboardPageObj: DashboardPage = new DashboardPage();
    const leavePageObj: LeavePage = new LeavePage();
    beforeEach(() => {
        cy.loginAsAdmin()
    })
    it("add new employee to the system and apply a leave request,and the leave request is approve by the admin then the request status sholud appear as approved", () => {
        apiHelper.addNewEmployeeViaAPI().then((response) => {
            const employee = LoginDetailsPayLoadInit.inituser(response.body.data.empNumber)
            apiHelper.createLoginDetails(employee)
            apiHelper.addEntitlement(employee.empNumber)
            dashboardPageObj.logout()
            LoginHomePage.login(employee.username, employee.password)
            apiHelper.applyLeaveRequest().then((leaveRequestResponse) => {
                dashboardPageObj.logout()
                cy.loginAsAdmin()
                apiHelper.approveLeaveRequest(leaveRequestResponse.body.data.id)
                dashboardPageObj.logout()
                LoginHomePage.login(employee.username, employee.password)
                dashboardPageObj.openLeavePage()
                leavePageObj.checkLeaveStatus('Scheduled')
            })

        })

    })


    it.only("add a user and The added user add a vacancy and add an attachment then verify the atachment is added ", () => {
        apiHelper.addNewEmployeeViaAPI().then((addEmployeeResponse) => {
            apiHelper.addVacancy(addEmployeeResponse.body.data.empNumber).then((addVacancyResponse) => {
                const filePath = 'cypress/fixtures/nadianResume.pdf'
                cy.visit('web/index.php/recruitment/addJobVacancy/' + addVacancyResponse.body.data.id)
                leavePageObj.addAtachment(filePath)
                leavePageObj.verifyAtachmentIsAdded(filePath.replace(/^.*[\\/]/, ''))
            })
        })
    })

})