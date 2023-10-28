export class AddCandidatePage
{
    elements={
        firstName: () => cy.get('.--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input'),
        lastName: () => cy.get(':nth-child(3) > :nth-child(2) > .oxd-input'),
        email: () => cy.get(':nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        resume: () => cy.get('input[type="file"]'),
    }

    addCandidate(firstName, lastName, email, resumePath){
        this.insertFirtName(firstName)
        this.insertLastName(lastName)
        this.insertEmail(email)
        this.uploadResume(resumePath)
    }

    insertFirtName(name){
        this.elements.firstName().type(name)
    }

    insertLastName(name){
        this.elements.lastName().type(name)
    }

    insertEmail(email){
        this.elements.email().type(email)
    }
    
    uploadResume(filePath){
        this.elements.resume().selectFile(filePath,{force:true})
    }

    verifyResumeUploaded(resumeName){
        cy.get('.oxd-file-input-div').should('contain', resumeName)
    }

}