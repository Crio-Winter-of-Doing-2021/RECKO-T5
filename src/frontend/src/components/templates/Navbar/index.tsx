import './style.css'
import {Button, Heading, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import SideDrawer from "../../SideDrawer"

export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef(null)
  return (
    <nav className="navbar">
      <Heading d="inline" size="lg">Recko</Heading>
      <Button  colorScheme="gray" onClick={onOpen}>
        Demographs
      </Button>
      <SideDrawer 
        isOpen = {isOpen}
        onClose = {onClose}
        firstField = {firstField}
      />
    </nav>
  );
}
 
export default Navbar;