"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import OrigenStep from "@/components/specific/gestionar-envio/steps/OrigenStep";
import PackageStep from "@/components/specific/gestionar-envio/steps/PackageStep";
import DestinoStep from "@/components/specific/gestionar-envio/steps/DestinoStep";
import PackageLoadStep from "@/components/specific/gestionar-envio/steps/PackageLoadStep";
import ExcelUploadStep from "@/components/specific/gestionar-envio/steps/ExcelUploadStep";
import { Button } from "@/components/ui/button";

interface StepData {
    origen: { coords?: { lat: number; lng: number } };
    paquete: any;
    destino: any;
    loadType?: "manual" | "excel";
    excelFile?: File;
}

export default function GestionarEnvioPorTipoPage() {
    const router = useRouter();
    const params = useParams();
    const tipo = params.tipo as string; // ej: "encomienda", "sobre", "bolsin-corporativo"

    const [step, setStep] = useState<number>(0);
    const [formData, setFormData] = useState<StepData>({
        origen: {},
        paquete: {},
        destino: {},
        loadType: undefined,
        excelFile: undefined,
    });

    const steps = [
        { id: 0, title: 'Origen' },
        { id: 1, title: 'Tipo Carga' },
        { id: 2, title: 'Datos Paquete' },
        { id: 3, title: 'Destino' },
    ];

    const canNext = () => {
        // minimal validation per step
        if (step === 0) return !!formData.origen?.coords;
        if (step === 1) return !!formData.loadType;
        if (step === 2) {
            // if excel flow, require uploaded file; otherwise require manual package peso
            if (formData.loadType === 'excel') return !!formData.excelFile;
            return !!formData.paquete?.peso;
        }
        if (step === 3) return !!formData.destino?.calle;
        return true;
    };

    const handleFinish = () => {
        // here you would submit to backend
        console.log({ tipo, ...formData });
        alert(`Envío de tipo "${tipo}" creado (simulación)`);
    };

    return (
        <main className="min-h-screen from-primary/5 to-white py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => router.back()}
                    className="text-sm text-primary hover:underline mb-6 inline-block"
                >
                    &larr; Volver
                </button>

                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-4xl font-bold text-primary capitalize">
                        Envío: {tipo.replace(/-/g, ' ')}
                    </h1>
                    <h2 className="text-xl text-primary/80 font-medium">
                        Completa los datos del envío
                    </h2>
                </div>

                {/* Stepper */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-6">
                        {steps.map((s, i) => (
                            <div
                                key={s.id}
                                className={`text-sm px-3 py-1 rounded-full font-medium transition-all ${i === step
                                    ? 'bg-primary text-white'
                                    : i < step
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {s.title}
                            </div>
                        ))}
                    </div>

                    <div className="rounded-lg border p-6 bg-white">
                        {step === 0 && (
                            <OrigenStep
                                data={formData.origen}
                                onChange={(patch) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        origen: { ...prev.origen, ...patch },
                                    }))
                                }
                            />
                        )}
                        {step === 1 && (
                            <PackageLoadStep
                                loadType={formData.loadType}
                                onChange={(loadType) => {
                                    // only set selected loadType; do NOT auto-advance
                                    setFormData((prev) => ({
                                        ...prev,
                                        loadType,
                                    }));
                                }}
                                onFileSelected={(file) => {
                                    // store uploaded file and mark loadType as excel; do NOT auto-advance
                                    setFormData((prev) => ({
                                        ...prev,
                                        excelFile: file,
                                        loadType: 'excel',
                                    }));
                                }}
                            />
                        )}
                        {step === 2 && (
                            formData.loadType === 'excel' ? (
                                <ExcelUploadStep
                                    uploadedFile={formData.excelFile || null}
                                    onFileSelected={(file) => setFormData((prev) => ({ ...prev, excelFile: file }))}
                                />
                            ) : (
                                <PackageStep
                                    data={formData.paquete}
                                    onChange={(patch) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            paquete: { ...prev.paquete, ...patch },
                                        }))
                                    }
                                />
                            )
                        )}

                        {step === 3 && (
                            <DestinoStep
                                data={formData.destino}
                                onChange={(patch) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        destino: { ...prev.destino, ...patch },
                                    }))
                                }
                            />
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-6 flex justify-between gap-3">
                            <Button
                                variant="outline"
                                size="default"
                                onClick={() => setStep((s) => Math.max(0, s - 1))}
                                disabled={step === 0}
                            >
                                Volver
                            </Button>

                            {step < steps.length - 1 ? (
                                <Button
                                    variant="default"
                                    size="default"
                                    onClick={() => {
                                        if (canNext()) setStep((s) => s + 1);
                                    }}
                                    disabled={!canNext()}
                                >
                                    Siguiente
                                </Button>
                            ) : (
                                <Button
                                    variant="default"
                                    size="default"
                                    onClick={handleFinish}
                                    disabled={!canNext()}
                                >
                                    Finalizar
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
