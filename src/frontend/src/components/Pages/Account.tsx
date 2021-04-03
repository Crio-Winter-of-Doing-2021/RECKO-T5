import AccountTable from '../AccountTable'
import Error from '../Error'
import Loading from '../Loading'
import { AccountRowProps } from '../AccountRow'

import {useEffect, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import Pagination from '../Pagination'
import AddAccountForm from '../AddAccountForm'


export interface AccountPageProps {
  
}
 
const AccountPage: React.FC<AccountPageProps> = () => {
  const [data, setData] = useState<Array<AccountRowProps>>([])
  // Pagination params
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)
  const accountPerPage = 40

   // API CALL
   const {state, loading, error, refetch} = useFetch({
    url:`/account?limit=${accountPerPage}&offset=${page*accountPerPage}`,
    headers:{
      "Content-type":"application/json"
    },
    method:"GET"
  })

  // calling hook to set the data value when we get state from api call
  useEffect(()=>{
    if(state){
      console.log(state)
      setData(state.accounts)
      let tp = (state.numberOfAccounts)/accountPerPage
      // setting total pages to be created for pagination
      setTotalPages(tp)
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
  return (
      <>  
       {/* Create a button to create new accounts and a form to resolve that */}
        <AddAccountForm />
        <AccountTable 
          accounts = {data}
        />
       <Pagination page={page} totalPages={totalPages} handlePageClick={handlePageClick}/>
      </>
    );
}
 
export default AccountPage;