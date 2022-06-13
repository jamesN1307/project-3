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
        height: '100%',
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
        justifyContent: "left",
        width: '30%',
        height: '80%',
        backgroundColor: 'moccasin',
    },

    //style left 'column' of page
    pageColumnLeft: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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

class  Profile extends React.Component {
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".
    constructor(props) {
        super(props);
    
        this.state = {
          scores: [],
          users:[]
        };
      }
    
    async componentDidMount() {
        const responses = await fetch('http://localhost:3001/api/users');
        // const response = await API.getLeaderboard(scoresLevel, token);  
        const data = await responses.json();
        this.setState({
            scores:data.score,
            users: data.username,
        })
        console.log(data);
        // console.log(users);
    }
    
    render() {       
        const {scores, users} = this.state;
        // console.log(scores);
        // console.log(users);
        return (
            <div className="container" style={styles.pageContainer}>
                {/*<Navbar />*/}
                <section style={styles.columnContainer}>
                    
                    {/*Left 'column' */}
                    <section style={styles.pageColumnLeft}>
                        <div style={styles.profileContainer}>
                        <img src={aangProfile} style={styles.pageColumnLeft}></img>
                    <h1 style={{fontSize: "100px", marginTop: "3vh"}}>Username</h1>
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

                        {/* section with buttons to leaderboard and 'play game' buttons*/}
                        <section style={styles.buttonBlock}>
                        <Link to="/matter"><button style={styles.gameButton}>Play Game</button></Link>
                            <div style={styles.leaderButtons}>
                                <button style={styles.leaderLink}>Leaderboard - 1 Player</button>
                                <button style={styles.leaderLink}>Leaderboard - 2 Player</button>
                            </div>
                        </section>
                    </section>
                </section>
            </div>
    );
}
}
export default Profile;
