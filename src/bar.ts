import { DadosDia } from './types';
import { parseToMinutes, formatMinutes, parseHoraEmMinutos, agoraEmMinutos, formatarHora, calcularProgresso } from './time';

const BAR_ID = 'genyo-timer-floating-bar';

export function criarBar(): HTMLElement {
  const existente = document.getElementById(BAR_ID);
  if (existente) return existente;

  const bar = document.createElement('div');
  bar.id = BAR_ID;
  bar.innerHTML = `
    <div class="gt-container">
      <div class="gt-row">
        <span class="gt-label">⏳</span>
        <span class="gt-value" id="gt-tempo-restante">Carregando...</span>
        <span class="gt-sep">|</span>
        <div class="gt-progress-container">
          <div class="gt-progress-bar" id="gt-progress-bar"></div>
        </div>
        <span class="gt-sep">|</span>
        <span class="gt-label">🏁</span>
        <span class="gt-value" id="gt-saida-prevista">--:--</span>
      </div>
    </div>
  `;

  injectStyles();
  document.body.appendChild(bar);
  return bar;
}

export function atualizarBar(dados: DadosDia): void {
  const tempoRestante = document.getElementById('gt-tempo-restante');
  const progressBar = document.getElementById('gt-progress-bar');
  const saidaPrevista = document.getElementById('gt-saida-prevista');
  const bar = document.getElementById(BAR_ID);

  if (!tempoRestante || !progressBar || !saidaPrevista || !bar) return;

  if (dados.horaEntrada) {
    const entradaMin = parseHoraEmMinutos(dados.horaEntrada);
    const prevMin = parseToMinutes(dados.horasPrevistas);
    const abonoMin = parseToMinutes(dados.abonos);
    const intervMin = parseToMinutes(dados.intervalos);
    const totalExpedienteMin = prevMin + intervMin - abonoMin;
    const fimFixoMin = entradaMin + totalExpedienteMin;
    const agoraMin = agoraEmMinutos();
    const restanteMin = Math.max(0, fimFixoMin - agoraMin);

    if (restanteMin > 0) {
      const decorridoMin = Math.max(0, agoraMin - entradaMin);
      const progresso = calcularProgresso(decorridoMin, totalExpedienteMin);
      tempoRestante.textContent = `Faltam ${formatMinutes(restanteMin)}`;
      saidaPrevista.textContent = formatarHora(fimFixoMin);
      bar.className = 'gt-status-working';
      progressBar.style.width = `${progresso}%`;
    } else {
      tempoRestante.textContent = 'Expediente completo!';
      saidaPrevista.textContent = '✓';
      bar.className = 'gt-status-done';
      progressBar.style.width = '100%';
    }
    return;
  }

  const prevMin = parseToMinutes(dados.horasPrevistas);
  const trabMin = parseToMinutes(dados.horasTrabalhadas);
  const saldoMin = parseToMinutes(dados.saldo);

  if (saldoMin < 0) {
    const falta = Math.abs(saldoMin);
    tempoRestante.textContent = `Faltam ~${formatMinutes(falta)}`;
    saidaPrevista.textContent = '--:--';
    bar.className = 'gt-status-working';
    progressBar.style.width = '0%';
  } else if (saldoMin > 0) {
    tempoRestante.textContent = `Extra +${formatMinutes(saldoMin)}`;
    saidaPrevista.textContent = 'Já pode sair! ✓';
    bar.className = 'gt-status-overtime';
    progressBar.style.width = '100%';
  } else {
    tempoRestante.textContent = prevMin > 0 ? 'Aguardando registros...' : 'Expediente completo!';
    saidaPrevista.textContent = '--:--';
    bar.className = 'gt-status-done';
    progressBar.style.width = '0%';
  }
}

function injectStyles(): void {
  if (document.getElementById('genyo-timer-styles')) return;

  const style = document.createElement('style');
  style.id = 'genyo-timer-styles';
  style.textContent = `
    #genyo-timer-floating-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 999999;
      font-family: 'Open Sans', sans-serif;
      font-size: 13px;
    }
    .gt-container {
      background: rgba(30, 30, 40, 0.92);
      color: #e0e0e0;
      padding: 6px 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(6px);
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .gt-row {
      display: flex;
      align-items: center;
      gap: 10px;
      max-width: 600px;
      width: 100%;
    }
    .gt-label { font-size: 14px; }
    .gt-value { font-weight: 600; min-width: 110px; }
    .gt-sep { color: rgba(255,255,255,0.2); }
    .gt-progress-container {
      flex: 1;
      height: 6px;
      background: rgba(255,255,255,0.15);
      border-radius: 3px;
      overflow: hidden;
    }
    .gt-progress-bar {
      display: block;
      height: 100%;
      width: 0%;
      background: #4caf50;
      border-radius: 3px;
      transition: width 30s linear;
    }
    .gt-status-working .gt-progress-bar { background: #ff9800; }
    .gt-status-overtime .gt-progress-bar { background: #f44336; }
    .gt-status-done .gt-progress-bar { background: #4caf50; }
  `;
  document.head.appendChild(style);
}
