const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // Función auxiliar para manejar errores
  async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(error.message || `Error ${response.status}`);
    }
    return response.json();
  },

  // Participantes
  participantes: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/participantes`);
      return api.handleResponse<Array<{
        id: number;
        nombre: string;
        institucion: 'CUH' | 'PrepaCUH';
        grupo: string;
        asistio: 0 | 1;
      }>>(response);
    },

    getById: async (id: number) => {
      const response = await fetch(`${API_URL}/participantes/${id}`);
      return api.handleResponse(response);
    },

    create: async (data: { nombre: string; institucion: string; grupo: string }) => {
      const response = await fetch(`${API_URL}/participantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return api.handleResponse(response);
    },

    update: async (id: number, data: Partial<{ nombre: string; institucion: string; grupo: string; asistio: number }>) => {
      const response = await fetch(`${API_URL}/participantes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return api.handleResponse(response);
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_URL}/participantes/${id}`, {
        method: 'DELETE',
      });
      return api.handleResponse(response);
    },
  },

  // Lista de espera
  listaEspera: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/lista-espera`);
      return api.handleResponse<Array<{
        id: number;
        nombre: string;
        institucion: 'CUH' | 'PrepaCUH';
        grupo: string;
      }>>(response);
    },

    create: async (data: { nombre: string; institucion: string; grupo: string }) => {
      const response = await fetch(`${API_URL}/lista-espera`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      return api.handleResponse(response);
    },

    delete: async (id: number) => {
      const response = await fetch(`${API_URL}/lista-espera/${id}`, {
        method: 'DELETE',
      });
      return api.handleResponse(response);
    },
  },

  // Asistencia
  asistencia: {
    marcar: async (id: number) => {
      const response = await fetch(`${API_URL}/asistencia/marcar/${id}`, {
        method: 'POST',
      });
      return api.handleResponse(response);
    },

    quitar: async (id: number) => {
      const response = await fetch(`${API_URL}/asistencia/quitar/${id}`, {
        method: 'POST',
      });
      return api.handleResponse(response);
    },

    promover: async (id: number) => {
      const response = await fetch(`${API_URL}/asistencia/promover/${id}`, {
        method: 'POST',
      });
      return api.handleResponse(response);
    },

    relegar: async (id: number) => {
      const response = await fetch(`${API_URL}/asistencia/relegar/${id}`, {
        method: 'POST',
      });
      return api.handleResponse(response);
    },

    getEstadisticas: async () => {
      const response = await fetch(`${API_URL}/asistencia/estadisticas`);
      return api.handleResponse<{
        participantes: {
          total: number;
          asistieron: number;
          noAsistieron: number;
        };
        listaEspera: number;
      }>(response);
    },
  },
};
