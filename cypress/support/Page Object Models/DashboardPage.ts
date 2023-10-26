class DashboardPage{
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
        userIcon: () =>   cy.get('.oxd-userdropdown-tab > .oxd-icon'),
        logout: () =>   cy.get(':nth-child(4) > .oxd-userdropdown-link')
    }

    openPimPage(){
        this.elements.MainMenuItems().contains('PIM').click();
    }

    openRecruitmentPage(){
        this.elements.MainMenuItems().contains('Recruitment').click();
    }

    openLeavePage(){
        this.elements.MainMenuItems().contains('Leave').click();
    }

    logout(){
        this.elements.userIcon().click()
        this.elements.logout().click()
    }
}
export default DashboardPage