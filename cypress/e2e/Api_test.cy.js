//API chaining

describe('API Chaining',()=>{

    it('Getting All the posts',()=>{

        cy.request({
            metho : 'GET',
            url : "https://jsonplaceholder.typicode.com/posts"
        })
        .then((response)=>{
            expect(response.status).to.be.eq(200)
            const postId = response.body[0].id
            return postId
        })
        .then((postId)=>{
            cy.request({
                method : 'GET',
                url : `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
            })
            .then((response)=>{
                expect(response.status).to.be.eq(200)
                expect(response.body).to.has.length(5)
            })
        })
    })
})