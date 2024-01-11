import React, { useEffect, useState } from 'react'
import './main.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import IconButton from '@mui/material/IconButton';
import { json, useNavigate } from 'react-router-dom'
import {inputErrors} from '../constants/constants.enum'
import WalletIcon from '@mui/icons-material/Wallet';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Snackbar from '@mui/material/Snackbar';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';


const Main = () => {

    const [snackOpen, setOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState('message sent');

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = (message) => {
        setSnackMessage(message);
        setOpen(true);
    }

    
    const [errorEmail, setEmailError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailHelperText, setEmailHelperText] = useState('');

    const [first_name, setFirstName] = useState('');
    const [firstNameHelperText, setFirstNameHelperText] = useState('');
    const [errorFirstName, setFirstNameError] = useState(false);



    const [last_name, setLastName] = useState('');
    const [lastNameHelperText, setLastNameHelperText] = useState('');
    const [errorLastName, setLastNameError] = useState(false);


    const [message, setMessage] = useState('');
    const [messageHelperText, setMessageHelperText] = useState('');
    const [errorMessage, setMessageError] = useState(false);

    const [formValid, setFormValid] = useState(false);
    const [firstRender, setFirstRender] = useState(true);

    const [showUpBtn, setShowUpBtn] = useState(false);

    const SnackBar = (message) => {
        return <React.Fragment>
            <Snackbar 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={snackMessage}
            />
        </React.Fragment>
    }

    const backToTopBtn = styled(IconButton)({
        '&:hover' : {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
        background: 'var(--primary-color)', color: 'white', position: 'fixed', top: '80vh', left: '90vw'
    })
    
    useEffect(() => {
        console.log('called')
        if(errorEmail || errorFirstName || errorLastName || errorMessage || first_name=='' || email=='' || last_name=='' || message==''){
          console.log('error')
          setFormValid(false);
          return
        }
    
        if(firstRender == false) {

            setFormValid(true);
        }

        
    
    }, [email, first_name, last_name, message])

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 1500) {
                setShowUpBtn(true);
            }
            else {
                setShowUpBtn(false)
            }
        })
    }, [])


    const setError = (handle ,errorMessage, error) => {
        if(handle=='email'){
          
          setEmailError(error);
          setEmailHelperText(errorMessage)
          return
        }

        if(handle == 'lastName') {
          setLastNameError(error)
          setLastNameHelperText(errorMessage)
    
        }
        if(handle == 'firstName') {
          setFirstNameError(error)
          setFirstNameHelperText(errorMessage)
    
        }
        if(handle == 'message') {
          setMessageError(error)
          setMessageHelperText(errorMessage)
    
        }
    
    }
    
      //used to check for input values when user leaves the input(onblur)
    const focusCheck = (e, target) => {
        
        if(target=='email') {
          {email.length<1 && setError('email',inputErrors.emailRequired, true)}
        }
    
        if(target=='firstName') {
          {first_name.length<1 && setError('firstName',inputErrors.firstNameRequired, true)}
        }
        if(target=='lastName') {
          {last_name.length<1 && setError('lastName',inputErrors.lastNamerequired, true)}
        }

        if(target=='message') {
          {message.length<1 && setError('message',inputErrors.messageRequired, true)}
        }
      
    }
    
      //control and validate my email input for correct values
    const emailControl = (value) => {
        
        setFirstRender(false)
        setEmail(value)
        //using regex to test for correct email
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
        //email syntax test
        {re.test(value) ? setError('email' ,'', false) : setError('email',inputErrors.invalidemail , true)}
    
    }

    const firstNameControl = (value) => {
        setFirstRender(false)
    
        setFirstName(value)
        console.log(value, first_name)
        
    
        {value.length<1 ? setError('firstName',inputErrors.firstNameRequired, true) : setError('firstName','', false)}
    }

    const LastNameControl = (value) => {
        setFirstRender(false)
    
        setLastName(value)
        console.log(value, last_name)
        
    
        {value.length<1 ? setError('lastName',inputErrors.lastNamerequired, true) : setError('lastName','', false)}
    }

    const messageControl = (value) => {
        setFirstRender(false)
    
        setMessage(value)
        console.log(value, message)
        
    
        {value.length<1 ? setError('message',inputErrors.messageRequired, true) : setError('message','', false)}
    }

    const handleSubmit = async (e) => {
        //firebase pending
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:8585/send-email', {
                method: 'POST',
                // mode: 'no-cors',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({email: email, first_name: first_name, last_name: last_name, message: message})
                // body: 'hello'
            }).then((data)=>{return data.json()})
            .then((res)=> {console.log(res.message); {res.state ? handleOpen('email sent') : handleOpen('failed to send email')}})
          
            // console.log(data, 'j=hello')
            // console.log( 'j=hello')
            //handle response from server
        }

        catch(err) {
            console.log(err);
        }
    
    }

    const goToTop = () => {
        
    }

  return (
    <React.Fragment>
        <SnackBar />
        {showUpBtn && <IconButton onClick={() => window.scroll({top: 0, behavior: 'smooth'})} size='large' sx={{background: 'var(--primary-color)', color: 'white', position: 'fixed', top: '80vh', left: '90vw', '&:hover': {boxShadow: '0 0 0 0.2rem rgba(0,0,0,.1)', background: 'var(--primary-color)', opacity: '0.8'}}}>
            <KeyboardArrowUpIcon />
        </IconButton>}
        
        <section className="offers" id='services'>
            <div className="container">
                <h1>The Way Banking Should Be</h1>
                <div className="list-services">
                    <div className='list-item'>
                        <WalletIcon sx={{fontSize: '90px'}}/>
                        <span>Personal Checking</span>
                    </div>
                    <div className='list-item'>
                        <CleanHandsIcon sx={{fontSize: '90px'}}/>
                        
                        <span>Personal Loans</span>
                    </div>
                    <div className='list-item'>
                        <DirectionsCarIcon sx={{fontSize: '90px'}}/>
                        <span>Auto Loans</span>
                    </div>
                    <div className='list-item'>
                        <HomeIcon sx={{fontSize: '90px'}}/>
                        <span>Home Loans</span>
                    </div>
                    <div className='list-item'>
                        <ManageAccountsIcon sx={{fontSize: '90px'}}/>
                        <span>Project Management</span>
                    </div>
                </div>
                <div className="call-to-action">
                    <h2>We can help fit every need</h2>
                    <Button className='section-2-cta' sx={{ backgroundColor: 'white'}} variant='outlined'><a href="#contact" style={{textDecoration: 'none', color: 'var(--primary-color)'}}>CONTACT US</a></Button>
                </div>
            </div>
        </section>

        <section className="speciality-list" id='about'>
            <div className="container">
                <div className="img">
                    <img src="mathieu-stern-1zO4O3Z0UJA-unsplash.jpg" alt="" />
                    <div className="interest">
                        <span>Keeping Your Best <br /> Interest at Heart</span>
                    </div>
                </div>
                <div className="differences">
                    <h2>Banteccul, SPICE for your success.</h2>
                    <div className="element">
                        <div className="img">
                            <img src="diversity.png" alt="" />
                        </div>
                        <span>
                            <h3>Diversity</h3>
                            <p>At Banteccul we Stand for diversity in membership</p>
                        </span>
                    </div>
                    <div className="element">
                        <div className="img">
                            <img src="protection.png" alt="" />
                        </div>
                        <span>
                            <h3>Provision</h3>
                            <p>Provide an enabling environment for financial emancipation/inclusion.</p>
                        </span>
                    </div>
                    <div className="element">
                        <div className="img">
                            <img src="incubation.png" alt="" />
                        </div>
                        <span>
                            <h3>Incubation</h3>
                            <p>Incubate and safely hatch members' projects.</p>
                        </span>
                    </div>
                    
                    <div className="element">
                        <div className="img">
                            <img src="promotion.png" alt="" />
                        </div>
                        <span>
                            <h3>Business Promotion</h3>
                            <p>Cover our backs by promoting and patronizing each other's business(es)</p>
                        </span>
                    </div>
                    <div className="element">
                        <div className="img">
                            <img src="seminar.png" alt="" />
                        </div>
                        <span>
                            <h3>Seminars</h3>  
                            <p>Elevate members' skills through needs-based seminars.</p>
                        </span>
                    </div>
                    <div className="element">
                        <div className="img">
                            <img src="growth.png" alt="" />
                        </div>
                        <span>
                            <h3>Growth and Sustainability</h3>
                            <p>Grow and Sustain your Wealth with Banteccul</p>
                        </span>
                    </div>
                    <Button className='differences-cta' sx={{marginTop: '2rem', width: '40%'}} variant='contained'><a href="#contact" style={{textDecoration: 'none', color: 'white'}}>CONTACT US</a></Button>
                </div>
            </div>
        </section>

        {/* <section className="missions" id='mission'>
            <div className="container">
                <h1>Missions & Goals</h1>
                <div className="misson_content_container">
                   <div className="mission_png">
                       <img src="Saving money-bro.png" alt="" />
                   </div>
                   <div className="mission_content">
                       <span className="mission_context">
                           
                                Banteccul, SPICE for y/our success.

                                At Banteccul we 
                                "S"tand for diversity in membership
                                
                                "P"rovide an enabling environment for financial emancipation/inclusion.

                                "I'ncubate and safely hatch members' projects.

                                "C"over our backs by promoting and patronizing each other's business(es).

                                "E"levate members' skills through needs-based seminars.

                                "Grow and Sustain your Wealth with Banteccul"

                                Thanks for your precious time. 
                                Make it worthwhile. 
                                See you here after you're done thinking.

                       </span>
                   </div>

                </div>
            </div>
        </section> */}

        <section className="contact_us" id='contact'>
            <div className="contact_container">
                <h1>Contact Us</h1>
                <div className="contact_main">
                    <div className="contact_img">
                        <div className="img">
                            <img src="Email campaign-amico.png" alt="" />
                        </div>
                        <div className="contact_text">
                            <span>Need to get in touch with us? fill out the form with your inquiry</span>
                        </div>
                        
                    </div>
                    <div className="contact_form">
                        <form className="form" onSubmit={(e) => handleSubmit(e)}>
                            <div className="user_name">
                                <TextField 
                                InputProps={{
                                    endAdornment: (<InputAdornment position='end'><AccountCircle /></InputAdornment>),
                                }}
                                onChange={(e) => firstNameControl(e.target.value)} 
                                // onChange={(e) => setFirstName(e.target.value)} 
                                // onFocus={(e) => focusCheck(e)}
                                onBlur={(e) => focusCheck(e, 'firstName')}
                                helperText={firstNameHelperText} 
                                error={errorFirstName} 
                                required 
                                id="outlined-basic" 
                                label="First name" 
                                variant="filled" 
                                style={{width: '70%'}}
                                value={first_name}
                                />
                                <TextField 
                                InputProps={{
                                    endAdornment: (<InputAdornment position='end'><AccountCircle /></InputAdornment>),
                                }}
                                onChange={(e) => LastNameControl(e.target.value)} 
                                // onChange={(e) => setLastName(e.target.value)} 
                                
                                onBlur={(e) => focusCheck(e, 'lastName')}
                                helperText={lastNameHelperText} 
                                error={errorLastName} 
                                required 
                                id="outlined-basic" 
                                label="Last name" 
                                variant="filled" 
                                style={{width: '70%'}}
                                value={last_name}
                                />

                            </div>

                            <div className="email">

                                <TextField 
                                InputProps={{
                                    endAdornment: (<InputAdornment position='end'><KeyIcon/></InputAdornment>)
                                }}
                                onBlur={(e) => focusCheck(e, 'email')}
                                onChange={(e) => emailControl(e.target.value)} 
                                helperText={emailHelperText} 
                                error={errorEmail} 
                                required 
                                id="outlined-basic" 
                                label="Email" 
                                variant="filled" 
                                fullWidth
                                value={email}
                                />
                                <TextField  
                                    helperText={messageHelperText} 
                                    error={errorMessage} 
                                    onBlur={(e) => focusCheck(e, 'message')}
                                    required
                                    variant='filled'
                                    label='Message'
                                    multiline
                                    rows={5}
                                    value={message}
                                    onChange={(e) => {messageControl(e.target.value)}}
                                />
                            </div>
                            <Button disabled={formValid ? false : true} className='submit-btn' type='submit' variant='contained' color='error'>Submit</Button>


                    
                        </form>
                    </div>
                    
                </div>
            </div>
        </section>

        <footer className="footer">
                <div className="img">
                    <img src="8-removebg-preview.png" alt="" />
                </div>
                <div className="footer_container">
                    <div className="footer_text">

                    <div className="footer_mail">       
                        <h3>Contacts</h3>
        
                        <span style={{color: 'var(--primary-color )'}}><a href='http://mailto:Bantenccul@gmail.com'>Bantengccul@gmail.com</a></span>
                        
                    </div>
                    <div className="footer_end">
                        <span>Copyright&copy; 2023 BANTECCUL. All rights reserved</span>
                    </div>
                    </div>
                </div>
        </footer>
    </React.Fragment>
  )
}

export default Main
