export function parseToMinutes(timeStr: string): number {
  const cleaned = timeStr.trim();
  if (!cleaned || cleaned === '-') return 0;
  const negative = cleaned.startsWith('-');
  const [h, m] = cleaned.replace(/^-/, '').split(':').map(Number);
  const minutes = h * 60 + m;
  return negative ? -minutes : minutes;
}

export function formatMinutes(mins: number): string {
  const abs = Math.abs(mins);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h${m}min`;
}

export function parseHoraEmMinutos(horaStr: string): number {
  const [h, m] = horaStr.split(':').map(Number);
  return h * 60 + m;
}

export function agoraEmMinutos(date = new Date()): number {
  return date.getHours() * 60 + date.getMinutes();
}

export function formatarHora(minutos: number): string {
  const h = Math.floor(minutos / 60) % 24;
  const m = minutos % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function calcularProgresso(trabalhadasMin: number, previstasMin: number): number {
  if (previstasMin === 0) return 0;
  return Math.min(100, Math.round((trabalhadasMin / previstasMin) * 100));
}
