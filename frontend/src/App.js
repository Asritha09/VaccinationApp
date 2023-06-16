import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import React,{useState,useEffect} from 'react';
import {MainContext} from './ContextStore/MainContext'
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AdminLogin from './components/AdminLogin';
import AdminSignUp from './components/AdminSignUp';
import HomePage from './components/HomePage';
import AdminHomePage from './components/AdminHomePage'
import StartPage from './components/StartPage';




function App() {

  const [openPopUp, setopenPopUp] = useState(false);
  const [PopUpMessage,setPopUpMessage]=useState('')
  const [email,setemail]=useState("")
  const [id,setid]=useState("")
  
  return (
   <div>
    <MainContext.Provider value={{email,setemail,id,setid,openPopUp,setopenPopUp,PopUpMessage,setPopUpMessage}}>
          <Router>
            <Routes>
                  <Route exact path='/' element={<StartPage/>}></Route>
                  <Route exact path='/login' element={<Login/>}></Route>
                  <Route exact path='/signup' element={< SignUp />}></Route>
                  <Route exact path='/adminlogin' element={<AdminLogin/>}></Route>
                  <Route exact path='/adminsignup' element={< AdminSignUp />}></Route>
                  <Route exact path='/homepage' element={< HomePage />}></Route>
                  <Route exact path='/adminhomepage' element={< AdminHomePage />}></Route>

                  

            </Routes>
        </Router>
      </MainContext.Provider>
   </div>
  );
}

export default App;
