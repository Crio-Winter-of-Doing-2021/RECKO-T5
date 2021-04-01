export const __prod__ = process.env.NODE_ENV === "production" ? true : false
export const devUrl = "http://localhost:5000/api"
export const prodUrl = "--"
export const baseUrl = __prod__ ? prodUrl : devUrl
