import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [userData, setUserData] = useState({});
  const [loggedOut, setLoggedOut] = useState(false);

  return (
    <UserContext.Provider
      value={{ userData, setUserData, loggedOut, setLoggedOut }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
