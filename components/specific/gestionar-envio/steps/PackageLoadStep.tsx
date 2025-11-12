"use client";

import React, { useRef } from "react";

interface PackageLoadStepProps {
    loadType?: "manual" | "excel";
    onChange: (loadType: "manual" | "excel") => void;
    onFileSelected?: (file: File) => void;
}

export const PackageLoadStep: React.FC<PackageLoadStepProps> = ({
    loadType,
    onChange,
    onFileSelected,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onFileSelected?.(file);
        }
    };

    const downloadTemplate = () => {
        // Create a simple Excel template CSV (can be replaced with actual Excel generation)
        const csvContent = "nombre,peso,alto,ancho,profundidad,descripcion\nEjemplo,2.5,10,15,20,Descripción del paquete\n";
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "plantilla_paquetes.csv";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Seleccioná cómo querés cargar los datos del paquete:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Carga Manual */}
                <button
                    type="button"
                    onClick={() => onChange("manual")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${loadType === "manual"
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-primary/30"
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">📝</div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Carga manual</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Completa los datos del paquete manualmente en el siguiente paso
                            </p>
                        </div>
                    </div>
                </button>

                {/* Carga por Excel */}
                <button
                    type="button"
                    onClick={() => onChange("excel")}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${loadType === "excel"
                        ? "border-primary bg-primary/10 shadow-md"
                        : "border-gray-200 bg-white hover:border-primary/30"
                        }`}
                >
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">📊</div>
                        <div>
                            <h3 className="font-semibold text-gray-800">Carga por Excel</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Sube un archivo Excel con múltiples paquetes
                            </p>
                        </div>
                    </div>
                </button>
            </div>

            {/* NOTE: excel upload moved to a dedicated step component (ExcelUploadStep) so this file only shows options */}
        </div>
    );
};

export default PackageLoadStep;
