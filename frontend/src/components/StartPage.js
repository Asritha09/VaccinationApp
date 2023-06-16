import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css';

const StartPage = () => {
    const navigate=useNavigate()
  return (
    <div className="Startpage">
     
        <h1 className='StartPageHeading'>Vaccination Slot Booking</h1>
     

   
        <div className="CenterPart">
          <h2>Vaccination Slot Booking Site</h2>
          <p className='SelectRole'>Select Role</p>
          <div className="LoginButtons">
            <p className='LoginButton' onClick={()=>navigate('/login')}>User Login</p>
            <p className='LoginButton' onClick={()=>navigate('/adminlogin')}>Admin Login</p>
          </div>
        </div>
  

     
    </div>
  );
};

export default StartPage;
