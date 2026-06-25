const router = require('express').Router()
const dao = require('./UserDAO')

router.post('/register',async(req,res)=>{
    const collect = req.body
    const created = await dao.signup(collect)
    if(!created) res.status(400).json({"message":"User already exists"})
    res.json(created)
})

router.post('/login',async(req,res)=>{
    const result = await dao.generateToken(req.body)
    if(!result) res.status(401).json({error:"Unauthorized"})
    else res.json(result)
})

module.exports=router