import addEmployee from "../../support/AddEmployeePage";

let addEmployeeObj: addEmployee = new addEmployee()

describe("Adding new employee",() => {

    beforeEach(function(){
        cy.intercept("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index").as("Home Page")
        cy.visit("https://opensource-demo.orangehrmlive.com/")
        cy.get('[placeholder="Username"]').type("Admin")
        cy.get('[placeholder="Password"]').type("admin123")
        cy.get("button").click()

    })

    it("verfy adding employee with full required data", () => {
        addEmployeeObj.addNewEmployee("nadian","nazieh","melhem")
        addEmployeeObj.createLoginDetails("nadian","nadian1234")
        addEmployeeObj.saveNewEmployeeDetails()
    })
})