import AccountTable from '../AccountTable'

export interface DashBoardProps {
  
}
 
const DashBoard: React.FC<DashBoardProps> = () => {
  return (
    <AccountTable 
      accounts = {[
        {id : "1", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"credit", amount:2000},
        {id : "2", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"debit", amount:2000},
        {id : "2", accountId:"abcd1234", accountName:"Triumph", date:"21/06/2021", provider:"XERO", type:"credit", amount:2000}
      ]}
    />
  );
}
 
export default DashBoard;