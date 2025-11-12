import React from 'react';
import { ServiceType } from '@/types';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface ServiceTypeCardProps {
  serviceType: ServiceType;
  selected?: boolean;
  onSelect: (serviceType: ServiceType) => void;
}

export const ServiceTypeCard: React.FC<ServiceTypeCardProps> = ({
  serviceType,
  selected = false,
  onSelect
}) => {
  return (
    <Card
      className={`
        cursor-pointer transition-all duration-300 
        border-2 p-4 h-full flex flex-col items-center justify-between gap-3
        ${selected
          ? 'border-secondary bg-primary text-white shadow-lg'
          : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-md'
        }
      `}
      onClick={() => onSelect(serviceType)}
    >
      {/* Icon */}
      <div className={`
        text-4xl transition-all duration-300
      `}>
        {serviceType.imagen}
      </div>

      {/* Title */}
      <h3 className={`
        text-sm font-semibold transition-colors text-center
        ${selected ? 'text-white' : 'text-gray-800'}
      `}>
        {serviceType.titulo}
      </h3>

      {/* Description */}
      {serviceType.descripcion && (
        <p className={`
          text-xs font-normal transition-colors text-center
          ${selected ? 'text-white/80' : 'text-gray-500'}
        `}>
          {serviceType.descripcion}
        </p>
      )}

      {/* Checkbox */}
      <div className={`
        w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 mt-1
        ${selected
          ? 'bg-primary border-secondary'
          : 'border-gray-300 bg-white'
        }
      `}>
        {selected && (
          <Check className="w-3 h-3 text-white" />
        )}
      </div>
    </Card>
  );
};