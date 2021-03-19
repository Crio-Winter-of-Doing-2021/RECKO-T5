import { useCallback, useEffect, useState } from "react";
import axios from 'axios'


export interface useFetchProps {
  url: string
  headers : object | null
  method: "GET" | "POST" | "PATCH" | "DELETE"
  body : object | null
}
 
const useFetch: any = ({url, headers, method, body }:useFetchProps) => {

  const [state, setState]  = useState<any>(null)
  const [error, setError]  = useState<any>(null)
  const [loading, setLoading]  = useState<boolean>(true)


  const callAPI = useCallback(async ()=>{
      // set everything here
      setLoading(true)
      console.log("api called");
      try{
        const response = await axios(url, {
          headers,
          data:body,
          method,
          baseURL:"http://localhost:8080/v1",
        })
        setState(response.data)
        setError(null)
      }
      catch(e){
        console.log(e)
        setState(null)
        setError(e.message)
      }
      finally{
        setLoading(false)
      }
  }, [url, headers, body, method])
  

  useEffect(()=>{
    callAPI()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ({state,error,loading});
}
 
export default useFetch;