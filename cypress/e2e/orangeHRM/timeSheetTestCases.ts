import { LoginDetailsPayLoad } from "../../support/API/Payload/LoginDetailsPayLoad"
import { apiHelper } from "../../support/Helpers/apiHelper"
import LoginDetailsPayLoadInit from "../../support/Initializers/LoginDetailsPayloadInit"
import UserPayLoadInit from "../../support/Initializers/UserPayloadInit"
import { TimeSheetPage } from "../../support/Page Object Models/TimeSheetPage"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Time Sheet Tab  Test Cases", () => {
    const timeSheetPageObj: TimeSheetPage = new TimeSheetPage();
    const employee = UserPayLoadInit.inituser()
    let user: LoginDetailsPayLoad

    beforeEach(() => {
        cy.login("Admin", "admin123")
        apiHelper.addNewEmployeeViaAPI(employee).then((addEmployeeResponse) => {
            user = LoginDetailsPayLoadInit.inituser(addEmployeeResponse.body.data.empNumber)
            apiHelper.createLoginDetails(user)
            cy.logout()
            cy.login(user.username, user.password)
        })

    })

    it("verify the time sheet is added", () => {
        cy.visit('/web/index.php/time/viewMyTimesheet')
        apiHelper.getDefaultTimeSheetId().then((timeSheetPageResponse) => {
            const timeSheetId = timeSheetPageResponse.body.data.id
            apiHelper.addTimeSheet(timeSheetId)
            apiHelper.submitTimeSheet(timeSheetId)
            cy.logout()
            cy.login("Admin", "admin123")
            timeSheetPageObj.verifyTimeSheetExistsForEmployee(`${employee.firstName} ${employee.lastName}`, user.empNumber)
        })
    })


})
