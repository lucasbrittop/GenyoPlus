import { criarBar, atualizarBar } from './bar';
import { extrairDados, extrairBancoHoras } from './extract';
import { calcularJornadaStatus } from './schedule';
import { GENYO_TIMER_STORAGE_KEY, JornadaStatus } from './types';
import { carregarConfig } from './storage';

function iniciar(): void {
  criarBar();

  async function atualizar(): Promise<void> {
    const dados = extrairDados();
    if (dados) {
      const config = await carregarConfig();
      const saldoBancoMin = extrairBancoHoras();
      const status = calcularJornadaStatus(dados, new Date(), saldoBancoMin, config.usarBancoHoras);
      atualizarBar(status);
      salvarStatus(status);
    } else {
      const el = document.getElementById('gt-tempo-restante');
      if (el) el.textContent = 'Aguardando dados...';
    }
  }

  atualizar();
  setInterval(atualizar, 60_000);
}

if (document.readyState === 'complete') {
  setTimeout(iniciar, 2000);
} else {
  window.addEventListener('load', () => setTimeout(iniciar, 2000));
}

function salvarStatus(status: JornadaStatus): void {
  if (!chrome?.storage?.local) return;
  chrome.storage.local.set({ [GENYO_TIMER_STORAGE_KEY]: status });
}
