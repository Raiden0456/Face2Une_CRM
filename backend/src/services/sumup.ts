import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const sumupApiBaseURL = "https://api.sumup.com";


async function getAccessToken(): Promise<string> {
  const clientId = process.env.SUMUP_TEST_CLIENT_ID;
  const clientSecret = process.env.SUMUP_TEST_CLIENT_SECRET;
  const tokenURL = `${sumupApiBaseURL}/token`;

  const authString = `${clientId}:${clientSecret}`;
  const authEncoded = Buffer.from(authString).toString("base64");

  try {
    const response = await axios.post(
      tokenURL,
      {
        grant_type: "client_credentials",
        scope: "payments",
      },
      {
        headers: {
          Authorization: `Basic ${authEncoded}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    throw new Error(`Failed to get access token: ${error.message}`);
  }
}

export async function createCheckout(
  amount: number,
  currency: string,
  returnUrl: string
): Promise<string> {
  const affiliateKey = process.env.SUMUP_AFFILIATE_TEST_KEY;
  const checkoutURL = `${sumupApiBaseURL}/v0.1/checkouts`;

  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      checkoutURL,
      {
        checkout_reference: "FACESTELLAR", // TODO: generate a unique reference, e.g using transaction type(pack,cert,appointement) and price
        amount,
        currency,
        pay_to_email: "dev_8qpuaubv@sumup.com",
        return_url: returnUrl, // URL SumUp directs info about the payment status 
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Affiliate-Key": affiliateKey,
        },
      }
    );
    console.log("response", response);
    return response.data.checkout_url;
  } catch (error) {
    console.log("error", error);
    throw new Error(`Failed to create SumUp checkout: ${error.message}`);
  }
}

export async function getCheckoutStatus(checkoutId: string): Promise<string> {
  const clientId = process.env.SUMUP_TEST_CLIENT_ID;
  const clientSecret = process.env.SUMUP_TEST_CLIENT_SECRET;
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
    console.log('error', error);
    throw new Error(`Failed to get checkout status: ${error.message}`);
  }
}

