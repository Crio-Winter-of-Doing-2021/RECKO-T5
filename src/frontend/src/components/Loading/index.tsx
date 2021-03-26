import {CircularProgress} from '@chakra-ui/react'

export interface LoadingProps {
  
}
 
const Loading: React.FC<LoadingProps> = () => {
  return (
    <div style={{height:"90vh", textAlign:"center"}}>
      <CircularProgress  top="45%" isIndeterminate color="green.300" />
    </div>
  );
}
 
export default Loading;