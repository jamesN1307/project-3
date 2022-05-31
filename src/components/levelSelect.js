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

    pageHeader: {

    },

    buttonContainer: {

    },
};

export default function Levels() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" >
            <img style={styles.image} src="https://i.pinimg.com/originals/87/37/4c/87374c7fcdb4a9308621a23a4f9c9a69.png" alt="4 Nations Map" />
            <div>
                <h1></h1>
                <button></button>
                <button></button>
                <button></button>
            </div>
        </div>
    );
}
