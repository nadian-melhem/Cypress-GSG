export default class ScheduleInterviewPage{
    elements = {
        interviewTitle: () =>cy.get(':nth-child(2) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        interviewer: ()=> cy.get('.oxd-autocomplete-text-input > input'),
        interviewerList: ()=> cy.get("div[role='listbox']"),
        date: () => cy.get('.oxd-date-input > .oxd-input'),
        saveButton: () => cy.get('.oxd-button--secondary')
    }

    fillInterviewDetails(title: string, interviewer: string, date: string){
        this.elements.interviewTitle().type(title)
        this.elements.interviewer().click().focused().type(interviewer);
        this.elements.interviewerList().children().as('elements').wait(1000)
        cy.get('@elements').eq(0).click()
        this.elements.date().type(date,{force:true})
    }

    saveInterviewDetails(){
        this.elements.saveButton().click({force: true})
    }


}