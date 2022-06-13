import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    bodyContainer: {
        display: 'flex',
        height: '80%',
        width: '100%',
        flexDirection: 'row',
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
        fontSize: "100pt",
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
        width: '48%',
        justifyContent: 'center',
    },
    spacingBlock: {
        display: 'flex',
        width: '50%',
        justifyContent: 'right',
        alignItems: 'end',
    },
    explanationBlock: {
        backgroundColor: 'moccasin',
        display: 'flex',
        flexDirection: 'column',
        height: '70%',
        width:'40%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '20%',
    },
    title: {
        textDecoration: 'underline',
        paddingTop: '15px',
        fontSize: '23pt',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    details: {
        display: 'flex',
        fontSize: '18pt',
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingBottom: '15px',
        justifyContent: 'center',
        alignItems: 'center',
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
            <div style={styles.spacingBlock}>
                <div style={styles.explanationBlock}>
                    <h2 style={styles.title}>How To Play:</h2>
                    <p style={styles.details}>
                        The primary game controls are 'W' to jump, 'A' to move Left, 'and 'D' to move right. You can shoot projectiles left with 'I' or right with 'P'.
                    </p>
                </div>
            </div>
        </div>
    );
}
