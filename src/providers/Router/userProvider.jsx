import React, { createContext, useState } from "react";
import firebase from "../../firebase.js";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
      setUser(false);
    }
  });

  console.log(user, "user in provider");

  return (
    <UserContext.Provider
      value={{
        user: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
