import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.scss';

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;