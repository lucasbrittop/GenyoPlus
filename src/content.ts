import { criarBar, atualizarBar } from './bar';
import { extrairDados } from './extract';
import { calcularJornadaStatus } from './schedule';
import { GENYO_TIMER_STORAGE_KEY, JornadaStatus } from './types';

function iniciar(): void {
  criarBar();

  function atualizar(): void {
    const dados = extrairDados();
    if (dados) {
      const status = calcularJornadaStatus(dados);
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
