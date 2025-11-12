"use client"

import { usePathname } from "next/navigation" // Importamos usePathname
import { SidebarIcon } from "lucide-react"

import { SearchForm } from "@/components/search-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSidebar } from "@/components/ui/sidebar"

// Función para mapear la ruta actual a un título legible
function getPageTitle(pathname: string) {
  // Define un mapa de rutas conocidas a títulos en español
  const titleMap: { [key: string]: string } = {
    "/dashboard": "Dashboard",
    "/profile": "Mi Perfil",
    "/settings": "Configuración",
    "/models": "Modelos IA",
    // Agrega más rutas según sea necesario
  }

  // Si la ruta completa está en el mapa, devuelve el título
  if (titleMap[pathname]) {
    return titleMap[pathname]
  }

  // Si la ruta no está mapeada, usa la última parte de la URL
  // y capitaliza la primera letra (ej: /user/1 -> User)
  const segments = pathname.split('/').filter(s => s.length > 0)
  if (segments.length > 0) {
    const lastSegment = segments[segments.length - 1]
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  }

  return "Inicio" // Título por defecto
}

export function SiteHeader() {
  const { toggleSidebar } = useSidebar()
  const pathname = usePathname() // Obtenemos la ruta actual
  const currentPageTitle = getPageTitle(pathname) // Obtenemos el título dinámico

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        
        {/* Migas de Pan (Breadcrumb) */}
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              {/* Enlace estático o dinámico a la página principal del área (ej: Dashboard) */}
              <BreadcrumbLink href="/dashboard">
                Aplicación Principal
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {/* Título de la página actual, dinámico */}
              <BreadcrumbPage>{currentPageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="ml-auto flex items-center gap-4">
          <SearchForm />
        </div>
      </div>
    </header>
  )
}
