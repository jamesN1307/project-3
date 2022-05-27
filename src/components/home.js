import React from 'react';

const styles = {
    navbarStyle: {
        width: '100%',
        height: 'auto',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1,
    },

};

export default function Welcome() {
  // All functional components must have a return method that contains JSX.
  // We return all the JSX inside a parent element with a className of "container".

  return (
    <div className="container">
        <header>
            <h1>Appa's Landing</h1>
                <nav>
                    <button>Login</button>
                    <p>Don't have an account?</p>
                    <button>Sign Up</button>
                </nav>
        </header>
        <div>
            <img src="https://wallpapercave.com/wp/weaogjF.jpg" alt="Ang and epic background" />
        </div>
    </div>
  );
}
