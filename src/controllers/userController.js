
const userService = require('../services/userService')
const getUsers = async (req, res, next) => {
    try{
        const results = await userService.getUsers()
        res.send(results).status(200);
    }catch(e){
        next(e)
    }
}

const addUsers = async (req, res, next) => {
    try{
        const results = await userService.addUsers([{
            first_name: "manoj_custom",
            last_name: "kumar",
            email: "tmk.bza@gmail.com",
            user_name : "tmk.bza",
            custom_keys : {
                project : "samplle", 
                lol: "manoj"
            }
        }])
        res.send(results).status(200);
    }catch(e){
       next(e)
    }
}

module.exports = {
    getUsers,
    addUsers
}