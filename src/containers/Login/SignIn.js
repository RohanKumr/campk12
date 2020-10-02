import React from "react";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { signin } from "../../actions/userLoginActions";
import { connect } from "react-redux";
import { LoginButton } from "../../components/loginButton";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      validateUser: true,
    };
  }

  componentDidMount = () => {
    let { userInfo } = this.props;
    if (Object.keys(userInfo).length !== 0) {
      this.props.history.push("/feeds/" + userInfo._id);
    }
  };

  changeHandler = (event) => {
    const { email, password } = this.state;
    this.setState({ [event.target.name]: event.target.value });
    if (email && !email.includes("@")) {
      this.setState({
        error: "Incorrect Email",
        validateUser: false,
      });

      return;
    }
    if (password && password.length < 4) {
      this.setState({
        error: "Password must be 5 letters",
        validateUser: false,
      });
      return;
    }

    if (email && email.includes("@")) this.setState({ validateUser: true });
    if (password && password.length > 6) this.setState({ validateUser: true });
  };

  verifySignInDetails = () => {
    const { email, password } = this.state;
    const { users } = this.props;

    const existingUser = users.find(
      (existingUser) =>
        existingUser.email === email && existingUser.password === password
    );
    //Returns the user if it exists
    if (existingUser) {
      this.setState({ validateUser: true });
      this.props.whenSignedIn(existingUser);
      this.props.history.push("/feeds/" + existingUser._id);
    } else {
      console.log(existingUser);
      this.setState({
        validateUser: false,
        error: "Incorrect Username Or Password",
      });
    }
  };

  keyPress = (event) => {
    if (event.key === "Enter") {
      this.verifySignInDetails();
    }
  };

  render() {
    const { error, validateUser } = this.state;

    return (
      <div className="Sign-in-container">
        <div className="Sign-in-box">
          <div className="sign-in">Sign in</div>
          <div className="welcome-back">Welcome back</div>
          <input
            placeholder="Email"
            name="email"
            onChange={this.changeHandler}
          />

          <input
            placeholder="Password"
            name="password"
            type="password"
            onKeyPress={this.keyPress}
            onChange={this.changeHandler}
          />
          <div className="forgot-password">Forgot Password?</div>
          {validateUser ? (
            <div className="incorrect-password-dummy"></div>
          ) : (
            <div className="incorrect-password">{error}</div>
          )}

          <LoginButton
            onClick={() => this.verifySignInDetails()}
            text="Sign In"
          />
          <div className="dont-have-an-acc">
            Don’t have an account? <Link to="/sign-up">Sign up</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateTopProps = (state) => {
  return {
    age: state.userLoginDetails.Age,
    users: state.userList.users,
    userInfo: state.userLoginDetails.LoggedInUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    whenSignedIn: (existingUser) => dispatch(signin(existingUser)),
  };
};

export default connect(mapStateTopProps, mapDispatchToProps)(SignIn);
