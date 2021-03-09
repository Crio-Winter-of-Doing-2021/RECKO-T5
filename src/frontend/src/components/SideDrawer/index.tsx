import { 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react"
import React from 'react'
import Demographs from "../Demographs"

export interface SideDrawerProps {
  isOpen : boolean,
  onClose : () => void
  firstField: React.MutableRefObject<null>
}
 
const SideDrawer: React.FC<SideDrawerProps> = ({isOpen, firstField, onClose}) => {
  return (
      <Drawer
      size="md"
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Demographs
          </DrawerHeader>

          <DrawerBody>
            <Demographs />
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
          
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
 

export default SideDrawer;