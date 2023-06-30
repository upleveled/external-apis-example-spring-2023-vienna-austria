import { NextResponse } from 'next/server';

type StripeResponse = {
  sessions: string;
};

export async function GET(): Promise<NextResponse<StripeResponse>> {
  return await NextResponse.json({
    sessions: '/api/sessions',
  });
}
