import React, { useState,useContext } from 'react';
import '../styles/Login.css'
import { Link,useNavigate } from 'react-router-dom';
import {AiOutlineMail,AiFillLock} from 'react-icons/ai'
import axios from 'axios'
import {MainContext} from '../ContextStore/MainContext'
import PopUp from './PopUp';

import ReactLoading from 'react-loading';

export default function Login() {
    const navigate = useNavigate();

    // const [email,setemail]=useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const { openPopUp, setopenPopUp, PopUpMessage,setPopUpMessage,email,setemail,setid } =  useContext(MainContext)



    const signIn = () => {
        setisLoading(true)
        axios.post('http://localhost:3001/userLogin',{email,password}).then((res)=>{
            setisLoading(false)
            if(res.data.message==="Incorrect password"){
                openPopUpMessage("Incorrect password")
            }
            else if(res.data.message==="Email not found"){
                openPopUpMessage("Email not found")
            }
            else if(res.data.message==="Error occured"){
                openPopUpMessage("Error occured")
            }
            else if(res.data.message==="Login Successful"){
                setid(res.data.response._id)
                navigate('/homepage')
            }
            
        })
    }



    const openPopUpMessage = (message) => {

        setPopUpMessage(message)
        setopenPopUp(true)

    };



    return (
        <div>
            <div className='LoginPageLogoSection'>
                <h1 style={{textAlign:"center"}}>Login</h1>
            </div>

            <div className='CentralPart1'>
                <div>
                    <img src='vaccination.jpg' className='interviewImage' alt='InterviewPic'></img>
                </div>

                <div className='LoginSection'>
                    <p className='LoginHeading1'>Login To Your Account </p>
                    <p className='LoginHeading2'>Enter your details to login </p>
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
                        <p className='LoginButton' onClick={signIn}>{!isLoading ? "Login" : <ReactLoading type="spin" color="white" height={30} width={30}  />}</p>
                        <p>Dont have an Account ? <span onClick={()=>navigate('/signup')} style={{cursor:"pointer",color:"green",fontWeight:"bold"}}>SignUp</span></p>
                       
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

