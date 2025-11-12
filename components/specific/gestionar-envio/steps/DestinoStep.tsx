"use client";

import React from "react";

interface DestinoData {
    nombre?: string;
    calle?: string;
    numero?: string;
    ciudad?: string;
    telefono?: string;
}

interface DestinoStepProps {
    data: DestinoData;
    onChange: (patch: Partial<DestinoData>) => void;
}

export const DestinoStep: React.FC<DestinoStepProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm text-gray-700">Nombre destinatario</label>
                <input
                    className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                    value={data.nombre || ""}
                    onChange={(e) => onChange({ nombre: e.target.value })}
                    placeholder="Nombre y apellido"
                />
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div>
                    <label className="block text-sm text-gray-700">Calle</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.calle || ""}
                        onChange={(e) => onChange({ calle: e.target.value })}
                        placeholder="Calle"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Número</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.numero || ""}
                        onChange={(e) => onChange({ numero: e.target.value })}
                        placeholder="Número"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-700">Ciudad</label>
                    <input
                        className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                        value={data.ciudad || ""}
                        onChange={(e) => onChange({ ciudad: e.target.value })}
                        placeholder="Ciudad"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-700">Teléfono</label>
                <input
                    className="mt-1 w-full rounded-md border px-2 py-2 text-sm"
                    value={data.telefono || ""}
                    onChange={(e) => onChange({ telefono: e.target.value })}
                    placeholder="Teléfono de contacto"
                />
            </div>
        </div>
    );
};

export default DestinoStep;
