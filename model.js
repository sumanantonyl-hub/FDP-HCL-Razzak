// configure schema
const mongoose = require('mongoose')

const corporateSchema = mongoose.Schema({
    "corporate":{type:String,require:true,unique:true},
    "role":{type:String,require:true},
    "date":{type:String,require:true},
    "package":{type:Number,require:true},
    "count":{type:Number,require:true},
})

// convert schema into collection
const corporate = mongoose.model('corporates',corporateSchema)

const userSchema = mongoose.Schema({
    "username":{type:String,require:true,unique:true},
    "password":{type:String,require:true},
    "role":{type:String,enum:["student","coordinator","manager"]},
    "contact":{type:Number}
})

const bcrypt = require('bcryptjs')
// pre trigger before save
userSchema.pre('save',async function(){
    if(!this.isModified("password")) return
    else{
        // encrypt/ hash
        const encoded = await bcrypt.genSalt(12)
        this.password =  await bcrypt.hashSync(this.password,encoded)
    }
})

const user = mongoose.model('users',userSchema)

module.exports={corporate,user};