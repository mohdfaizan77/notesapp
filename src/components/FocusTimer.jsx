import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { addFocusSecond, formatFocusTime, getFocusStats } from '../utils/focusTimer.js';

const IDLE_LIMIT = 2 * 60 * 1000;

function getTopicId(pathname) {
  const match = pathname.match(/^\/topic\/([^/]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function FocusTimer() {
  const { pathname } = useLocation();
  const topicId = useMemo(() => getTopicId(pathname), [pathname]);
  const [running, setRunning] = useState(() => pathname.startsWith('/topic/'));
  const [seconds, setSeconds] = useState(() => getFocusStats().today);
  const [open, setOpen] = useState(false);
  const [lastActivity, setLastActivity] = useState(() => Date.now());

  useEffect(() => {
    setRunning(pathname.startsWith('/topic/'));
    setOpen(false);
    setLastActivity(Date.now());
  }, [pathname]);

  useEffect(() => {
    const onActivity = () => setLastActivity(Date.now());
    const events = ['pointerdown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach((event) => window.addEventListener(event, onActivity, { passive: true }));
    return () => events.forEach((event) => window.removeEventListener(event, onActivity));
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setRunning(false);
      else setLastActivity(Date.now());
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      const active = !document.hidden && Date.now() - lastActivity < IDLE_LIMIT;
      if (!active) {
        setRunning(false);
        return;
      }
      addFocusSecond(topicId);
      setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running, lastActivity, topicId]);

  const toggle = () => {
    if (!running) setLastActivity(Date.now());
    setRunning((value) => !value);
  };

  const stats = getFocusStats();

  return (
    <div className={`focus-widget ${open ? 'focus-widget--open' : ''}`}>
      {open && (
        <div className="focus-panel" role="dialog" aria-label="Learning focus timer">
          <div className="focus-panel-top">
            <div>
              <div className="focus-kicker">FOCUS SESSION</div>
              <div className="focus-panel-title">Deep learning time</div>
            </div>
            <span className={`focus-live-dot ${running ? 'focus-live-dot--on' : ''}`} />
          </div>

          <div className="focus-clock">{formatFocusTime(seconds)}</div>
          <div className="focus-status">
            {running ? 'Counting focused time' : pathname.startsWith('/topic/') ? 'Paused' : 'Open a topic to start'}
          </div>

          <button className={`focus-main-btn ${running ? 'focus-main-btn--pause' : ''}`} onClick={toggle} disabled={!pathname.startsWith('/topic/')}>
            {running ? 'Ⅱ  Pause focus' : '▶  Start focus'}
          </button>

          <div className="focus-mini-stats">
            <div><strong>{formatFocusTime(stats.today)}</strong><span>Today</span></div>
            <div><strong>{formatFocusTime(stats.total)}</strong><span>All time</span></div>
          </div>

          <p className="focus-note">Timer pauses when this tab is hidden or inactive for 2 minutes.</p>
        </div>
      )}

      <button className="focus-pill" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Open learning focus timer">
        <span className={`focus-pill-dot ${running ? 'focus-pill-dot--on' : ''}`} />
        <span>{formatFocusTime(seconds)}</span>
        <span className="focus-pill-label">focus</span>
        <span className="focus-chevron">{open ? '⌄' : '⌃'}</span>
      </button>
    </div>
  );
}
