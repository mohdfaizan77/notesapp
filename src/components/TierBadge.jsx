export const TIER_LABEL = {
  beginner: '🌱 Beginner',
  intermediate: '⚙️ Intermediate',
  advanced: '🔥 Advanced',
};

export default function TierBadge({ tier }) {
  return <span className={`tier-badge tier-${tier}`}>{TIER_LABEL[tier] || tier}</span>;
}
