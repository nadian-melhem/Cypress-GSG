class EmployeeDetailsPage{
    elements = {
        loader: () => cy.get(".oxd-loading-spinner"),
        birthDate: () => cy.get('[placeholder="yyyy-mm-dd"]').eq(1),
        todayButton: () => cy.get(".oxd-date-input-links").eq(1),
        nationality: () => cy.get(':nth-child(5) > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input'),
        nationalityListItems: () => cy.get('.oxd-select-dropdown'),
        smokerCheckBox: () => cy.get('[type="checkbox"]'),
        saveDetails: () =>cy.get(':nth-child(1) > .oxd-form > .oxd-form-actions > .oxd-button'),
    }

  
    waitUntilVisible() {
        this.elements.loader().should("exist");
      }

    checkAddedUserName(firstName: string, lastName: string){
        cy.get(".--strong").should('contain',firstName+' '+lastName)
    }

    insertPersonalDetails(){
        this.elements.birthDate().type("2019-07-12")
       // this.elements.nationality().focus().click()
       //this.elements.nationalityListItems().children().eq(3).focus().click()
       // this.elements.smokerCheckBox().check()

    }

    savePersonalDetails(){
        this.elements.saveDetails().focus().click()
    }
}

export default EmployeeDetailsPage