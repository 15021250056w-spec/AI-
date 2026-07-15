import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import SolutionDetail from './pages/SolutionDetail';
import Capabilities from './pages/Capabilities';
import { LangProvider } from './i18n/context';
import ToolLayout from './pages/tool/ToolLayout';
import Matrix from './pages/tool/Matrix';
import Browser from './pages/tool/Browser';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Tool routes — standalone layout (no main Navbar/Footer) */}
        <Route path="/tool" element={
          <LangProvider>
            <ToolLayout />
          </LangProvider>
        }>
          <Route index element={<Navigate to="/tool/matrix" replace />} />
          <Route path="matrix" element={<Matrix />} />
          <Route path="browser" element={<Browser />} />
        </Route>

        {/* Main site routes */}
        <Route path="*" element={
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/solution/:id" element={<SolutionDetail />} />
                <Route path="/capabilities" element={<Capabilities />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
