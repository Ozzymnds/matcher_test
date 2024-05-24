import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SchoolPage } from './pages/school/SchoolPage';
import { SchoolFormPage } from './pages/school/SchoolFormPage';
import { HomePage } from './pages/HomePage';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/schools" element={<SchoolPage />} />
          <Route path="/schools-create" element={<SchoolFormPage />} />
          <Route path="/schools/:id" element={<SchoolFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
