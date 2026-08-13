import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [firstLogin, setFirstLogin] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("access")
      ? jwtDecode(localStorage.getItem("access"))
      : null
  );
  const [finalCoins, setFinalCoins] = useState(
    localStorage.getItem("finalCoins") || 0
  );
  const [focused, setFocused] = useState("login");

  const handleLogin = async (email, password) => {
    try {
      const data = {
        username: email,
        password: password,
      };

      const response = await axios.post(
        "/api/users/token/",
        data
      );
      console.log("resp", response);
      if (response.status === 200) {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setUser(jwtDecode(localStorage.getItem("access")));
        return user;
      }
    } catch (e) {
      alert("Couldn't logIn", e);
    }
  };

  const handleRegister = async (email, password1, password2) => {
    try {
      const data = JSON.stringify({
        username: email,
        email: email,
        password: password1,
        password2: password2,
      });
      const response = await axios.post("/api/users/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Successfully Signed Up Please SignIn");
        setFocused("register");
      }
    } catch (e) {
      alert("Failed Signed Up", e.response.data);
    }
  };
  const getNewToken = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      const data = {
        refresh: refresh,
      };
      const response = await axios.post(
        "/api/users/token/refresh/",
        data
      );
      if (response.status === 200) {
        console.log("success!");
      } else {
        console.error("naspa");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (firstLogin === true) {
      getNewToken();
      setFirstLogin(false);
    }

    const interval = setInterval(() => {
      getNewToken();
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [firstLogin]);

  const data = {
    user,
    finalCoins,
    setFinalCoins,
    handleLogin,
    handleRegister,
    focused,
    setFocused,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
