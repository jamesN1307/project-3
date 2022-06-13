import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
    mainContainer: {
        display: 'flex',
        flexDirection: 'row',
        height: "100%",
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    fullBar: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '90px',
        backgroundColor: "beige",
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    subcontainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    buttonClass: {
        fontSize: '30pt',
        backgroundColor: 'orange',
        borderRadius: '8px',
    }
};

export default function NavBar(props) {
  return (
    <div className="NavBar" style={styles.fullBar}>
        <Link to="/" ><button style={styles.buttonClass}>Home</button></Link>
        {props.isLoggedIn?(
            <div style={styles.mainContainer}>
                <Link to={`/profile/${props.userId}`}><button style={styles.buttonClass} >Profile</button></Link>
                <Link to={`/`}><button style={styles.buttonClass} onClick={props.logout}>Logout</button></Link>
                <Link to='/avatar' ><button style={styles.buttonClass}>Character Selection</button></Link>
                <Link to='/levels' ><button style={styles.buttonClass}>Level Selection</button></Link>
                <Link to='/leaderboard_one' ><button style={styles.buttonClass}>Leaderboard</button></Link>
            </div>
        ):(
            <div>
                <Link to="/login" ><button style={styles.buttonClass}>Login/Signup</button></Link> 
            </div>
        )}
    </div>
  )
}