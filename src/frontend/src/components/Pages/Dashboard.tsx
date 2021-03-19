import AccountTable from '../AccountTable'
import useFetch from '../../hooks/useFetch'

export interface DashBoardProps {
  
}
 
const DashBoard: React.FC<DashBoardProps> = () => {
  const {state, loading, error} = useFetch({
    url:"/journal",
    headers:{
      "Content-type":"application/json"
    },
    body:null,
    method:"GET"
  })
  if(error) {
    console.log(error)
    return <h1>error</h1>
  }
  if(loading){
    return <h1>Loading...</h1>
  }
  return (
      <>
        <AccountTable 
          accounts = {state}
        />
      </>
    );
  
}
 
export default DashBoard;


// [
//   {id : "1", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"credit", amount:2000},
//   {id : "2", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"debit", amount:2000},
//   {id : "3", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"credit", amount:2000}
// ]