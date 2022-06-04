import React from 'react';
import Navbar from './page_elements/navbar';
import aang from '../images/aang.png'
import appa from '../images/Appa.png'
import katara from '../images/Katara.png'
import sokka from '../images/Sokka.png'
import iroh from '../images/iroh.png'
import toph from '../images/toph.png'
import bumi from '../images/bumi.png'
import momo from '../images/momo.png'
import { Link } from "react-router-dom";

const styles = {
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: -1,
        filter: 'contrast(60%)',
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
    },

    characterImage: {
        display: 'flex',
        //backgroundColor: 'orange',
        width: '20%',
        justifyContent: 'center',
        height: '70%',
        //filter: 'contrast(125%)',
        borderRadius: '14px',
        flexShrink: '1',
        //borderStyle: 'solid',
        //borderColor: 'skyBlue',
        //borderWidth: '8px',
    },

    characterRow: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        margin: 'auto',
        height: '40%',
        alignItems: 'center',
    },

    characterSelectBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        flexDirection: 'column',
        width: '70%',
        height: '100%',
    },

    containerStyling: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },

    headerStyling: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyBlue',
        margin: '20px',
        padding: '10px',
        height: '20%',
        fontSize: '50pt',
        fontFamily: "herculanum",
        borderRadius: '8px',
    }

};

function hoverOnCharacter(event) {
    event.preventDefault();
    event.target.style.filter = 'invert(100%)';
};

function leaveCharacter(event) {
    event.preventDefault();
    event.target.style.filter = 'invert(0%)';
};

export default function ChooseAvatar() {
  // All functional components must have a return method that contains JSX.
  // We return all the JSX inside a parent element with a className of "container".

  return (
    <div className="container" style={styles.containerStyling}>
        <img style={styles.image} src="https://i.pinimg.com/originals/87/37/4c/87374c7fcdb4a9308621a23a4f9c9a69.png" alt="4 Nations Map" />
        <Navbar />

        {/* Contains header and both rows */}
        <div style={styles.characterSelectBox}>

            {/* */}
            <h1 style={styles.headerStyling}>Choose Your Character!</h1>
            
            {/* Top row of characters */}
            <section style={styles.characterRow}>
                <div style={styles.characterImage}>
                <Link to="/game"><img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={aang} alt="Ang" /></Link>
                </div>

                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={appa} alt="appa" />
                </div>

                <div style={styles.characterImage}> 
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={katara} alt="katara" />
                </div>
                
                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={sokka} alt="sokka" />
                </div>
            </section>
            
            {/* Bottom row of characters */}
            <section style={styles.characterRow}>
                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={iroh} alt="Iroh" />
                </div>
                
                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={toph} alt="Toph" />
                </div>
                
                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={bumi} alt="Bumi" />
                </div>
            
                <div style={styles.characterImage}>
                    <img onMouseLeave={leaveCharacter} onMouseOver={hoverOnCharacter}src={momo} alt="Momo" />
                </div>
            </section>

        </div>
    </div>
  );
}