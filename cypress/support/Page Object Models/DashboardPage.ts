class DashboardPage{
    elements = {
        MainMenuItems: () => cy.get('.oxd-sidepanel-body'),
    }

    openPimPage(){
        this.elements.MainMenuItems().contains('PIM').click();
    }
}
export default DashboardPage