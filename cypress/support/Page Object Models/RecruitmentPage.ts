export default class RecruitmentPage {
    elements = {
        recordsTable: () => cy.get(".oxd-table-body")
    }

    countRecords(recordsCountFromApi: number) {
        return this.elements.recordsTable().children().should('have.length', recordsCountFromApi)
    }

}