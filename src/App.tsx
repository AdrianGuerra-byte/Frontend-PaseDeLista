import { useState, useEffect } from 'react';
import type { Participante, ListaEspera, Estadisticas } from './types';
import { api, API_URL } from './services/api';
import Header from './components/Header';
import ParticipantCard from './components/ParticipantCard';
import ListaEsperaCard from './components/ListaEsperaCard';
import Modal from './components/Modal';

function App() {
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [listaEspera, setListaEspera] = useState<ListaEspera[]>([]);
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);
  const [confirmingAttendance, setConfirmingAttendance] = useState(false);
  const [modalOpen, setModalOpen] = useState<'participante' | 'espera' | null>(null);

  // Cargar datos iniciales
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [participantesData, listaEsperaData, stats] = await Promise.all([
        api.participantes.getAll(),
        api.listaEspera.getAll(),
        api.asistencia.getEstadisticas(),
      ]);
      
      setParticipantes(participantesData);
      setListaEspera(listaEsperaData);
      setEstadisticas(stats);
      
      // Pre-seleccionar los que ya tienen asistencia marcada
      const preselected = new Set(
        participantesData.filter(p => p.asistio === 1).map(p => p.id)
      );
      setSelectedIds(preselected);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      // Mostrar mensaje dinámico usando la URL configurada en runtime
      alert(`Error al cargar los datos desde ${API_URL}.\n
Verifica que el backend esté en ejecución y que la URL en ".env" sea correcta.\n
Si estás en desarrollo, reinicia el servidor de frontend para recargar las variables de entorno.`);
    } finally {
      setLoading(false);
    }
  };

  // Toggle selección de participante
  const toggleSelect = (id: number) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Confirmar asistencias
  const handleConfirmAttendance = async () => {
    try {
      setConfirmingAttendance(true);
      
      // Procesar cada participante
      for (const participante of participantes) {
        const shouldAttend = selectedIds.has(participante.id);
        const hasAttended = participante.asistio === 1;
        
        // Si el estado cambió, actualizar
        if (shouldAttend && !hasAttended) {
          await api.asistencia.marcar(participante.id);
        } else if (!shouldAttend && hasAttended) {
          await api.asistencia.quitar(participante.id);
        }
      }
      
      // Recargar datos
      await loadData();
      alert('Asistencias confirmadas correctamente');
    } catch (error) {
      console.error('Error al confirmar asistencias:', error);
      alert('Error al confirmar asistencias');
    } finally {
      setConfirmingAttendance(false);
    }
  };

  // Promover de lista de espera
  const handlePromover = async (id: number) => {
    try {
      await api.asistencia.promover(id);
      await loadData();
      alert('Promovido a participantes');
    } catch (error) {
      console.error('Error al promover:', error);
      alert('Error al promover');
    }
  };

  // Eliminar participante
  const handleDeleteParticipante = async (id: number) => {
    try {
      await api.participantes.delete(id);
      await loadData();
      alert('Participante eliminado');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar');
    }
  };

  // Eliminar de lista de espera
  const handleDeleteEspera = async (id: number) => {
    try {
      await api.listaEspera.delete(id);
      await loadData();
      alert('Eliminado de lista de espera');
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al eliminar');
    }
  };

  // Crear participante
  const handleCreateParticipante = async (data: { nombre: string; institucion: 'CUH' | 'PrepaCUH'; grupo: string }) => {
    try {
      await api.participantes.create(data);
      await loadData();
      alert('Participante agregado');
    } catch (error) {
      console.error('Error al crear:', error);
      alert('Error al crear participante');
    }
  };

  // Crear en lista de espera
  const handleCreateEspera = async (data: { nombre: string; institucion: 'CUH' | 'PrepaCUH'; grupo: string }) => {
    try {
      await api.listaEspera.create(data);
      await loadData();
      alert('Agregado a lista de espera');
    } catch (error) {
      console.error('Error al crear:', error);
      alert('Error al agregar a lista de espera');
    }
  };

  // Seleccionar/Deseleccionar todos
  const handleToggleAll = () => {
    if (selectedIds.size === participantes.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(participantes.map(p => p.id)));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-bg overflow-x-hidden w-full">
      <Header estadisticas={estadisticas} onRefresh={loadData} />

      {/* Espaciador para evitar que el contenido quede debajo del header sticky */}
      <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20 overflow-x-hidden">
        {/* Sección Participantes */}
        <section className="space-y-3 w-full min-w-0">
          <div className="flex items-start sm:items-center justify-between gap-2 w-full">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
                  Participantes
                </h2>
                <span className="text-xs sm:text-sm font-normal text-gray-400">
                  ({selectedIds.size}/{participantes.length})
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                Selecciona los que asistieron
              </p>
            </div>
            <button
              onClick={() => setModalOpen('participante')}
              className="p-2 sm:p-2.5 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all active:scale-95 flex-shrink-0"
              title="Agregar participante"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Acción masiva */}
          <div className="flex gap-2">
            <button
              onClick={handleToggleAll}
              className="bg-dark-bg hover:bg-dark-hover text-gray-300 font-medium text-xs sm:text-sm py-2 px-3 sm:px-4 rounded-lg border border-dark-border transition-all duration-200 active:scale-95 flex items-center gap-1.5 sm:gap-2"
            >
              {selectedIds.size === participantes.length ? (
                <>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="hidden xs:inline">Deseleccionar todos</span>
                  <span className="xs:hidden">Deseleccionar</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="hidden xs:inline">Seleccionar todos</span>
                  <span className="xs:hidden">Seleccionar</span>
                </>
              )}
            </button>
          </div>

          {/* Lista de participantes */}
          <div className="grid gap-2 sm:gap-3">
            {participantes.map(participante => (
              <ParticipantCard
                key={participante.id}
                participante={participante}
                isSelected={selectedIds.has(participante.id)}
                onToggleSelect={toggleSelect}
                onDelete={handleDeleteParticipante}
              />
            ))}
          </div>

          {/* Botón confirmar asistencias */}
          <button
            onClick={handleConfirmAttendance}
            disabled={confirmingAttendance}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold text-base sm:text-lg py-3 sm:py-4 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {confirmingAttendance ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-t-2 border-b-2 border-white"></div>
                Confirmando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Confirmar Asistencias
              </span>
            )}
          </button>
        </section>

        {/* Sección Lista de Espera */}
        {listaEspera.length > 0 && (
          <section className="space-y-3 w-full min-w-0">
            <div className="flex items-start sm:items-center justify-between gap-2 w-full">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-100">
                    Lista de Espera
                  </h2>
                  <span className="text-xs sm:text-sm font-normal text-gray-400">
                    ({listaEspera.length})
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1">
                  Promover a participantes
                </p>
              </div>
              <button
                onClick={() => setModalOpen('espera')}
                className="p-2 sm:p-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-all active:scale-95 flex-shrink-0"
                title="Agregar a lista de espera"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div className="grid gap-2 sm:gap-3">
              {listaEspera.map(persona => (
                <ListaEsperaCard
                  key={persona.id}
                  persona={persona}
                  onPromover={handlePromover}
                  onDelete={handleDeleteEspera}
                />
              ))}
            </div>
          </section>
        )}

        {/* Botón agregar a lista de espera si está vacía */}
        {listaEspera.length === 0 && (
          <button
            onClick={() => setModalOpen('espera')}
            className="w-full card-hover py-6 sm:py-8 flex flex-col items-center gap-2 sm:gap-3 text-gray-400 hover:text-gray-200 hover:border-yellow-500/50"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center border border-yellow-500/30">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <p className="font-medium text-sm sm:text-base">Agregar a Lista de Espera</p>
            <p className="text-xs text-gray-500">No hay personas en lista de espera</p>
          </button>
        )}
      </main>

      {/* Modales */}
      <Modal
        isOpen={modalOpen === 'participante'}
        onClose={() => setModalOpen(null)}
        onSubmit={handleCreateParticipante}
        title="Agregar Participante"
        tipo="participante"
      />
      <Modal
        isOpen={modalOpen === 'espera'}
        onClose={() => setModalOpen(null)}
        onSubmit={handleCreateEspera}
        title="Agregar a Lista de Espera"
        tipo="espera"
      />
    </div>
  );
}

export default App;
