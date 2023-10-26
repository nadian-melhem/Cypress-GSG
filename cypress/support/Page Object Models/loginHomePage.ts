class  LoginHomePage{
    static elements={
        userName : () => cy.get('[placeholder="Username"]'),
        password : () => cy.get('[placeholder="Password"]'),
        usernameError: () => cy.get(':nth-child(2) > .oxd-input-group > .oxd-text')        ,
        passwordError: () => cy.get(':nth-child(3) > .oxd-input-group > .oxd-text'),
        message: () => cy.get('.oxd-alert-content > .oxd-text'),
        loginButton: () =>  cy.get("button"),
        forgetPasswordLink: () => cy.get(".oxd-text").contains("Forgot "),
        userNameInForgetPasswordPage: () => cy.getByPlaceHolder("Username"),
        resetButton: () => cy.get(".oxd-button").eq(1),
        forgetPasswordMessage: () => cy.get(".orangehrm-card-container"),
    }

    static login(userName: string, password: string){
        this.elements.userName().type(userName)
        this.elements.password().type(password)
        this.elements.loginButton().click()
    }

    static forgetPassword(userName: string){
        this.elements.forgetPasswordLink().click();
        this.elements.userNameInForgetPasswordPage().type(userName)
        this.elements.resetButton().click()
        this.elements.forgetPasswordMessage().should("contain","successfully")
    }

    static verifyLoginsuccessfully(){
        cy.url().should('eq', "https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    }

    
}

export default LoginHomePage
