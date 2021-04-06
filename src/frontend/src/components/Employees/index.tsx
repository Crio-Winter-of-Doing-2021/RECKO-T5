import {Box, Heading} from '@chakra-ui/react'
import EmployeeCard, {EmployeeCardProps} from '../EmployeeCard'

import useFetch from '../../hooks/useFetch'
export interface EmployeesProps {
  employees : Array<EmployeeCardProps>
}
 
const Employees: React.FC<any> = () => {
  const {state, loading, error} = useFetch({
    url:"/employee",
    method:"GET",
  })
  if(error) {
    // console.log(error.response.data.error)
    return (
    <Box width="90%" margin="auto" mt="30px">
      <h3>Error: {error?.response?.data?.error || error.message} </h3> 
    </Box>
    )
  }
  if(loading){
    return (
    <Box width="90%" margin="auto" mt="30px">
      <h3>Loading...</h3>
    </Box>
    )
  }
  return ( 
    <>
    <Box width="90%" margin="auto" mt="30px">
      <Heading as="h5" fontSize="1.75rem" margin="10px" mb={4}>Employees</Heading>
      <Box margin="auto" display="flex" flexWrap="wrap" justifyContent="flex-start">
        {
          state.map((employee:EmployeeCardProps) => {
            return (
            <EmployeeCard 
              key = {employee._id}
              _id = {employee._id}
              eid = {employee.eid}
              firstName={employee.firstName} 
              lastName = {employee.lastName}
            />
            )
          })
        }
    </Box>
  </Box>
  </>
  );
}
 
export default Employees;