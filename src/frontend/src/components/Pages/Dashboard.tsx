import JournalTable from '../JournalTable'
import Error from '../Error'
import Loading from '../Loading'
import SortingBox from '../SortingBox'
import FilterBox from '../FilterBox'
import {sortAsc, sortDsc} from '../../utils'
import { JournalRowProps } from '../JournalRow'
import  {journalDataContext} from '../../context/journalDataProvider'

import {useContext, useEffect, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import Pagination from '../Pagination'

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
  const [data, setData] = useState<Array<JournalRowProps>>([])
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
      let filteredData = state.journals.filter((d:JournalRowProps) => d.provider === value)
      setData(filteredData)
    }else{
      setData(state.journals)
    }
  }

  // Pagination params
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const journalsPerPage = 40
 
  // API CALL
  const {state, loading, error, refetch} = useFetch({
    url:`/journal?limit=${journalsPerPage}&offset=${page*journalsPerPage}`,
    headers:{
      "Content-type":"application/json"
    },
    method:"GET"
  })

  // calling hook to set the data value when we get state from api call
  useEffect(()=>{
    if(state){
      console.log(state)
      setData(state.journals)
      let tp = (state.numberOfJournals)/journalsPerPage
      // setting total pages to be created for pagination
      setTotalPages(tp)
      // setting context data
      setJournals(state.journals)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])


  // PAGINATION HANDLERS
  // refetch when page changes
  useEffect(()=>{
    console.log(page)
    refetch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
  const handlePageClick = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected)
    // console.log(selectedItem.selected)
  }

  if(error) {
    console.log(error?.response?.data?.error)
    return <Error error={error?.response?.data?.error || error.message} />
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
        <JournalTable 
          accounts = {data}
        />
       <Pagination page={page} totalPages={totalPages} handlePageClick={handlePageClick}/>
      </>
    );
}
 
export default DashBoard;
