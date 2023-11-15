//End to End Api Testing  from the Go rest API.
/*
POST https://gorest.co.in/public/v2/users
GET https://gorest.co.in/public/v2/users/{{userId}}
PUT https://gorest.co.in/public/v2/users/{{userId}}
DELETE https://gorest.co.in/public/v2/users/{{userId}}
*/

describe('e2e API Testing',()=>{

    const auth_token = 'Bearer 8ee7af63b63ec153496c00fa3cafd0db2826cd2f52aa4ac67798dc29164a8ecf'
    
    it('Create , Update ,Delete and Fetch User',()=>{

        const user_name = Math.random().toString(5).substring(2) //dynamic name

        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v2/users',
            body : {
                "name": user_name,
                "gender": "male",
                "email": Math.random().toString(5).substring(2)+"@email.com",
                "status": "inactive"
            },
            headers : {
                Authorization : auth_token
            }
        })
        .then((response)=>{
            expect(response.status).to.be.eq(201)
            const userId = response.body.id

            //Fetch the Data
            cy.request({
                method : 'GET',
                url : `https://gorest.co.in/public/v2/users/${userId}`,
                headers : {
                    Authorization : auth_token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq(user_name)
            })

            //Update the Data
            cy.request({
                method : 'PUT',
                url : `https://gorest.co.in/public/v2/users/${userId}`,
                body:{
                    name : 'Rabada'
                },
                headers : {
                    Authorization : auth_token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.body.name).to.eq('Rabada')
            })

            //Delete user
            cy.request({
                method : 'DELETE',
                url : `https://gorest.co.in/public/v2/users/${userId}`,
                headers : {
                    Authorization : auth_token
                }
            })
            .then((response)=>{
                expect(response.status).to.eq(204)
                expect(response.statusText).to.eq('No Content')
            })

        })

    })
    
})