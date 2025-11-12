"use client";

import React from "react";

interface ExcelUploadStepProps {
    onFileSelected: (file: File) => void;
    onDownload?: () => void;
    uploadedFile?: File | null;
}

export const ExcelUploadStep: React.FC<ExcelUploadStepProps> = ({ onFileSelected, onDownload, uploadedFile }) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelected(file);
    };

    const downloadTemplate = () => {
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
        onDownload?.();
    };

    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-700">Sube tu archivo con los paquetes (CSV / XLSX)</p>

            <div className="grid gap-3">
                <button
                    type="button"
                    onClick={downloadTemplate}
                    className="w-50 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/5 transition-all text-sm font-medium"
                >
                    ⬇️ Descargar plantilla
                </button>

                <label htmlFor="excel-file" className="w-full block">
                    <input id="excel-file" type="file" accept=".xlsx,.xls,.csv" onChange={handleFileChange} className="hidden" />
                    <div className="w-50 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-all text-sm font-medium text-center cursor-pointer">
                        📤 Seleccionar archivo
                    </div>
                </label>

                {uploadedFile && (
                    <div className="text-sm text-gray-600">Archivo cargado: {uploadedFile.name}</div>
                )}
            </div>
        </div>
    );
};

export default ExcelUploadStep;
