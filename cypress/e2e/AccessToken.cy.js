//Access Token e2e api testings

describe('API Testing of access token in books order',()=>{

    let auth_token = null ;

    before("Creating Access Token",()=>{
        cy.request( {
            method : 'POST',
            url : 'https://simple-books-api.glitch.me/api-clients/',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: {
   
               "clientName": "Postman",
               "clientEmail": Math.random().toString(4).substring(2)+'@gmail.com'
            }
        })
        .then((response)=>{

            auth_token = response.body.accessToken;
        })
    });

    before("Create New Order",()=>{
        cy.request( {
            method : 'POST',
            url : 'https://simple-books-api.glitch.me/orders/',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+auth_token
            },
            body: {
   
                "bookId": 1,
                "customerName": "Johnx"
            }
        })
        .then((response)=>{

            expect(response.status).to.eq(201)
            expect(response.body.created).to.eq(true)
        })
    });
   
    it('Fetching the orders',()=>{

        cy.request({
            method : 'GET',
            url : 'https://simple-books-api.glitch.me/orders/',
            headers : {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer '+auth_token
            },
            cookies : {
                'cookieName' : 'mycookie'
            }

        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.statusText).to.eq('OK');
            expect(response.body).has.length(1);
        })
    })

})