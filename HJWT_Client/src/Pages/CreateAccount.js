import React, { useState } from 'react';
import axios from 'axios';
import Headercomp from './Headercomp';
import { Link } from 'react-router-dom';

export default function CreateAccount() {

    const [otpflag, setOtpflag] = useState('');
    const [otpcame, setOtpcame] = useState('');
    const [emailId, setEmailID] = useState('');
    const [otpbyuser, setOtpbyuser] = useState('');
    const [otpfromserver, setOtpfromserver] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleRepasswordChange = (e) => {
        setRepassword(e.target.value);
    };

    const handleEmailIdChange = (e) => {
        setEmailID(e.target.value);
    };

    const handleOtpbyuserChange = (e) => {
        setOtpbyuser(e.target.value);
    };

    const handleSubmitGetOTP = async (e) => {
        e.preventDefault();
        console.log('emailId: ', emailId);
        try {
            // verifyuser endpoints gets the otp from the server
            const response = await axios.post('http://localhost:8080/verifyuser', {
                emailId: emailId
            });
            if (response.data) {
                setOtpcame(true);
                setOtpfromserver(response.data);
            }
        } catch (error) {
            console.log('Error in sending OTP ', error);
        }
    };

    const handleSubmitCheckOTP = (e) => {
        e.preventDefault();
        if (otpbyuser === otpfromserver) {
            console.log("Correct OTP");
            setOtpflag(true);
        } else {
            console.log("Invalid OTP ");
        }
    }

    const handleSubmitCreateAccount = async (e) => {
        e.preventDefault();
        console.log("USERNAME : ", username);
        if (password === repassword) {
            try {
                const response = await axios.post('http://localhost:8080/register', {
                    username: username,
                    password: password,
                    email: emailId,
                    role: "USER",
                    otp: ""
                });
                if (response.data === 1) {
                    console.log("User register successfully , time to login");
                }
                else if (response.data === -1) {
                    console.log("User already exist");
                } else {
                    console.log("some error");
                }

            } catch (error) {
                console.log('Error in Registering the user  ', error);
            }
        } else {
            console.log("Password Not Matching");
        }

    }


    return (
        <>
            <Headercomp />

            <section className='container' >
                <Link to="/">Home</Link>
                <div className='createacc-link' ><Link to="/loginpage">Login</Link></div>
                <div className='login-form' >
                    <h2>Create Account : </h2>
                    <p>First enter the emailID and submit and use that to create account </p>
                    
                    {
                        !otpflag ?

                            (
                                !otpcame ? (
                                    (<form onSubmit={handleSubmitGetOTP} >
                                        <label>
                                            <span>Email ID: </span>
                                            <input type="text" value={emailId} onChange={handleEmailIdChange} />
                                        </label>
                                        <button type="submit">Send OTP</button>
                                    </form>)
                                    
                                )

                                    :

                                    (<form onSubmit={handleSubmitCheckOTP} >
                                        <label>
                                            <span>Enter OTP :  </span>
                                            <input type="text" value={otpbyuser} onChange={handleOtpbyuserChange} />
                                        </label>
                                        <button type="submit">Send OTP</button>
                                    </form>)

                            )

                            :

                            (<form onSubmit={handleSubmitCreateAccount}>

                                <label>
                                    <span>Username :</span>
                                    <input type="text" value={username} onChange={handleUsernameChange} />
                                </label>

                                <label>
                                    <span>Password : </span>
                                    <input type="password" value={password} onChange={handlePasswordChange} />
                                </label>

                                <label>
                                    <span>Enter Password Again : </span>
                                    <input type="password" value={repassword} onChange={handleRepasswordChange} />
                                </label>

                                <button type="submit">Create Account</button>
                            </form>)
                    }
                </div>

            </section>


        </>
    )
}
