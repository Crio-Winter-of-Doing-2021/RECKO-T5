import AccountRow, {AccountRowProps} from "../AccountRow";


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react"


export interface AccountTableProps{
  accounts : Array<AccountRowProps> 
}


const AccountTable : React.FC<AccountTableProps> = ({accounts}) => {
  return (
    <div style= {{overflowX : "scroll"}}>
    <Table variant="simple">
        <TableCaption>Accounting records</TableCaption>
        <Thead>
          <Tr>
            <Th>Provider</Th>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Account ID</Th>
            <Th>Class</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          accounts && accounts.map((acc) => {
            return <AccountRow 
                    key = {acc._id}
                    provider={acc.provider}
                    name = {acc.name}
                    aid = {acc.aid}
                    class={acc.class}
                    type = {acc.type}
                  />
          })
        }
        </Tbody>
    </Table>  
  </div>      
  )
 
}

export default AccountTable;
