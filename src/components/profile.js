import React from 'react';
import { Link } from "react-router-dom";

const styles = {
    //master div
    pageContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: 'moccasin',
    },

    //style left 'column' of page
    pageColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        width: '65%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
    },
    
    //Items within left block

    sectionHeader: {
        backgroundColor: 'skyblue',
        fontSize: '28pt',
        borderRadius: '8px',
    },

    scoreBlock: {
        borderStyle: 'solid',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '8px',
    },

    usernameItem: {
        borderRadius: '8px',

    },

    scores: {

    },

    buttonBlock: {
        display: 'flex',
        flexDirection: 'row',
    },

    gameButton: {
        borderRadius: '8px',
    },

    leaderButtons: {
        display: 'flex',
        flexDirection: 'column',

    },

    leaderLink: {
        borderRadius: '8px',

    },

    //style right 'column' of page
    pageColumnRight: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
    },
    //Items within right block

    chatBlock: {

    },

    commentText: {

    },

    submitComment: {

    },

    postedComment: {

    }


};

export default function Profile() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" style={styles.pageContainer}>
            {/*Left 'column' */}
            <section style={styles.pageColumnLeft}>
                <h1 style={styles.sectionHeader}>Profile</h1>
                {/* username and scores */}
                <article style={styles.scoreBlock}>
                    <h2 style={styles.usernameItem}>Username</h2>
                    {/*improvement - revisit, add loop over server elements to add sections for all level scores?}*/}
                    <p style={styles.scores}>Level One - /score/</p>
                    <p style={styles.scores}>Level Two - /score/</p>
                    <p style={styles.scores}>Level Three - /score/</p>
                    <p style={styles.scores}>Global Score - /score/</p>
                </article>

                {/* section with buttons to leaderboard and 'play game' buttons*/}
                <section style={styles.buttonBlock}>
                    <button style={styles.gameButton}>Play Game</button>
                    <div style={styles.leaderButtons}>
                        <button style={styles.leaderLink}>Leaderboard - 1 Player</button>
                        <button style={styles.leaderLink}>Leaderboard - 2 Player</button>
                    </div>
                </section>
            </section>

            {/*Right 'column' */}
            <section style={styles.pageColumnRight}>
                <h1 style={styles.sectionHeader}>Chat</h1>
                {/*Chat container*/}
                <div style={styles.chatBlock}>
                    <section>
                        <input type='text'style={styles.commentText}></input>
                        <input type='submit' value='New Comment' style={styles.submitComment}></input>
                    </section>
                    {/*sample elements*/}
                    <p style={styles.postedComment}>This is what posted comments will look like.</p>
                    <p style={styles.postedComment}>This is what posted comments will look like.</p>
                    <p style={styles.postedComment}>This is what posted comments will look like.</p>
                </div>
            </section>
        </div>
    );
}
