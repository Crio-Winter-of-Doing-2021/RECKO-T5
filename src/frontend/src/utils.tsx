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