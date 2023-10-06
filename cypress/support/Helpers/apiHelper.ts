export enum StatusCode{
 Success = 200,
}
export function addNewEmployee() {
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