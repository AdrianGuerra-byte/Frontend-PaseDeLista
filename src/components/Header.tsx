import type { Estadisticas } from '../types';

interface HeaderProps {
  estadisticas: Estadisticas | null;
  onRefresh: () => void;
}

export default function Header({ estadisticas, onRefresh }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-dark-card/95 backdrop-blur-md border-b border-dark-border shadow-xl w-full overflow-x-hidden">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-3">
        <div className="flex flex-col gap-3 w-full min-w-0">
          {/* Título */}
          <div className="flex items-center justify-between gap-2 w-full">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-100 truncate">
                Pase de Lista
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 truncate">Torneo CUH 2025</p>
            </div>
            <button
              onClick={onRefresh}
              className="p-2 sm:p-3 hover:bg-dark-hover rounded-lg sm:rounded-xl transition-all active:scale-95 hover:rotate-180 duration-300 flex-shrink-0"
              title="Actualizar datos"
            >
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Estadísticas */}
          {estadisticas && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full min-w-0">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-2.5 sm:p-3 border border-blue-500/20 hover:border-blue-500/40 transition-all min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">Total</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-blue-400">{estadisticas.participantes.total}</p>
              </div>
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-lg p-2.5 sm:p-3 border border-green-500/20 hover:border-green-500/40 transition-all min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">Presentes</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-400">{estadisticas.participantes.asistieron}</p>
              </div>
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-lg p-2.5 sm:p-3 border border-red-500/20 hover:border-red-500/40 transition-all min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">Ausentes</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-red-400">{estadisticas.participantes.noAsistieron}</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 rounded-lg p-2.5 sm:p-3 border border-yellow-500/20 hover:border-yellow-500/40 transition-all min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium truncate">En Espera</p>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-yellow-400">{estadisticas.listaEspera}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
