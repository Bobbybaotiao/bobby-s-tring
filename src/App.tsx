import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import HotItemsPage from './pages/HotItemsPage';
import CollectionsPage from './pages/CollectionsPage';
import StoryPage from './pages/StoryPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

/**
 * 自动版本检测：每 30 秒 fetch /version.json，
 * 如果 hash 和上次不同（说明有新部署），自动刷新页面拿到最新内容。
 * admin 后台页面不刷新（避免编辑中丢数据）。
 */
function useAutoRefresh(disabled: boolean) {
  useEffect(() => {
    if (disabled) return;
    const BASE = import.meta.env.PROD ? '/bobby-s-tring' : '';
    const KEY = 'site_version_hash';

    const check = async () => {
      try {
        const res = await fetch(`${BASE}/version.json?t=${Date.now()}`, { cache: 'no-cache' });
        if (!res.ok) return;
        const { hash } = await res.json();
        const last = localStorage.getItem(KEY);
        if (last && last !== hash) {
          // 检测到新版本：更新记录 + 自动刷新
          localStorage.setItem(KEY, hash);
          window.location.reload();
        } else if (!last) {
          // 首次记录版本
          localStorage.setItem(KEY, hash);
        }
      } catch {
        /* version.json 不存在或网络失败，静默跳过 */
      }
    };

    check();
    const id = setInterval(check, 30000);
    return () => clearInterval(id);
  }, [disabled]);
}

function AppContent() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  useAutoRefresh(isAdmin);

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
