import Stripe from "stripe";

const sdk = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const stripe = {
  createCustomer: async ({
    organizationId,
    organizationName,
  }: {
    organizationId: string;
    organizationName: string;
  }) => {
    const customer = await sdk.customers.create({
      name: organizationName,
      metadata: {
        organizationId,
      },
    });
    return customer;
  },
};
