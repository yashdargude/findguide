import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
  userId: string;
  firstname: string;
  lastname: string;
  userType: string;
}

const UserContext = createContext<UserContextType>({
  userId: "",
  firstname: "",
  lastname: "",
  userType: "",
});

function UserContextProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("auth-token"),
    };
    axios
      .get("/api/profile/userdetails", { headers })
      .then((res) => {
        if (res.status == 200) {
          setUserId(res.data.resData._id);
          setFirstname(res.data.resData.firstname);
          setLastname(res.data.resData.lastname);
          setUserType(res.data.resData.userType);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userId, firstname, lastname, userType }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserContextProvider };
