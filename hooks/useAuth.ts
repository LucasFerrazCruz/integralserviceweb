import { api } from '@/services/api'
import { useEffect, useState } from 'react'

export function useAuth() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    api
      .get('/auth/me')
      .then((res) => setUser(res.data))
      .catch(() => setUser(null))
  }, [])

  return { user }
}
