import { DadosDia, JornadaStatus } from './types';
import {
  agoraEmMinutos,
  calcularProgresso,
  formatarHora,
  formatMinutes,
  parseHoraEmMinutos,
  parseToMinutes,
} from './time';

const ALERTA_MINIMO_MIN = 5;
const ALERTA_MAXIMO_MIN = 10;

export function calcularJornadaStatus(dados: DadosDia, agora = new Date()): JornadaStatus {
  const atualizadoEm = agora.getTime();
  const dataReferencia = formatarDataLocal(agora);

  if (dados.horaEntrada) {
    const entradaMin = parseHoraEmMinutos(dados.horaEntrada);
    const prevMin = parseToMinutes(dados.horasPrevistas);
    const abonoMin = parseToMinutes(dados.abonos);
    const intervMin = parseToMinutes(dados.intervalos);
    const totalExpedienteMin = prevMin + intervMin - abonoMin;
    const saidaPrevistaMin = entradaMin + totalExpedienteMin;
    const restanteMin = Math.max(0, saidaPrevistaMin - minutosDoDia(agora));

    if (restanteMin > 0) {
      const decorridoMin = Math.max(0, minutosDoDia(agora) - entradaMin);

      return {
        saidaPrevistaMin,
        saidaPrevista: formatarHora(saidaPrevistaMin),
        restanteMin,
        podeAlertar: estaNaJanelaDeAlerta(restanteMin),
        atualizadoEm,
        dataReferencia,
        estado: 'working',
        progresso: calcularProgresso(decorridoMin, totalExpedienteMin),
        textoRestante: `Faltam ${formatMinutes(restanteMin)}`,
      };
    }

    return {
      saidaPrevistaMin,
      saidaPrevista: formatarHora(saidaPrevistaMin),
      restanteMin: 0,
      podeAlertar: false,
      atualizadoEm,
      dataReferencia,
      estado: 'done',
      progresso: 100,
      textoRestante: 'Expediente completo!',
    };
  }

  const prevMin = parseToMinutes(dados.horasPrevistas);
  const saldoMin = parseToMinutes(dados.saldo);

  if (saldoMin < 0) {
    const falta = Math.abs(saldoMin);

    return {
      saidaPrevistaMin: null,
      saidaPrevista: '--:--',
      restanteMin: falta,
      podeAlertar: false,
      atualizadoEm,
      dataReferencia,
      estado: 'working',
      progresso: 0,
      textoRestante: `Faltam ~${formatMinutes(falta)}`,
    };
  }

  if (saldoMin > 0) {
    return {
      saidaPrevistaMin: null,
      saidaPrevista: 'Já pode sair! ✓',
      restanteMin: 0,
      podeAlertar: false,
      atualizadoEm,
      dataReferencia,
      estado: 'overtime',
      progresso: 100,
      textoRestante: `Extra +${formatMinutes(saldoMin)}`,
    };
  }

  return {
    saidaPrevistaMin: null,
    saidaPrevista: '--:--',
    restanteMin: 0,
    podeAlertar: false,
    atualizadoEm,
    dataReferencia,
    estado: 'done',
    progresso: 0,
    textoRestante: prevMin > 0 ? 'Aguardando registros...' : 'Expediente completo!',
  };
}

export function atualizarRestante(status: JornadaStatus, agora = new Date()): JornadaStatus {
  if (status.saidaPrevistaMin === null || status.dataReferencia !== formatarDataLocal(agora)) {
    return { ...status, restanteMin: 0, podeAlertar: false };
  }

  const restanteMin = Math.max(0, status.saidaPrevistaMin - minutosDoDia(agora));
  return {
    ...status,
    restanteMin,
    podeAlertar: estaNaJanelaDeAlerta(restanteMin),
    estado: restanteMin > 0 ? status.estado : 'done',
  };
}

export function criarChaveAlerta(status: JornadaStatus): string | null {
  if (status.saidaPrevistaMin === null) return null;
  return `${status.dataReferencia}:${status.saidaPrevista}`;
}

function estaNaJanelaDeAlerta(restanteMin: number): boolean {
  return restanteMin >= ALERTA_MINIMO_MIN && restanteMin <= ALERTA_MAXIMO_MIN;
}

function minutosDoDia(date: Date): number {
  return agoraEmMinutos(date);
}

function formatarDataLocal(date: Date): string {
  const ano = date.getFullYear();
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
