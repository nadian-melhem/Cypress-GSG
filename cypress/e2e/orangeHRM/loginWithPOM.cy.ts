import LoginHomePage from "../../support/Page Object Models/loginHomePage";

const loginHomePage: LoginHomePage= new LoginHomePage();
let id : number ;
describe("Login with page object model style", () => {
    beforeEach(function(){
        cy.visit("/")
        loginHomePage.login("Admin","admin123")
    })

    it("Verify Login response", () => {
        cy.request("/web/index.php/api/v2/dashboard/employees/locations")
        .then((response) =>{
            expect(response).property('status').to.equal(200)
        })
    })

    it.only("Verify adding user response", () =>{
        cy.request({
            method: 'Post',
            url: '/web/index.php/api/v2/admin/users',
            body:{
                username: "test212",
                password: "Test123456",
                status: true,
                userRoleId: 2,
                empNumber: 55
            }
        }).then((response)=>{
            expect(response).property('status').to.equal(200)
            console.log(response)
            id = response.body.data.id
            console.log(id+"")
        })
    


    })

    afterEach(function(){
        cy.request({
            url: ("/web/index.php/api/v2/admin/users"),
            method: 'DELETE',
            body:{
                ids:[id]
            }
    }).then((response)=> {
        expect(response).property('status').to.equal(200)
    })
     
  })
    
    

    it.skip("forget password successfully", () => {
        loginHomePage.forgetPassword("Admin")
    })
    
    
})