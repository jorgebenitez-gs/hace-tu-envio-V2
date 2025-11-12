import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import ButtonActionsHome from "@/components/specific/home/ButtonActionsHome"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">

          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <div className="p-6">
              <h2 className="text-2xl font-bold">
                Bienvenido, {session.user.name}!
              </h2>
              <div className="mt-2 flex items-center justify-between gap-4">
                <p className="text-muted-foreground">
                  Has iniciado sesión exitosamente con {session.user.email}
                </p>
                {/* Botón para crear un envío (componente cliente) */}
                <div>

                </div>
              </div>
            </div>
            <div className="p-6 flex gap-4">
              <ButtonActionsHome text="Hacer un envio" pathRedirect="gestionar-envio" />
              <ButtonActionsHome text="Ver mis envios" pathRedirect="gestionar-envio" />
            </div>
          </div>
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50 " >
              box 1
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 " >
              box 2
            </div><div className="aspect-video rounded-xl bg-muted/50 " >
              box 3
            </div>
          </div>

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}