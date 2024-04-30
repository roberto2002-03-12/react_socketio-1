import { Route, Routes } from 'react-router-dom'
import { Auth } from '../app/auth/pages/Auth'
import { Chat } from '../app/chat/pages/Chat'

export const Router = () => {
  return (
    <Routes>
      <Route path='/chat' element={ <Chat /> }  />
      <Route path='/login' element={ <Auth /> }  />
      <Route path='/' element={ <Auth /> }  />
    </Routes>
  )
}
