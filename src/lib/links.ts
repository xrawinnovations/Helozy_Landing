/** The web app lives on its own subdomain; the marketing site only links to it. */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.helozy.com';

export const links = {
  signIn: `${APP_URL}/login`,
  getStarted: APP_URL,
  privacy: `${APP_URL}/privacy`,
  terms: `${APP_URL}/terms`,
};
