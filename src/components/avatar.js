import React from 'react';
import aang from '../images/aang.png'

const styles = {
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
    },
    h1: {
        marginTop: "5%",
        fontSize: "80px",
        fontFamily: "herculanum",
        textShadow: "3px 3px 3px skyblue"
    },
    navBar: {
        display: "flex",
        flexDirection: "column",
        width: "10rem",
        height: "50rem",
        marginLeft: "15vw",
    },
    buttons: {
        borderRadius: ".1rem",
        fontFamily: "herculanum",
        fontWeight: "bold",
        boxShadow: "2px 2px 2px black",
        fontSize: "1rem"
        //add Hover
    }

};

export default function ChooseAvatar() {
  // All functional components must have a return method that contains JSX.
  // We return all the JSX inside a parent element with a className of "container".

  return (
    <div className="container" >
        <div>
            <img style={styles.image} src="https://i.pinimg.com/originals/87/37/4c/87374c7fcdb4a9308621a23a4f9c9a69.png" alt="4 Nations Map" />
            <img src={aang} alt="Ang" />
        </div>
    </div>
  );
}