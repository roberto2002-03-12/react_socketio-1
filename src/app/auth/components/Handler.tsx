import { useState } from 'react'
import { Login, Register } from '../components'
import { AuthOptionTypes } from '../models'

export const Handler = () => {
  const [authOption, setAuthOption] = useState<AuthOptionTypes>('login');

  return (
    <>
      {
        authOption === 'login' ? (
          <Login setOption={setAuthOption} />
        ) : (
          <Register setOption={setAuthOption} />
        )
      }
    </>
  )
}
