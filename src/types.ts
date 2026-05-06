export interface DadosDia {
  horasPrevistas: string;
  horasTrabalhadas: string;
  saldo: string;
  abonos: string;
  intervalos: string;
  horaEntrada: string | null;
  status: 'Entrada' | 'Saida' | 'desconhecido';
}

export type JornadaEstado = 'working' | 'done' | 'overtime';

export interface JornadaStatus {
  saidaPrevistaMin: number | null;
  saidaPrevista: string;
  restanteMin: number;
  podeAlertar: boolean;
  atualizadoEm: number;
  dataReferencia: string;
  estado: JornadaEstado;
  progresso: number;
  textoRestante: string;
}

export interface ShowExitAlertMessage {
  type: 'GENYO_TIMER_SHOW_EXIT_ALERT';
  payload: JornadaStatus;
}

export const GENYO_TIMER_STORAGE_KEY = 'genyoTimerStatus';
export const GENYO_TIMER_LAST_ALERTED_KEY = 'genyoTimerLastAlertedExitKey';
