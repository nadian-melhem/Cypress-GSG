export class BuzzPage{
    elements = {
        post : () =>  cy.get(".oxd-buzz-post-input"),
        submit: () =>   cy.get(".oxd-buzz-post button[type='submit']"),
        newsFeed: () => cy.get(".orangehrm-buzz-newsfeed-posts")
    }

    writePost(text){
        this.elements.post().type(text)
    }

    submitPost(){
        this.elements.submit().click()
    }

    verifyPostIsPublished(text){
        this.elements.newsFeed().should('contain', text)
    }
}