export interface IUser {
  id: string
  name: string
  nickname?: string
  email: string
  phone?: string
  isJedi: boolean
  created_at?: string
  updated_at?: string
  resource?: {
    url: string
  }
}

export interface AuthUser {
  id: string
  name: string
  nickname?: string
  email: string
  phone?: string
  created_at?: string
  updated_at?: string
  resource?: {
    url: string
  }
}

export interface UpdateUserDto {
  name?: string
  nickname?: string
  email?: string
  phone?: string
  resourceId?: string
  password?: string
}

export interface RegisterUser {
  name: string
  nickname: string
  email: string
  phone: string
  password: string
  resourceId?: string
}
