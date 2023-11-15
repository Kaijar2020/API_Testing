//JSOn Schema Validation ...
/* 
At first install a ajv libary
 ~~ npm install ajv 
*/ 

const AJV = require('ajv') //import the libary
const avj = new AJV() //make a instance 

describe(' JSON Schema Validation',()=>{

    it('schema validation against response',()=>{
        cy.request({
            method : 'GET',
            url : 'https://fakestoreapi.com/products'
        })
        .then((response)=>{

            var schema = {
                "$schema": "http://json-schema.org/draft-07/schema#",
                "title": "Generated schema for Root",
                "type": "object",
                "properties": {
                  "id": {
                    "type": "number"
                  },
                  "title": {
                    "type": "string"
                  },
                  "price": {
                    "type": "number"
                  },
                  "description": {
                    "type": "string"
                  },
                  "category": {
                    "type": "string"
                  },
                  "image": {
                    "type": "string"
                  },
                  "rating": {
                    "type": "object",
                    "properties": {
                      "rate": {
                        "type": "number"
                      },
                      "count": {
                        "type": "number"
                      }
                    },
                    "required": [
                      "rate",
                      "count"
                    ]
                  }
                },
                "required": [
                  "id",
                  "title",
                  "price",
                  "description",
                  "category",
                  "image",
                  "rating"
                ]
              } //schema end here.

             const validate = avj.compile(schema)
             const valid =  validate(response.body)
             expect(valid).to.eq(false)
             
        })
    })
})