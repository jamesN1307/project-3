import React from 'react';
import aang from '../images/aang.png'
import iroh from '../images/iroh.png'
import toph from '../images/toph.png'
import bumi from '../images/bumi.png'
import momo from '../images/momo.png'

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
            <img src={iroh} alt="Iroh" />
            <img src={toph} alt="Toph" />
            <img src={bumi} alt="Bumi" />
            <img src={momo} alt="Momo" />
        </div>
    </div>
  );
}