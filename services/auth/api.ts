import { ILogin, IRegister } from '@/@types/auth/auth'
import api from '../api'

export const AuthService = {
  login: async (props: ILogin) => {
    const response = await api.post('/auth/login', props)
    return response.data
  },

  register: async (props: IRegister) => {
    const response = await api.post('/auth/register', props)
    return response.data
  },
}
