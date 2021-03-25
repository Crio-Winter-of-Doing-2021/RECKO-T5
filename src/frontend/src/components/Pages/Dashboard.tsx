import AccountTable from '../AccountTable'
import useFetch from '../../hooks/useFetch'
import {useContext, useState} from 'react'
import  {journalDataContext} from '../../context/journalDataProvider'
import {sortAsc, sortDsc} from '../../utils'
import SortingBox from '../SortingBox'

export interface DashBoardProps {
  
}
 
const DashBoard: React.FC<DashBoardProps> = () => {
  interface sortByType{
    property:"date" | "amount" | "",
    trend:"ascending" | "descending" | ""
  }
  const {setJournals} = useContext(journalDataContext)
  const [sortBy, setSortBy] = useState<sortByType>({
    property:"amount", 
    trend:"ascending"
  })

  const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy((prev) => {
      return  {...prev, [e.target.name]: e.target.value}
    })
  }
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
  // setting the data to journals variable journals and running sorting algos
  const journals = state;
  if(sortBy.trend!=="" && sortBy.property!==""){
    if(sortBy.trend === "ascending"){
      journals.sort(sortAsc(sortBy.property))
    }
    if(sortBy.trend === "descending"){
      journals.sort(sortDsc(sortBy.property))
    }
  }
  
  // setting context data
  setJournals(journals)

  return (
      <>
        <SortingBox onChangeHandler = {onChangeHandler} />
        <AccountTable 
          accounts = {state}
        />
      </>
    );
}
 
export default DashBoard;
