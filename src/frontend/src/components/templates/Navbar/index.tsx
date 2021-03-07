import './style.css'
import {Button, Heading} from '@chakra-ui/react'
export interface NavbarProps {
  
}
 
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="navbar">
      <Heading d="inline" size="lg">Recko</Heading>
      <Button>Click me</Button>
    </nav>
  );
}
 
export default Navbar;