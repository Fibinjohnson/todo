const chai =require('chai');
const chaiHttp=require('chai-http');
const app=require('../index')
const jwt=require('jsonwebtoken')

chai.use(chaiHttp);
const expect=chai.expect;

describe('user API',()=>{
    describe("POST /api/auth/register",()=>{
        it('it should handle user registration',(done)=>{
            chai.request(app)
            .post("/api/auth/register")
            .send({name:'demo name',email:'demo email',password:'demo password'})
            .end((err,res)=>{
                if(err){
                    expect(res).to.have.status(500);
                }else{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('addNewUser');

                }
                done()
            })
        })
    })
})
describe('Login API',()=>{
    describe('POST /api/auth/login' ,()=>{
        it('This should handle user login',(done)=>{
            chai.request(app)
            .post('/api/auth/login')
            .send({email:'demo email',password:'demo password'})
            .end((err,res)=>{
                if(err){
                    expect(res).to.have.status(500);
                }else{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('user')
                    expect(res.body).to.have.property('token')
                }
                done()
            })
        })
    })
})

describe('Getfeed posts api',()=>{
    describe('GET /api/post/:userId',()=>{
        it('This should handle the feed posts requests',(done)=>{
            const userId='64ec4f429f499f9e7619b37a';
            const token=jwt.sign({id:userId},process.env.SECRETCODEJWT);
            chai.request(app)
            .get(`/api/post/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err,res)=>{
                if(err){
                    expect(res).to.have.status(500);
                }else{
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an("array")
                }
                done();
            })
        })
    })
})