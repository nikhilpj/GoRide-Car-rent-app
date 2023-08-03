import Login from './pages/user/Login'
import Signup from './pages/user/Signup';
import AdminLogin from './pages/AdminLogin';
import CarManage from './pages/Cars';
import StoreManage from './pages/StoreManagement';
import UserManage from './pages/UserManagement';
import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';
import Home from './pages/user/Home';
import { useContext } from 'react';
import AdminContext, { AdminProvider } from './context/adminContext';




function App() {
  
  
  return (
    <div className="App">
       <AdminProvider >
      <Router>
        <Routes>
        
          <Route path='/api/user/login' element={<Login/>}/>
          <Route path='/api/user/signup' element={<Signup/>}/>
          <Route path='/api/admin/login' element={<AdminLogin/>}/>
          <Route path='/api/user/home' element={<Home/>}/>
         
          <Route element={<Layout/>}>
            <Route path='/api/admin/home' element={<Navigate to='/api/admin/dashboard' replace /> }/>
            <Route path='/api/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/api/admin/user-management' element={<UserManage/>} />
            <Route path='/api/admin/car-management' element={<CarManage/>} />
            <Route path='/api/admin/store-management' element={<StoreManage/>} />
          </Route>
          

      </Routes>
      </Router>
      </AdminProvider>
      
      
   
    </div>
  );
}

export default App;
