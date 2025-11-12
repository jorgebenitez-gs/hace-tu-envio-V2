import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isOnLogin = nextUrl.pathname.startsWith("/login")
      const isOnRoot = nextUrl.pathname === "/"
      const isOnTest = nextUrl.pathname.startsWith("/test")
      
      // Permitir acceso a /test sin autenticación
      if (isOnTest) {
        return true
      }
      
      // Si está en dashboard sin login, redirigir a login
      if (isOnDashboard && !isLoggedIn) {
        return false
      }
      
      // Si está logueado e intenta ir a login, redirigir a dashboard
      if (isLoggedIn && (isOnLogin || isOnRoot)) {
        return Response.redirect(new URL("/dashboard", nextUrl))
      }
      
      return true
    },
  },
})