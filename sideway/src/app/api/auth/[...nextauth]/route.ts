import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { SupabaseAdapter } from "@next-auth/supabase-adapter"
import { supabase } from "@/lib/supabaseClient"
import bcrypt from "bcryptjs"

// Extend the Session and User types to include 'id'
declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        }
    }
    interface User {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
    }
}


const handler = NextAuth({
    // 👇 storage for user sessions
    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
        secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    }),
    // 👇 Auth providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null

                // Check if user exists
                const { data: user } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", credentials.email)
                    .single()

                if (!user) return null

                // check password
                const valid = await bcrypt.compare(credentials.password, user.hashed_password)
                if (!valid) return null

                return user
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = String(token.id)
                session.user.name = token.name
                session.user.email = token.email
            }
            return session
        },
    },

    // 👇 key to sign
    secret: process.env.NEXTAUTH_SECRET!,
})

export { handler as GET, handler as POST }
