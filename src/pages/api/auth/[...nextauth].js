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
    }
}
};

export default NextAuth(authOptions);