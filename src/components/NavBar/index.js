import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar(props) {
  return (
    <div className="NavBar">
        <Link to="/"><button>Home</button></Link>
        {props.isLoggedIn?(
            <>
                <Link to={`/profile/${props.userId}`}><button>Profile</button></Link>
                <Link to={`/`}><button onClick={props.logout}>Logout</button></Link>
            </>
        ):(
            <>
                <Link to="/login"><button>Login/Signup</button></Link> 
            </>
        )}
    </div>
  )
}