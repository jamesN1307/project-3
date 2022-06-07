import React, { useState } from "react";
import Krew from '../images/Krew.png'

const styles = {
  image: {
    height: "100vh",
    width: "100vw",
    position: "absolute",
    zIndex: -1,
    opacity: .65
  },
  title: {
    fontSize: "30px",
    fontWeight: "800",
    position: "absolute",
    left: "35%",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "herculanum"
  }
}


function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    var { uname, pass } = document.forms[0];

    fetch('http://localhost:3001/api/users', 
    {
      method:'POST',
      body: JSON.stringify({
        name: uname,
        password: pass
      }),
      headers: {
        "Content-Type": "application/json"
      }

    }
    )
    .then(response => response.json())
    .then(data => console.log(data));
  
    

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  // CHANGE CODE FOR STYLING FORM
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <img style={styles.image} src={Krew} alt="Ang and epic background" />
      <div className="login-form" style={styles.title}>
        <div className="title" style={{fontSize: "100px", fontWeight: "500", paddingBottom: "30vh"}}>Sign In</div>
        {isSubmitted ? window.location.href = "/avatar" : renderForm}
      </div>
    </div>
  );
}

export default App;