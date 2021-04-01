import {createContext, useReducer} from 'react'
import {AuthReducer} from '../reducers/AuthReducer'

export const UserContext = createContext<any>(null)
 
const UserContextProvider: React.FC<any> = ({children}) => {
  
  const [state, dispatch] = useReducer(AuthReducer, {
    // @ts-ignore
    user: JSON.parse(localStorage.getItem("user")),
    error: null,
    loading: false,
  })
  return (
    <UserContext.Provider value={{state, dispatch}}>
        {children}
    </UserContext.Provider>
  );
}
 
export default UserContextProvider;