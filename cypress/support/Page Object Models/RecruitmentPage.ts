export default class RecruitmentPage {
    elements = {
        table: () => cy.get('oxd-table'),
        recordsTable: () => cy.get(".oxd-table-body")
    }

    getCandidateTable(){
        return this.elements.table()
    }

    countRecords(recordsCountFromApi: number) {
        return this.elements.recordsTable().children().should('have.length', recordsCountFromApi)
    }

}