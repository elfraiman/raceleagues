import React, { createContext, useState } from "react";
import firebase from "../firebase.js";
import { useAlert } from "react-alert";
import { isEmpty } from "lodash";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import { FormInput } from "shards-react";
import classes from "./userProvider.module.scss";

export const UserContext = createContext(null);

const database = firebase.firestore();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [discordModalState, setDiscordModalState] = useState(false);
  const [discordInputValue, setDiscordInputValue] = useState("");
  const alert = useAlert();
  const authProvider = new firebase.auth.FacebookAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
    } else {
      // No user is signed in.
      setUser(false);
    }
  });

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        alert.success("Logged out!");
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const loginWithFb = () => {
    if (!isEmpty(user)) {
      alert.error("Already logged in!");
      return;
    }

    firebase
      .auth()
      .signInWithPopup(authProvider)
      .then(async (result) => {
        const userDoc = database.collection("users").doc(result.user.email);

        const userExists = await userDoc.get().then((user) => user.data());

        if (isEmpty(userExists)) {
          userDoc.set({
            name: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            img: result.user.photoURL,
            discord: "",
          });

          setDiscordModalState(true);
        }

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = result.credential.accessToken;
        // The signed-in user info.
        // var user = result.user;
        // ...
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  const triggerDiscordModel = () => {
    setDiscordModalState(!discordModalState);
  };

  const handleDiscordInputChange = (event) => {
    setDiscordInputValue(event.target.value);
  };

  const submitDiscord = () => {
    const userDoc = database.collection("users").doc(user.email);

    userDoc
      .update({
        discord: discordInputValue,
      })
      .then(() => {
        setDiscordModalState(false);
      });
  };

  const emptyFunc = () => {};
  return (
    <UserContext.Provider
      value={{
        user: user,
        logout: logout,
        loginWithFb: loginWithFb,
      }}
    >
      <div>
        <Modal open={discordModalState} toggle={emptyFunc}>
          <ModalHeader>
            <React.Fragment>
              Welcome {user ? user.displayName : null}
            </React.Fragment>
          </ModalHeader>
          <ModalBody>
            <p>Thank you for joining SpoolRacing!</p>
            <p>To be able to join races we need your discord id!</p>
            <FormInput
              placeholder="Discord ID"
              onChange={(e) => handleDiscordInputChange(e)}
            />
            <div className={classes.buttons}>
              <Button onClick={submitDiscord}>Done</Button>
              <Button theme="secondary" onClick={triggerDiscordModel}>
                Cancel
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
