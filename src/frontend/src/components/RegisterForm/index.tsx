import {FormControl, FormLabel, Input, RadioGroup, Radio, Button, Box} from '@chakra-ui/react'
// import useFetch from '../../hooks/useFetch'
import {useState} from 'react'

export interface RegisterFormProps {
  name:string
  email:string
  password:string
  admin : boolean
}
 
const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormProps>({
    name:"",
    email:"",
    password:"",
    admin:false
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
    <Box width="80%" maxWidth="400px" margin="auto" mt="10">
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