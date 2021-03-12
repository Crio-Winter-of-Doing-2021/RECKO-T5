import './style.css'
import {Button, Heading, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import SideDrawer from "../../SideDrawer"
<<<<<<< HEAD
import {Link, useLocation} from 'react-router-dom'
=======
>>>>>>> main

export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
<<<<<<< HEAD
  const location = useLocation()

  const currentPath = location.pathname
  const navLinkPath = currentPath === "/admin" ? "/" : "/admin"
  const navLinkName = navLinkPath === "/admin" ? "Admin" : "Dashboard"
  const showDemographButton:boolean = currentPath === "/" 

  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef(null)

  return (
    <nav className="navbar">
      <Heading d="inline" size="lg">Recko</Heading>

      <div className="navbar-options">
        <h6><Link to={navLinkPath}>{navLinkName}</Link></h6>
        {showDemographButton && <Button margin="auto 0" d="inline" colorScheme="gray" onClick={onOpen}>
          Demographs
        </Button>}
      </div>

=======
  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef(null)
  return (
    <nav className="navbar">
      <Heading d="inline" size="lg">Recko</Heading>
      <Button  colorScheme="gray" onClick={onOpen}>
        Demographs
      </Button>
>>>>>>> main
      <SideDrawer 
        isOpen = {isOpen}
        onClose = {onClose}
        firstField = {firstField}
      />
    </nav>
  );
}
 
export default Navbar;