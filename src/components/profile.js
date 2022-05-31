import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
    },
    h1: {
        marginTop: "5%",
        fontSize: "80px",
        fontFamily: "herculanum",
        textShadow: "3px 3px 3px skyblue"
    },
    navBar: {
        display: "flex",
        flexDirection: "column",
        width: "10rem",
        height: "50rem",
        marginLeft: "15vw",
    },
    buttons: {
        borderRadius: ".1rem",
        fontFamily: "herculanum",
        fontWeight: "bold",
        boxShadow: "2px 2px 2px black",
        fontSize: "1rem"
        //add
    }

};

export default function Profile() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" >
            <div>
                <img style={styles.image} src="https://wallpapercave.com/wp/weaogjF.jpg" alt="Ang and epic background" />
                <h1 style={styles.h1}>Appa's Landing</h1>
                <nav style={styles.navBar}>
                    <Link to="/login"><button style={styles.buttons}>Login</button></Link>
                    <br></br>
                    {/* <p>Don't have an account?</p> */}
                    <Link to="/login"><button style={styles.buttons}>Signup</button></Link>
                </nav>
            </div>
            <div>
            </div>
        </div>
    );
}
