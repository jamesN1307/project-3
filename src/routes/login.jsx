import { Link } from "react-router-dom";

export default function Login({setToken}) {
  return(
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
      <Link to="/"><button>Submit</button></Link>
      </div>
    </form>
    </div>
  )
}