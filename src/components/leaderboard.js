import React from 'react';
import { Link } from "react-router-dom";

export default function Leaderboard() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" >
            <div>
                <img src="https://wallpapercave.com/wp/weaogjF.jpg" alt="Ang and epic background" />
                <h1 >Appa's Landing</h1>
                <nav >
                    <Link to="/login"><button >Login</button></Link>
                    <br></br>
                    {/* <p>Don't have an account?</p> */}
                    <Link to="/login"><button >Signup</button></Link>
                </nav>
            </div>
            <div>
            </div>
        </div>
    );
}
