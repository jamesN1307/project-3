import React from 'react';
import { Link } from "react-router-dom";
import background from "../images/leaderboard_background.png";

const styles = {
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
    },

    //page header
    header: {
        fontFamily: "herculanum",
        backgroundColor: 'midnightblue',
        color: 'skyblue',
        margin: '25px auto 25px',
        padding: '0 20px 0',
        fontSize: '40pt',
        borderRadius: '8px',
    },

    //contains all page elements
    mainBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },

    //arranges score blocks on the leaderboard page
    scoreRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
    },

    //styling for individual score block
    scoreBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'orange',
        width: '20%',
        borderRadius: '8px',
        alignItems: 'center',
    },

    //title of each score block
    scoreBlockHeader: {
        textDecoration: 'underline',
    },

    //individual score display elements within each block
    scoreBlockElement: {

    }
}

export default function Leaderboard() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".
    
    return (
        <div className="container" >
            <div style={styles.mainBlock}>
                <img style={styles.background} src={background} alt="Aang and epic background" />
                <section style={styles.mainBlock}>

                    <h1 style={styles.header}>Leaderboard</h1>

                    <section style={styles.scoreRow}>
                        {/*NOTE FOR FUTURE DEVELOPMENT - TO AVOID 
                        OVERFLOWING THE SCREEN, MAY WANT TO LIMIT THE DISPLAY
                        TO THE TOP N (5 - 10) SCORES */}
                        <article style={styles.scoreBlock}>
                            <h2 style={styles.scoreBlockHeader}>Total Score</h2>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                        </article>

                        <article style={styles.scoreBlock}>
                            <h2 style={styles.scoreBlockHeader}>Level One</h2>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                        </article>

                        <article style={styles.scoreBlock}>
                            <h2 style={styles.scoreBlockHeader}>Level Two</h2>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                        </article>

                        <article style={styles.scoreBlock}>
                            <h2 style={styles.scoreBlockHeader}>Level Three</h2>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                            <p style={styles.scoreBlockElement}>Username - score</p>
                        </article>

                    </section>

                </section>
            </div>
            <div>
            </div>
        </div>
    );
}
