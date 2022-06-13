import React from 'react';
import { Link } from "react-router-dom";
import Navbar from './page_elements/navbar';
import leaderboard_one from "../images/leaderboard_one.png"
import celebrate from '../images/celebrate1.png'
import EarthKingdom from "../images/EarthKingdom.jpg"
import rocks from '../images/rocks.png'
import waterLevel from "../images/waterLevel.jpg"
import ocean from "../images/ocean.png"
import avatarAang from "../images/avatarAang.jpg"
import fire from "../images/fire.jpg"
import Krew from "../images/Krew.png"
import sky from "../images/sky.png"
import API from '../utils/API';
// import background from "../images/leaderboard_background.png";

// LEADERBOARD ISSUE - SCORE BLOCKS NOT ADJUSTING TO SCREEN SIZE
const styles = {
    masterContainer: {
        display: 'flex',
        height: '85%',
        width: '100%',
        justifyContent: 'center',
        flexGrow: '1',
        flexShrink: '1',
        zIndex: 1
    },

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "herculanum",
        backgroundColor: 'orange',
        borderRadius: '10px',
        color: 'black',
        marginTop: '20px',
        marginBottom: '20px',
        padding: '0 20px 0',
        fontSize: '60pt',
        borderRadius: '8px',
        height: '20%',
    },

    //contains all page elements
    mainBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        flexGrow: '1',
        flexShrink: '1',
    },

    //arranges score blocks on the leaderboard page
    scoreRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        height: '50%',
        flexGrow: '1',
        flexShrink: '1',
    },

    //styling for individual score block
    scoreBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${sky})`,
        zIndex: -1,
        borderRadius: '15px',
        alignItems: 'center',
        width: "20%",
        height: '100%',
        flexShrink: '1',
    },

    scoreEarthBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${rocks})`,
        zIndex: -1,
        borderRadius: '15px',
        alignItems: 'center',
        width: "20%",
        height: '100%',
        flexShrink: '1',
    },

    scoreWaterBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${ocean})`,
        zIndex: -1,
        borderRadius: '15px',
        alignItems: 'center',
        width: "20%",
        height: '100%',
        flexShrink: '1',
    },

    scoreFireBlock: {
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: `url(${fire})`,
        zIndex: -1,
        borderRadius: '15px',
        alignItems: 'center',
        width: "20%",
        height: '100%',
        flexShrink: '1',
    },
    //title of each score block
    scoreBlockTitle: {
        textDecoration: 'underline',
        fontSize: "50px"
    },

    scoreBlockHeader: {
        textDecoration: 'underline',
        color: "white",
        fontWeight: 800,
        fontSize: "40px",
        zIndex: 1
    },

    //individual score display elements within each block
    scoreBlockElement: {
        marginTop: "10px",
        height: "45px",
        width: "95%",
        backgroundColor: "grey",
        opacity: "0.9",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: "10px",
        color: "white",
        fontSize: '16pt',
    }
}

class  LeaderboardSingle extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          scores: [],
          users: [],
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
    }
    // All functional components must have a return method that contains JSX.
    // We return all the JSX inside a parent element with a className of "container".
    render() {
        const {scores, users} = this.state;
         return (
            <div className="container" >
            
            <img style={{ width: "100%", height: "100%", zIndex: -1, position: "absolute", opacity: "0.6" }} src={celebrate} alt="Aang flying" />
            {/*<Navbar />*/}
            <div style={styles.masterContainer} >

                <section style={styles.mainBlock}>

                    <h1 style={styles.header}>Leaderboard</h1>

                    <section style={styles.scoreRow}>
                        <article style={styles.scoreEarthBlock}>
                            <img src={EarthKingdom} style={{height:"300px", width: "100%", opacity: "0.9", borderRadius: "15px"}}/>

                            {/*Blocked due to malfunction
                            {this.state.data.map(score =>(
                                <div>
                                <p style={styles.scoreBlockElement}>Username{score.data.username} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                                </div>
                            }))}*/}
                        </article>

                        <article style={styles.scoreWaterBlock}>
                            <img src={waterLevel} style={{height:"300px", width: "100%", opacity: "0.9", borderRadius: "15px"}}/>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                        </article>

                        <article style={styles.scoreFireBlock}>
                            <img src={avatarAang} style={{height:"300px", width: "100%", opacity: "0.9", borderRadius: "15px"}}/>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                        </article>

                        <article style={styles.scoreBlock}>
                            <img src={Krew} style={{height:"300px", width: "100%", opacity: "0.9", borderRadius: "15px"}}/>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                            <p style={styles.scoreBlockElement}>Username{users} - score:{scores}</p>
                        </article>
                    </section>

                </section>
            </div>
        </div>
    );
}
}
export default LeaderboardSingle;
