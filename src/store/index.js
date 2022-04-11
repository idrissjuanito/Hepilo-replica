import { onAuthStateChanged } from "firebase/auth";
import {
  createContext,
  useReducer,
  useContext,
  useState,
  useEffect,
} from "react";
import { auth, createDoc, delDoc, editDoc } from "../firebase";

const storeContext = createContext(null);
const userContext = createContext(null);

// const ACTIONS = {
//   FETCH: "FETCH",
//   CREATE: "CREATE ITEM",
//   EDIT: "EDIT ITEM",
//   DELETE: "DELETE ITEM",
// };

export function useStore() {
  return useContext(storeContext);
}
export const useUser = () => useContext(userContext);

function reducer(state, actions) {
  let collection = actions?.payload?.collection;
  switch (actions.type) {
    default:
      return { ...state, [collection]: actions.payload.docs };
  }
}

export function Store({ children }) {
  const [state, dispatch] = useReducer(reducer, {});
  const [form, setForm] = useState(null);

  return (
    <storeContext.Provider value={{ state, form, setForm, dispatch }}>
      {children}
    </storeContext.Provider>
  );
}

export function User({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const currentUser = {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          picture: user.photoURL,
        };

        setUser(currentUser);
      } else {
        setUser("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
