import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Signin from './Pages/Signin'
import Navigation from './Components/Navigation'
import Shop_workers_Login from './Pages/Shop_workers_Login'
import Admin_Home from './Pages/Admin_Home'
import Footer from './Components/Footer'
import Employee_Update_profile from './Pages/Employee_Update_profile'
import User_view from './Pages/User_view'
import New_machine_registration from './Pages/New_machine_registration'
import Machine_view from './Pages/machine_view'
import EmployeeRegistration from './Pages/EmployeeRegistration'
import Machine_maintenance_schedule from './Pages/Machine_maintenance_schedule'
import View_Maintenance_Schedule from './Pages/View_Maintenance_Schedule'
import Pm_admin_tool from './Pages/pm_admin_tool'

import PM_Post_Evaluation from './Pages/PM_Post_Evaluation'

import View_Admin_tool from './Pages/view_Admin_tool'
import View_Post_Evaluation from './Pages/View_Post_Evaluation'
import View_PM_Team_Leave from './Pages/View_PM_Team_Leave'
import View_Leave from './Pages/View_Leave'


export default function App() {
  return (
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/EmployeeRegistration" element={<EmployeeRegistration />} />
      <Route path="/shop_workers_Login" element={<Shop_workers_Login />} />
      <Route path="/adminhome" element={<Admin_Home />} />
      <Route path="/New_machine_registration" element={<New_machine_registration />} />
      <Route path="/New_machine_registration/:id?" element={<New_machine_registration />} />
      <Route path="/Machine_view" element={<Machine_view />} />
      <Route path="/Machine_maintenance_schedule" element={<Machine_maintenance_schedule />} />
      <Route path="/View_Maintenance_Schedule" element={<View_Maintenance_Schedule />} />
      <Route path="/employeeupdateprofile" element={<Employee_Update_profile />} />
      <Route path="/userview" element={<User_view />} />
      
      <Route path="/Pm_admin_tool" element={<Pm_admin_tool />} />

      <Route path="/PM_Post_Evaluation" element={<PM_Post_Evaluation />} />
      <Route path="/View_Post_Evaluation" element={<View_Post_Evaluation />} />
      <Route path="/View_PM_Team_Leave" element={<View_PM_Team_Leave />} />
      <Route path="/View_Leave" element={<View_Leave />} />
      

      <Route path="/View_Admin_tool" element={<View_Admin_tool />} />
      
      





      
    </Routes>
    <Footer />
    </BrowserRouter>
    
  )
}
