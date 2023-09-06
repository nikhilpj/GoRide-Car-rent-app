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
import Location from './pages/user/Location';
import Booking from './pages/user/Booking';
import  { AdminProvider } from './context/adminContext';
import {UserProvider} from './context/userContext';
import Otp from './pages/user/Otp';
import firebaseConfig from './firebase/firebase';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'






function App() {
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
  
  return (
    <div className="App">
       <AdminProvider >
        <UserProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Routes>
        
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin/login' element={<AdminLogin/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/location/:id' element={<Location/>} />
        <Route path='/booking/:id' element={<Booking/>}/>
          <Route element={<Layout/>}>
            <Route path='admin/home' element={<Navigate to='/admin/dashboard' replace /> }/>
            <Route path='/admin/dashboard' element={<Dashboard/>}/>
            <Route path='admin/user-management' element={<UserManage/>} />
            <Route path='/admin/car-management' element={<CarManage/>} />
            <Route path='/admin/store-management' element={<StoreManage/>} />
            
          </Route>
          

      </Routes>
      </Router>
      </LocalizationProvider>
      </UserProvider>
      </AdminProvider>
      
      
   
    </div>
  );
}

export default App;
