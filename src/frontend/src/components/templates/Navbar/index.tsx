import './style.css'
import {Button, Heading, useDisclosure} from '@chakra-ui/react'
import React, { useContext } from 'react'
import SideDrawer from "../../SideDrawer"

import {Link, useLocation} from 'react-router-dom'
import { UserContext } from '../../../context/userContextProvider'
import { logout } from '../../../actions/logout'



export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const {state, dispatch} = useContext(UserContext)
  const location = useLocation()

  const currentPath = location.pathname
  const getNavLinks = () => {
    switch(currentPath){
      case "/admin":
        return {navLink: "/", navLinkName:"Dashboard"}
      case "/":
        return {navLink:"/admin", navLinkName:"Admin"}
      case "/login":
        return {navLink:"/register", navLinkName:"Register"}
      case "/register":
        return {navLink:"/login", navLinkName:"Login"}
      default:
        return {navLink:"/login", navLinkName:"Login"}
    }
  }
  const {navLink, navLinkName} = getNavLinks()

  const showDemographButton:boolean = currentPath === "/" 
  const showLogoutButton:boolean = state.user ? true:false 


  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef(null)
  const logoutHandler =  () => logout(dispatch)
  return (
    <nav className="navbar">
      <Heading d="inline" size="lg">Recko</Heading>
      <div className="navbar-options">
       {!showLogoutButton &&
          <h6><Link to={navLink}>{navLinkName}</Link></h6>}
        {showLogoutButton &&
          <h6><Link to={navLink}>{navLinkName}</Link></h6>}
        {showDemographButton && <Button margin="auto 5px" d="inline" colorScheme="teal" onClick={onOpen}>
          Demographs
        </Button>}
        {showLogoutButton && <Button margin="auto 0" d="inline" colorScheme="gray" onClick={logoutHandler}>
          Logout
        </Button>}
      </div>
      
      <SideDrawer 
        isOpen = {isOpen}
        onClose = {onClose}
        firstField = {firstField}
      />
    </nav>
  );
}
 
export default Navbar;