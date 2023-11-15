//JSON response parsing

describe('Parsing JSON Response',()=>{

    it('Parsing Simple JSON Response',()=>{
        cy.request({
            method : 'GET',
            url : 'https://fakestoreapi.com/products',
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            expect(response.body[0].id).to.eq(1)
            expect(response.body[0].price).to.eq(109.95)
            expect(response.body[0].rating.rate).to.eq(3.9)
        })
    })

    it('Parsing Complex JSON Response',()=>{
        let total_price = 0; 
        cy.request({
            method : 'GET',
            url : 'https://fakestoreapi.com/products',
            qs : {limit:5}
        })
        .then((response)=>{
            expect(response.status).to.eq(200);
            
            response.body.forEach(element => {
                total_price = total_price+element.price;   
            });
            expect(total_price).to.eql(899.23) //limit 5
        })
    })
})