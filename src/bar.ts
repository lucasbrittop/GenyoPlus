import { JornadaStatus } from './types';

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
        <span class="gt-sep gt-banco-sep">|</span>
        <span class="gt-value gt-banco-val" id="gt-banco-horas"></span>
      </div>
    </div>
  `;

  injectStyles();
  document.body.appendChild(bar);
  return bar;
}

export function atualizarBar(status: JornadaStatus): void {
  const tempoRestante = document.getElementById('gt-tempo-restante');
  const progressBar = document.getElementById('gt-progress-bar');
  const saidaPrevista = document.getElementById('gt-saida-prevista');
  const bar = document.getElementById(BAR_ID);

  if (!tempoRestante || !progressBar || !saidaPrevista || !bar) return;

  tempoRestante.textContent = status.textoRestante;
  saidaPrevista.textContent = status.estado === 'done' && status.saidaPrevistaMin !== null ? '✓' : status.saidaPrevista;
  bar.className = `gt-status-${status.estado}`;
  progressBar.style.width = `${status.progresso}%`;

  const bancoEl = document.getElementById('gt-banco-horas');
  const bancoSep = document.querySelector('.gt-banco-sep') as HTMLElement | null;
  if (status.textoBanco) {
    if (bancoEl) bancoEl.textContent = status.textoBanco;
    if (bancoSep) bancoSep.style.display = '';
    if (bancoEl) bancoEl.style.display = '';
  } else {
    if (bancoEl) bancoEl.style.display = 'none';
    if (bancoSep) bancoSep.style.display = 'none';
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
    .gt-banco-val { font-size: 11px; color: #81c784; }
  `;
  document.head.appendChild(style);
}
