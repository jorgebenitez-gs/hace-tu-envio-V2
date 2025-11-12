"use client";

import React from "react";

interface PackageData {
    peso?: string;
    alto?: string;
    ancho?: string;
    profundidad?: string;
    descripcion?: string;
}

interface PackageStepProps {
    data: PackageData;
    onChange: (patch: Partial<PackageData>) => void;
}

export const PackageStep: React.FC<PackageStepProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm text-gray-700">Peso (kg)</label>
                <input
                    className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                    value={data.peso || ""}
                    onChange={(e) => onChange({ peso: e.target.value })}
                    placeholder="Ej: 2.5"
                />
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="block text-sm text-gray-700">Alto (cm)</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.alto || ""}
                        onChange={(e) => onChange({ alto: e.target.value })}
                        placeholder="Alto"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Ancho (cm)</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.ancho || ""}
                        onChange={(e) => onChange({ ancho: e.target.value })}
                        placeholder="Ancho"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Profundidad (cm)</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.profundidad || ""}
                        onChange={(e) => onChange({ profundidad: e.target.value })}
                        placeholder="Profundidad"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-700">Descripción</label>
                <input
                    className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                    value={data.descripcion || ""}
                    onChange={(e) => onChange({ descripcion: e.target.value })}
                    placeholder="Contenido del paquete"
                />
            </div>
        </div>
    );
};

export default PackageStep;
