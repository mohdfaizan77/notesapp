import { systemDesignTopics } from './systemDesignTopics';
import { dsaTopics } from './dsaTopics';

export const categories = [
  {
    id: 'systemDesign',
    label: 'System Design',
    emoji: '🏗️',
    description: 'How big apps are built — servers, databases, scaling.',
  },
  {
    id: 'dsa',
    label: 'DSA',
    emoji: '🧮',
    description: 'Data Structures & Algorithms — how to solve problems well.',
  },
];

export const allTopics = [...systemDesignTopics, ...dsaTopics];

export function getTopicsByCategory(categoryId) {
  return allTopics
    .filter((t) => t.category === categoryId)
    .sort((a, b) => a.orderIndex - b.orderIndex);
}

export function getTopicById(topicId) {
  return allTopics.find((t) => t.id === topicId);
}

export function getCategory(categoryId) {
  return categories.find((c) => c.id === categoryId);
}
