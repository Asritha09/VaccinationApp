import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/HomePage.css';
import axios from 'axios'
import { MainContext } from '../ContextStore/MainContext'
import PopUp from './PopUp';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
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
    const [slotCenterName,setslotCenterName]=useState('')
  
    const { openPopUp, setopenPopUp, PopUpMessage, setPopUpMessage,id,email } = useContext(MainContext)

    const navigate=useNavigate()


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

  
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formatted = date ? date.toLocaleDateString('en-IN') : '';

        setFormattedDate(formatted);
        setisSlotAvailable(false)


    };

    const handleSearch = () => {
        let isSlotAvailable1 = false;
      
        centerData.data.forEach((e) => {
          if (e.address === selectedLocation && e.centerName === slotCenterName) {
            e.workingHours.forEach((e1) => {
              if (e1.Date === formattedDate && e1.NumberOfPeople < 10) {
                isSlotAvailable1 = true;
                setCenterDetails(e.centerName);
                return; 
              }
            });
            return; 
          }
        });
      
        if (isSlotAvailable1) {
          setisSlotAvailable(true);
        } else {
          openPopUpMessage("Slot unavailable");
        }
      };

    const handleApply = () => {
        console.log(id,email,formattedDate)
        axios.post('http://localhost:3001/vaccinationSlots', { slotCenterName, email, formattedDate }).then((res) => {
            console.log(res.data.message);
            if (res.data.message === "Vaccination slot booked successfully") {
                setisSlotBooked(true)
                openPopUpMessage("Vaccination slot booked successfully")
            }
        })
    };

    const openPopUpMessage = (message) => {
        setPopUpMessage(message)
        setopenPopUp(true)
    };

    const handleLogout = () => {
        openPopUpMessage("Are you sure you want to Logout ?")
    };


    return (
        <div className="WholePage">
            <div style={{ display: 'flex', justifyContent: "space-between" }}>

                <h1 className="SiteHeading">Vaccination Slot Booking Site</h1>
                <button onClick={handleLogout} className="LogoutButton">
                    Logout
                </button>
            </div>

            <div className="boxContainer">
                <h2 className="sectionTitle">Search Vaccination Centers</h2>
                <div>
                    <label className="label">Pick Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="01/01/2023"
                        className='DatePicker'
                    />
                </div>

                <div>
                    <label className="label">Pick Location</label>
                    <select
                        value={selectedLocation}
                        onChange={(e) => {
                            setSelectedLocation(e.target.value);
                            const updatedCentersList = centerData.data
                                .filter((center) => center.address === e.target.value)
                                .map((center) => center.centerName);
                            setcentersList(updatedCentersList)
                            setshowCenters(true)
                        }}
                        className="custom-select"
                    >
                        <option value="">Select a location</option>
                        {

                            showData && citiesList.map((e) => {
                                return (
                                    <option value={e} key={e}>{e}</option>
                                )
                            })
                        }

                    </select>
                </div>

                {
                     showCenters && 
                     <div >
                         <label className="label">Pick Center</label>
                         <select
                             value={slotCenterName}
                             onChange={(e) => {
                                setslotCenterName(e.target.value);
                             }}
                             className="custom-select"
                         >
                             <option value="">Select a center</option>
                             {
     
                            showCenters && centersList.map((e) => {
                                     return (
                                         <option value={e} key={e}>{e}</option>
                                     )
                                 })
                             }
     
                         </select>
                     </div>   

                }


                <button onClick={handleSearch} className="button">
                    Search
                </button>
            </div>
            {
                !isSlotBooked && isSlotAvailable && <div className="box">
                    <h2 > Vaccination Slot Available</h2>
                    <button onClick={handleApply} className="button">
                        Book Slot Now
                    </button>
                </div>
            }

            {
                isSlotBooked && <div className="boxContainer">
                    <h2> Vaccination Slot Booked successfully</h2>
                    <h6></h6>
                </div>
            }





            <div className="boxContainer">
                <h2 className="sectionTitle">List of Vaccination Centers</h2>

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
                                                        <p className='Date'>{e1.Date} <span className='Time'>: 10AM to 6PM</span></p>
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

export default HomePage;
