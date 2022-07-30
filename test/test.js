const assert = require('assert');
const request = require('supertest');
const {app} = require('../server');

describe("Test cases Running", () => {

    before(()=>{
        console.log("Before Test cases starting")
    })
   
    describe("POST /login", ()=>{
        it("Admin User Unit Testing",(done)=>{
            request("http://localhost:8080/api/v1")
            .post("/signin")
            .send({
                email:"admin@gmail.com",
                password:"admin@123"
            })
            .expect(200)
            .end(done)
        })
    })

    describe("POST /signup", ()=>{
        it("Creating User",(done)=>{
            request("http://localhost:8080/api/v1")
            .post("/signup")
            .send({
                firstName:"admin",
                email:"admin@gmail.com",
                password:"admin@123",
                isAdmin:true
            })
            .expect(409)
            .end(done)
        })
    })

    describe("Get Users", ()=>{
        it("GetAllUsers",(done)=>{
            request("http://localhost:8080/api/v1")
            .get("/user/all")
            .expect(200)
            .end(done)
        })
    })

});