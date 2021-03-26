import { Heading } from "@chakra-ui/react"

export interface ErrorProps {
  error:string
}
 
const Error: React.FC<ErrorProps> = ({error}) => {
  return (
    <div style={{height:"90vh",textAlign:"center"}}>
      <div style={{position:"relative", top:"30%"}}>
      <Heading as="h1" size="4xl" isTruncated>
        Error..404
      </Heading>
      <Heading as="h5" fontSize="1rem" isTruncated>
        {error}
      </Heading>
      </div>
      
    </div>
  );
}
 
export default Error;