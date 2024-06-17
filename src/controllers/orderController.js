const OrderService = require('../services/orderService')


const createOrder = async(req, res, next)=>{
  try{
    const payload = req.body
    console.log(req.userData)
    const result = await OrderService.createOrder(payload, req.userData)
    return res.status(200).json({status : "success" , message : "ORDER_CREATED", data: result})
  }catch(err){
    return next(err)
  }
}

const getOrderbyID = async(req, res, next)=>{
  try{
    const payload  = {
      id : req.params.id
    }
    const result = await OrderService.getOrderbyID(payload, req.userData)
    return res.status(200).json({status : "success" , message : "ORDER_DETAIL" , data : result})

  }catch(err){
    return next(err)
  }
}
const getAllOrders = async(req, res, next)=>{
  try{
    const result = await OrderService.getAllOrders({} , req.userData)
    return res.status(200).json({status : "success" , message : "ALL_ORDER_DETAILS" , data : result})
  }catch(err){
    return next(err)
  }
}

module.exports = {
  createOrder,
  getOrderbyID,
  getAllOrders
}