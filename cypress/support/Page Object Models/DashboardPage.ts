class DashboardPage{
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
    }

    openPimPage(){
        this.elements.MainMenuItems().contains('PIM').click();
    }

    openRecruitmentPage(){
        this.elements.MainMenuItems().contains('Recruitment').click();
    }
}
export default DashboardPage