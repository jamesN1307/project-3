import React from 'react';
import Navbar from './page_elements/navbar';
import { Link } from "react-router-dom";

const styles = {
    //background image
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
        filter: 'contrast(50%)',
    },

    //master div styling
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },

    pageHeader: {
        backgroundColor: 'skyblue',
        fontSize: '45pt',
        textAlign: 'center',
        padding: '0 15px 0',
        borderRadius: '8px',
    },

    buttonContainer: {
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    levelButton: {
        backgroundColor: 'moccasin',
        fontSize: '35pt',
        borderRadius: '8px',
        margin: '15px auto',
        width: '20%',
    }
};

export default function Levels() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" style={styles.mainContainer}>
            {/*<Navbar />*/}
            <img style={styles.image} src="https://i.pinimg.com/originals/87/37/4c/87374c7fcdb4a9308621a23a4f9c9a69.png" alt="4 Nations Map" />
            <div style={styles.buttonContainer}>
                <h1 style={styles.pageHeader}>Level Selection</h1>
                <Link to="/matter"><button style={styles.levelButton}>Level One</button></Link>
                <button style={styles.levelButton}>Level One</button>
                <button style={styles.levelButton}>Level Two</button>
                <button style={styles.levelButton}>Level Three</button>
            </div>
        </div>
    );
}
