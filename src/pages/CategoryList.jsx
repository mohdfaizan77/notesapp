import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getCategory, getTopicsByCategory } from '../data/index.js';
import TierBadge, { TIER_LABEL } from '../components/TierBadge.jsx';
import { getLearnedSet } from '../utils/progress.js';

const TIER_FILTERS = ['all', 'beginner', 'intermediate', 'advanced'];

export default function CategoryList() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [learnedSet] = useState(() => getLearnedSet());

  const category = getCategory(categoryId);
  const allTopics = getTopicsByCategory(categoryId);
  const topics = allTopics.filter((t) => {
    if (tierFilter !== 'all' && t.tier !== tierFilter) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q);
  });

  if (!category) {
    return (
      <div className="page">
        <p className="empty-state">Category not found.</p>
        <button className="back-btn" onClick={() => navigate('/')}>← Home</button>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="app-header">
        <button className="icon-btn" onClick={() => navigate('/')} aria-label="Back home">←</button>
        <div>
          <div className="header-title">{category.emoji} {category.label}</div>
          <div className="header-subtitle">{allTopics.length} notes</div>
        </div>
      </header>

      <div className="search-wrap">
        <input
          className="search-input"
          type="text"
          placeholder="Search notes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-chip-row">
        {TIER_FILTERS.map((tier) => (
          <button
            key={tier}
            className={`filter-chip ${tierFilter === tier ? 'filter-chip--active' : ''}`}
            onClick={() => setTierFilter(tier)}
          >
            {tier === 'all' ? 'All' : TIER_LABEL[tier]}
          </button>
        ))}
      </div>

      <main className="topic-list">
        {topics.length === 0 && <p className="empty-state">No notes match this filter.</p>}
        {topics.map((t) => (
          <Link key={t.id} to={`/topic/${t.id}`} className="topic-card" style={{ borderLeftColor: t.tagColor }}>
            <span className="topic-emoji">{t.emoji}</span>
            <div className="topic-text">
              <div className="topic-title">{t.title}</div>
              <div className="topic-subtitle">{t.subtitle}</div>
            </div>
            <div className="topic-badges">
              <TierBadge tier={t.tier} />
              {learnedSet.has(t.id) && <span className="badge-learned">✓ Learned</span>}
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
