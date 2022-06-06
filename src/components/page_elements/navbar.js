import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: "5vh",
        width: '100%',
        backgroundColor: "white",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    anchorClass: {
        color: 'black',
        fontSize: '20pt',
    }
};


export default function Navbar() {
    return (
        <div className="container" style={styles.mainContainer}>
            {/*--consists of repeated link element, only difference between
            them being the text and the page they each link to
            --For media query - font size may have to change?
            --Page links assume users will have to go through first two screens
            - homepage, then login/signup
            --Link needed - each leaderboard, profile, level select, avatar select?
            -!- level select only once an avatar and game-mode have been chosen?*/}
            <Link to='/profile' style={styles.anchorClass}>Profile</Link>
            <Link to='/avatar' style={styles.anchorClass}>Character Selection</Link>
            <Link to='/levels' style={styles.anchorClass}>Level Selection</Link>
            <Link to='/leaderboard_one' style={styles.anchorClass}>Leaderboard - Singleplayer</Link>
            <Link to='/leaderboard_two' style={styles.anchorClass}>Leaderboard - Multiplayer </Link>
        </div>
    );
}
