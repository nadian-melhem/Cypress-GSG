class EmployeeDetailsPage{
    elements = {
        loader: () => cy.get(".oxd-loading-spinner"),
        birthDate: () => cy.get('[placeholder="yyyy-mm-dd"]').eq(1),
        todayButton: () => cy.get(".oxd-date-input-links").eq(1),
        nationality: () => cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'),
        nationalityListItems: () => cy.get('.oxd-select-dropdown'),
        smokerCheckBox: () => cy.get('[type="checkbox"]').eq(0),
        saveDetails: () =>cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'),
    }

  
    waitUntilVisible() {
        this.elements.loader().should("exist");
      }

    checkAddedUserName(firstName: string, lastName: string){
        cy.get(".--strong").should('contain',firstName+' '+lastName)
    }

    insertPersonalDetails(birthDate: string, nationality: string, isSmoker: boolean){
        this.elements.birthDate().type(birthDate)
        //this.elements.nationality().click({force: true})
        this.elements.smokerCheckBox().check({force: true})

    }

    savePersonalDetails(){
        this.elements.saveDetails().focus().click()
    }
}

export default EmployeeDetailsPage