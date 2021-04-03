import { Tr, Td } from "@chakra-ui/react"


export interface AccountRowProps {
  _id ?: string
  aid : string
  name : string
  type : string
  class : string
  provider : string
}
 
const AccountRow: React.FC<AccountRowProps> = (acc) => {
  return (
        <Tr>
          <Td>{acc.provider}</Td>
          <Td>{acc.name}</Td>
          <Td>{acc.type}</Td>
          <Td>{acc.aid}</Td>
          <Td>{acc.class}</Td>
        </Tr>
  );
}
 

export default AccountRow;