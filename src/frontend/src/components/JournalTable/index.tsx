import JournalRow, {JournalRowProps} from "../JournalRow";


import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react"


export interface JournalTableProps{
  accounts : Array<JournalRowProps> 
}


const JournalTable : React.FC<JournalTableProps> = ({accounts}) => {
  return (
    <div style= {{overflowX : "scroll"}}>
    <Table variant="simple">
        <TableCaption>Accounting records</TableCaption>
        <Thead>
          <Tr>
            <Th>Provider</Th>
            <Th>Date</Th>
            <Th>Account Name</Th>
            <Th>Account ID</Th>
            <Th>type</Th>
            <Th>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
        {
          accounts.map((acc) => {
            return <JournalRow 
                    key = {acc._id}
                    provider={acc.provider}
                    accountName = {acc.accountName}
                    date = {acc.date}
                    accountId = {acc.accountId}
                    type = {acc.type}
                    amount = {acc.amount}
                  />
          })
        }
        </Tbody>
    </Table>  
  </div>      
  )
 
}

export default JournalTable;
