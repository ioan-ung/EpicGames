import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateUserAction } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const userCredentials = useSelector((state) => state.getUserReducer);
  const { loading, error, userDetails } = userCredentials;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = () => {
    const filteredData = {};
    if (username) filteredData.username = username;
    if (email) filteredData.email = email;
    if (description) filteredData.description = description;
    if (image) filteredData.image = image;

    dispatch(
      updateUserAction({
        user: userDetails?.id,
        data: filteredData,
        navigate: navigate,
      })
    );
  };

  useEffect(() => {
    setDescription("");
    setUsername("");
    setEmail("");
    setImage("");
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "linear-gradient(#13120F, #252525)",
      }}
    >
      <Container
        className={`d-flex align-items-center justify-content-center flex-column `}
        style={{
          position: "absolute",
          backgroundImage: "linear-gradient(#13120F, #252525)",
          width: "100vw",
          height: "100vh",
          boxShadow: "rgba(0,0,0,0.40) 0px 5px 15px",
          padding: "0",
        }}
      >
        <Row style={{ color: "white", fontSize: "3rem" }}>
          <strong>Update your credenstials</strong>
        </Row>
        <Row>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
            className="d-flex align-items-center justify-content-center flex-column"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Col>
              {
                <>
                  <FormGroup>
                    <Form.Label style={{ color: "white" }}>Username</Form.Label>
                    <Form.Control
                      name="email"
                      style={{ width: "18rem" }}
                      type="text"
                      defaultValue={userDetails?.username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Form.Label style={{ color: "white" }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      name="email"
                      style={{ width: "18rem" }}
                      type="email"
                      defaultValue={userDetails?.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Form.Label style={{ color: "white" }}>
                      Description
                    </Form.Label>
                    <Form.Control
                      name="textarea"
                      style={{ width: "18rem" }}
                      as="textarea"
                      defaultValue={userDetails?.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormGroup>

                  <Form.Group controlId="exampleImage">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setImage(e.target.files[0].name)}
                    />
                  </Form.Group>
                </>
              }

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
                Update
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateUser;
