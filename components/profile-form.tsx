"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

// Definición de tipos para la prop user de NextAuth
interface UserProfile {
  name?: string | null
  email?: string | null
  // Si tu sesión tiene más campos (ej: phone), añádelos aquí.
}

function handleProfileUpdate(formData: FormData) {
  // Lógica de actualización del perfil (simulada)
  console.log("Datos del formulario a actualizar:", Object.fromEntries(formData.entries()))
  // En una aplicación real, aquí llamarías a una API o Server Action
  alert("Datos de perfil actualizados (simulado).")
}

export function ProfileForm({
  user, // Acepta la prop user
  className,
  ...props
}: React.ComponentProps<"div"> & {
  user: UserProfile // Especifica el tipo de la prop user
}) {
  return (
    <div className={cn("w-full max-w-2xl", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Mi Perfil</CardTitle>
          <CardDescription>
            Actualiza tu información personal y de contacto. Los datos de la sesión se precargan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleProfileUpdate}>
            <FieldGroup>
              
              {/* Nombre Completo */}
              <Field>
                <FieldLabel htmlFor="fullName">Nombre Completo</FieldLabel>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Juan Pérez"
                  // Valor inicial de la sesión
                  defaultValue={user.name || ""} 
                  required
                />
              </Field>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="ejemplo@dominio.com"
                  // Valor inicial de la sesión
                  defaultValue={user.email || ""} 
                  required
                  disabled // El email suele estar deshabilitado para edición
                />
              </Field>

              {/* Teléfono */}
              <Field>
                <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+54 9 11 XXXX-XXXX"
                />
              </Field>

              {/* Grid para Provincia y Localidad */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                
                {/* Provincia */}
                <Field>
                  <FieldLabel htmlFor="province">Provincia</FieldLabel>
                  <Input
                    id="province"
                    type="text"
                    placeholder="Buenos Aires"
                  />
                </Field>

                {/* Localidad */}
                <Field>
                  <FieldLabel htmlFor="city">Localidad</FieldLabel>
                  <Input
                    id="city"
                    type="text"
                    placeholder="CABA / La Plata"
                  />
                </Field>
              </div>
              
              {/* Dirección */}
              <Field>
                <FieldLabel htmlFor="address">Dirección</FieldLabel>
                <Input
                  id="address"
                  type="text"
                  placeholder="Calle Falsa 123"
                />
              </Field>

              {/* Botón de Guardar */}
              <div className="pt-2">
                <Button type="submit">Guardar Cambios</Button>
              </div>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
