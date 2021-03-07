import AccountRow, {AccountRowProps} from "../AccountRow";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react"
import React from "react";

export interface AccountTableProps{
  accounts : Array<AccountRowProps>
}


const AccountTable : React.FC<AccountTableProps> = ({accounts}) => {
  return (
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
            return <AccountRow 
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
  )
 
}

export default AccountTable;
