import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ProfileForm } from "@/components/profile-form" // Asumo que ProfileForm está en components/profile-form

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  // Asegúrate de que el objeto user no sea null para pasarlo
  const user = session.user

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              {/* Renderiza el formulario de perfil con los datos del usuario */}
              <ProfileForm user={user} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}