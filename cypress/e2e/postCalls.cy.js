//POST request for creating tourist.
describe('Api Testing in POST menthod',()=>{

    //Aproch -1 with Hard code.
    it.skip('Hard Coded Json Object',()=>{

        const requestBody = {
             tourist_name :'Bavuma',
             tourist_email : 'bavuma10@email.com',
             tourist_location : 'Dhaka'
        }

        cy.request({
            method : 'POST',
            url : 'http://restapi.adequateshop.com/api/Tourist',
            body : requestBody
        })
        .then((response) =>{
            expect(response.status).to.eq(201)
            expect(response.body.tourist_name).to.eq("Bavuma")
            expect(response.body.tourist_email).to.eq("bavuma10@email.com")
            expect(response.body.tourist_location).to.eq("Dhaka")
        })
    })

     //Aproch -2 with dynamic value (Generate Random data).
     it('Dynamically Json Object',()=>{

        const requestBody = {
             tourist_name : Math.random().toString(5).substring(2),
             tourist_email : Math.random().toString(5).substring(2)+'@email.com',
             tourist_location : Math.random().toString(4).substring(2)
        }

        cy.request({
            method : 'POST',
            url : 'http://restapi.adequateshop.com/api/Tourist',
            body : requestBody
        })
        .then((response) =>{
            expect(response.status).to.eq(201)
            expect(response.statusText).to.eq('Created')
            expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
            expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
            expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            //assertion with checking property also.
            expect(response.body).has.property('tourist_email',requestBody.tourist_email)
            expect(response.body).has.property('tourist_name',requestBody.tourist_name )
        })
    });

    //Aproch -3 with fixture file data.
    it.skip('Using Fixture file Json Object',()=>{

        //get fixture file
        cy.fixture('tourist').then((data) =>{

            const requestBody = data;

            cy.request({
                method : 'POST',
                url : 'http://restapi.adequateshop.com/api/Tourist',
                body : requestBody
            })
            .then((response) =>{
                expect(response.status).to.eq(201)
                expect(response.statusText).to.eq('Created')
                expect(response.body.tourist_name).to.eq(requestBody.tourist_name)
                expect(response.body.tourist_email).to.eq(requestBody.tourist_email)
                expect(response.body.tourist_location).to.eq(requestBody.tourist_location)
            })
        })

    })
})