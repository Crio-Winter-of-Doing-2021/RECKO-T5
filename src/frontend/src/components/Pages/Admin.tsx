import { Box, Heading, Image } from "@chakra-ui/react"
import useFetch from "../../hooks/useFetch"
import Employees from "../Employees"
import Error from "../Error"
import Loading from "../Loading"

export interface AdminPageProps {
  
}
 
const AdminPage: React.FC<AdminPageProps> = () => {
  const {state, loading, error} = useFetch({
    url:"/employee",
    method:"GET",
  })
  if(error) {
    console.log(error)
    return <Error error={error} />
  }
  if(loading){
    return <Loading />
  }
  return (
    <Box>
      <Image src="https://images.yourstory.com/cs/images/companies/recko-1591263640080.jpg" boxSize="200px" objectFit="cover" borderRadius="full" border="1px solid black" margin="auto" mt="10" />
      <Heading as="h3" mt="10" textAlign="center" textDecoration="underline" >Recko Organisation</Heading>
      <Employees employees={state} />
    </Box>
  );
}
 
export default AdminPage;