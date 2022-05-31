import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    //master div
    pageContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
    },

    //style each 'column' of page
    pageColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        height: '100%',
    },

    pageColumnRight: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        height: '100%',
    },
};

export default function Profile() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" >
            <section style={styles.pageColumnLeft}></section>
            <section style={styles.pageColumnRight}></section>
        </div>
    );
}
