import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    bodyContainer: {
        display: 'flex',
        height: '80%',
        width: '100%',
    },
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
        fontSize: "120pt",
        fontFamily: "herculanum",
        textShadow: "3px 3px 3px skyblue",
        display: 'flex',
        height: '55%',
        width: '100%',
        justifyContent: 'right',
        alignItems: 'end',
        textAlign: 'right',
    },
    placingDiv: {
        display: 'flex',
        height: '100%',
        width: '52%',
        justifyContent: 'center',
    }

};

export default function Welcome() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" style={styles.bodyContainer}>
            <div style={styles.placingDiv}>
                <img style={styles.image} src="https://wallpapercave.com/wp/weaogjF.jpg" alt="Ang and epic background" />
                <h1 style={styles.h1}>Appa's Landing</h1>
            </div>
        </div>
    );
}
