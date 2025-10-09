import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  // Si está autenticado, va al dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  // Si no está autenticado, va al login
  redirect("/login")
}