import { NextRequest, NextResponse } from 'next/server';
import {
  exchangeCodeAndFetchLinkedInProfile,
  getLinkedInCredentials,
  LINKEDIN_STATE_COOKIE,
  resolveOAuthRedirectUri,
  verifySignedOAuthState,
} from '@/lib/linkedinOAuthServer';

function buildPopupCallbackHtml(messagePayload: Record<string, unknown>, isSuccess: boolean): string {
  const safeJson = JSON.stringify(messagePayload).replace(/</g, '\\u003c');
  const titleText = isSuccess
    ? 'LinkedIn Connected'
    : 'LinkedIn Sign-In Incomplete';
  const subtitleText = isSuccess
    ? 'Your LinkedIn profile was verified. Returning to Makemycv...'
    : String(messagePayload.error || 'Could not complete LinkedIn authentication.');
  const accentColor = isSuccess ? '#16A34A' : '#DC2626';

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${titleText}</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #F4F7FE;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        color: #0F1B4D;
        padding: 24px;
        box-sizing: border-box;
      }
      .card {
        max-width: 400px;
        width: 100%;
        background: #FFFFFF;
        border: 1px solid #E8EAF5;
        border-radius: 20px;
        padding: 28px 24px;
        text-align: center;
        box-shadow: 0 12px 32px rgba(15, 27, 77, 0.08);
      }
      .dot {
        width: 12px;
        height: 12px;
        border-radius: 999px;
        background: ${accentColor};
        margin: 0 auto 14px;
      }
      h1 {
        font-size: 18px;
        margin: 0 0 8px;
        font-weight: 700;
      }
      p {
        font-size: 13px;
        line-height: 1.5;
        color: #64748B;
        margin: 0 0 18px;
      }
      button {
        background: #4B4DED;
        color: #FFFFFF;
        border: none;
        border-radius: 10px;
        padding: 10px 18px;
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="dot"></div>
      <h1>${titleText}</h1>
      <p>${subtitleText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
      <button type="button" onclick="window.close()">Close Window</button>
    </div>
    <script>
      (function () {
        var msg = ${safeJson};
        try {
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(msg, '*');
            setTimeout(function () {
              window.close();
            }, ${isSuccess ? 250 : 1200});
          }
        } catch (err) {
          console.error('Popup postMessage failed:', err);
        }
      })();
    </script>
  </body>
</html>`;
}

function createHtmlPopupResponse(
  payload: Record<string, unknown>,
  isSuccess: boolean
): NextResponse {
  const res = new NextResponse(buildPopupCallbackHtml(payload, isSuccess), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, max-age=0',
    },
  });

  res.cookies.set(LINKEDIN_STATE_COOKIE, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 0,
  });

  return res;
}

export async function GET(req: NextRequest) {
  const oauthError = req.nextUrl.searchParams.get('error');
  const oauthErrorDesc = req.nextUrl.searchParams.get('error_description');

  if (oauthError) {
    const friendlyMessage =
      oauthError === 'user_cancelled_login' || oauthError === 'user_cancelled_authorize'
        ? 'LinkedIn sign-in was cancelled.'
        : oauthErrorDesc || `LinkedIn returned an error (${oauthError}).`;

    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: false,
        cancelled:
          oauthError === 'user_cancelled_login' ||
          oauthError === 'user_cancelled_authorize',
        error: friendlyMessage,
      },
      false
    );
  }

  const code = req.nextUrl.searchParams.get('code');
  const stateParam = req.nextUrl.searchParams.get('state');
  const { clientId, clientSecret, configured } = getLinkedInCredentials();

  if (!configured) {
    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: false,
        error: 'LinkedIn OAuth credentials are not configured on the server.',
      },
      false
    );
  }

  if (!code) {
    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: false,
        error: 'Authorization code was not provided by LinkedIn.',
      },
      false
    );
  }

  const cookieNonce = req.cookies.get(LINKEDIN_STATE_COOKIE)?.value;
  const verification = verifySignedOAuthState(stateParam, clientSecret, cookieNonce);

  if (!verification.valid) {
    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: false,
        error: verification.error || 'Invalid OAuth state.',
      },
      false
    );
  }

  const redirectUri =
    verification.redirectUri || resolveOAuthRedirectUri(null, req.nextUrl.origin);

  try {
    const profilePayload = await exchangeCodeAndFetchLinkedInProfile({
      code,
      redirectUri,
      clientId,
      clientSecret,
    });

    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: true,
        payload: profilePayload,
      },
      true
    );
  } catch (err: unknown) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : 'Failed to retrieve LinkedIn profile data.';

    return createHtmlPopupResponse(
      {
        type: 'LINKEDIN_OAUTH_RESULT',
        ok: false,
        error: message,
      },
      false
    );
  }
}
