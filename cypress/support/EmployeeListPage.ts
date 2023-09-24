class EmployeeListPage{
    elements={
        employeeId: () => cy.get(':nth-child(2) > .oxd-input'),
        searchButton: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        resultTable: () => cy.get('.orangehrm-container'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
    }

    checkTableResults(id: string){
        this.elements.resultTable().children()
        
    }
    
    searchForEmployee(employeeId: string){
        this.elements.employeeId().type(employeeId)
        this.elements.searchButton().click()
        console.log(this.elements.resultTable().children())
        
    }
    
    openAddEmployeePage(){
        this.elements.AddEmp().eq(1).click()
    }
    
}
export default EmployeeListPage