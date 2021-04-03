import './style.css'
import {Button, Heading, useDisclosure} from '@chakra-ui/react'
import React, { useContext, useRef } from 'react'
import SideDrawer from "../../SideDrawer"

import {Link, useLocation} from 'react-router-dom'
import { UserContext } from '../../../context/userContextProvider'
import { logout } from '../../../actions/logout'

import { HamburgerIcon } from '@chakra-ui/icons'



export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  const {state, dispatch} = useContext(UserContext)
  const location = useLocation()
  const navMenu = useRef(null)

  const currentPath = location.pathname

  const showDemographButton:boolean = currentPath === "/" 
  const showLogoutButton:boolean = state.user ? true:false 

  const getNavLinks = () => {
    if((currentPath === "/login" || currentPath === "/register") && showLogoutButton){
      return {navLink: "/", navLinkName:"Dashboard"}
    }
    switch(currentPath){
      case "/admin":
      case "/account":
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


  const { isOpen, onOpen, onClose } = useDisclosure()
  const firstField = React.useRef(null)
  const logoutHandler =  () => logout(dispatch)
  return (
    <nav className="navbar">
      <Heading d="inline" m="auto 0" size="lg">Recko</Heading>
      <div className="navbar-options">
       {!showLogoutButton &&
          <h6><Link to={navLink}>{navLinkName}</Link></h6>}
        {showLogoutButton &&
          <h6><Link to={navLink}>{navLinkName}</Link></h6>}
        {showLogoutButton &&
        <h6><Link to={'/account'}>Accounts</Link></h6>}
        {showDemographButton && <Button margin="auto 5px" d="inline" colorScheme="teal" onClick={onOpen}>
          Demographs
        </Button>}
        {showLogoutButton && <Button margin="auto 0" d="inline" colorScheme="gray" onClick={logoutHandler}>
          Logout
        </Button>}
      </div>

      {/* Mobile navbar */}
      <div className="navbar-burger" onClick={() => {
        // @ts-ignore
        navMenu.current.classList.toggle('hidden');
        // @ts-ignore
        const btns = Array.from(navMenu.current.children)
        // @ts-ignore
        btns.forEach(b => b.onclick = () => { navMenu.current.classList.add('hidden');})
      }}><HamburgerIcon /></div>

      <div className="navbar-dropdown hidden" ref={navMenu}>
       {!showLogoutButton &&
          <p><Link to={navLink}>{navLinkName}</Link></p>}
        {showLogoutButton &&
          <p><Link to={navLink}>{navLinkName}</Link></p>}
        {showLogoutButton &&
        <p><Link to={'/account'}>Accounts</Link></p>}
        {showDemographButton && <p onClick={onOpen}>
          Demographs
        </p>}
        {showLogoutButton && <p onClick={logoutHandler}>
          Logout 
        </p>}
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