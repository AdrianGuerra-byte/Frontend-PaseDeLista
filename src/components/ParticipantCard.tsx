import type { Participante } from '../types';

interface ParticipantCardProps {
  participante: Participante;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ParticipantCard({ 
  participante, 
  isSelected, 
  onToggleSelect,
  onDelete 
}: ParticipantCardProps) {
  const handleCheckboxChange = () => {
    onToggleSelect(participante.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Eliminar a ${participante.nombre}?`)) {
      onDelete(participante.id);
    }
  };

  return (
    <div 
      className={`card-hover cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'border-green-500 bg-gradient-to-r from-green-500/10 to-green-600/5 shadow-lg shadow-green-500/20' 
          : 'hover:shadow-lg'
      }`}
      onClick={handleCheckboxChange}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isSelected}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
          className="checkbox flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5"
        />

        {/* Información */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-gray-100 truncate">
            {participante.nombre}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 text-xs sm:text-sm text-gray-400">
            <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${
              participante.institucion === 'CUH' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-warning/20 text-warning'
            }`}>
              {participante.institucion}
            </span>
            <span className="truncate">{participante.grupo}</span>
          </div>
        </div>

        {/* Estado de asistencia actual */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {participante.asistio === 1 && (
            <span className="text-[10px] sm:text-xs bg-green-500/20 text-green-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold flex items-center gap-1 whitespace-nowrap">
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="hidden xs:inline">Asistió</span>
            </span>
          )}
          
          {/* Botón eliminar */}
          <button
            onClick={handleDelete}
            className="p-1.5 sm:p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-all"
            title="Eliminar participante"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
