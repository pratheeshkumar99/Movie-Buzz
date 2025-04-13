import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextInterface{
    user: any;
    setUser: any;
    loading: boolean;
}

export const UserContext = createContext<ContextInterface>({
    user: null,
    setUser : null,
    loading: true
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      axios.get("/user").then((res) => {
        setUser(res.data);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};


