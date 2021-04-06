import { Box, Button, Heading, Image } from "@chakra-ui/react"
import {baseUrl} from '../../constants'
import UserInfo from "../UserInfo";
export interface AdminPageProps {
    
}
 
const AdminPage: React.FC<AdminPageProps> = () => {

  return (
    <Box>
      <Image src="https://images.yourstory.com/cs/images/companies/recko-1591263640080.jpg" boxSize="200px" objectFit="cover" borderRadius="full" border="1px solid black" margin="auto" mt="10" />
      <Heading as="h3" mt="10" textAlign="center" textDecoration="underline" >Recko Organisation</Heading>
      
      <div style={{margin:"auto", textAlign:"center"}}>
        <Button m="4" colorScheme="blue" onClick = {() => window.open(baseUrl + "/xero")}>Connect with XERO</Button>
        <Button colorScheme="teal"  onClick = {() => window.open(baseUrl + "/quickbooks")}>Connect with QUICKBOOKS</Button>
      </div>

      <UserInfo />
      {/* <Employees /> */}
    </Box>
  );
}
 
export default AdminPage;