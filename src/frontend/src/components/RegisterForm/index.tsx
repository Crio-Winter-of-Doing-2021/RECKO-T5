import {FormControl, FormLabel, Input, RadioGroup, Radio, Button, Box, Heading, useToast} from '@chakra-ui/react'
import {useState} from 'react'
import {HTTP} from '../../utils'

export interface RegisterFormProps {
  name:string
  email:string
  password:string
  admin : boolean
}
 
const RegisterForm: React.FC = () => {
  const toast = useToast()
  const [formData, setFormData] = useState<RegisterFormProps>({
    name:"",
    email:"",
    password:"",
    admin:false
  })

  const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    // post the data using axios.
    e.preventDefault()
    try{
      const response = await HTTP({url:"/register", headers:null, body:formData, method:"POST"})
      console.log(response.message)
      return toast({
        title: "Account created.",
        description: response.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }catch(e){
      console.log(e.response.data.error)
      return toast({
        title: "Error",
        description: e.response.data.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    }
    console.log("submitted", formData)
  }
  const onChangeHandler = (e:any) => {
    setFormData((prev) => {
      return {...prev, [e.target.name] : e.target.value}
    })
  }
  return (
    <Box width="80%" maxWidth="400px" margin="auto" mt="10" background="orange.50" padding="20px">
      <Heading mb="5">Register.</Heading>
      <form onSubmit={onSubmitHandler}>
      <FormControl isRequired>
        {/* name field */}
        <FormLabel>Name</FormLabel>
        <Input placeholder="name" name="name" onChange={onChangeHandler} value={formData.name} />
        {/* email field */}
        <FormLabel>Email</FormLabel>
        <Input placeholder="Email" name="email" type="email" onChange={onChangeHandler} value={formData.email} />
        {/* password field */}
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Password" name="password" onChange={onChangeHandler} value={formData.password} />
        {/* admin field */}
        <FormLabel>Position</FormLabel>
        <RadioGroup defaultValue="false" value={formData.admin === true ? "true" : "false"} onChange={(val) => {
          const admin = val === "true"
          setFormData((prev) => ({...prev, admin }))
        }}>
          <Radio value="false">regular</Radio>
          <Radio value="true">admin</Radio>
        </RadioGroup>
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
 
export default RegisterForm;