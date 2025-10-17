import { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nombre: string; institucion: 'CUH' | 'PrepaCUH'; grupo: string }) => void;
  title: string;
  tipo: 'participante' | 'espera';
}

export default function Modal({ isOpen, onClose, onSubmit, title, tipo }: ModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    institucion: 'CUH' as 'CUH' | 'PrepaCUH',
    grupo: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.nombre.trim() && formData.grupo.trim()) {
      onSubmit(formData);
      setFormData({ nombre: '', institucion: 'CUH', grupo: '' });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({ nombre: '', institucion: 'CUH', grupo: '' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-dark-card rounded-t-2xl sm:rounded-2xl border-t border-x sm:border border-dark-border shadow-2xl w-full max-w-md transform transition-all animate-slideUp">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b border-dark-border">
          <div className="flex-1 min-w-0 pr-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-100">{title}</h2>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
              {tipo === 'participante' ? 'Completa la información' : 'Agregar a lista de espera'}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-all flex-shrink-0"
            title="Cerrar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[70vh] sm:max-h-none overflow-y-auto">
          {/* Nombre */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Nombre completo
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full bg-dark-bg/50 border-2 border-dark-border focus:border-blue-500 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-100 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Ej: Juan Pérez García"
              required
              autoFocus
            />
          </div>

          {/* Institución */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-300 mb-2 sm:mb-3">
              Institución
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, institucion: 'CUH' })}
                className={`relative py-3 sm:py-4 px-3 sm:px-4 rounded-lg font-medium transition-all duration-200 ${
                  formData.institucion === 'CUH'
                    ? 'bg-blue-500/10 text-blue-400 border-2 border-blue-500 shadow-sm'
                    : 'bg-dark-bg border-2 border-dark-border text-gray-400 hover:border-blue-500/30 hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-xs sm:text-sm">CUH</span>
                </div>
                {formData.institucion === 'CUH' && (
                  <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-0.5">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, institucion: 'PrepaCUH' })}
                className={`relative py-3 sm:py-4 px-3 sm:px-4 rounded-lg font-medium transition-all duration-200 ${
                  formData.institucion === 'PrepaCUH'
                    ? 'bg-yellow-500/10 text-yellow-400 border-2 border-yellow-500 shadow-sm'
                    : 'bg-dark-bg border-2 border-dark-border text-gray-400 hover:border-yellow-500/30 hover:text-gray-300'
                }`}
              >
                <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-xs sm:text-sm">PrepaCUH</span>
                </div>
                {formData.institucion === 'PrepaCUH' && (
                  <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Grupo */}
          <div>
            <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Grupo
            </label>
            <input
              type="text"
              value={formData.grupo}
              onChange={(e) => setFormData({ ...formData, grupo: e.target.value })}
              className="w-full bg-dark-bg/50 border-2 border-dark-border focus:border-blue-500 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base text-gray-100 placeholder-gray-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              placeholder="Ej: 24A, 23B, etc."
              required
            />
          </div>

          {/* Acciones */}
          <div className="flex gap-2 sm:gap-3 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 bg-dark-bg hover:bg-dark-hover text-gray-300 font-medium text-sm sm:text-base py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg border border-dark-border transition-all duration-200 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium text-sm sm:text-base py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-1.5 sm:gap-2">
                <span className="hidden xs:inline">{tipo === 'participante' ? 'Agregar Participante' : 'Agregar a Espera'}</span>
                <span className="xs:hidden">Agregar</span>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
