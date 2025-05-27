import {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface userDataType {
  id: number;
  email: string;
  balance: number;
}

interface userContextDataType {
  user: userDataType | null;
  setUser: Dispatch<SetStateAction<userDataType | null>>;
}

export const UserContext = createContext<userContextDataType>({
  user: null,
  setUser: () => {},
});

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<userDataType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
