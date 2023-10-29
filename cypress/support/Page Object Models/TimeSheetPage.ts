
export class TimeSheetPage
{
    elements= {
        timesheetsTable: () => cy.get('.oxd-table-body'),
        employyeName: () => cy.get('.oxd-autocomplete-text-input > input'),
        viewButton: () => cy.get('.oxd-form-actions > .oxd-button'),
    }

    verifyTimeSheetExistsForEmployeeUsingTable(emplooyeeName){
        cy.visit('/web/index.php/time/viewEmployeeTimesheet')
       this.elements.timesheetsTable().should('contain',emplooyeeName)
    }

    verifyTimeSheetExistsForEmployee(emplooyeeName,empId){
        cy.visit('/web/index.php/time/viewEmployeeTimesheet')
        this.elements.employyeName().type(emplooyeeName)
        cy.get("div[role='listbox']").children().as('elements').wait(1000)
        cy.get('@elements').eq(0).click()
        this.elements.viewButton().click()
        cy.get('.orangehrm-timesheet-header--title > .oxd-text').should('contain', emplooyeeName)
    }


}