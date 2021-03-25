import AccountTable from '../AccountTable'
import useFetch from '../../hooks/useFetch'
import {useContext} from 'react'
import  {journalDataContext} from '../../context/journalDataProvider'

export interface DashBoardProps {
  
}
 
const DashBoard: React.FC<DashBoardProps> = () => {
  const {setJournals} = useContext(journalDataContext)
  const {state, loading, error} = useFetch({
    url:"/journal",
    headers:{
      "Content-type":"application/json"
    },
    method:"GET"
  })

  if(error) {
    console.log(error)
    return <h1>error</h1>
  }
  if(loading){
    return <h1>Loading...</h1>
  }

  setJournals(state)
  return (
      <>
        <AccountTable 
          accounts = {state}
        />
      </>
    );
}
 
export default DashBoard;
