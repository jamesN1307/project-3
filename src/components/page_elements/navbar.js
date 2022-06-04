import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'moccasin',
    },
    anchorClass: {
        color: 'black',
        backgroundColor: 'skyblue',
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
            <Link to='/profile'><a href='#' style={styles.anchorClass}>Profile</a></Link>
            <Link to='/avatar'><a href='#' style={styles.anchorClass}>Character Selection</a></Link>
            <Link to='/levels'><a href='#' style={styles.anchorClass}>Level Selection</a></Link>
            <Link to='/leaderboard_one'><a href='#' style={styles.anchorClass}>Leaderboard - Singleplayer</a></Link>
            <Link to='/leaderboard_two'><a href='#' style={styles.anchorClass}>Leaderboard - Multiplayer</a></Link>
        </div>
    );
}
