import { Tag, TagLabel, Tr, Td } from "@chakra-ui/react"
// import './style.css'

export interface AccountRowProps {
  _id ?: string,
  accountName : string,
  accountId : string,
  amount : number,
  date : string,
  type : "DEBIT" | "CREDIT"
  provider : string
}
 
const AccountRow: React.FC<AccountRowProps> = ({provider, accountName, accountId, amount, date, type}) => {
  const ColorOfTag : string = type.toUpperCase() === "CREDIT" ? "green" : "red"
  return (
        <Tr>
          <Td>{provider}</Td>
          <Td>{new Date(date).toLocaleDateString()}</Td>
          <Td>{accountName}</Td>
          <Td>{accountId}</Td>
          <Td>
          <Tag size="md" colorScheme={ColorOfTag} borderRadius="full">
            <TagLabel>{type}</TagLabel>  
          </Tag>
          </Td>
          <Td isNumeric>{Math.abs(amount)}</Td>
        </Tr>
  );
}
 

export default AccountRow;