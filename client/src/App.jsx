import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

import HomePage from './pages/home/HomePage';
import StudentHomePage from './pages/home/StudentHomePage';
import TeacherHomePage from './pages/home/TeacherHomePage';
import CompanyHomePage from './pages/home/CompanyHomePage';

import Register from './components/auth/register';
import AuthPage from './pages/login/AuthPage';
import UserDetailsPage from './pages/detail/UserDetails';

import SchoolPage from './pages/school/SchoolPage';
import SchoolFormPage from './pages/school/SchoolFormPage';

import StudentPage from './pages/student/StudentPage';
import StudentFormPage from './pages/student/StudentFormPage';

import CompanyPage from './pages/company/CompanyPage';
import CompanyFormPage from './pages/company/CompanyFormPage';

import TeacherPage from './pages/teacher/TeacherPage';
import TeacherFormPage from './pages/teacher/TeacherFormPage';

import ActivityPage from './pages/activity/ActivityPage';
import ActivityFormPage from './pages/activity/ActivityFormPage';

import PreferencePage from './pages/preference/PreferencePage';
import PreferenceFormPage from './pages/preference/PreferenceFormPage';

import CFeedbackPage from './pages/feedback/companies/CFeedbackPage';
import CFeedbackFormPage from './pages/feedback/companies/CFeedbackFormPage';

import SFeedbackPage from './pages/feedback/students/SFeedbackPage';
import SFeedbackFormPage from './pages/feedback/students/SFeedbackFormPage';

import TFeedbackPage from './pages/feedback/teachers/TFeedbackPage';
import TFeedbackFormPage from './pages/feedback/teachers/TFeedbackFormPage';

import ProtectedRoute from './pages/login/ProtectedRoute';
import MatchView from './matchView';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/match" element={<MatchView />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
                    <Route path="/studenthome" element={<ProtectedRoute element={<StudentHomePage />} />} />
                    <Route path="/teacherhome" element={<ProtectedRoute element={<TeacherHomePage />} />} />
                    <Route path="/companyhome" element={<ProtectedRoute element={<CompanyHomePage />} />} />
                    <Route path="/user-details" element={<UserDetailsPage />} />

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

                    <Route path="/activities" element={<ActivityPage />} />
                    <Route path="/activities-create" element={<ActivityFormPage />} />
                    <Route path="/activities/:id" element={<ActivityFormPage />} />

                    <Route path="/preferences" element={<PreferencePage />} />
                    <Route path="/preferences-create" element={<PreferenceFormPage />} />
                    <Route path="/preferences/:id" element={<PreferenceFormPage />} />

                    <Route path="/companyfeedback" element={<CFeedbackPage />} />
                    <Route path="/companyfeedback-create" element={<CFeedbackFormPage />} />
                    <Route path="/companyfeedback/:id" element={<CFeedbackFormPage />} />

                    <Route path="/studentfeedback" element={<SFeedbackPage />} />
                    <Route path="/studentfeedback-create" element={<SFeedbackFormPage />} />
                    <Route path="/studentfeedback/:id" element={<SFeedbackFormPage />} />

                    <Route path="/teacherfeedback" element={<TFeedbackPage />} />
                    <Route path="/teacherfeedback-create" element={<TFeedbackFormPage />} />
                    <Route path="/teacherfeedback/:id" element={<TFeedbackFormPage />} />

                    <Route path="/preferences" element={<ProtectedRoute element={<PreferenceFormPage />} />} />
                    <Route path="/feedback/student" element={<ProtectedRoute element={<SFeedbackFormPage />} />} />
                    <Route path="/feedback/teacher" element={<ProtectedRoute element={<TFeedbackFormPage />} />} />
                    <Route path="/feedback/company" element={<ProtectedRoute element={<CFeedbackFormPage />} />} />
                </Routes>
                <Toaster />
            </div>
        </BrowserRouter>
    );
}

export default App;