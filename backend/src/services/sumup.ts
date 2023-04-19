import axios from "axios";
import dotenv from "dotenv";
import voucher_codes from "voucher-code-generator";
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
  returnUrl: string,
  client_id: string,
  order_type: string,
): Promise<object> {
  const affiliateKey = process.env.SUMUP_AFFILIATE_TEST_KEY;
  const checkoutURL = `${sumupApiBaseURL}/v0.1/checkouts`;
  const unique_code = voucher_codes.generate({
    length: 4,
    count: 1,
  });
  const checkout_reference = `${client_id}${order_type}${unique_code[0]}`;

  try {
    const accessToken = await getAccessToken();

    const response = await axios.post(
      checkoutURL,
      {
        checkout_reference: checkout_reference, // Unique reference for the checkout
        amount,
        currency,
        pay_to_email: process.env.SUMUP_TEST_PAYTOEMAIL,
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

    const checkoutRedirectURL = checkoutURL + "/" + response.data.id;
    const retObject = {checkoutRedirectURL: checkoutRedirectURL, checkoutId: response.data.id, checkout_reference: response.data.checkout_reference}
    return retObject
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

