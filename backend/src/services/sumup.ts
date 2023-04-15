import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sumupApiBaseURL = "https://api.sumup.com";

export async function createCheckout(
  amount: number,
  currency: string,
  returnUrl: string
): Promise<string> {
  const clientId = process.env.SUMUP_CLIENT_ID;
  const clientSecret = process.env.SUMUP_CLIENT_SECRET;
  const affiliateKey = process.env.SUMUP_AFFILIATE_KEY;
  const checkoutURL = `${sumupApiBaseURL}/v0.1/checkouts`;

  const authString = `${clientId}:${clientSecret}`;
  const authEncoded = Buffer.from(authString).toString("base64");

  try {
    const response = await axios.post(
      checkoutURL,
      {
        amount,
        currency,
        checkout_reference: "FACESTELLAR", // TODO: generate a unique reference, e.g using transaction type(pack,cert,appointement) and price
        pay_to_email: "annananibabakekhian@gmail.com",
        return_url: returnUrl, // URL SumUp directs info about the payment status 
      },
      {
        headers: {
          Authorization: `Basic ${authEncoded}`,
          "Content-Type": "application/json",
          "X-Affiliate-Key": affiliateKey,
        },
      }
    );

    return response.data.checkout_url;
  } catch (error) {
    throw new Error(`Failed to create SumUp checkout: ${error.message}`);
  }
}

export async function getCheckoutStatus(checkoutId: string): Promise<string> {
  const clientId = process.env.SUMUP_CLIENT_ID;
  const clientSecret = process.env.SUMUP_CLIENT_SECRET;
  const checkoutStatusURL = `${sumupApiBaseURL}/v0.1/checkouts/${checkoutId}`;

  const authString = `${clientId}:${clientSecret}`;
  const authEncoded = Buffer.from(authString).toString('base64');

  try {
    const response = await axios.get(checkoutStatusURL, {
      headers: {
        'Authorization': `Basic ${authEncoded}`,
      },
    });

    return response.data.status;
  } catch (error) {
    throw new Error(`Failed to get checkout status: ${error.message}`);
  }
}
