import React, { useState, useEffect } from 'react'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom'
import { useTranslation, initReactI18next } from 'react-i18next';
import LanguageSwitcher from  '../../i18/LanguageSwitcher';
import "./navbar.css"
import Sidebar from './Sidebar'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase'
import  {uiConfig}  from '../../firebase/firebaseuiConfig'
import  {initializeFirebaseUI}  from '../../firebase/firebaseuiConfig';
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import { useNavigate } from 'react-router-dom'
import MobileOTP from '../../OTP/mobileOTP'
import EmailOTP from '../../OTP/emailOTP';
import Modal from 'react-modal'
import axios from 'axios'; // Import axios for making HTTP requests

function Navbar() {
    const { t, i18n } = useTranslation();
    // console.log('i18n:', i18n);
    const navigate = useNavigate()
    const user=useSelector(selectUser)
    const [isDivVisibleForintern,setDivVisibleForintern]=useState(false)
    const [isDivVisibleForJob,setDivVisibleFroJob]=useState(false)
    const [isDivVisibleForlogin,setDivVisibleFrologin]=useState(false)
    const [isDivVisibleForProfile,setDivVisibleProfile]=useState(false)
    const [isStudent,setStudent]=useState(true)
    const [selectedLanguage, setSelectedLanguage] = useState('default')
    const [mobileOtpModalOpen, setmobileOtpModalOpen] = useState(false);
    const [emailOtpModalOpen, setemailOtpModalOpen] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);

    // const changeLanguage = (lng) => {
    //     if (lng !== selectedLanguage) {
    //         setSelectedLanguage(lng);
    //         setmobileOtpModalOpen(true);
    //     }
    // };
    const handleLanguageChange = (lng) => {
        if (!otpVerified) {
            if(lng === 'fr'){
                setemailOtpModalOpen(true); // Open email OTP modal if OTP verification is required
            } else {
                setmobileOtpModalOpen(true); // Open mobile OTP modal if OTP verification is required
            }
        } else {
            updateLanguage(lng);
        }
    };

    const handleMobileOTPVerified = (isVerified) => {
        setOtpVerified(isVerified);
        if (isVerified) {
            alert('Phone number verified successfully.'); // Show alert upon successful mobile OTP verification
            setmobileOtpModalOpen(false); // Close mobile OTP modal
            updateLanguage(selectedLanguage);
        }
    };

    const handleEmailOTPVerified = (isVerified) => {
        setOtpVerified(isVerified);
        if(isVerified){
            alert('Email verified succesfully.'); // Show alert upon successful email OTP verification
            setemailOtpModalOpen(false); //close email OTP modal
            document.body.className = 'fr';
            updateLanguage(selectedLanguage);
            document.body.className = 'fr';
            console.log(document.body.className);
        }
    }
    const updateLanguage = (lng) => {
        setSelectedLanguage(lng); // Update selected language state
        i18n.changeLanguage(lng); // Change language globally
        document.body.className = lng; // Optionally, update body class
        if(lng!=='default'){
            setOtpVerified(false); // Reset OTP verification state after language change
        }
    }

    // useEffect(() => {
    //     if (mobileOtpModalOpen && window.recaptchaVerifier) {
    //         window.recaptchaVerifier.clear(); // Clear existing reCAPTCHA verifier
    //         const recaptchaContainer = document.getElementById('recaptcha-container');
    //         if (recaptchaContainer) {
    //             // No need to initialize recaptcha here; it's handled in MobileOTP component
    //         } else {
    //             console.error('reCAPTCHA container not found');
    //         }
    //     }
    // }, [mobileOtpModalOpen]);

    // useEffect(() => {
    //     // Update the body class only if selectedLanguage is not 'default'
    //     if (selectedLanguage !== 'default') {
    //         document.body.className = selectedLanguage;
    //     }
    // }, [selectedLanguage]);
    
    // const changeLanguage = (lng) => {
    //     console.log('Selected Language:', lng); // Log the selected language code
    //     i18n.changeLanguage(lng, (err, t) => {
    //       if (err) {
    //         console.log('Something went wrong loading language:', err);
    //       } else {
    //         console.log('Language changed successfully:', i18n.language);
    //       }
    //     });
    //     setSelectedLanguage(lng); // Update the selectedLanguage state
    //   };
      
    console.log('Navbar re-rendered'); // Add this line for debugging
      
      
    // console.log('i18n:', i18n);
    // console.log('t:', t);

    useEffect(() => {
        if (isDivVisibleForlogin) {
            initializeFirebaseUI();
        }
    }, [isDivVisibleForlogin]);

    const loginFunction=()=>{
        // initializeFirebaseUI(); // Initialize FirebaseUI before signing in
        signInWithPopup(auth,provider)
            .then((res)=>{
                console.log(res);

                const loginData = {
                    loginTime: new Date(), // Include loginTime
                    browser: navigator.userAgent,
                    os: navigator.platform,
                    deviceType: "laptop",
                    ipAddress: '127.0.0.1' // Replace with actual IP address retrieval logic if needed
                };
                // Make a POST request to save login history
                axios.post('http://localhost:5000/api/login-history', loginData)
                    .then((response) => {
                        console.log('Login history saved:', response.data);
                        // Handle any further actions or state updates upon successful POST request
                    })
                    .catch((error) => {
                        console.error('Error saving login history:', error);
                        // Handle errors if needed
                    });
          
        }).catch((err)=>{
            console.log(err)
        })
        setDivVisibleFrologin(false)
    }

    const showLogin=()=>{
        setDivVisibleFrologin(true)
    }
    const closeLogin=()=>{
        setDivVisibleFrologin(false)
    }
    const setTrueForStudent=()=>{
        setStudent(false)
    }
    const setFalseForStudent=()=>{
        setStudent(true)
    }
    //  for showing profile dropdown
    const showtheProfile=()=>{
        setDivVisibleProfile(true)
        document.getElementById("ico3").className="bi bi-caret-up-fill"
    }
    const hidetheProfile=()=>{
        document.getElementById("ico3").className="bi bi-caret-down-fill"
        setDivVisibleProfile(false)
    }


        const showInternShips=()=>{
            document.getElementById("ico").className="bi bi-caret-up-fill"
            setDivVisibleForintern(true)
        }
        const hideInternShips=()=>{
            document.getElementById("ico").className="bi bi-caret-down-fill"
            setDivVisibleForintern(false)
        }
        const showJobs=()=>{
            document.getElementById("ico2").className="bi bi-caret-up-fill"
            setDivVisibleFroJob(true)
        }
        const hideJobs=()=>{
            document.getElementById("ico2").className="bi bi-caret-down-fill"
            setDivVisibleFroJob(false)
        }

        const logoutFunction=()=>{
            signOut(auth)
            navigate("/")
        }

  return (
    <div>
        
        <nav className='nav1'>
        {/* <div id="firebaseui-auth-container" className='mr-5 w-20 justify-right '></div> */}
        {isDivVisibleForlogin && <div id="firebaseui-auth-container" className='mr-5 w-20 justify-right '></div>}
        <ul>
        <div className="img">
        <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>  
        </div>
        <div className="elem">
        <Link to={"/Internship"}>   <p id='int' className='' onMouseEnter={showInternShips} > {t('navbar.internships')}  <i onClick={hideInternShips}  id='ico' class="bi bi-caret-down-fill"></i></p></Link>
        <Link to={"/Jobs"}> <p onMouseEnter={showJobs} > {t('navbar.jobs')}  <i class="bi bi-caret-down-fill" id='ico2' onClick={hideJobs}></i></p></Link>
        </div>
        
        {/* Language selection and components */}
        <Modal isOpen={mobileOtpModalOpen}>
            <MobileOTP onOTPVerified={handleMobileOTPVerified} />
        </Modal>

        <Modal isOpen={emailOtpModalOpen}>
            <EmailOTP onOTPVerified={handleEmailOTPVerified} />
        </Modal>

        <LanguageSwitcher
            onLanguageChange={handleLanguageChange}
            selectedLanguage={selectedLanguage}
        />

        <div className="language-select mt-6 w-1">
        <i class="bi bi-globe"></i>
                <select  value={selectedLanguage} onChange={(e)=> handleLanguageChange(e.target.value)}>
                    <option value="default" disabled className='text-gray-700'>{t('navbar.selectLanguage')}</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="hi">Hindi</option>
                    <option value="pt">Portuguese</option>
                    <option value="fr">French</option>
                    <option value="zh">Chinese</option>
                </select>
        </div>


        <div className="search">
        <i class="bi bi-search"></i>
            <input type="text" placeholder={t('navbar.searchPlaceholder')} />
        </div>

        {
            user?(
                <>
                <div className='Profile'>
                    <Link to={"/profile"}>
                        <img src={user?.photo}  alt="" onMouseEnter={showtheProfile} className='rounded-full w-12' id='picpro' />
                    <i className='bi bi-caret-up-fill' id='ico3' onClick={hidetheProfile}></i>
                    </Link>
                </div>
                </>
            ):(
                <>
                <div className="auth">
            <button className='btn1' onClick={showLogin}>{t('navbar.login')}</button>

            {isDivVisibleForlogin && (
                <div id="firebaseui-auth-container"></div>
            )}
                
                
                <button className='btn2'><Link  to="/register">{t('navbar.register')}</Link></button>
        </div>
                </>
            )
            
            
        }
    {
        user?(
            <>
            <button className='bt-log' id='bt' onClick={logoutFunction}>{t('navbar.logout')} <i class="bi bi-box-arrow-right"></i></button>
            </>
        ):(
            <>
                <div className="hireTalent flex mt-7 hire">{t('navbar.hireTalent')}</div>

        <div className="admin">
        < Link to={"/adminLogin"}>
        <button>{t('navbar.admin')}</button>  </Link>
        </div>
            </>
        )
    }

    </ul>
        </nav>


    {
        isDivVisibleForintern &&(
            <div className="profile-dropdown-2">
                <div className="left-section">
             
  <p>{t('navbar.topLocations')}</p>
  <p>{t('navbar.profile')}</p>
  <p>{t('navbar.topCategory')}</p>
  <p>{t('navbar.exploreMore')}</p>
</div>
<div className="line flex bg-slate-400">

</div>
<div className="right-section">
  <p>{t('navbar.internAtIndia')}</p>
  <p>{t('navbar.internAtIndia')}</p>
  <p>{t('navbar.internAtIndia')}</p>
  <p>{t('navbar.internAtIndia')}</p>
  <p>{t('navbar.internAtIndia')}</p>
</div>
      </div>
             
    
        )
    }
    {
        isDivVisibleForJob &&(
            <div className="profile-dropdown-1">
                <div className="left-section">
             
    <p>{t('navbar.topLocations')}</p>
    <p>{t('navbar.profile')}</p>
    <p>{t('navbar.topCategory')}</p>
    <p>{t('navbar.exploreMore')}</p>
</div>
<div className="line flex bg-slate-400">

</div>
<div className="right-section">
    <p>{t('navbar.internAtIndia')}</p>
    <p>{t('navbar.internAtIndia')}</p>
    <p>{t('navbar.internAtIndia')}</p>
    <p>{t('navbar.internAtIndia')}</p>
    <p>{t('navbar.internAtIndia')}</p>
</div>
      </div>
             
    
        )
    }
<div className="login">
    {
        isDivVisibleForlogin &&(
            <>
            <button id='cross' onClick={closeLogin}><i class="bi bi-x"></i></button>
            <h5 id='state' className='mb-4 justify-center text-center'>
                <span id='Sign-in' style={{cursor:"pointer"}} className={`auth-tab ${isStudent? 'active':""}`} onClick={setFalseForStudent}>
                    {t('navbar.studentRegister')}
                </span>
                &nbsp;     &nbsp; &nbsp;    &nbsp;    &nbsp;    &nbsp;    &nbsp;
                <span id='join-in' style={{cursor:"pointer"}} className={`auth-tab ${isStudent? 'active':""}`} onClick={setTrueForStudent}>
                    {t('navbar.companyRegister')}
                </span>
            </h5>
            {isStudent ?(
                <>
                <div className="py-6">
                    <div id="firebaseui-auth-container" className='mr-5 w-full flex justify-center'></div>

                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
<div className="w-full p-8 lg:w-1/2">
{/* <div id="firebaseui-auth-container" className='mr-5 w-20 justify-right '></div> */}
<p onClick={loginFunction} className='flex
 items-center h-9 justify-center mt-4 text-white bg-slate-100 rounded-lg hover:bg-gray-100' >
    <div className="px-4 py-3">
    <svg class="h-6 w-6" viewBox="0 0 40 40">
                         <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                         <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                         <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                         <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                     </svg>
    </div>
    <h4 className='text-gray-500'>{t('navbar.loginWithGoogle')} 
    </h4>
 </p>
 <div className="mt-4 flex items-center justify-between">
<span className='border-b- w-1/5 lg:w-1/4'></span>
<p className='text-gray-500 text sm font-bold mb-2'> or</p>
<span className='border-b- w-1/5 lg:w-1/4'></span>

 </div>
 <div class="mt-4">
                 <label class="block text-gray-700 text-sm font-bold mb-2">{t('navbar.email')} </label>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  placeholder='john@example.com'/>
             </div>
             <div class="mt-4">
                 <div class="flex justify-between">
                     <label class="block text-gray-700 text-sm font-bold mb-2">{t('navbar.password')}</label>
                     <a href="/" class="text-xs text-blue-500">{t('navbar.forgetPassword')}</a>
                 </div>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"   placeholder={t('navbar.mustBeAtLeast6')}   type="password"/>
             </div>
             <div className="mt-8">
             <button className='btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 '>{t('navbar.login')}</button>
             </div>

             <div className="mt-4 flex items-center justify-between">
<p className='text-sm'>{t('new to internarea? Register')}(<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>{t('navbar.studentRegister')}</span>/<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>{t('navbar.companyRegister')}</span>) </p>
             </div>
</div>
                    </div>
                </div>
                
                </>
            ):(
                <>
                    <div id="firebaseui-auth-container" className='mr-5 w-20 justify-right '></div>
                    <div className="flex bg-white rounded-lg justify-center overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
<div className="w-full p-8 lg:w-1/2">
                 <div class="mt-4">
                 <label class="block text-gray-700 text-sm font-bold mb-2">{('navbar.email')} </label>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email"  placeholder='john@example.com'/>
             </div>
             <div class="mt-4">
                 <div class="flex justify-between">
                     <label class="block text-gray-700 text-sm font-bold mb-2">{t('navbar.password')}</label>
                     <a href="/" class="text-xs text-blue-500">{('navbar.forgetPassword')}</a>
                 </div>
                 <input class=" text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"   placeholder={t('navbar.mustBeAtLeast6')}   type="password"/>
             </div>
             <div className="mt-8">
             <button className='btn3  bg-blue-500 h-9 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600 '>{t('navbar.login')}</button>
             </div>

             <div className="mt-4 flex items-center justify-between">
<p className='text-sm'>{t('new to internarea? Register')}(<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>{t('navbar.studentRegister')}</span>/<span className='text-blue-500 cursor-pointer' onClick={closeLogin}>{t('navbar.companyRegsiter')}</span>) </p>
             </div></div>
             </div>
                </>
            )
            }
            </>
        )
    }
    {isDivVisibleForProfile&&(
        <div className="profile-dropdown h-16 rounded-sm shadow-sm">
            <p className='font-bold'>{user?.name}</p>
            <p className='font-medium'>{user?.email}</p>
           
        </div>
    )

    }
</div>
    <Sidebar/>
    </div>
  )
}

export default Navbar
