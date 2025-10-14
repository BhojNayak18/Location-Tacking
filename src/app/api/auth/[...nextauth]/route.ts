import NextAuth, { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import SalesforceProvider from 'next-auth/providers/salesforce';
import { v4 as uuidv4 } from 'uuid';

interface ExtendedToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  instanceUrl?: string;
  userName?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    SalesforceProvider({
      clientId: process.env.SALESFORCE_CLIENT_ID!,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET!,

      // If your app is in a sandbox, you need to specify the issuer URL.
      issuer: 'https://test.salesforce.com',
      authorization: {
        params: {
          scope: 'api refresh_token',
        },
      },
      checks: ['pkce'],
    }),
  ],
  // It's strongly recommended to set a secret in production.
  // We'll generate a random one for development.
  // You can generate a secret with `openssl rand -base64 32`
  secret: process.env.NEXTAUTH_SECRET || uuidv4(),
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        (token as ExtendedToken).accessToken = account.access_token as string;
        (token as ExtendedToken).refreshToken = account.refresh_token as string;
        (token as ExtendedToken).instanceUrl = account.instance_url as string;
        
        // Fetch user profile from Salesforce
        try {
          const userResponse = await fetch(
            `${account.instance_url}/services/oauth2/userinfo`,
            {
              headers: {
                'Authorization': `Bearer ${account.access_token}`,
              },
            }
          );
          
          if (userResponse.ok) {
            const userInfo = await userResponse.json();
            (token as ExtendedToken).userName = userInfo.name || userInfo.preferred_username || userInfo.email;
            console.log('Fetched user info:', userInfo);
          }
        } catch (error) {
          console.error('Failed to fetch user info:', error);
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = (token as ExtendedToken).accessToken;
      (session as any).refreshToken = (token as ExtendedToken).refreshToken;
      (session as any).instanceUrl = (token as ExtendedToken).instanceUrl;
      (session as any).user.id = token.sub; // Add salesforce user id to the session
      
      // Set the user name from the token
      if ((token as ExtendedToken).userName) {
        session.user.name = (token as ExtendedToken).userName;
      }
      
      return session;
    },
  },
};

// Set the NEXTAUTH_URL environment variable for development
if (process.env.NODE_ENV !== 'production') {
  process.env.NEXTAUTH_URL = 'http://localhost:9002';
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
