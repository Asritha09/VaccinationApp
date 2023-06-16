import React, { useState,useContext } from 'react';
import '../styles/SignUp.css'
import { Link,useNavigate } from 'react-router-dom';
import {AiOutlineMail,AiFillLock} from 'react-icons/ai'
import axios from 'axios'
import {MainContext} from '../ContextStore/MainContext'
import PopUp from './PopUp';

import ReactLoading from 'react-loading';

export default function SignUp() {
    const navigate = useNavigate();

    const [email,setemail]=useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [isLoading, setisLoading] = useState(false)
    const { openPopUp, setopenPopUp, PopUpMessage,setPopUpMessage } =  useContext(MainContext)



    const signIn = (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            openPopUpMessage('Please enter a valid email address.');
          return;
        }
    
        if (password.length < 8) {
            openPopUpMessage('Password should be at least 8 characters long.');
          return;
        }
    
        if (!validatePasswordStrength(password)) {
            openPopUpMessage('Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
          return;
        }
    
        if (password !== confirmPassword) {
            openPopUpMessage('Passwords do not match.');
          return;
        }

        setisLoading(true)
        axios.post('http://localhost:3001/userSignup',{email,password}).then((res)=>{
            setisLoading(false)
            console.log(res.data);
            if(res.data.message==="Email already exists"){
                openPopUpMessage("Incorrect password")
            }
            else if(res.data.message==="SignUp successfully"){
                openPopUpMessage("SignUp successfully")
            }
            else if(res.data.message==="Error occured"){
                openPopUpMessage("Error occured")
            }
        })
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };
      
      const validatePasswordStrength = (password) => {
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        return passwordRegex.test(password);
      };
      


    const openPopUpMessage = (message) => {

        setPopUpMessage(message)
        setopenPopUp(true)

    };



    return (
        <div>
            <div className='LoginPageLogoSection'>
                <h1 style={{textAlign:"center"}}>SignUp</h1>
            </div>

            <div className='CentralPart1'>
                <div>
                    <img src='vaccination.jpg' className='interviewImage' alt='InterviewPic'></img>
                </div>

                <div className='LoginSection'>
                    <p className='LoginHeading1'>Create Account to proceed</p>
                    <p className='LoginHeading2'>Enter your details to signup </p>
                    <div className='LoginPart'>

                        <p className='username'>Username</p>
                        <div className='InputsWithIcons'>
                            <AiOutlineMail  className='InputIcon'/>
                            <input type="text" placeholder="Enter Your username"  style={{border:"none",outline:"none"}} className='Inputs'  onChange={(e) => setemail(e.target.value)}
                              
                             />
                        </div>

                        <p className='Password'>Password</p>
                        <div className='InputsWithIcons'>
                            <AiFillLock className='InputIcon' />
                            <input placeholder="password" type="password" style={{border:"none",outline:"none"}} className='Inputs'  onChange={(e) => setPassword(e.target.value)}
                            
                             />
                        </div>
                        <p className='Password'>Confirm Password</p>
                        <div className='InputsWithIcons'>
                            <AiFillLock className='InputIcon' />
                            <input placeholder="password" type="password" style={{border:"none",outline:"none"}} className='Inputs'  onChange={(e) => setConfirmPassword(e.target.value)}
                            
                             />
                        </div>
                        <p className='LoginButton' onClick={signIn}>{!isLoading ? "SignUp" : <ReactLoading type="spin" color="white" height={30} width={30}  />}</p>
                       
                    </div>
                </div>
            </div>

            <div>

            {
                openPopUp ? <PopUp/>:null
            }
            </div>


        </div>
    )
}

