import React from "react";
import "./SignIn.css";
import { signin } from "../../actions/userLoginActions";
import { connect } from "react-redux";
import { LoginButton } from "../../components/loginButton";
import { LoginText } from "../../components/LoginText";
import { LoginFooter } from "../../components/LoginFooter";
import { LoginInput } from "../../components/LoginInput";
import { LoginError } from "../../components/LoginError";

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
          <LoginText heading="Sign In" subText="Welcome back" />
          <LoginInput
            name="email"
            placeholder="Email"
            onChange={this.changeHandler}
          />
          <LoginInput
            name="password"
            type="password"
            placeholder="Password"
            onKeyPress={this.keyPress}
            onChange={this.changeHandler}
          />
          <LoginError
            showForgotPassword={true}
            validateUser={validateUser}
            error={error}
          />
          <LoginButton
            onClick={() => this.verifySignInDetails()}
            text="Sign In"
          />
          <LoginFooter
            text="Don’t have an account? "
            toPath="/sign-up"
            toText="Sign up"
          />
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
