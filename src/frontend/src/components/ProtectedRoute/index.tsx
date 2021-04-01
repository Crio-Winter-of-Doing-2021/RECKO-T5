import {Route, useHistory} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from '../../context/userContextProvider'

 
const ProtectedRoute: React.FC<any> = ({component, path}) => {
  const {state} = useContext(UserContext)
  const router = useHistory()
  if(!state.user || state.error){
    router.replace('/login')
    return (
      null
    );
  }
 
  return (
    <Route exact component={component} path={path} />
  );
}
 
export default ProtectedRoute;