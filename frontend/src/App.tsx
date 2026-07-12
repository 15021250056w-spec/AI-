import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import List from './pages/List';
import Detail from './pages/Detail';
import SolutionDetail from './pages/SolutionDetail';
import Capabilities from './pages/Capabilities';
import './index.css';

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
