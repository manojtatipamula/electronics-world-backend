const userModel = require('../models/userModel')
const getUsers = async () => {
    try {
        // implement pagination
        return await userModel.find()
    } catch (e) {
        throw e
    }
}

const addUsers = async (data)=>{
    try {
        return await userModel.insertMany(data)
    } catch (e) {
        throw e
    }
}
module.exports = {
    getUsers,
    addUsers
}