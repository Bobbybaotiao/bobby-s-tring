import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HotItemsPage from './pages/HotItemsPage';
import CollectionsPage from './pages/CollectionsPage';
import StoryPage from './pages/StoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hot-items" element={<HotItemsPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.PROD ? '/bobby-s-tring' : '/'}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
