import React from 'react';
import Navbar from './page_elements/navbar';
import Placeholder from "../images/placeholder.png"
import { Link } from "react-router-dom";
import aangProfile from "../images/aangProfile.png"

const styles = {
    //master div for page elements
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '90%',
    },

    //container for each page 'column'
    columnContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        backgroundColor: 'moccasin',
    },

    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        width: '45%',
        height: '50%',
        backgroundColor: 'skyblue',
        borderRadius: '8px',
    },

    //style left 'column' of page
    pageColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '90%',
        marginTop: '20px',
    },

    //Items within left block

    sectionHeader: {
        backgroundColor: 'skyblue',
        fontSize: '28pt',
        borderRadius: '8px',
    },

    scoreBlock: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        borderStyle: 'solid',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: '8px',
        height: '100%',
        marginTop: '25px',
    },

    profileTitle: {
        borderRadius: '8px',
        fontSize: "60px",
        marginTop: "10px",
        borderStyle: 'solid',
        borderColor: 'black',
        height: '40%',
        width: '55%',
        textAlign: 'center',
        justifyContent: 'center',
    },

    pictureDivision: {
        display: 'flex',
        height: '80%',
        width: '65%',
        borderStyle: 'solid',
        borderColor: 'black',
    },

    picture: {
        width: '100%',
        height: '100%',
    },

    usernameItem: {
        display: 'flex',
        height: '25%',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: '40pt',
    },

    scores: {
        height: '15%',
        backgroundColor: 'orange',
        fontSize: '25pt',
        borderRadius: '8px',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        margin: '5px auto 5px',
        padding: '0 15px 0',
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

};

class Profile extends React.Component {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".
    constructor(props) {
        super(props);

        this.state = {
            scores: [],
            users: []
        };
    }

    async componentDidMount() {
        {/*const responses = await fetch('http://localhost:3001/api/users');
        // const response = await API.getLeaderboard(scoresLevel, token);  
        const data = await responses.json();
        this.setState({
            scores: data.score,
            users: data.username,
        })
        console.log(data);
    // console.log(users);*/}
    }

    render() {
        const { scores, users } = this.state;
        // console.log(scores);
        // console.log(users);
        return (
            <div className="container" style={styles.pageContainer}>
                {/*<Navbar />*/}
                <section style={styles.columnContainer}>

                    {/*Left 'column' */}
                    <section style={styles.pageColumnLeft}>
                        <div style={styles.profileContainer}>

                            <div style={styles.pictureDivision}>
                                <img src={aangProfile} style={styles.picture}></img>
                            </div>

                        </div>
                        {/* {this.state.scores.map()}
                        {this.state.users.map()} */}
                        {/* username and scores */}
                        <article style={styles.scoreBlock}>
                            <h2 style={styles.usernameItem}>Username {users}</h2>
                            {/*improvement - revisit, add loop over server elements to add sections for all level scores?}*/}
                            <p style={styles.scores}>Level One - /score/</p>
                            <p style={styles.scores}>Level Two - /score/</p>
                            <p style={styles.scores}>Level Three - /score/</p>
                            <p style={styles.scores}>Global Score - /score/</p>
                        </article>

                        {/* section with buttons to leaderboard and 'play game' buttons
                        <section style={styles.buttonBlock}>
                            <Link to="/matter"><button style={styles.gameButton}>Play Game</button></Link>
                            <div style={styles.leaderButtons}>
                                <button style={styles.leaderLink}>Leaderboard - 1 Player</button>
                                <button style={styles.leaderLink}>Leaderboard - 2 Player</button>
                            </div>
                        </section>*/}
                    </section>
                </section>
            </div>
        );
    }
}
export default Profile;