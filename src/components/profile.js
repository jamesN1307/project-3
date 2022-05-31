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

    //style left 'column' of page
    pageColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        height: '100%',
    },

    //style right 'column' of page
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
            {/*Left 'column' */}
            <section style={styles.pageColumnLeft}>
                <h1></h1>
                {/* username and scores */}
                <article></article>

                {/* section with buttons to leaderboard and 'play game' buttons*/}
                <section>
                    <button></button>
                    <div>
                        <button></button>
                        <button></button>
                    </div>
                </section>
            </section>

            {/*Right 'column' */}
            <section style={styles.pageColumnRight}>
                <h1></h1>
                {/*Chat container*/}
                <div></div>
            </section>
        </div>
    );
}
