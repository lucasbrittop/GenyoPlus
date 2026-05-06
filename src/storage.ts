import { ConfigToggles, CONFIG_PADRAO, GENYO_TIMER_CONFIG_KEY } from './types';

export async function carregarConfig(): Promise<ConfigToggles> {
  try {
    const result = await chrome.storage.local.get(GENYO_TIMER_CONFIG_KEY);
    return result[GENYO_TIMER_CONFIG_KEY] ?? CONFIG_PADRAO;
  } catch {
    return CONFIG_PADRAO;
  }
}
