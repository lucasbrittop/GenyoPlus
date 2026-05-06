import {
  GENYO_TIMER_LAST_ALERTED_KEY,
  GENYO_TIMER_STORAGE_KEY,
  JornadaStatus,
  ShowExitAlertMessage,
} from './types';
import { atualizarRestante, criarChaveAlerta } from './schedule';

const ALARM_NAME = 'genyo-timer-check-exit';

chrome.runtime.onInstalled.addListener(() => {
  criarAlarme();
});

chrome.runtime.onStartup.addListener(() => {
  criarAlarme();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name !== ALARM_NAME) return;
  verificarAlertaSaida();
});

criarAlarme();

function criarAlarme(): void {
  chrome.alarms.create(ALARM_NAME, { periodInMinutes: 1 });
}

async function verificarAlertaSaida(): Promise<void> {
  const statusSalvo = await lerStatus();
  if (!statusSalvo) return;

  const status = atualizarRestante(statusSalvo);
  atualizarBadge(status);
  const alertKey = criarChaveAlerta(status);
  if (!status.podeAlertar || !alertKey) return;

  const lastAlertedExitKey = await lerUltimoAlerta();
  if (lastAlertedExitKey === alertKey) return;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  const message: ShowExitAlertMessage = {
    type: 'GENYO_TIMER_SHOW_EXIT_ALERT',
    payload: status,
  };

  // Em paginas internas do navegador o content script global nao existe.
  try {
    await chrome.tabs.sendMessage(tab.id, message);
  } catch {
    return;
  }

  await chrome.storage.local.set({ [GENYO_TIMER_LAST_ALERTED_KEY]: alertKey });
}

async function lerStatus(): Promise<JornadaStatus | null> {
  const result = await chrome.storage.local.get(GENYO_TIMER_STORAGE_KEY);
  const status = result[GENYO_TIMER_STORAGE_KEY];
  return isJornadaStatus(status) ? status : null;
}

async function lerUltimoAlerta(): Promise<string | null> {
  const result = await chrome.storage.local.get(GENYO_TIMER_LAST_ALERTED_KEY);
  const value = result[GENYO_TIMER_LAST_ALERTED_KEY];
  return typeof value === 'string' ? value : null;
}

function isJornadaStatus(value: unknown): value is JornadaStatus {
  if (!value || typeof value !== 'object') return false;
  const status = value as JornadaStatus;
  return (
    typeof status.saidaPrevista === 'string' &&
    typeof status.restanteMin === 'number' &&
    typeof status.podeAlertar === 'boolean' &&
    typeof status.atualizadoEm === 'number' &&
    typeof status.dataReferencia === 'string'
  );
}

function atualizarBadge(status: JornadaStatus): void {
  const r = status.restanteMin;

  if (status.estado === 'done') {
    chrome.action.setBadgeText({ text: '\u2713' });
    chrome.action.setBadgeBackgroundColor({ color: '#4caf50' });
  } else if (r > 120) {
    chrome.action.setBadgeText({ text: `${Math.floor(r / 60)}h` });
    chrome.action.setBadgeBackgroundColor({ color: '#f44336' });
  } else if (r > 60) {
    chrome.action.setBadgeText({ text: `${Math.floor(r / 60)}h` });
    chrome.action.setBadgeBackgroundColor({ color: '#ff9800' });
  } else if (r > 0) {
    chrome.action.setBadgeText({ text: `${r}m` });
    chrome.action.setBadgeBackgroundColor({ color: '#4caf50' });
  } else {
    chrome.action.setBadgeText({ text: '' });
  }
}
