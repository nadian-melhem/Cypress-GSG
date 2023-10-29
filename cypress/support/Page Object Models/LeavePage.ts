export default class LeavePage{
    elements = {
        leaveListTable: () => cy.get('.oxd-table-body'),
        addButton: () => cy.get('.orangehrm-header-container > .oxd-button'),
        attachmentInputFile: () => cy.get('input[type="file"]'),
        saveAttachmentButton : () => cy.get(':nth-child(3) > .oxd-form > .oxd-form-actions > .oxd-button--secondary'),
        attachmentsTable: () => cy.get('.oxd-table-card > .oxd-table-row')
    }
    checkLeaveStatus(status){
        this.elements.leaveListTable().should('contain', status)
    }

    addAtachment(filePath){
        this.elements.addButton().click()
        this.elements.attachmentInputFile().selectFile(filePath,{force: true})
        this.elements.saveAttachmentButton().click()
    }
    
    verifyAtachmentIsAdded(fileName){
        this.elements.attachmentsTable().should('contain', fileName)
    }
}