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

};

export default function Profile() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" >
            <img style={styles.image} src="https://wallpapercave.com/wp/weaogjF.jpg" alt="Ang and epic background" />
            <div>

            </div>
        </div>
    );
}
