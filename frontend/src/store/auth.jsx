import { createContext, useContext, useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  // const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  // JWT AUTH - to get the user data

  const userAuthentication = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log("failed to fetch user", error);
    }
  };

  useEffect(() => {
    // getServices();
    if (isLoggedIn) {
      userAuthentication();
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        // services,
        authorizationToken,
        loading,
        API,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue)
    throw new Error("useAuth used outside of the Provider");
  return authContextValue;
};

// // to fetch services data

// const getServices = async () => {
//   try {
//     const response = await fetch(`${API}/api/data/service`, {
//       method: "GET",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       setServices(data.msg);
//     }
//   } catch (error) {
//     console.log("error while fetching", error);
//   }
