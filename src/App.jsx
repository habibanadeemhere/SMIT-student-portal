import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


import Signup from './components/auth/Signup'
import Login from './components/auth/Login'



import StudentDashboard from './components/student/StudentDashboard'
import Complaint from './components/student/Complaint'
import LostFound from './components/student/LostFound'
import Volunteer from './components/student/Volunteer'


import AdminDashboard from './components/admin/AdminDashboard'
import Dashboard from './components/admin/Dashboard'
import ComplaintsAdmin from './components/admin/ComplaintsAdmin'
import LostFoundAdmin from './components/admin/LostFoundAdmin'
import VolunteersAdmin from './components/admin/VolunteersAdmin'
import UsersAdmin from './components/admin/UsersAdmin'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Signup />} />

          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard/>}/>

          <Route path="/complaint" element={<Complaint />} />
          <Route path="/LostFound" element={<LostFound/>}/>
          <Route path="/Volunteer" element={<Volunteer/>}/>


<Route path="/admin/dashboard" element={<Dashboard />} />
<Route path="/admin/complaints" element={<ComplaintsAdmin />} />
<Route path="/admin/lostfound" element={<LostFoundAdmin />} />
<Route path="/admin/volunteers" element={<VolunteersAdmin />} />
<Route path="/admin/users" element={<UsersAdmin />} />

          
        </Routes>
      </Router>
    </>
  )
}

export default App