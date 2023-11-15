//API all kinds of Authentication
describe('Authentication',()=>{

    //Basic Authentication
    it('Baasic Authentication',()=>{

        cy.request({
            method: 'GET',
            url : 'https://postman-echo.com/basic-auth',
            auth : {
                user : 'postman',
                pass : 'password'
            
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })

    //Digest Authentication
    it('Digest Authentication',()=>{

        cy.request({
            method: 'GET',
            url : 'https://postman-echo.com/basic-auth',
            auth : {
                username : 'postman',
                password : 'password',
                method : 'digest'
            
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.authenticated).to.eq(true)
        })

    })

     //Barear token Authentication
     const token = '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'
     it('Barear token Authentication',()=>{

        cy.request({
            method: 'GET',
            url : 'https://api.github.com/users/repost',
            headers : {
                Authorization : 'Bearer'+token
            }
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq('OK')
        })

    })

})