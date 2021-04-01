import axios , {AxiosResponse} from 'axios'
import {baseUrl} from './constants'
export const sortDsc = (property:string) => {
  return function(a:any, b:any){
    if(a[property] > b[property]){
      return -1
    }
    if(b[property] > a[property]){
      return 1
    }
    return 0
  }
}


export const sortAsc = (property:string) => {
  return function(a:any, b:any){
    if(a[property] > b[property]){
      return 1
    }
    if(b[property] > a[property]){
      return -1
    }
    return 0
  }
}


interface httpParams{
  url:string
  headers:object | null 
  body : object
  method : "GET" | "PUT" | "POST" | "PATCH"
}

export const HTTP = async ({url, headers, body, method}:httpParams) => {
  try{
    const response:AxiosResponse<any> = await axios({
      method,
      data:body,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      withCredentials: true,
      url,
      baseURL:baseUrl,
    })
    console.log(response.data)
    return response.data
  }catch(e){
    console.log(e)
    throw e
  }
  
}