import {FormControl, FormLabel, Input, Button, Box, Heading, useToast} from '@chakra-ui/react'
import { UserContext } from "../../context/userContextProvider";
import { useState, useContext } from "react";
import { login } from "../../actions/login";
import { useHistory } from "react-router-dom";


export interface LoginFormProps {
  email:string
  password:string
}
 
const LoginForm: React.FC = () => {
  const router = useHistory()
  const {dispatch} = useContext(UserContext)

  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast()
  const [formData, setFormData] = useState<LoginFormProps>({
    email:"",
    password:""
  })
  
  
  const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    // post the data using axios.
    e.preventDefault()

    setLoading(true);
    try{
      await login(dispatch, formData);
      toast({
        title: "Logged In.",
        // description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return router.replace("/");
    }catch(e){
      // console.log(e?.response?.data?.error || e)
      setLoading(false);
      toast({
        title: "Error",
        description: e?.response?.data?.error || e.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    
  }
  const onChangeHandler = (e:any) => {
    setFormData((prev) => {
      return {...prev, [e.target.name] : e.target.value}
    })
  }
  return (
    <Box width="80%" maxWidth="400px" margin="auto" mt="10" background="orange.50" padding="20px">
      <Heading mb="5">Login.</Heading>
      <form onSubmit={onSubmitHandler}>
      <FormControl isRequired>
        {/* email field */}
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" name="email" type="email" onChange={onChangeHandler} value={formData.email} />
        {/* password field */}
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Password" name="password" onChange={onChangeHandler} value={formData.password} />
        {/* submit button */}
        <Button
        mt={4}
        colorScheme="teal"
        isLoading={loading}
        // isLoading={props.isSubmitting}
        type="submit">Submit</Button>
      </FormControl>
      </form>
    </Box>
  );
}
 
export default LoginForm;