import Stripe from 'stripe'

const stripe:any =   Stripe(process.env.STRIPE)


const StripeService={

    createStripe:async(query:any)=>{
        const createStripe= await  stripe.checkout.sessions.create(query)
        return createStripe
    },

    getStripe:async(query:any)=>{
        const getStripe= await stripe.checkout.sessions.retrieve(query)
        return getStripe
    }, 
   
}


export default StripeService