import {Box, Heading} from '@chakra-ui/react'
import EmployeeCard, {EmployeeCardProps} from '../EmployeeCard'

export interface EmployeesProps {
  employees : Array<EmployeeCardProps>
}
 
const Employees: React.FC<EmployeesProps> = ({employees}) => {
  return ( 
    <>
    <Box width="90%" margin="auto" mt="30px">
      <Heading as="h5" fontSize="1.75rem" margin="10px" mb={4}>Employees</Heading>
      <Box margin="auto" display="flex" flexWrap="wrap" justifyContent="flex-start">
        {
          employees.map((employee) => {
            return (
            <EmployeeCard 
              key = {employee.id}
              id = {employee.id}
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