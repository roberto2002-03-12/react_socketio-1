import { ReactElement } from 'react'

export const Layout = ({ children }: {children: ReactElement[]}) => {
  return (
    <div className='w-full h-[calc(100vh-64px)] mt-16'>
      {children}
    </div>
  )
}
