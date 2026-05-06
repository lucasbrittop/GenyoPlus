import { DadosDia } from './types';
import { parseToMinutes } from './time';

export function extrairDados(): DadosDia | null {
  const tabela = document.querySelector('#tabelaHistoricoPontos tbody');
  if (!tabela) return null;

  const linhas = tabela.querySelectorAll(':scope > tr');
  if (linhas.length < 2) return null;

  const linhaDia = linhas[0];
  const tds = linhaDia.querySelectorAll('td');
  if (tds.length < 6) return null;

  const dados: DadosDia = {
    horasPrevistas: (tds[1]?.textContent ?? '').trim() || '00:00',
    horasTrabalhadas: (tds[2]?.textContent ?? '').trim() || '00:00',
    abonos: (tds[3]?.textContent ?? '').trim() || '00:00',
    intervalos: (tds[4]?.textContent ?? '').trim() || '00:00',
    saldo: (tds[5]?.textContent ?? '').trim() || '00:00',
    horaEntrada: extrairPrimeiraEntrada(linhas[1]),
    status: extrairStatus(),
  };

  return dados;
}

function extrairPrimeiraEntrada(linhaDetalhes: Element): string | null {
  const timeline = linhaDetalhes.querySelector('.timeline');
  const primeiraEntrada = timeline?.querySelector('li[id="Entrada"]');
  const hora = primeiraEntrada?.querySelector('.date')?.textContent?.trim();
  return hora || null;
}

export function extrairBancoHoras(): number | null {
  const trab = document.getElementById('horasTrabalhadasMesCorrente');
  const prev = document.getElementById('horasPrevistasMesCorrente');
  if (!trab || !prev) return null;

  const trabText = trab.textContent?.trim() || '';
  const prevText = prev.textContent?.trim() || '';

  if (trabText.length < 3 || prevText.length < 3) {
    const btn = document.querySelector('#carregarHorasPrevistasMesCorrente button') as HTMLElement | null;
    btn?.click();
    return null;
  }

  return parseToMinutes(trabText) - parseToMinutes(prevText);
}

function extrairStatus(): DadosDia['status'] {
  const el = document.getElementById('dadosPontos');
  const ultimoPonto = el?.dataset?.ultimoPonto;
  if (!ultimoPonto) return 'desconhecido';
  try {
    const parsed = JSON.parse(ultimoPonto);
    return parsed.motivo === 'Entrada' ? 'Entrada' : 'Saida';
  } catch {
    return 'desconhecido';
  }
}
