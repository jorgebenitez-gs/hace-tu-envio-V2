"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ServiceTypeCard } from "@/components/specific/gestionar-envio/ServiceTypeCard";
import { ServiceType } from "@/types";

const serviceTypes: ServiceType[] = [
  {
    id: 1,
    tipo: "postal",
    titulo: "Encomienda",
    descripcion: "Hasta 50kg, con seguridad incluida, 205cm lineal y 100cm de alto y tambien envuelta en film",
    imagen: "📦",
  },
  {
    id: 2,
    tipo: "postal",
    titulo: "Sobre",
    descripcion: "Hasta 500 gr",
    imagen: "✉️",
  },
  {
    id: 3,
    tipo: "postal",
    titulo: "Vinos",
    descripcion: "Hasta 50kg",
    imagen: "🛍️",
  },
  // {
  //   id: 4,
  //   tipo: "postal",
  //   titulo: "Encomienda",
  //   descripcion: "Hasta 50kg, con seguridad incluida, 205cm lineal y 100cm de alto y tambien envuelta en film",
  //   imagen: "📦",
  // },
  // {
  //   id: 5,
  //   tipo: "postal",
  //   titulo: "Sobre",
  //   descripcion: "Hasta 500 gr",
  //   imagen: "✉️",
  // },

];

export default function GestionarEnvioPage() {
  const router = useRouter();

  const handleSelectService = (serviceType: ServiceType) => {
    // Convertir titulo a slug para la URL (ej: "Encomienda" -> "encomienda")
    const slug = serviceType.titulo.toLowerCase().replace(/\s+/g, '-');
    router.push(`/gestionar-envio/${slug}`);
  };

  return (
    <main className="min-h-screen from-primary/5 to-white py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <a href="/dashboard" className="text-sm text-primary hover:underline mb-6 inline-block">
          &larr; Volver al Dashboard
        </a>
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold text-primary">
            Gestioná tu envío
          </h1>
          <h2 className="text-xl text-primary/80 font-medium">
            Seleccioná el tipo de envío
          </h2>
        </div>


        {/* Service type selector */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {serviceTypes.map((serviceType) => (
            <ServiceTypeCard
              key={serviceType.id}
              serviceType={serviceType}
              selected={false}
              onSelect={handleSelectService}
            />
          ))}
        </div>
      </div>
    </main>
  );
}