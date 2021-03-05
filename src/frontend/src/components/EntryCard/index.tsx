import { Box, Badge, Text } from "@chakra-ui/react"
// import './style.css'

export interface EntryCardProps {
  accountName : string,
  accountId : string,
  amount : string,
  date : string,
  type : "debit" | "credit"
  provider : string
}
 
const EntryCard: React.FC<EntryCardProps> = ({provider, accountName, accountId, amount, date, type}) => {
  return (
    <Box className="entry-card" width="100%" backgroundColor="#F7FAFC" color="#2D3748" bgGradient="linear(to-r, #F7FAFC,##F5F7FA)" padding="10px" d="flex" alignItems="baseline" justifyContent="space-evenly" margin="auto" overflow="hidden">
        <Text fontWeight="normal" margin="auto 0" padding="10px">{provider}</Text>
        <Text fontWeight="semibold" margin="auto 0" padding="10px">{date}</Text>
        <Text fontWeight="semibold" margin="auto 0" padding="10px">{accountName}</Text>
        <Text fontWeight="semibold" margin="auto 0" padding="10px">{accountId}</Text>
        <Box d="flex" alignItems="baseline" margin="auto 0">
          <Badge borderRadius="full" px="3" colorScheme="teal" fontSize="sm" >
            {type}
          </Badge>
        </Box>
        <Text fontWeight="bold" margin="auto 0" padding="10px">{amount}</Text>
    </Box>
    
  );
}
 
export default EntryCard;