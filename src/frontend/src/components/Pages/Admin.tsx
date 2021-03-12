import { Box, Heading, Image } from "@chakra-ui/react"
import Employees from "../Employees"

export interface AdminPageProps {
  
}
 
const AdminPage: React.FC<AdminPageProps> = () => {
  const employees = [
    {
      id:"btech-10251-19",
      firstName:"Akshat",
      lastName : "garg"
    },
    {
      id:"btech-10192-19",
      firstName:"John",
      lastName : "Doe"
    },
    {
      id:"btech-10255-19",
      firstName:"Nick",
      lastName : "Fury"
    }
  ]
  return (
    <Box>
      <Image src="https://images.yourstory.com/cs/images/companies/recko-1591263640080.jpg" boxSize="200px" objectFit="cover" borderRadius="full" border="1px solid black" margin="auto" mt="10" />
      <Heading as="h3" mt="10" textAlign="center" textDecoration="underline" >Recko Organisation</Heading>
      <Employees employees={employees} />
    </Box>
  );
}
 
export default AdminPage;