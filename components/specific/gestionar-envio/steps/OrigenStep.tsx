"use client";

import React from "react";
import MapPlaceholder from "./MapPlaceholder";

interface OrigenStepProps {
    data: { coords?: { lat: number; lng: number } };
    onChange: (patch: Partial<{ coords?: { lat: number; lng: number } }>) => void;
}

export const OrigenStep: React.FC<OrigenStepProps> = ({ data, onChange }) => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-gray-600">Seleccioná el origen en el mapa</p>
            <MapPlaceholder onSelect={(coords) => onChange({ coords })} />

            {data.coords && (
                <div className="text-xs text-gray-700">
                    Seleccionado: {data.coords.lat.toFixed(4)}, {data.coords.lng.toFixed(4)}
                </div>
            )}
        </div>
    );
};

export default OrigenStep;
