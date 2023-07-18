import Login from './pages/Login'
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import CarManage from './pages/CarManagement';
import StoreManage from './pages/StoreManagement';
import UserManage from './pages/UserManagement';
import './App.css';
import {BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Layout from './scenes/layout';
import Dashboard from './scenes/dashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/api/user/login' element={<Login/>}/>
          <Route path='/api/user/signup' element={<Signup/>}/>
          <Route path='/api/admin/login' element={<AdminLogin/>}/>
          <Route element={<Layout/>}>
            <Route path='/api/admin/home' element={<Navigate to='/api/admin/dashboard' replace /> }/>
            <Route path='/api/admin/dashboard' element={<Dashboard/>}/>
            <Route path='/api/admin/user-management' element={<UserManage/>} />
            <Route path='/api/admin/car-management' element={<CarManage/>} />
            <Route path='/api/admin/store-management' element={<StoreManage/>} />
          </Route>

      </Routes>
      </Router>
   
    </div>
  );
}

export default App;
