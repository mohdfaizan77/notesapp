import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getTopicById, getTopicsByCategory } from '../data/index.js';
import TierBadge from '../components/TierBadge.jsx';
import { isLearned, toggleLearned } from '../utils/progress.js';

export default function TopicDetail() {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getTopicById(topicId);
  const [learned, setLearned] = useState(() => (topic ? isLearned(topic.id) : false));

  if (!topic) {
    return (
      <div className="page">
        <p className="empty-state">Note not found.</p>
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
      </div>
    );
  }

  const siblings = getTopicsByCategory(topic.category);
  const index = siblings.findIndex((t) => t.id === topic.id);
  const prevTopic = index > 0 ? siblings[index - 1] : null;
  const nextTopic = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  function handleToggleLearned() {
    setLearned(toggleLearned(topic.id));
  }

  return (
    <div className="page">
      <header className="app-header">
        <button
          className="icon-btn"
          onClick={() => navigate(`/category/${topic.category}`)}
          aria-label="Back to list"
        >
          ←
        </button>
        <div className="header-title">{topic.title}</div>
      </header>

      <main className="detail-container">

        {/* ── HERO ─────────────────────────────────────────── */}
        <div className="detail-hero" style={{ borderColor: topic.tagColor }}>
          <span className="detail-emoji">{topic.emoji}</span>
          <div className="detail-title">{topic.title}</div>
          <div className="detail-subtitle">{topic.subtitle}</div>
          <TierBadge tier={topic.tier} />
          <button
            className={`learn-toggle-btn ${learned ? 'learn-toggle-btn--active' : ''}`}
            onClick={handleToggleLearned}
          >
            {learned ? '✓ Learned' : 'Mark as learned'}
          </button>
        </div>

        {/* ── DEFINITION (1-line crisp) ────────────────────── */}
        {topic.definition && (
          <section className="section-card section-card--definition">
            <div className="section-heading">📌 Definition</div>
            <p className="section-text section-text--definition">{topic.definition}</p>
          </section>
        )}

        {/* ── DESCRIPTION (in-depth) ───────────────────────── */}
        {(topic.description || topic.explanation) && (
          <section className="section-card">
            <div className="section-heading">📖 Description</div>
            <p className="section-text">
              {topic.description || topic.explanation}
            </p>
          </section>
        )}

        {/* ── DIAGRAM ──────────────────────────────────────── */}
        {topic.diagram && (
          <section className="section-card">
            <div className="section-heading">🖼️ Picture it</div>
            <pre className="diagram-block">{topic.diagram}</pre>
          </section>
        )}

        {/* ── KEY POINTS ───────────────────────────────────── */}
        {topic.keyPoints?.length > 0 && (
          <section className="section-card">
            <div className="section-heading">💡 Key points to remember</div>
            <ul className="key-point-list">
              {topic.keyPoints.map((point, i) => (
                <li key={i} className="key-point">
                  <span className="key-point-icon">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── WHEN / WHAT (side-by-side) ───────────────────── */}
        <div className="info-box-row">
          {topic.whenToUse && (
            <div className="info-box info-box--when">
              <div className="info-box-label">✅ When to use</div>
              <p>{topic.whenToUse}</p>
            </div>
          )}
          {topic.whatToUse && (
            <div className="info-box info-box--what">
              <div className="info-box-label">🛠️ What to use</div>
              <p>{topic.whatToUse}</p>
            </div>
          )}
        </div>

        {/* ── REAL-WORLD USE CASES ─────────────────────────── */}
        {topic.useCase && (
          <section className="section-card section-card--usecase">
            <div className="section-heading">🏢 Real-world use cases</div>
            <p className="section-text section-text--pre">{topic.useCase}</p>
          </section>
        )}

        {/* ── INTERVIEW SCENARIO ───────────────────────────── */}
        {topic.scenario && (
          <section className="section-card section-card--scenario">
            <div className="section-heading">🎯 Interview scenario</div>
            <p className="section-text section-text--pre">{topic.scenario}</p>
          </section>
        )}

        {/* ── MEMORY TRICK ─────────────────────────────────── */}
        {topic.memoryTrick && (
          <section className="section-card section-card--memory">
            <div className="section-heading">🧠 Memory trick</div>
            <p className="section-text section-text--memory">{topic.memoryTrick}</p>
          </section>
        )}

        {/* ── PREV / NEXT ──────────────────────────────────── */}
        <div className="topic-nav-row">
          {prevTopic ? (
            <Link to={`/topic/${prevTopic.id}`} className="nav-btn">
              ← {prevTopic.title}
            </Link>
          ) : (
            <span className="nav-btn nav-btn--disabled">← Start</span>
          )}
          {nextTopic ? (
            <Link to={`/topic/${nextTopic.id}`} className="nav-btn">
              {nextTopic.title} →
            </Link>
          ) : (
            <span className="nav-btn nav-btn--disabled">End →</span>
          )}
        </div>

        <Link to={`/category/${topic.category}`} className="back-btn back-btn--block">
          ← Back to list
        </Link>
      </main>
    </div>
  );
}