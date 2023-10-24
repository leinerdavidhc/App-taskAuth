import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { ConnectDB } from "@/libs/mongodb";
import User from "@/models/user.model";
import bcrypt from "bcryptjs"

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Credentials",
          id: "credentials",
          credentials: {
              email: { label: "Email", type: "text", placeholder: "email" },
              password: { label: "Password", type: "password", placeholder:"******"},
          },
          async authorize(credentials) {
            try {
              await ConnectDB()
              const userFound=await User.findOne({
                email:credentials?.email
              }).select("+password")
              if (!userFound) throw new Error("Invalid credentials")

              const PasswordMatch=bcrypt.compare(credentials!.password,userFound.password)
              if(!PasswordMatch) throw new Error("Invalid credentials")
              console.log(userFound);
              return userFound;
            } catch (error) {
              console.log(error);
            }
          }
        })
      ],
      pages: {
        signIn: "/login",
      },
      session: {
        strategy: "jwt",
      },
      callbacks:{
        async jwt({token,user}){
          if(user) token.user=user;
          return token;
        },
        async session({session,token}){
          session.user=token.user as any;
          return session; 
        }
      }
})

export { handler as GET, handler as POST }