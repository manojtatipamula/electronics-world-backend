const constants = require('../constants')
const OrderModel = require('../models/ordersModel')
const AddressModel = require('../models/addressModel')
const ProductModel = require('../models/productModel')
const PaymentModel = require('../models/paymentModel')
const { default: mongoose } = require('mongoose')


const createOrder = async(payload , currentUser) =>{
  try{
    console.log("data" , payload)
    console.log("currentUser" , currentUser)

    const addressData = {
      ...payload.shipping_address,
      user_id : currentUser._id
    }
    // const address = new AddressModel(addressData)
    // await address.save()

    const productData = await ProductModel.find({ _id : {$in : payload.items.map((item)=> { return new mongoose.Types.ObjectId(item.product_id)}) }})
    const final_pr = []
    let total_price = 0
    for (let pr_data of productData){
      final_pr.push({
        product_id : pr_data._id,
        quantity : payload.items.find((item)=>{ return item.product_id === item.product_id}).quantity,
        price: pr_data.price
      })
      total_price+= pr_data.price
    }
    const orderData = {
      user_id : currentUser._id,
      items : final_pr,
      total_price: total_price
    }
    const order  = new OrderModel(orderData)
    await order.save()
    const orderSavedData = await getOrderbyID({id : order._id})
    console.log(orderSavedData)
    const final_payment = orderSavedData.items.map((os_data)=>{
      return {
        name : os_data.product_id.name,
        quantity : os_data.quantity,
        price_in_cents : os_data.product_id.price * 100
      }
    })
    const lineItems = mapLineItems(final_payment)
    const result = {
      order_id : order._id
    }
    const stripe_result = await triggerStripe(lineItems)
    // console.log("stripppp, ", lineItems)
    result.stripe_result = stripe_result
    const paymentData  = {
      order_id : order._id,
      payment_information : stripe_result
    }
    const payment = new PaymentModel(paymentData)
    
    await payment.save()
    order.payment_details = payment._id
    order.payment_status = stripe_result?.payment_information?.payment_status
    await order.save()
    return result
  }catch(err){
    throw err
  }
}

const getAllOrders = async (payload, currentUser) =>{
  try{

    const result = await OrderModel.find({user_id : currentUser._id})
    .populate("user_id")
    .populate("items.product_id")
    // .populate("shipping_address")
    .populate("payment_details")
    .exec()
    return result

  }catch(err){
    throw err
  }
}



const getOrderbyID = async (payload, currentUser) =>{
  try{

    const result = await OrderModel.findById({_id: payload.id})
    .populate("user_id")
    .populate("items.product_id")
    // .populate("shipping_address")
    .populate("payment_details")
    .exec()
    return result

  }catch(err){
    throw err
  }
}

const mapLineItems = (items = [])=>{
  try{
    // [
    //   {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: 'Samsung S90D'
    //       },
    //       unit_amount: 50 * 100
    //     },
    //     quantity: 2,
    //   },
    // ]
    const finalResult  = items.map((data)=>{
      return       {
        price_data: {
          currency: constants.STRIPE_CURRENCY,
          product_data: {
            name: data.name
          },
          unit_amount: data.price_in_cents
        },
        quantity: data.quantity,
      }
    })
    return finalResult
  }catch(err){
    throw err
  }
}
const triggerStripe = async (stripeLineItems=[]) => {
  try {
    if(!Array.isArray(stripeLineItems) || stripeLineItems.length ===0){
      throw new Error("STRIPE_LINE_ITEMS_EMPTY")
    }
    // eslint-disable-next-line global-require
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      success_url: constants.STRIPE_SUCCESS_URL,
      cancel_url: constants.STRIPE_CANCEL_URL,
      line_items: stripeLineItems,
      mode: constants.STRIPE_PAYMENT_MODE,
    });
    // console.log(session);
    return session;
  } catch (err) {
    console.error('err in triggerstripe ', err.message);
    throw err;
  }
};
const getStripeDetails = async(payload) =>{
  try{
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const result = await stripe.checkout.sessions.retrieve(payload.stripe_session_id)
    return result
  }catch(err){
    throw err
  }
}
const updateOrderbyID = async(payload) =>{
  try{
    const order = await OrderModel.findById({_id: new mongoose.Types.ObjectId(payload.order_id)})
    const stripe_result = await getStripeDetails(payload)
    console.log(stripe_result)
    order.payment_status = stripe_result?.payment_status
    const paymentData = await PaymentModel.findById({_id : order.payment_details})
    paymentData.payment_information = stripe_result
    await paymentData.save()
    // console.log(order)
    await order.save()
    const result = order
    return result
  }catch(err){
    throw err
  }
}

module.exports = {
  createOrder,
  getOrderbyID,
  getAllOrders,
  triggerStripe,
  getStripeDetails,
  updateOrderbyID
}