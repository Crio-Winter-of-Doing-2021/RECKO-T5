import React from "react";
import {Box, Badge, Heading} from '@chakra-ui/react'
import useFetch from '../../hooks/useFetch'
export interface UserInfoProps {
  
}
 
const UserInfo: React.FC<UserInfoProps> = () => {
  const {state, loading, error} = useFetch({
    url:"/user",
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
    <Box width="90%" margin="auto" mt="30px" textAlign="center">
      { state.admin === true && 
        <Badge borderRadius="full" px="2" colorScheme="teal">
          Admin
       </Badge>
      }
       <Heading fontSize="1.25rem" m="5">Name : {state.name}</Heading>
       <Heading fontSize="1.25rem">Email : {state.email}</Heading>
    </Box>
  );
}
 
export default UserInfo;