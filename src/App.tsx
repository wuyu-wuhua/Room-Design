import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DesignNavbar from './components/DesignNavbar';

// Pages
import Home from './pages/Home';
import GalleryPage from './pages/Gallery';
import AboutPage from './pages/About';
import ContactPage from './pages/ContactPage';
import GalleryDetail from './pages/GalleryDetail';
import DesignRoomPage from './pages/DesignRoomPage';
import TextRoom from './pages/TextRoom';
import Pricing from './pages/Pricing';
import DesignDetail from './pages/DesignDetail';
import UserProfile from './pages/UserProfile';

// 只在部分页面显示DesignNavbar
interface AppLayoutProps {
  children: React.ReactNode;
}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  // 需要DesignNavbar的页面
  const useDesignNavbar = ['/design-room', '/text-room', '/pricing'];
  const showDesignNavbar = useDesignNavbar.some(path => location.pathname.startsWith(path));
  return (
    <>
      {showDesignNavbar ? <DesignNavbar /> : <Navbar />}
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery/:id" element={<GalleryDetail />} />
          <Route path="/design-room" element={<DesignRoomPage />} />
          <Route path="/text-room" element={<TextRoom />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/design-detail/:id" element={<DesignDetail />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;