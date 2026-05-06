export interface DadosDia {
  horasPrevistas: string;
  horasTrabalhadas: string;
  saldo: string;
  abonos: string;
  intervalos: string;
  horaEntrada: string | null;
  status: 'Entrada' | 'Saida' | 'desconhecido';
}
