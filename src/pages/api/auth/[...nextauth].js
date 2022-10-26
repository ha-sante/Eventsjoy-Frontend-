import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import Adapter from "./Fauna_Adapter"

import faunadb from "faunadb"


const faunaClient = new faunadb.Client({
  secret: process.env.NEXTAUTH_FAUNADB_SERVER_KEY,
});

const options = {
                                                                                                                                                                 
  // Configure one or more authentication providers
  providers: [
    Providers.Email({
      server: {
        host: process.env.NEXTAUTH_EMAIL_SERVER_HOST,
        port: process.env.NEXTAUTH_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NEXTAUTH_EMAIL_SERVER_USERNAME,
          pass: process.env.NEXTAUTH_EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.NEXTAUTH_EMAIL_FROM
    }),

    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    Providers.Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
  ],

  adapter: Adapter({faunaClient}),

  secret: process.env.NEXTAUTH_SESSION_COOKIE_SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },

  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET, // i added it after seeing the tweet
  },

  debug: true,

  callbacks: {
     session: async (session, user) => {
        // add the user id to profile
        session.user.id = user.sub;    
        
        return Promise.resolve(session);
      }
  }
}

export default (req, res) => NextAuth(req, res, options)