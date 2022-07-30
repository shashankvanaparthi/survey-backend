const assert = require('assert');
const request = require('supertest');
const {app} = require('../server');

describe("Reports Test cases Running", () => {

    before(()=>{
        console.log("Before Test cases starting")
    })
   
    describe("GET /reports/:id", ()=>{
        it("Get Report for survey that does not exists",(done)=>{
            request("http://localhost:8080/api/v1")
            .get("/getReport/dd")
            .expect(200)
            .end(done)
        })
    })

    describe("GET Survey With/survey/:id", ()=>{
        it("Get Survey With ID that does not exist",(done)=>{
            request("http://localhost:8080/api/v1")
            .get("/survey/dd")
            .expect(404)
            .end(done)
        })
    })


});