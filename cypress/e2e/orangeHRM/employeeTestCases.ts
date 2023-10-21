import { apiHelper } from "../../support/Helpers/apiHelper";
import LoginDetailsPayLoadInit from "../../support/Initializers/LoginDetailsPayloadInit";
import AddEmployeePage from "../../support/Page Object Models/AddEmployeePage";
import DashboardPage from "../../support/Page Object Models/DashboardPage";
import EmployeeDetailsPage from "../../support/Page Object Models/EmployeeDetailsPage";
import EmployeeListPage from "../../support/Page Object Models/EmployeeListPage";
import LoginHomePage from "../../support/Page Object Models/loginHomePage";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Add new employee", () => {
    const loginPageObj: LoginHomePage = new LoginHomePage();

    beforeEach(() => {
        cy.fixture("employeeInfo").as("empInfo")
        cy.visit('web/index.php/auth/login')
        cy.get("@empInfo").then((employeeData: any) => {
            loginPageObj.login(employeeData.loginUser, employeeData.loginPassword)
        })

    })

    it("add a new employee then create login details then login with the new employee",() =>{
        apiHelper.addNewEmployeeViaAPI().then((response) => {
            const user = LoginDetailsPayLoadInit.inituser(response.body.data.empNumber)
            apiHelper.createLoginDetails(user).then((response) => {
            apiHelper.logout()
            loginPageObj.login(user.username, user.password)
            loginPageObj.verifyLoginsuccessfully()
            })   
        })

    })

})
