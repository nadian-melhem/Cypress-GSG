import { apiHelper } from "../../support/Helpers/apiHelper";
import DashboardPage from "../../support/Page Object Models/DashboardPage";
import RecruitmentPage from "../../support/Page Object Models/RecruitmentPage";
import ScheduleInterviewPage from "../../support/Page Object Models/ScheduleInterviewPage";
import ViewCandidatePage from "../../support/Page Object Models/ViewCandidatePage";
import LoginHomePage from "../../support/Page Object Models/loginHomePage";
import { InterviewStatus } from "../../support/Helpers/uiHelper";
Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe("Tests for Candidates Tab", () => {
    const loginPageObj: LoginHomePage = new LoginHomePage();
    const dashboardPageObj: DashboardPage = new DashboardPage();
    const recruitmentPageObj: RecruitmentPage = new RecruitmentPage();
    const viewCandidatePageObj: ViewCandidatePage = new ViewCandidatePage();
    const scheduleInterviewPageObj: ScheduleInterviewPage = new ScheduleInterviewPage();

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

    it.only("Verify Candidate status is 'Interview Scheduled' after the user added a candidate and change status to Shortlisted via api then change status to Interview Shceduled via UI", () => {
        apiHelper.addCandidateViaAPI().then((candidateId) => {
            apiHelper.shortListCandidateViaAPI(candidateId)
            apiHelper.viewCandidatePageViaAPI(candidateId)
            viewCandidatePageObj.scheduleInterview()
            cy.get("@interviewDetails").then((intDetails: any) => {
                scheduleInterviewPageObj.fillInterviewDetails(intDetails.interviewTitle, intDetails.interviewer, intDetails.date)
            })
            scheduleInterviewPageObj.saveInterviewDetails()
            viewCandidatePageObj.verifyStatus(InterviewStatus.interviewScheduled)
        });



    })


})