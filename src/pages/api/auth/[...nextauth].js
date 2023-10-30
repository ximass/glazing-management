import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from '../../../../lib/prisma';


const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const authOptions = {
secret: process.env.NEXTAUTH_SECRET,
session: {
  strategy: "jwt",
},
jwt: {secret: process.env.JWT_SIGNIN_PRIVATE_KEY, maxAge: 60 * 60 * 24},
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { },
        password: { }
      },
      // session: {
      //   strategy: "jwt",
      //   maxAge: 30 * 24 * 60 * 60, // 30 days
      // },

      async authorize(credentials) {

        const result   = await prisma.user.findFirst({
          where: {
            login: credentials.username,
            password: credentials.password
          }
        });


        const user = result;

        if (user) {
          return user;
        } else {
          throw new Error("User not found!")
        }
        
      },
      pages: {
        signIn: '/auth/login/index.tsx'
      },
    }),
  ],
  callbacks: {
    async jwt(token,  account) {
      if(token.sub)
      {
        return token

      }
      else
      {
        throw new Error("Usuario invalido")
      }
    },
    async session(session, token, user) {
     if(!token.sub){
      throw new Error("Sessao inválida");
     }

     return {...session,accessToken: token.sub};
    },


   
    // jwt: async ({ token, user }) => {
    //   if (user) {
    //     token.email = user.data.auth.email;
    //     token.username = user.data.auth.userName;
    //     token.userType = user.data.auth.userType;
    //     token.accessToken = user.data.auth.token;
    //   }

    //   return token;
    // },
    // session: ({ session, token, user }) => {
    //     if (token) {
    //       session.user.email = token.email;
    //       session.user.username = token.userName;
    //       session.user.accessToken = token.accessToken;
    //     }
    //     return session;
    //   },
}
};

export default NextAuth(authOptions);