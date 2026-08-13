import React, { useContext} from "react";
import { Container, FormGroup, Row, Form, Button } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const { handleLogin, handleRegister, focused, setFocused } =
    useContext(AuthContext);

  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    const loginSuccess = await handleLogin(
      e.target.email.value,
      e.target.password.value
    );
    console.log("loginSuccess", loginSuccess);
    navigate("/");
    window.location.reload();
  };

  const handleOnSubmitRegister = (e) => {
    e.preventDefault();
    handleRegister(
      e.target.email.value,
      e.target.password.value,
      e.target.password2.value
    );
  };

  return (
    <section className="MainPage">
      <div
        style={{ width: "100%", height: "100%", position: "relative" }}
        className="d-flex align-items-center justify-content-center flex-column"
      >
        <Container
          className={`d-flex align-items-center justify-content-center flex-column ${
            focused === "login" ? "focus" : "unfocus"
          } `}
          style={{
            position: "absolute",
            backgroundImage: "linear-gradient(#13120F, #252525)",
            width: "30%",
            height: "90%",
            boxShadow: "rgba(0,0,0,0.40) 0px 5px 15px",
          }}
        >
          <Row style={{ color: "white", fontSize: "3rem" }}>
            <strong>Login</strong>
          </Row>


          {/*login */}
          <Form
            onSubmit={handleOnSubmitLogin}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <FormGroup>
              <Form.Label style={{ color: "white" }}>Email Adress</Form.Label>
              <Form.Control
                name="email"
                style={{ width: "18rem" }}
                type="email"
                placeholder="yourEmail@yahoo.com"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control
                name="password"
                style={{ width: "18rem" }}
                type="password"
                placeholder="password"
              />
            </FormGroup>
            <Button
              style={{
                width: "18rem",
                border: "none",
                background: "red",
                color: "white",
                fontWeight: "bolder",
              }}
              className="mt-5"
              type="submit"
            >
              Login
            </Button>
            <Button
              style={{
                width: "18rem",
                border: "none",
                background: "red",
                color: "white",
                fontWeight: "bolder",
              }}
              className="mt-5"
              onClick={() => setFocused("register")}
            >
              Don't have account?
            </Button>
          </Form>
        </Container>

        <Container
          className={`d-flex align-items-center justify-content-center flex-column ${
            focused === "register" ? "focus" : "unfocus"
          }  `}
          style={{
            position: "relative",
            backgroundImage: "linear-gradient(#13120F, #252525)",
            width: "30%",
            height: "90%",
            boxShadow: "rgba(0,0,0,0.40) 0px 5px 15px",
          }}
        >
          <Row className="" style={{ color: "white", fontSize: "3rem" }}>
            <strong>Sign up</strong>
          </Row>


          {/*register */}
          <Form
            className="d-flex align-items-center justify-content-center flex-column"
            onSubmit={handleOnSubmitRegister}
          >
            <FormGroup>
              <Form.Label style={{ color: "white" }}>Email Adress</Form.Label>
              <Form.Control
                name="email"
                style={{ width: "18rem" }}
                type="email"
                placeholder="yourEmail@yahoo.com"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label style={{ color: "white" }}>Password</Form.Label>
              <Form.Control
                name="password"
                style={{ width: "18rem" }}
                type="password"
                placeholder="password"
              />
            </FormGroup>
            <FormGroup>
              <Form.Label style={{ color: "white" }}>
                Re-enter password
              </Form.Label>
              <Form.Control
                name="password2"
                style={{ width: "18rem" }}
                type="password"
                placeholder="password"
              />
            </FormGroup>
            <Button
              style={{
                width: "18rem",
                border: "none",
                background: "red",
                color: "white",
                fontWeight: "bolder",
              }}
              className="mt-5"
              type="submit"
            >
              Register
            </Button>
            <Button
              style={{
                width: "18rem",
                border: "none",
                background: "red",
                color: "white",
                fontWeight: "bolder",
              }}
              className="mt-5"
              onClick={() => setFocused("login")}
            >
              Login now!
            </Button>
          </Form>



        </Container>
      </div>
    </section>
  );
};

export default SignIn;
