const assert = require('assert');
const request = require('supertest');
const {app} = require('../server');

describe("Questions Test cases Running", () => {

    before(()=>{
        console.log("Before Test cases starting")
    })
   
    describe("GET /questions/user/:id", ()=>{
        it("Get Questions for user that does not exists",(done)=>{
            request("http://localhost:8080/api/v1")
            .get("/questions/user/dd")
            .expect(200)
            .end(done)
        })
    })

});