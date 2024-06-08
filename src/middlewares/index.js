const sampleMiddlewareFunc =(req, res, next)=>{
    console.log("Middleware called" , req.url)
    next()
}

module.exports = {
    sampleMiddlewareFunc
}