import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SchoolPage } from './pages/school/SchoolPage';
import { SchoolFormPage } from './pages/school/SchoolFormPage';
import { HomePage } from './pages/HomePage';
import { StudentPage } from './pages/student/StudentPage';
import { StudentFormPage } from './pages/student/StudentFormPage';
import { CompanyPage } from './pages/company/CompanyPage';
import { CompanyFormPage } from './pages/company/CompanyFormPage';
import { TeacherPage } from './pages/teacher/TeacherPage';
import { TeacherFormPage } from './pages/teacher/TeacherFormPage';
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

          <Route path="/students" element={<StudentPage />} />
          <Route path="/students-create" element={<StudentFormPage />} />
          <Route path="/students/:id" element={<StudentFormPage />} />

          <Route path="/companies" element={<CompanyPage />} />
          <Route path="/companies-create" element={<CompanyFormPage />} />
          <Route path="/companies/:id" element={<CompanyFormPage />} />

          <Route path="/teachers" element={<TeacherPage />} />
          <Route path="/teachers-create" element={<TeacherFormPage />} />
          <Route path="/teachers/:dni" element={<TeacherFormPage />} />

          
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
