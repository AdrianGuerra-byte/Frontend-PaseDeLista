export interface Participante {
  id: number;
  nombre: string;
  institucion: 'CUH' | 'PrepaCUH';
  grupo: string;
  asistio: 0 | 1;
}

export interface ListaEspera {
  id: number;
  nombre: string;
  institucion: 'CUH' | 'PrepaCUH';
  grupo: string;
}

export interface Estadisticas {
  participantes: {
    total: number;
    asistieron: number;
    noAsistieron: number;
  };
  listaEspera: number;
}

export interface CreateParticipanteDto {
  nombre: string;
  institucion: 'CUH' | 'PrepaCUH';
  grupo: string;
}

export interface UpdateParticipanteDto {
  nombre?: string;
  institucion?: 'CUH' | 'PrepaCUH';
  grupo?: string;
  asistio?: 0 | 1;
}
