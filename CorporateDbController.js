const router = require('express').Router()
const dao = require('./CorporateDbDAO')
const {validate,rbac,jwtValidate} = require('./Middleware')
// Routers for DB operations

router.get('/pack/:salary',jwtValidate,rbac(['student']),async(req,res)=>{
    const result = await dao.filterByPackage(req.params.salary)
    if(result) res.json(result)
    else res.status(400).json({"error":"No matches on package"})
})

// router.get('/all',validate,rbac(['coordinator','manager','student']),async(req,res)=>{
router.get('/all',jwtValidate,rbac(['coordinator','manager','student']),async(req,res)=>{
    const fetched = await dao.viewCampus()
    res.json(fetched)
})

// router.post('/book',validate,rbac(['coordinator','manager']),async(req,res)=>{
router.post('/book',jwtValidate,rbac(['coordinator','manager']),async(req,res)=>{
    const record = req.body
    const out = await dao.scheduleCampus(record)
    res.json(out)
})

// router.patch('/edit/:company',validate,rbac(['manager']),async(req,res)=>{
router.patch('/edit/:company',jwtValidate,rbac(['manager']),async(req,res)=>{
    const org = req.params.company
    const replacement = req.body
    const result = await dao.editCampus(org,replacement)
    if(result) res.json(result)
    else res.status(404).json({message:`campus ${org} hasn't visited yet`})
})

// router.delete('/del/:company',validate,rbac(['manager']),async(req,res)=>{
router.delete('/del/:company',jwtValidate,rbac(['manager']),async(req,res)=>{
    const company = req.params.company
    const result = await dao.removeCampus(company)
    if(result) res.json(result)
    else res.status(404).json({message:`No ${company} available`})
})

module.exports=router