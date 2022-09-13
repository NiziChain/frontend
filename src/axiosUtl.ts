import axios from 'axios'

const DEFAULT_API_CONFIG = {
  baseURL: 'http://0.0.0.0:4000/api/v1',
  timeout: 5000,
  mode: 'cors',
  credentials: 'include',
  headers: {
    ContentType: 'application/json',
    Accept: 'application/json',
  },
}

const newAxiosInstance = () => {
  const instance = axios.create(DEFAULT_API_CONFIG)

  instance.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(response)
      }
      return response
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return instance
}

export const getAPIData = async (path: string) => {
  const instance = newAxiosInstance()
  try {
    const response = await instance.get(path)
    return response
  } catch (error: any) {
    return error.response
  }
}

export const postAPIData = async (path: string) => {
    const instance = newAxiosInstance()
    try {
        const response = await instance.post(path)
        return response
    } catch(error: any) {
        return error.response
    }
}