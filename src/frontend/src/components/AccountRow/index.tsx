import { Tag, TagLabel, Tr, Td } from "@chakra-ui/react"
// import './style.css'

export interface AccountRowProps {
  id ?: string,
  accountName : string,
  accountId : string,
  amount : Number,
  date : string,
  type : "debit" | "credit"
  provider : string
}
 
const AccountRow: React.FC<AccountRowProps> = ({provider, accountName, accountId, amount, date, type}) => {
  const ColorOfTag : string = type === "credit" ? "green" : "red"
  return (
        <Tr>
          <Td>{provider}</Td>
          <Td>{date}</Td>
          <Td>{accountName}</Td>
          <Td>{accountId}</Td>
          <Td>
          <Tag size="md" colorScheme={ColorOfTag} borderRadius="full">
            <TagLabel>{type}</TagLabel>  
          </Tag>
          </Td>
          <Td isNumeric>{amount}</Td>
        </Tr>
  );
}
 

export default AccountRow;