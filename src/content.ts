import { criarBar, atualizarBar } from './bar';
import { extrairDados } from './extract';

function iniciar(): void {
  criarBar();

  function atualizar(): void {
    const dados = extrairDados();
    if (dados) {
      atualizarBar(dados);
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
