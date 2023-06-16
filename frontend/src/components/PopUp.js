import React, { useState, useEffect, useContext } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from 'react-bootstrap/Button';
import { MainContext } from '../ContextStore/MainContext';
import { useNavigate } from 'react-router-dom';


export default function PopUp() {

    const [open, setOpen] = React.useState(false);
    const { openPopUp, setopenPopUp, PopUpMessage } =  useContext(MainContext)
    const [isLogout, setisLogout] = useState(false)
    const [isLogout1, setisLogout1] = useState(false)
    const navigate = useNavigate();

    useEffect(()=>{
        if (PopUpMessage === "Are you sure you want to Logout ?") {
            setisLogout(true)
        }
        if (PopUpMessage === "Are you sure you want to logout ?") {
            setisLogout(true)
        }
    },[])
    const handleClose = () => {
        setopenPopUp(false);
       
    
    };


    return (
        <div>
            <div>

                <Dialog
                    open={openPopUp}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        Alert
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {PopUpMessage}
                        </DialogContentText>
                    </DialogContent>
                    {
                        isLogout  ?
                            <div style={{display:"flex",justifyContent:"space-around"}}>
                                <DialogActions>
                                    <Button onClick={()=>{
                                         if (PopUpMessage === "Are you sure you want to Logout ?") {
                                            navigate("/login")
                                        } 
                                        else if (PopUpMessage === "Are you sure you want to logout ?") {
                                            navigate("/adminlogin")

                                        }

                                        setopenPopUp(false);
                                        setisLogout(false)
                                    }}>Yes</Button>
                                </DialogActions>
                                <DialogActions>
                                    <Button onClick={handleClose}>No</Button>
                                </DialogActions>
                            </div> :
                            <DialogActions>
                                <Button onClick={handleClose}>OK</Button>
                            </DialogActions>
                    }
                     
                </Dialog>
            </div>
        </div>
    )
}
