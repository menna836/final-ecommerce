
import { apiServices } from "@/services/api"

import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"



const handler = NextAuth({
    providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "email", type: "text", placeholder: "Your-email@examble.com" },
            password: { label: "Password", type: "password",placeholder:"***********" }
        },
        async authorize(credentials, req) {
            const response = await apiServices.login(credentials?.email ?? "", credentials?.password ?? "")
            console.log(response)

              if (response.statusMsg === "fail") {
                throw new Error(response.message || "Invalid credentials");
            }

            if(response.message === "success"){
                const user = {
                    id: response.user.email,
                    name: response.user.name,
                    email: response.user.email,
                    role: response.user.role,
                    token: response.token
                }
                return user
            } else {
                return null
            }
        }

        
        

    })
    
    ],
    pages:{
        signIn:"/auth/login"
    },
    callbacks:{
       
        async jwt({token,user}){
            if(user){
                token.token = user.token;
                token.role = user.role;
            }
            return token
        },  async session({ session, token }) {
            // نحط الـ accessToken جوا session.user
            session.token = token.token  as string
            session.user.role = token.role as string
            return session
        }

    },
    secret:process.env.AUTH_SECRET,
    session:{
        strategy:'jwt'
    }
})

export { handler as GET, handler as POST }
