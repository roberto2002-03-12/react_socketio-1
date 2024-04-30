import { IStoreRedux } from '../../../store/store.model';
import { Handler } from '../components'
import { useSelector } from 'react-redux';

export const Auth = () => {
  const { authState } = useSelector((state: IStoreRedux) => state.auth);

  return (
    <div className='h-screen w-full flex justify-center items-center'>
      {
        authState === 'checking' ? <h2 className='text-5xl font-extralight'>Loading...</h2> : <Handler />
      }
    </div>
  )
}
