import LoginHomePage from "../../support/loginHomePage"
import AddEmployeePage from "../../support/AddEmployeePage";
import EmployeeDetailsPage from "../../support/EmployeeDetailsPage";
import EmployeeListPage from "../../support/EmployeeListPage";
import DashboardPage from "../../support/DashboardPage";

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Add new employee", () => {
    const loginPageObj: LoginHomePage = new LoginHomePage();
    const addEmployeePageObj: AddEmployeePage = new AddEmployeePage();
    const employeeListPageObj: EmployeeListPage = new EmployeeListPage();
    const employeeDetailsPage: EmployeeDetailsPage = new EmployeeDetailsPage();
    const dashboardPageObj: DashboardPage = new DashboardPage();

    beforeEach(() => {
        cy.fixture("employeeInfo").as("empInfo")
        cy.visit('web/index.php/auth/login')
        cy.get("@empInfo").then((employeeData: any) => {
            loginPageObj.login(employeeData.loginUser, employeeData.loginPassword)
        })

    })

    it("add new employee from add employee page", () => {
        cy.get("@empInfo").then((employeeData: any) => {
            dashboardPageObj.openPimPage();
            employeeListPageObj.openAddEmployeePage();
            addEmployeePageObj.insertEmployeeInfo(employeeData.firstName, employeeData.middleName, employeeData.lastName)
            addEmployeePageObj.insertLoginDetails(employeeData.userName, employeeData.password, employeeData.password)
            addEmployeePageObj.saveNewEmployeeDetails()
            employeeDetailsPage.waitUntilVisible()
            employeeDetailsPage.checkAddedUserName(employeeData.firstName, employeeData.lastName)
            employeeDetailsPage.insertPersonalDetails(employeeData.birthDate, employeeData.nationality, employeeData.isSmoker)
            employeeDetailsPage.savePersonalDetails()
        })
    })


    it('check if the added employee exists', () => {
        cy.get("@empInfo").then((employeeData: any) => {
            cy.request({
                method: 'Post',
                url: 'web/index.php/api/v2/pim/employees',
                body: {
                    firstName: employeeData.firstName,
                    middleName: employeeData.middleName,
                    lastName: employeeData.lastName,
                    empPicture: employeeData.empPicture,
                    employeeId: employeeData.empId
                }

            }).then((response) => {
                expect(response).property('status').to.equal(200)
                dashboardPageObj.openPimPage()
                employeeListPageObj.searchForEmployee(response.body.data.employeeId)
                employeeListPageObj.checkTableResults(response.body.data.employeeId)
            })
            })

        })
    })
