// Tracks which notes the user has marked "learned". Stored in the browser's
// localStorage, so it's per-device and needs no backend.
const STORAGE_KEY = 'learned-topics';

function readSet() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function writeSet(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // storage unavailable (private browsing, full, etc.) — fail silently
  }
}

export function isLearned(topicId) {
  return readSet().has(topicId);
}

export function toggleLearned(topicId) {
  const set = readSet();
  if (set.has(topicId)) set.delete(topicId);
  else set.add(topicId);
  writeSet(set);
  return set.has(topicId);
}

export function getLearnedSet() {
  return readSet();
}

export function countLearned(topicIds) {
  const set = readSet();
  return topicIds.reduce((n, id) => n + (set.has(id) ? 1 : 0), 0);
}
