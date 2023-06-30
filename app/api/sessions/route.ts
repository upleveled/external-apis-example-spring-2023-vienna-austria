import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripeClient } from '../../../utils/stripe';

type StripeResponseBody = {
  sessions: Stripe.Checkout.Session;
};

export async function POST(
  request: NextRequest,
): Promise<NextResponse<StripeResponseBody>> {
  const body = await request.json();

  const session = await stripeClient.checkout.sessions.create({
    // replace the url with the domain once the app is deployed
    success_url: 'http://localhost:3000/success',
    line_items: [{ price: body.price, quantity: body.quantity || 1 }],
    mode: body.quantity ? 'payment' : 'subscription',
  });

  // return the session that you created
  return NextResponse.json({ sessions: session });
}
