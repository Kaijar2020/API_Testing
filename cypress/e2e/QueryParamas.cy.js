//Pass the query parameter

describe('API testing query parameter',()=>{

    const queryParam = {page:2} 

    it('Passing Query parameter',()=>{

        cy.request( {

            method : 'GET',
            url : 'https://reqres.in/api/users',
            qs : queryParam //to pass query parameter.
        })
        .then((response)=>{

            expect(response.status).equal(200)
            expect(response.body.page).to.eq(2)
            expect(response.body.data).has.length(6) //validate how many index in array

            expect(response.body.data[0]).have.property('id',7)
            expect(response.body.data[0]).have.property('first_name','Michael')
        })
    })
})