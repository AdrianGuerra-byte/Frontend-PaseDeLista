import type { ListaEspera } from '../types';

interface ListaEsperaCardProps {
  persona: ListaEspera;
  onPromover: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ListaEsperaCard({ persona, onPromover, onDelete }: ListaEsperaCardProps) {
  const handlePromover = () => {
    if (window.confirm(`¿Promover a ${persona.nombre} a participantes?`)) {
      onPromover(persona.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`¿Eliminar a ${persona.nombre} de la lista de espera?`)) {
      onDelete(persona.id);
    }
  };

  return (
    <div className="card-hover">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Icono de espera */}
        <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        {/* Información */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm sm:text-base text-gray-100 truncate">
            {persona.nombre}
          </h3>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5 text-xs sm:text-sm text-gray-400">
            <span className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs font-medium ${
              persona.institucion === 'CUH' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-warning/20 text-warning'
            }`}>
              {persona.institucion}
            </span>
            <span className="truncate">{persona.grupo}</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={handlePromover}
            className="p-1.5 sm:p-2 bg-success/20 hover:bg-success/30 text-success rounded-lg transition-all"
            title="Promover a participantes"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
          
          <button
            onClick={handleDelete}
            className="p-1.5 sm:p-2 hover:bg-danger/20 text-danger rounded-lg transition-all"
            title="Eliminar"
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
