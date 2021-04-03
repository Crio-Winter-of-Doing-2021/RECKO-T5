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
  useDisclosure
} from "@chakra-ui/react"
import {useState} from 'react'

export interface AddAccountFormProps {
  
}
 
const AddAccountForm: React.FC<AddAccountFormProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState("")
  return (
    <>
      <Button m="5" colorScheme="teal" onClick={onOpen}>Add Account</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Create a form for account POST API */}
            <Input type="text" onChange={e => setValue(e.target.value)} value={value} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              cancel
            </Button>
            <Button colorScheme="blue" onClick={()=>{console.log(value)}}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
 
export default AddAccountForm;


