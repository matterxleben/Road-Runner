import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../Firebase/firebase";

export const AuthContext = React.createContext();

// Context manager for user authentication
// Updates the state whenever the user signs in or out
const AuthDetails = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthDetails;