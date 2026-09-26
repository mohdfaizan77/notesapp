import { Link } from 'react-router-dom';
import { categories, getTopicsByCategory } from '../data/index.js';
import { countLearned } from '../utils/progress.js';

export default function Home() {
  return (
    <div className="page">
      <header className="app-header app-header--brand">
        <div>
          <div className="brand-title">My Learning Notes</div>
          <div className="brand-subtitle">Pick a topic to study</div>
        </div>
      </header>

      <main className="home-container">
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
                <div className="progress-track">
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
