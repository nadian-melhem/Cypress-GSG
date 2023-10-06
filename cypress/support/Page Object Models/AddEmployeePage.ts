import { StringIterator } from "cypress/types/lodash";

class AddEmployeePage
{
    elements={
        EmployeeInputName: () => cy.get('.--name-grouped-field'),
        saveNewEmp: () => cy.get('button[type="submit"]'),
        swichInputBtn: () => cy.get(".oxd-switch-input"),
        loginDetails: () => cy.get('.oxd-input-group input')
    }

    insertEmployeeInfo(firstName:string, MiddleName:string, LastName:string){
     this.elements.EmployeeInputName().children().eq(0).type(firstName)
     this.elements.EmployeeInputName().children().eq(1).type(MiddleName)
     this.elements.EmployeeInputName().children().eq(2).type(LastName)
    }

    insertLoginDetails(userName: string, password: string, passwordConfirmation: string){
        this.elements.swichInputBtn().click()
        this.elements.loginDetails().eq(5).type(userName)
        this.elements.loginDetails().eq(8).type(password)
        this.elements.loginDetails().eq(9).type(passwordConfirmation)
    }

    saveNewEmployeeDetails(){
        this.elements.saveNewEmp().click()
    }


}
export default AddEmployeePage;
