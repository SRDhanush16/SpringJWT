import React, { useState } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Headercomp from './Headercomp';

import Web3 from 'web3'; // for web 3

export default function Metamasklogin() {

    const { username } = useParams(); // Get the username from the URL
    const navigate = useNavigate(); // Get the navigate function
    const[displayurlmsg,setDisplayurlmsg]=useState('');

    const [bctbool,setBctbool] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [ethBalance, setEthBalance] = useState("");


    const detectCurrentProvider = () => {
        let provider;
        if (window.ethereum) {
          provider = window.ethereum;
        } else if (window.web3) {
          provider = window.web3.currentProvider; // to find metamask browser
        } else {
          console.log("Non-ethereum browser detected. You should install Metamask");
        }
        return provider;
      };

      const onConnect = async() => {
        try {
          // check pass n username , if vrrified then check below statement 
          const currentProvider = detectCurrentProvider();
          if(currentProvider) {
            await currentProvider.request({method: 'eth_requestAccounts'});
            const web3 = new Web3(currentProvider);
            const userAccount  =await web3.eth.getAccounts();
            const account = userAccount[0];
            let ethBalance = await web3.eth.getBalance(account);
            console.log("My eth balance in metamask is : "+ethBalance);
            setEthBalance(ethBalance);
            
            setIsConnected(true);
          }
        } catch(err) {
          console.log(err);
        }
      }
      const onDisconnect = () => {
        setIsConnected(false);
      }

      // for bct 
    const handlebctlogin= async (e) => {
        e.preventDefault();
        const jwtToken = localStorage.getItem('jwtToken'); // Retrieve token from localStorage
        try {
            const response = await axios.get('http://localhost:8080/bctlogin', {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                }
            });
            if(response.data){
                setDisplayurlmsg(username+" "+response.data);
                setBctbool(true);
            }
            console.log('Response from /bctlogin:', response.data);
        } catch (error) {
            console.log('Error accessing bctlogin url:', error);
        }
    };


  return (
    <>
        <Headercomp/>
        
        <section className='container'>
            <Link to={`/urls/${username}`} >Back</Link>
            <h2>{displayurlmsg}</h2>
            {!bctbool ? (
                <button onClick={handlebctlogin}>Your Account</button>
            ) : (
                <div className="app">
      <div className="app-header">
        <h1>React dApp authentication with React, Web3.js and Metamask</h1>
      </div>
      <div className="app-wrapper">
        {!isConnected && (
          <div>
            <button className="app-button__login" onClick={onConnect}>
            Login
            </button>
          </div>
        )}
      </div>
      {isConnected && (
        <div className="app-wrapper">
          <div className="app-details">
            <h2 className="connected"> You are connected to metamask.</h2>
            <div className="app-balance">
              <span>Balance: 0.0 </span>
              {ethBalance}
            </div>
          </div>
          <div>
            <button className="app-buttons__logout" onClick={onDisconnect}>
            Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
            )}
        </section>   
    </>

  )
}
