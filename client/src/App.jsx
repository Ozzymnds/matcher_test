import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import './App.css'

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

import { UserTypePage } from './pages/user_type/UserTypePage';
import { UserTypeFormPage } from './pages/user_type/UserTypeFormPage';

import { PreferencePage } from './pages/preference/PreferencePage';
import { PreferenceFormPage } from './pages/preference/PreferenceFormPage';

import { CFeedbackPage } from './pages/feedback/companies/CFeedbackPage';
import { CFeedbackFormPage } from './pages/feedback/companies/CFeedbackFormPage';

import { SFeedbackPage } from './pages/feedback/students/SFeedbackPage';
import { SFeedbackFormPage } from './pages/feedback/students/SFeedbackFormPage';

import { TFeedbackPage } from './pages/feedback/teachers/TFeedbackPage';
import { TFeedbackFormPage } from './pages/feedback/teachers/TFeedbackFormPage';

function App() {
    return (
        <BrowserRouter>
            <div>
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

                    <Route path='/preferences' element={<PreferencePage />} />
                    <Route path='/preferences-create' element={<PreferenceFormPage />} />
                    <Route path='/preferences/:id' element={<PreferenceFormPage />} />

                    <Route path='/companyfeedback' element={<CFeedbackPage />} />
                    <Route path='/companyfeedback-create' element={<CFeedbackFormPage />} />
                    <Route path='/companyfeedback/:id' element={<CFeedbackFormPage />} />

                    <Route path='/studentfeedback' element={<SFeedbackPage />} />
                    <Route path='/studentfeedback-create' element={<SFeedbackFormPage />} />
                    <Route path='/studentfeedback/:id' element={<SFeedbackFormPage />} />

                    <Route path='/teacherfeedback' element={<TFeedbackPage />} />
                    <Route path='/teacherfeedback-create' element={<TFeedbackFormPage />} />
                    <Route path='/teacherfeedback/:id' element={<TFeedbackFormPage />} />
                    
                </Routes>
                <Toaster />
            </div>
        </BrowserRouter>
    )
}

export default App;
