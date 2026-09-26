const STORAGE_KEY = 'learning-focus-time-v1';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function load() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return {
      total: Number(parsed.total) || 0,
      days: parsed.days && typeof parsed.days === 'object' ? parsed.days : {},
      topics: parsed.topics && typeof parsed.topics === 'object' ? parsed.topics : {},
    };
  } catch {
    return { total: 0, days: {}, topics: {} };
  }
}

function save(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function addFocusSecond(topicId) {
  const data = load();
  const day = todayKey();
  data.total += 1;
  data.days[day] = (Number(data.days[day]) || 0) + 1;
  if (topicId) data.topics[topicId] = (Number(data.topics[topicId]) || 0) + 1;
  save(data);
  return data;
}

export function getFocusStats() {
  const data = load();
  const today = todayKey();
  return {
    total: data.total,
    today: Number(data.days[today]) || 0,
    topics: data.topics,
  };
}

export function formatFocusTime(seconds = 0) {
  const total = Math.max(0, Math.floor(seconds));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  if (hours > 0) return `${hours}h ${String(minutes).padStart(2, '0')}m`;
  if (minutes > 0) return `${minutes}m ${String(secs).padStart(2, '0')}s`;
  return `${secs}s`;
}
