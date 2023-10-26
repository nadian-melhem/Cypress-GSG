import { apiHelper } from "../../support/Helpers/apiHelper";
import DashboardPage from "../../support/Page Object Models/DashboardPage";
import RecruitmentPage from "../../support/Page Object Models/RecruitmentPage";
import ScheduleInterviewPage from "../../support/Page Object Models/ScheduleInterviewPage";
import ViewCandidatePage from "../../support/Page Object Models/ViewCandidatePage";
import LoginHomePage from "../../support/Page Object Models/loginHomePage";
import { InterviewStatus } from "../../support/Helpers/uiHelper";
import { searchForDataInTable } from "../../genericHelper/helperFunctions";
import { AddCandidatePage } from "../../support/Page Object Models/AddCandidatePage";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Tests for Candidates Tab", () => {
    const loginPageObj: LoginHomePage = new LoginHomePage();
    const dashboardPageObj: DashboardPage = new DashboardPage();
    const recruitmentPageObj: RecruitmentPage = new RecruitmentPage();
    const viewCandidatePageObj: ViewCandidatePage = new ViewCandidatePage();
    const scheduleInterviewPageObj: ScheduleInterviewPage = new ScheduleInterviewPage();
    const addCandidatePageObj : AddCandidatePage = new AddCandidatePage()

    beforeEach(() => {
        cy.fixture("employeeInfo").as("empInfo")
        cy.fixture("interviewDetails").as("interviewDetails")
        cy.visit('web/index.php/auth/login')
        cy.get("@empInfo").then((employeeData: any) => {
            loginPageObj.login(employeeData.loginUser, employeeData.loginPassword)
        })
    })

    it("Verify candidates count from candidate table is equal to candidates count in api", () => {
        dashboardPageObj.openRecruitmentPage();
        apiHelper.getTotalCandidatesRecordsViaAPI().then((recordsCountFromApi) => {
            recruitmentPageObj.countRecords(recordsCountFromApi)
        });
    })

    it("Verify Candidate status is 'Interview Scheduled' after the user added a candidate and change status to Shortlisted via api then change status to Interview Shceduled via UI", () => {
        apiHelper.addCandidateViaAPI().then((response) => {
            apiHelper.shortListCandidateViaAPI(response.id)
            apiHelper.viewCandidatePageViaAPI(response.id)
            viewCandidatePageObj.scheduleInterview()
            cy.get("@interviewDetails").then((intDetails: any) => {
                scheduleInterviewPageObj.fillInterviewDetails(intDetails.interviewTitle, intDetails.interviewer, intDetails.date)
            })
            scheduleInterviewPageObj.saveInterviewDetails()
            viewCandidatePageObj.verifyStatus(InterviewStatus.interviewScheduled)
        });
    })

    it("User added a candidate then searched for the added candidate of exists in candidates table", () =>{
        apiHelper.addCandidateViaAPI().then((response) => {
            searchForDataInTable(recruitmentPageObj.getCandidateTable, response)
        })

    })

    it.only("add candidate using UI", () => {
        cy.visit('/web/index.php/recruitment/addCandidate')
        cy.fixture("candidateDetails").as("candidateInfo")
        cy.get("@candidateInfo").then((candidateInfo: any) => {
        addCandidatePageObj.addCandidate(candidateInfo.firstName, candidateInfo.lastName, candidateInfo.email, candidateInfo.resumePath)
        addCandidatePageObj.verifyResumeUploaded(candidateInfo.resume)
        })

    })


})