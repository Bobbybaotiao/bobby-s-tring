import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HotItemsPage from './pages/HotItemsPage';
import CollectionsPage from './pages/CollectionsPage';
import StoryPage from './pages/StoryPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hot-items" element={<HotItemsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;