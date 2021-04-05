import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure, 
  useToast
} from "@chakra-ui/react"
import {
  FormControl,
  FormLabel,
  Select,
  RadioGroup,
  Radio,
  HStack,
  FormHelperText,
} from "@chakra-ui/react"
import {useState} from 'react'
import {HTTP} from '../../utils'
export interface AddAccountFormProps {
  
}
 
const AddAccountForm: React.FC<AddAccountFormProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  // send only name and accountType if provider === "QUICKBOOKS"
  const [formData, setFormData] = useState<any>({
    name:"",
    code:"",
    type:"",
    provider:"XERO"
  })
  const [loading, setLoading] = useState<boolean>(false)

  const submitHandler = async (e:any) => {
    e.preventDefault()
    
    const {name, code, type} = formData
    let data = {}
    let queryParam = `provider=${formData.provider}`
    if(formData.provider === "XERO"){
      // name, code, type
      data = {
        name, code, type
      }
    }else{
      data = {
        Name: name, AccountType:type
      }
    }
    try{
      console.log(data)
      setLoading(true)
      const response = await HTTP({
        url:`/v2/account?${queryParam}`,
        headers:null,
        body:data,
        method:"POST"
      })
      console.log(response)
      toast({
        title: "Account created",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }catch(e){
      console.log(e)
      toast({
        title: "Error",
        status: "error",
        description:e.response?.data?.error ?? e.message,
        duration: 5000,
        isClosable: true,
      })
    }finally{
      setLoading(false)
    }
    
  } 
  return (
    <>
      <Button m="5" colorScheme="teal" onClick={onOpen}>Add Account</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add an Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Create a form for account POST API */}
            <form onSubmit={submitHandler}>
            <FormControl>
              {/* provider */}
              <FormLabel>Provider</FormLabel>
              <RadioGroup defaultValue={formData.provider} onChange={(val) => setFormData({...formData, provider:val, type:""})}>
                <HStack spacing="24px">
                  <Radio value="XERO">Xero</Radio>
                  <Radio value="QUICKBOOKS">Quickbooks</Radio>
                </HStack>
              </RadioGroup>

              {/* Type */}
              <FormLabel>Type</FormLabel>
              <Select required placeholder="Select type" value={formData.type} 
                onChange={(e) => {
                  setFormData({...formData, type:e.target.value})
                }}>
                {
                   formData.provider === "XERO" && 
                   XERO_TYPES.map((type) => <option>{type}</option>)
                } 

                {
                  formData.provider === "QUICKBOOKS" && 
                  QUICKBOOKS_TYPES.map((type) => <option>{type}</option> )
                }
              </Select>

              {/* Name */}
              <FormLabel>Name</FormLabel>
              <Input type="text" required value={formData.name} onChange={(e)=>{
                      setFormData({...formData, name:e.target.value})
                  }} />
              <FormHelperText>Provide with a unique name</FormHelperText>

              {/* Code */}
              {
                formData.provider === "XERO" && 
                (
                  <div>
                    <FormLabel>Code</FormLabel>
                    <Input type="text" value={formData.code} onChange={(e)=>{
                      setFormData({...formData, code:e.target.value})
                    }} />
                    <FormHelperText>Provide with a unique code</FormHelperText>
                  </div>
                )

              }
              <Button isLoading={loading} mt="5" colorScheme="blue" type="submit">Submit</Button>
            </FormControl>
          </form>            
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              cancel
            </Button>
            {/* <Button colorScheme="blue" onClick={()=>{console.log(formData)}}>Submit</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
 
export default AddAccountForm;


const QUICKBOOKS_TYPES : Array<string> = [
  "Bank",
  "Other Current Asset",
  "Fixed Asset",
  "Other Asset",
  "Accounts Receivable",
  "Expense",
  "Other Expense",
  "Cost of Goods Sold",
  "Accounts Payable",
  "Credit Card",
  "Long Term Liability",
  "Other Current Liability",
  "Income",
  "Other Income"
]

const XERO_TYPES : Array<string> = [
  "CURRENT",
  "CURRLIAB",
  "DEPRECIATN",
  "DIRECTCOSTS",
  "EQUITY",
  "EXPENSE",
  "FIXED",
  "INVENTORY",
  "LIABILITY",
  "NONCURRENT",
  "OTHERINCOME",
  "OVERHEADS",
  "PREPAYMENT",
  "REVENUE",
  "SALES",
  "TERMLIAB",
  "PAYGLIABILITY",
  "PAYG",
  "SUPERANNUATIONEXPENSE",
  "SUPERANNUATIONLIABILITY",
  "WAGESEXPENSE"
]