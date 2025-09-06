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
      <Route path="/employeeupdateprofile" element={<Employee_Update_profile />} />
      <Route path="/userview" element={<User_view />} />



      
    </Routes>
    <Footer />
    </BrowserRouter>
    
  )
}
