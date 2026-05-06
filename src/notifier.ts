import { JornadaStatus, ShowExitAlertMessage } from './types';

const POPUP_ID = 'genyo-timer-exit-alert';
const STYLE_ID = 'genyo-timer-exit-alert-styles';

chrome.runtime.onMessage.addListener((message: ShowExitAlertMessage) => {
  if (message.type !== 'GENYO_TIMER_SHOW_EXIT_ALERT') return;
  mostrarPopup(message.payload);
});

function mostrarPopup(status: JornadaStatus): void {
  injectStyles();

  const existente = document.getElementById(POPUP_ID);
  if (existente) existente.remove();

  const popup = document.createElement('div');
  popup.id = POPUP_ID;
  popup.setAttribute('role', 'status');
  popup.innerHTML = `
    <button class="gt-alert-close" type="button" aria-label="Fechar">×</button>
    <div class="gt-alert-title">Está perto da hora de saída</div>
    <div class="gt-alert-time">Saída prevista: <strong>${escapeHtml(status.saidaPrevista)}</strong></div>
    <button class="gt-alert-action" type="button">Entendi</button>
  `;

  popup.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => popup.remove());
  });

  document.body.appendChild(popup);
  window.setTimeout(() => popup.remove(), 30_000);
}

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    #${POPUP_ID} {
      position: fixed;
      right: 18px;
      bottom: 18px;
      z-index: 2147483647;
      box-sizing: border-box;
      width: min(360px, calc(100vw - 32px));
      padding: 16px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 8px;
      background: #20242c;
      color: #f8fafc;
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
    #${POPUP_ID} .gt-alert-close {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 28px;
      height: 28px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: #cbd5e1;
      cursor: pointer;
      font-size: 22px;
      line-height: 1;
    }
    #${POPUP_ID} .gt-alert-close:hover {
      background: rgba(255, 255, 255, 0.1);
      color: #ffffff;
    }
    #${POPUP_ID} .gt-alert-title {
      margin-right: 32px;
      color: #ffffff;
      font-size: 15px;
      font-weight: 700;
    }
    #${POPUP_ID} .gt-alert-time {
      margin-top: 6px;
      color: #dbe3ee;
    }
    #${POPUP_ID} .gt-alert-action {
      margin-top: 14px;
      min-height: 34px;
      padding: 0 14px;
      border: 0;
      border-radius: 6px;
      background: #f59f00;
      color: #141414;
      cursor: pointer;
      font-weight: 700;
    }
    #${POPUP_ID} .gt-alert-action:hover {
      background: #ffb224;
    }
  `;
  document.head.appendChild(style);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}
