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
import { ActivityPage } from './pages/activity/ActivityPage';
import { ActivityFormPage } from './pages/activity/ActivityFormPage';
import './App.css'
import { UserTypePage } from './pages/user_type/UserTypePage';
import { UserTypeFormPage } from './pages/user_type/UserTypeFormPage';
import { UserPage } from './pages/user/UserPage';
import { UserFormPage } from './pages/user/UserFormPage';

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

          <Route path='/activities' element={<ActivityPage />} />
          <Route path='/activities-create' element={<ActivityFormPage />} />
          <Route path='/activities/:id' element={<ActivityFormPage />} />

          <Route path='/usertypes' element={<UserTypePage />} />
          <Route path='/usertypes-create' element={<UserTypeFormPage />} />
          <Route path='/usertypes/:id' element={<UserTypeFormPage />} />

          <Route path='/users' element={<UserPage />} />
          <Route path='/users-create' element={<UserFormPage />} />
          <Route path='/users/:id' element={<UserFormPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
