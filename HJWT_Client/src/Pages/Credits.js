import React from 'react'
import { Link } from 'react-router-dom';
import Headercomp from './Headercomp';

export default function Credits() {
  return (
    <>
        <Headercomp/>
        <section className='container' >
            <Link to="/">Home</Link>
            <div className='team' >
                <h2>Team : </h2>
                <ul>
                    <li>Pratheep V-------------21BCE1093</li>
                    <li>Dhanush S R-----------21BCE1204</li>
                    <li>Prashanth Kumar V----21BCE1953 </li>
                </ul>
            </div>
        </section>
    
    </>
  )
}
