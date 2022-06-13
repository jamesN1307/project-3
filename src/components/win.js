import React from "react";
import { Link } from "react-router-dom";

const styles = {
  image: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1,
      // filter: 'contrast(60%)',
  },
}

function Win() {
    return (
      <div className="win">
        <img style={styles.image} src="https://pbs.twimg.com/media/Edd-7VZWAAAocBc.jpg" alt="toph wins" />
        <h1 style={{marginTop: "20%", marginLeft: "32%", color: "white", fontSize: "100px"}}>You Win!</h1>
        <Link to="/avatar"><button style={{marginLeft: "36%", fontSize: "50px", backgroundColor: "black", color: "white"}}>Play again!</button></Link>
      </div>
    );
  }
  
  export default Win;