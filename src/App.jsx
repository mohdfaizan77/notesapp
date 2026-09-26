import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import CategoryList from './pages/CategoryList.jsx';
import TopicDetail from './pages/TopicDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<CategoryList />} />
      <Route path="/topic/:topicId" element={<TopicDetail />} />
    </Routes>
  );
}
