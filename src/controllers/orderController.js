const OrderService = require('../services/orderService')

const constants = require('../constants')
const { error } = require('winston')
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
    let  result = await OrderService.getAllOrders({} , req.userData)
    result = result.sort((a, b)=>{
      return new Date(b.placed_at) - new Date(a.placed_at)
    })
    return res.status(200).json({status : "success" , message : "ALL_ORDER_DETAILS" , data : result})
  }catch(err){
    return next(err)
  }
}

const updateOrderbyID = async(req, res, next)=>{
  try{
    const payload = req.body
    payload.order_id = req.params.id
    if(!payload.stripe_session_id){
      throw new Error("Strip session id is requried")
    }
    const result = await OrderService.updateOrderbyID(payload , req.userData)
    return res.status(200).json({status : "success" , message : "ORDER_UPDATED" , data : result})
  }catch(err){
    return next(err)
  }
}

module.exports = {
  createOrder,
  getOrderbyID,
  getAllOrders,
  updateOrderbyID
}