class EmployeeListPage{
    elements={
        employeeId: () => cy.get(':nth-child(2) > .oxd-input'),
        searchButton: () => cy.get('.oxd-form-actions > .oxd-button--secondary'),
        firstResultInTable: () => cy.get('.oxd-table-body > :nth-child(1) > .oxd-table-row'),
        AddEmp: () => cy.get('.oxd-button--secondary'),
    }

    checkTableResults(id: string){
        this.elements.firstResultInTable().should('contain',id)
        
    }
    
    searchForEmployee(employeeId: string){
        this.elements.employeeId().type(employeeId)
        this.elements.searchButton().click({force: true})
    }
    
    openAddEmployeePage(){
        this.elements.AddEmp().eq(1).click()
    }
    
}
export default EmployeeListPage