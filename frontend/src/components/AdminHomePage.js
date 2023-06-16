import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/AdminHomePage.css';
import axios from 'axios'
import { MainContext } from '../ContextStore/MainContext'
import PopUp from './PopUp';

const AdminHomePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [centerData, setcenterData] = useState([])
    const [showData, setShowData] = useState(false)
    const [isSlotAvailable, setisSlotAvailable] = useState(false)
    const [isSlotBooked, setisSlotBooked] = useState(false)
    const [centerDetails, setCenterDetails] = useState()
    const [citiesList, setCitiesList] = useState()
    const [centersList, setcentersList] = useState()
    const [showCenters, setshowCenters] = useState(false)
    const [slotCenterName, setslotCenterName] = useState('')
    const [cityName,setCityName]=useState('')
   

    const { openPopUp, setopenPopUp, PopUpMessage, setPopUpMessage } = useContext(MainContext)

    const [workingHours, setWorkingHours] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/getVaccinationCenters").then((res) => {
            setcenterData(res.data)
            setShowData(true)
            const addresses = new Set();
            res.data.data.forEach((e) => {
                addresses.add(e.address);
            });
            const distinctAddresses = Array.from(addresses);
            setCitiesList(distinctAddresses);
        })

    }, [centerData])



    const handleAddWorkingHour = (date) => {
        setSelectedDate(date);
        const formatted = date ? date.toLocaleDateString('en-IN') : '';

        setFormattedDate(formatted);

       
    };

    const handlePostWorkingHours = async () => {
        const newWorkingHour = {
            Date: formattedDate,
            NumberOfPeople: 0,
            Slots: [],
        };

        setWorkingHours((prevWorkingHours) => [...prevWorkingHours, newWorkingHour]);
        openPopUpMessage("Date added successfully")
       
    };

    const addCenter = () => {
        try {
            axios.post('http://localhost:3001/addVaccinationCenters', {slotCenterName,cityName, workingHours }).then((res)=>{
 
              if(res.data.message="Vaccination centre added successfully"){
                openPopUpMessage("Vaccination centre added successfully")
              }
            })
         } catch (error) {
             console.error(error);
         }


    };

    const RemoveCenter = () => {
        console.log(slotCenterName);
        axios.delete('http://localhost:3001/removeVaccinationCentre', {
            data: { slotCenterName, cityName }
          }).then((res) => {
            openPopUpMessage(res.data.message);
          });
     
    };



    const openPopUpMessage = (message) => {

        setPopUpMessage(message)
        setopenPopUp(true)

    };

    const handleLogout = () => {
        openPopUpMessage("Are you sure you want to logout ?")
    };


    return (
        <div className="WholePage">
            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                <h1 className="SiteHeading">Admin Handle</h1>
                <button onClick={handleLogout} className="LogoutButton">
                    Logout
                </button>
            </div>

            <div className="boxContainer">
                <h2 className="sectionHeading">Add Vaccination Center</h2>
                <div className="form-group">
                    <label className="label">Add address</label>
                    <input type='text' className='DatePicker' onChange={(e)=>setCityName(e.target.value)}></input>
                    <label className="label">Add Center Name</label>
                    <input type='text' className='DatePicker'  onChange={(e)=>setslotCenterName(e.target.value)}></input>
                    <label className="label">Add Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleAddWorkingHour}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="01/01/2023"
                        className='DatePicker'
            />
                

                </div>

                <div>
                  
                    <button onClick={handlePostWorkingHours} >Post Working Hours</button>
                </div>


                <button onClick={addCenter} className="button">
                    Add center
                </button>

            </div>
            <div className="boxContainer">
                <h2 className="sectionHeading">Remove Vaccination Center</h2>
                <div className="form-group">
                    <label className="label" >Add address</label>
                    <input type='text' className='DatePicker' onChange={(e)=>setCityName(e.target.value)}></input>
                    <label className="label" >Add Center Name</label>
                    <input type='text' className='DatePicker' onChange={(e)=>setslotCenterName(e.target.value)}></input>
                </div>


                <button onClick={RemoveCenter} style={{ backgroundColor: "red" }} className="button">
                    Remove center
                </button>

            </div>


            <div className="boxContainer">
                <h2 className="sectionHeading">Dosage Details in Vaccination Centers</h2>

                    <div className='CentersList'>


                        {

                            showData && centerData.data.map((e, id) => {
                                return (
                                    <div key={id} style={{ border: "1px solid white", borderBottomColor: "#888" }} >
                                        <p><span className='cityName'>{e.address}</span> ---  <span className='centerName'> {e.centerName}</span></p>
                                        {
                                            e.workingHours.map((e1, id1) => {
                                                return (
                                                    <div key={id1}>
                                                        <p className='Date'>{e1.Date} <span className='Time'>: {e1.NumberOfPeople} dosages</span></p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
            <div>

                {
                    openPopUp ? <PopUp /> : null
                }
            </div>

        </div>
    );
};

export default AdminHomePage;

