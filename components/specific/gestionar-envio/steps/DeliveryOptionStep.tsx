"use client";

import React from "react";

interface DeliveryOptionProps {
    option?: "sucursal" | "domicilio";
    onChange: (option: "sucursal" | "domicilio") => void;
}

export const DeliveryOptionStep: React.FC<DeliveryOptionProps> = ({ option, onChange }) => {
    return (
        <div className="space-y-3">
            <p className="text-sm text-gray-600">Seleccioná cómo querés que entreguemos:</p>
            <div className="flex gap-3">
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${option === 'sucursal' ? 'bg-primary text-white' : 'bg-white'}`}
                    onClick={() => onChange('sucursal')}
                >
                    Retiro en sucursal
                </button>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-md border ${option === 'domicilio' ? 'bg-primary text-white' : 'bg-white'}`}
                    onClick={() => onChange('domicilio')}
                >
                    Envío a domicilio
                </button>
            </div>
        </div>
    );
};

export default DeliveryOptionStep;
