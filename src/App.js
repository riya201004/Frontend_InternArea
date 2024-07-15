import './App.css';
import Footer from './Componets/Footerr/Footer';
import Home from './Componets/Home/Home';
import Navbar from './Componets/Navbar/Navbar';
import { Routes,Route } from 'react-router-dom';
import Register from './Componets/auth/Register';
import Intern from "./Componets/Internships/Intern"
import JobAvl from "./Componets/Job/JobAvl"
import JobDetail from './Componets/Job/JobDetail';
import InternDeatil from "./Componets/Internships/InternDeatil"
import { useDispatch } from 'react-redux';
import { login,logout } from "./Feature/Userslice"
import { useEffect } from 'react';
import { auth } from './firebase/firebase';
import { Suspense } from 'react';
import Profile from './profile/Profile';
import AdminLogin from './Admin/AdminLogin';
import Adminpanel from './Admin/Adminpanel';
import ViewAllApplication from "./Admin/ViewAllApplication"
import Postinternships from './Admin/Postinternships';
import PostJob from './Admin/PostJob';
import DeatilApplication from './Applications/DeatilApplication';
import UserApplicatiom from './profile/UserApplicatiom';
import LoginHistory from './profile/loginHistory';
import UserapplicationDetail from "./Applications/DeatilApplicationUser"
import LanguageSwitcher from './i18/LanguageSwitcher';
function App() {
  // const user=useSelector(selectUser);
  const dispatch=useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(login({
  
          uid:authUser.uid,
          photo:authUser.photoURL,
          name:authUser.displayName,
          email:authUser.email,
          phoneNumber:authUser.phoneNumber
        }))
      }
        else{
          dispatch(logout())
        }
    })
    },[dispatch] );
  return (
    <div className="App">
      <Navbar />
      <LanguageSwitcher />
      <Suspense fallback="Loading...">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/internship' element={<Intern/>}/>
          <Route path='/Jobs' element={<JobAvl/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/detailjob' element={<JobDetail/>}/>
          <Route path='/detailInternship' element={<InternDeatil/>}/>
          <Route path='/detailApplication' element={<DeatilApplication/>}/>
          <Route path='/adminLogin' element={<AdminLogin/>}/>
          <Route path='/adminepanel' element={<Adminpanel/>}/>
          <Route path='/postInternship' element={<Postinternships/>}/>
          <Route path='/postJob' element={<PostJob/>}/>
          <Route path='/applications' element={<ViewAllApplication/>}/>
          <Route path='/UserapplicationDetail' element={< UserapplicationDetail/>}/>
          <Route path='/userapplication' element={<UserApplicatiom/>}/>
          <Route path='loginHistory' element={<LoginHistory />} />
        </Routes>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App;
