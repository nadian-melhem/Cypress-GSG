import UserPayLoadInit from "../Initializers/UserPayloadInit"
export enum StatusCode{
 Success = 200,
}
export  const Urls ={
    employees: `${Cypress.env("apiLogin")}/employees`
}
export class apiHelper{
    static addNewEmployee() {
    return cy.fixture("employeeInfo").then(employeeData => {
        cy.request({
            method: 'Post',
            url: `${Cypress.env("apiLogin")}/employees`,
            body: {
                firstName: employeeData.firstName,
                middleName: employeeData.middleName,
                lastName: employeeData.lastName,
                empPicture: employeeData.empPicture,
                employeeId: employeeData.empId
            }

        })
    })
}
static addNewEmployeeViaAPI() {
    return cy.addNewEmployee(Urls.employees, UserPayLoadInit.inituser());
}
}