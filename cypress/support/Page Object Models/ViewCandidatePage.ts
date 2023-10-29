export default class ViewCandidatePage{
    elements={
        scheduleInterviewButton: () => cy.get('.oxd-button--success'),
        status: () => cy.get('.orangehrm-recruitment-status > .oxd-text')
    }

    scheduleInterview(){
        this.elements.scheduleInterviewButton().click({force: true})
    }
    verifyStatus(status: string){
        this.elements.status().should('contain', status)
    }
    
}