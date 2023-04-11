import Stripe from "stripe";

const stripe: any = Stripe(
  `sk_test_51MPJGwSDmcgHFungZp3Oa3FSY4Yh20DyH0AuMar7g1e5M4Ng4ynCWL4b4h9TSEQVQxqbmVuiq5k5LYBtRNzU1jCq00ONAtcTAl`
);

const StripeService = {
  createStripe: async (query: any) => {
    const createStripe = await stripe.checkout.sessions.create(query);
    return createStripe;
  },

  getStripe: async (query: any) => {
    const getStripe = await stripe.checkout.sessions.retrieve(query);
    return getStripe;
  },
};

export default StripeService;
