import { Link } from 'react-router-dom';
import { categories, getTopicsByCategory } from '../data/index.js';
import { countLearned } from '../utils/progress.js';

export default function Home() {
  const totals = categories.reduce((acc, cat) => {
    const topics = getTopicsByCategory(cat.id);
    acc.total += topics.length;
    acc.learned += countLearned(topics.map((t) => t.id));
    return acc;
  }, { total: 0, learned: 0 });

  const overallPct = totals.total ? Math.round((totals.learned / totals.total) * 100) : 0;

  return (
    <div className="page">
      <header className="app-header app-header--brand">
        <div>
          <div className="brand-title">My Learning Notes</div>
          <div className="brand-subtitle">A focused space for mastering DSA & system design.</div>
        </div>
      </header>

      <main className="home-container">
        <div className="home-intro">
          <div>
            <div className="eyebrow">Your workspace</div>
            <h1 className="home-heading">Keep learning. Keep shipping.</h1>
            <p className="home-copy">Choose a collection and jump straight into your notes.</p>
          </div>
        </div>

        <div className="home-stats" aria-label="Learning progress">
          <div className="stat-card"><div className="stat-value">{totals.total}</div><div className="stat-label">Total notes</div></div>
          <div className="stat-card"><div className="stat-value">{totals.learned}</div><div className="stat-label">Learned</div></div>
          <div className="stat-card"><div className="stat-value">{overallPct}%</div><div className="stat-label">Overall progress</div></div>
        </div>

        {categories.map((cat) => {
          const topics = getTopicsByCategory(cat.id);
          const total = topics.length;
          const learned = countLearned(topics.map((t) => t.id));
          const pct = total > 0 ? Math.round((learned / total) * 100) : 0;

          return (
            <Link key={cat.id} to={`/category/${cat.id}`} className="category-card">
              <span className="category-emoji">{cat.emoji}</span>
              <div className="category-text">
                <div className="category-label">{cat.label}</div>
                <div className="category-desc">{cat.description}</div>
                <div className="progress-track" aria-label={`${pct}% complete`}>
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="category-count">{learned}/{total}</div>
            </Link>
          );
        })}
      </main>

      <footer className="app-footer">Updated weekly · edit files in src/data</footer>
    </div>
  );
}
