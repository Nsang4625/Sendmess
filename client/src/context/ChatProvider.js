import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const chatContext = createContext();
const chatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!user) {
      navigate('/');
    }
  }, [navigate]);
  return <chatContext.Provider>
    {children}
  </chatContext.Provider>
}
export const chatState = () => {
  return useContext(chatContext);
}
export default chatProvider;