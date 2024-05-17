import React from 'react';
import { Link } from 'react-router-dom';
import Headercomp from './Headercomp';


export default function Homepage() {
  return (
    <>
    
        <Headercomp/>
        <section className='container' >
            <Link to="/credits">Credits</Link>
            <main className='Homepage-nav' >
                <Link to="/loginpage">Login Page</Link>
                <Link to="/createaccount">Create Account</Link>
            </main>
        </section>
        
    </>
  )
}
