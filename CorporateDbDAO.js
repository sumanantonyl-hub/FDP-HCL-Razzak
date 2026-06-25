const {corporate} = require('./model')
const corp = corporate

// CRUD
const viewCampus = async() => {
    const fetched = await corp.find()
    return fetched
}

const scheduleCampus = async(campus) => {
    const company = new corp(campus)
    await company.save()// insertOne
    return campus
}

const editCampus = async(company,updatable) => {
    try{
        const updated = await corp.findOneAndUpdate({corporate:company},updatable,{new:true});
        return updated
    }catch(error){
        console.error(error)
        return null
    }
}

const removeCampus = async(company) => {
    try{
        const deleted = await corp.findOneAndDelete({corporate:company})
        return deleted
    }catch(err){
        console.error(err)
        return null
    }
}

module.exports = {viewCampus, scheduleCampus, editCampus, removeCampus}