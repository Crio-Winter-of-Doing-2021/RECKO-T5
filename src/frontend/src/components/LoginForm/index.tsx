import {FormControl, FormLabel, Input, Button, Box, Heading} from '@chakra-ui/react'
// import useFetch from '../../hooks/useFetch'
import {useState} from 'react'

export interface LoginFormProps {
  email:string
  password:string
}
 
const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormProps>({
    email:"",
    password:""
  })
  
  // const {state, error, loading} = useFetch({
  //   url:"/register",
  //   headers:{
  //     ContentType:"application/json"
  //   },
  //   method:"POST",
  //   body: formData
  // })
  const onSubmitHandler = (e:React.FormEvent<HTMLFormElement>) => {
    // post the data using axios.
    e.preventDefault()
    console.log("submitted", formData)
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
        // isLoading={props.isSubmitting}
        type="submit">Submit</Button>
      </FormControl>
      </form>
    </Box>
  );
}
 
export default LoginForm;