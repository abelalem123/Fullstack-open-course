const supertest=require('supertest')
const mongoose=require('mongoose')
const User=require('../model/users')
const app=require('../app')
const api=supertest(app)
const helper=require('./test_helper')
const bcrypt=require('bcrypt')
jest.setTimeout(200000);
beforeEach(async () => {
   await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
 })
 
 test('creation of invalid user',async()=>{
    const  newUser={
        username:'haile',
        name:'hailemichael',
        password:'12'
    }
    await api.post('/api/users').send(newUser).expect(400)
 },200000)

 afterAll(()=>{
    mongoose.connection.close()
 })