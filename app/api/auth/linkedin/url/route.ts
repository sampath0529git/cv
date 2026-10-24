import { NextRequest, NextResponse } from 'next/server';
import {
  createSignedOAuthState,
  getLinkedInCredentials,
  LINKEDIN_STATE_COOKIE,
  resolveOAuthRedirectUri,
} from '@/lib/linkedinOAuthServer';

export async function GET(req: NextRequest) {
  const originParam = req.nextUrl.searchParams.get('origin');
  const redirectUri = resolveOAuthRedirectUri(originParam, req.nextUrl.origin);
  const { clientId, clientSecret, scopes, configured } = getLinkedInCredentials();

  if (!configured) {
    return NextResponse.json({
      configured: false,
      redirectUri,
      scopes,
    });
  }

  const { state, nonce } = createSignedOAuthState(redirectUri, clientSecret);

  const authParams = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    scope: scopes,
  });

  const url = `https://www.linkedin.com/oauth/v2/authorization?${authParams.toString()}`;

  const response = NextResponse.json({
    configured: true,
    url,
    redirectUri,
    scopes,
  });

  response.cookies.set(LINKEDIN_STATE_COOKIE, nonce, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 15,
  });

  return response;
}
