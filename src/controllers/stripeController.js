const stripeLater = async () => {
  try {
    // eslint-disable-next-line global-require
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:4200/payment-complete',
      cancel_url: 'http://localhost:4200/payment-cancel',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Samsung S90D'
            },
            unit_amount: 50 * 100
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
    });
    // console.log(session);
    return session;
  } catch (err) {
    console.error('err in stripeLater ', err.message);
    throw err;
  }
};

const checkStripe = async (req, res, next) => {
  try {
    // const items = [[1, {priceInCents: 10000, name: `Learn Stripe Mannnnn`}], [1, {priceInCents: 20000, name: `Learn Nodee Mannnnn`}]]
    // const storeItems = new Map(items)

    // const result = await stripeLater();
    const OrderService = require('../services/orderService')
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Samsung S90D'
          },
          unit_amount: 50 * 100
        },
        quantity: 2,
      },
    ]
    const result = await OrderService.triggerStripe(lineItems)
    res.json({
      name: 'manoj',
      message: `"checking Stripe" ${process.env.STRIPE_SECRET_KEY}`,
      stripe_url: result.url
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  checkStripe
};
