import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Headercomp from './Headercomp';




export default function Urlsforshowing() {

    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // Get the navigate function

    const[displayurlmsg,setDisplayurlmsg]=useState('');

    
    const handleAccessDemo = async (e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
        try {
            const response = await axios.get('http://localhost:8080/demo', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            if(response.data){
                setDisplayurlmsg(username +" "+response.data);
            }
            console.log('Response from /demo:', response.data);
        } catch (error) {
            console.log('Error accessing demo url:', error);
        }
    };

    const handleAccessAdminonly= async (e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
        try {
            const response = await axios.get('http://localhost:8080/adminonly', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            if(response.data){
                setDisplayurlmsg(username +" "+response.data);
            }
            console.log('Response from /Adminonly:', response.data);
        } catch (error) {
            console.log('Error accessing Adminonly url:', error);
        }
    };

    const handleNavMetamasklogin =(e)=>{
        navigate(`/mymetamask/${username}`);
    }

    const handleLogout = async(e)=>{
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
        try{
            const response = await axios.get('http://localhost:8080/logout', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            
            setDisplayurlmsg('Logged Out');
            console.log('Logout Successful', response.data);
            setTimeout(() => {
                navigate('/');
            }, 3000); // Wait for 3 seconds before navigating to /loginpage
        }catch(error){
            console.log('Error in log out', error);
        }
    }

  return (
    <>
        <Headercomp/>
        <section className='container' >
            <h2>{username}</h2>
            <div className='user-options' >
                <button onClick={handleAccessDemo}>Access Demo</button>
                <button onClick={handleAccessAdminonly}>Admin only</button>
                <button onClick={handleNavMetamasklogin}>My Metamask</button>
                <button onClick={handleLogout}>Logout</button>
            </div> 
            <h2>{displayurlmsg}</h2>

          
            
        </section>
    </>
  )
}
