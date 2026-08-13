import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserAction } from "../actions/userActions";
import UserDefaultImage from "../svg/user.svg";
import Edit from "../svg/edit.svg?react";
import "./style/UpdateUser.css";

const UserIcon = () => (
  <svg
    className="update-user-input-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = () => (
  <svg
    className="update-user-input-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const UpdateUser = () => {
  const userCredentials = useSelector((state) => state.getUserReducer);
  const { loading, error, userDetails } = userCredentials;
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  const handlePageClick = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      document.activeElement?.blur();
    }
  };

  const handleOnSubmit = () => {
    const formData = new FormData();
    if (username) formData.append("username", username);
    if (email) formData.append("email", email);
    if (description) formData.append("description", description);
    if (image) formData.append("image", image);

    dispatch(
      updateUserAction({
        user: userDetails?.id,
        data: formData,
        navigate: navigate,
      })
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    setDescription("");
    setUsername("");
    setEmail("");
    setImage(null);
    setImagePreview(null);
  }, []);

  return (
    <section className="update-user-page" onMouseDown={handlePageClick}>
      <div className="update-user-shell">
        <div className="update-user-card" ref={cardRef}>
          <div className="update-user-brand">
            <div className="update-user-avatar-wrap">
              <img
                className="update-user-avatar"
                src={imagePreview || userDetails?.image || UserDefaultImage}
                alt="Profile"
              />
              <label
                className="update-user-avatar-edit"
                htmlFor="update-user-image-input"
              >
                <Edit />
              </label>
              <input
                id="update-user-image-input"
                className="update-user-avatar-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <h1>Update your profile</h1>
            <p>Keep your account details up to date</p>
          </div>

          {error && <div className="update-user-error">{error}</div>}

          <form
            className="update-user-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit();
            }}
          >
            <div className="update-user-field">
              <label htmlFor="update-user-username">Username</label>
              <div className="update-user-input-wrap">
                <UserIcon />
                <input
                  id="update-user-username"
                  name="username"
                  type="text"
                  className="update-user-input"
                  placeholder={userDetails?.username || "Username"}
                  defaultValue={userDetails?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="update-user-field">
              <label htmlFor="update-user-email">Email Address</label>
              <div className="update-user-input-wrap">
                <MailIcon />
                <input
                  id="update-user-email"
                  name="email"
                  type="email"
                  className="update-user-input"
                  placeholder={userDetails?.email || "yourEmail@yahoo.com"}
                  defaultValue={userDetails?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="update-user-field">
              <label htmlFor="update-user-description">Description</label>
              <textarea
                id="update-user-description"
                name="description"
                className="update-user-input"
                placeholder="Tell us a bit about yourself"
                defaultValue={userDetails?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="update-user-submit-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>

            <p className="update-user-cancel-link">
              Changed your mind?
              <button type="button" onClick={() => navigate(-1)}>
                Go back
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUser;
