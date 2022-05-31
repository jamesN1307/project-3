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
    },
    
    //Items within left block

    //style right 'column' of page
    pageColumnRight: {
        display: 'flex',
        flexDirection: 'column',
        width: '35%',
        height: '100%',
    },
    //Items within right block
};

export default function Profile() {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".

    return (
        <div className="container" style={styles.pageContainer}>
            {/*Left 'column' */}
            <section style={styles.pageColumnLeft}>
                <h1>Profile</h1>
                {/* username and scores */}
                <article>
                    <h2>Username</h2>
                    {/*improvement - revisit, add loop over server elements to add sections for all level scores?}*/}
                    <p>Level One - /score/</p>
                    <p>Level Two - /score/</p>
                    <p>Level Three - /score/</p>
                    <p>Global Score - /score/</p>
                </article>

                {/* section with buttons to leaderboard and 'play game' buttons*/}
                <section>
                    <button>Play Game</button>
                    <div>
                        <button>Leaderboard - 1 Player</button>
                        <button>Leaderboard - 2 Player</button>
                    </div>
                </section>
            </section>

            {/*Right 'column' */}
            <section style={styles.pageColumnRight}>
                <h1>Chat</h1>
                {/*Chat container*/}
                <div>
                    <section>
                        <input type='text'></input>
                        <input type='submit' value='New Comment'></input>
                    </section>
                    {/*sample elements*/}
                    <p></p>
                </div>
            </section>
        </div>
    );
}
