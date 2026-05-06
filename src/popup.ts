import { CONFIG_PADRAO, GENYO_TIMER_CONFIG_KEY, GENYO_TIMER_STORAGE_KEY, JornadaStatus } from './types';

async function init(): Promise<void> {
  const checkbox = document.getElementById('toggle-banco') as HTMLInputElement;

  const result = await chrome.storage.local.get(GENYO_TIMER_CONFIG_KEY);
  const config = result[GENYO_TIMER_CONFIG_KEY] ?? CONFIG_PADRAO;
  checkbox.checked = config.usarBancoHoras;

  checkbox.addEventListener('change', async () => {
    await chrome.storage.local.set({
      [GENYO_TIMER_CONFIG_KEY]: { usarBancoHoras: checkbox.checked },
    });
  });

  const data = await chrome.storage.local.get(GENYO_TIMER_STORAGE_KEY);
  const status: JornadaStatus | undefined = data[GENYO_TIMER_STORAGE_KEY];
  if (status) atualizarPopup(status);
}

function atualizarPopup(status: JornadaStatus): void {
  const elHoje = document.getElementById('popup-hoje');
  const elSaida = document.getElementById('popup-saida');
  const elBanco = document.getElementById('popup-banco');

  if (elHoje) elHoje.textContent = status.textoRestante;
  if (elSaida) elSaida.textContent = status.estado === 'done' && status.saidaPrevistaMin !== null ? '\u2713' : status.saidaPrevista;

  if (elBanco && status.textoBanco) {
    elBanco.textContent = status.textoBanco;
    const neg = status.saldoBancoMin != null && status.saldoBancoMin < 0;
    elBanco.className = `info-value ${neg ? 'banco-negativo' : 'banco-positivo'}`;
  }
}

init();
