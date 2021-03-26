import AccountTable from '../AccountTable'
import Error from '../Error'
import Loading from '../Loading'
import SortingBox from '../SortingBox'
import FilterBox from '../FilterBox'

import {sortAsc, sortDsc} from '../../utils'
import { AccountRowProps } from '../AccountRow'
import  {journalDataContext} from '../../context/journalDataProvider'

import {useContext, useEffect, useState} from 'react'
import useFetch from '../../hooks/useFetch'


export interface DashBoardProps {
  
}
 
const DashBoard: React.FC<DashBoardProps> = () => {
  interface sortByType{
    property:"date" | "amount" | "",
    trend:"ascending" | "descending" | ""
  }
  // context api
  const {setJournals} = useContext(journalDataContext)
  // sorting parameters
  const [sortBy, setSortBy] = useState<sortByType>({
    property:"amount", 
    trend:"ascending"
  })
  // main data to be displayed
  const [data, setData] = useState<Array<AccountRowProps>>([])
  // radio button values to filter the data
  const [radioValue, setRadioValue] = useState<"ALL" | "XERO" | "QUICKBOOKS">("ALL")

  // function to handle FilterBox and SortingBox
  const onChangeHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy((prev) => {
      return  {...prev, [e.target.name]: e.target.value}
    })
  }
  const onRadioChangeHandler = (value : "ALL" | "XERO" | "QUICKBOOKS") => {
    setRadioValue(value)
    if(value!=="ALL"){
      let filteredData = state.filter((d:AccountRowProps) => d.provider === value)
      setData(filteredData)
    }else{
      setData(state)
    }
  }
  // API CALL
  const {state, loading, error} = useFetch({
    url:"/journal",
    headers:{
      "Content-type":"application/json"
    },
    method:"GET"
  })

  // calling hook to set the data value when we get state from api call
  useEffect(()=>{
    if(state){
      setData(state)
      // setting context data
      setJournals(state)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  if(error) {
    console.log(error)
    return <Error error={error} />
  }
  if(loading){
    return <Loading />
  }
  // Running sorting algos
  if(sortBy.trend!=="" && sortBy.property!==""){
    if(sortBy.trend === "ascending"){
      data.sort(sortAsc(sortBy.property))
    }
    if(sortBy.trend === "descending"){
      data.sort(sortDsc(sortBy.property))
    }
  }

  return (
      <>
        <FilterBox onRadioChangeHandler={onRadioChangeHandler} radioValue={radioValue} />
        <SortingBox onChangeHandler = {onChangeHandler} />
        <AccountTable 
          accounts = {data}
        />
      </>
    );
}
 
export default DashBoard;
