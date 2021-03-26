import {Box} from '@chakra-ui/react'

export interface externalLink{
  url:string
  description:string
}

export interface EmployeeCardProps {
  _id:string
  eid : string
  firstName : string
  lastName : string
  // externalLink:externalLink
}
 
const EmployeeCard: React.FC<EmployeeCardProps> = ({_id ,eid, firstName, lastName}) => {
  return (
    <Box fontSize="md" backgroundColor="gray.50" padding="20px" d="flex" flexDirection="column" margin="10px" borderRadius="md">
      <Box color="gray.800" fontSize="md" d="inline">
           id : {eid}
      </Box>
      <Box
          mt="1"
          d ="inline"
          fontWeight="semibold"
          fontSize="1.5rem"
        >
          {firstName} {lastName}
        </Box>
    </Box>
  );
}
 
export default EmployeeCard;