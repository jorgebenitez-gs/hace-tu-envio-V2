"use client";

import React from "react";

export const MapPlaceholder: React.FC<{ onSelect?: (coords: { lat: number; lng: number }) => void }> = ({ onSelect }) => {
    const handleSelect = () => {
        // placeholder coordinates
        const coords = { lat: -34.6037, lng: -58.3816 };
        onSelect?.(coords);
    };

    return (
        <div
            className="w-full h-44 rounded-md border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-sm text-gray-500"
            onClick={handleSelect}
            role="button"
            tabIndex={0}
        >
            Mapa (placeholder) — hacer click para seleccionar ubicación
        </div>
    );
};

export default MapPlaceholder;
