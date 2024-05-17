import React, { useState } from 'react';
import { useNavigate,Link  } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Headercomp from './Headercomp';

export default function Loginpage() {

    const navigate = useNavigate(); // Get the navigate function

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userotp1, setUserotp1] = useState(''); // from server
    const [userotp2, setUserotp2] = useState(''); // from user 
    const [otpflag, setOtpflag] = useState(false);

    const [loginmsg, setLoginmsg] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    
    const handleUserotp2Change = (e) => {
        setUserotp2(e.target.value);
    };

    // for generating OTP , takes only username and password
    const handleSubmitLoginstep1 = async (e) => {
        e.preventDefault();
        console.log("username,password : "+ username + " , "+ password);
        try {
            const response = await axios.post('http://localhost:8080/verifyuser', {
                username: username,
                password:password
            });
            if (response.data) {
                if(response.data !== "-1"){
                    setUserotp1(response.data);
                    setOtpflag(true);
                }else{
                    setLoginmsg("User doesnt Exist or EmailServer is down");
                }   
            }
        } catch (error) {
            console.log('Error logging in', error);
        }
    };

    // for logging in
    const handleSubmitLoginsteptwo = async (e) => {
        e.preventDefault();
        if (userotp1 === userotp2) {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    username: username,
                    password: password,
                    otp: userotp2
                });
                const { token } = response.data;
                localStorage.setItem('jwtToken', token); // Store token in localStorage
                console.log('JWT Token:', token);
                setLoginmsg(`${username} Logged in Successfully`);

                // Navigate to a new URL , wait for 3sec
                setTimeout(() => {
                    navigate(`/urls/${username}`);
                }, 3000);
            } catch (error) {
                console.log('Error in backend during authentication ', error);
            }
        } else {
            console.log("FAILED");
        }
    };

    return (
        <>
            <Headercomp/>
            <section className='container' >
            <Link to="/">Home</Link>
            <div className='login-form'>

                <h2>Login Page </h2>
                <p>Enter Credentials , you will get OTP  </p>

                {!otpflag ?(
                    <>
                        <form onSubmit={handleSubmitLoginstep1}>
                            <label>
                                <span>USERNAME: </span>
                                <input type="text" value={username} onChange={handleUsernameChange} />
                            </label>
                            <label>
                                <span>PASSWORD: </span>
                                <input type="text" value={password} onChange={handlePasswordChange} />
                            </label>
                            <button type="submit">Login</button>
                        </form>
                        <div className='createacc-link' ><Link to="/createaccount">Create Account</Link></div>
                    </>
                ):(
                    <form onSubmit={handleSubmitLoginsteptwo}>
                        <label>
                            <span>OTP: </span>
                            <input type="text" value={userotp2} onChange={handleUserotp2Change} />
                        </label>
                        <button type="submit">Login</button>
                    </form>

                )}    

                <h2>{loginmsg}</h2>

            </div>
            </section>

        </>
    )
}
