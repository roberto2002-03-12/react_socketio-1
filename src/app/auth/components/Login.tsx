
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuthApi } from '../hook/useAuth'
import { InputText } from '../../components'
import { Button } from 'flowbite-react'
import { IUser, AuthOptionTypes } from '../models'

export const Login = ({ setOption }: { setOption: React.Dispatch<React.SetStateAction<AuthOptionTypes>> }) => {
  const { login } = useAuthApi();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset
  } = useForm<IUser>();

  const onSubmitLogin: SubmitHandler<IUser> = (data) => {
    if (Object.keys(errors).length > 0) return;

    login(data);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitLogin)}
      className='flex flex-col justify-center h-[500px] w-[400px]'
    >
      <h2 className='text-center text-3xl font-semibold my-3'>Login</h2>
      <InputText
        htmlFor='email'
        includeLabel={true}
        label='Email'
        required={true}
        placeHolder='example@123'
        error={errors.email && isSubmitted}
        helperText={errors.email && isSubmitted ? errors.email.message : ''}
        {
        ...register('email',
          {
            maxLength: {
              value: 105,
              message: 'Max lenght 105'
            },
            minLength: {
              value: 10,
              message: 'Min lenght 10'
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email'
            }
          }
        )
        }
      />

      <InputText
        htmlFor='password'
        includeLabel={true}
        label='Password'
        required={true}
        placeHolder='********'
        error={errors.password && isSubmitted}
        helperText={errors.password && isSubmitted ? errors.password.message : ''}
        type='password'
        {
        ...register('password',
          {
            minLength: {
              value: 6,
              message: 'Min lenght 6'
            }
          }
        )
        }
      />

      <p className='text-sm text-gray-500'>
        New account? register 
        <span 
          className='font-bold underline cursor-pointer ml-1' 
          onClick={ () => setOption('register') }
        >
          here
        </span>
      </p>

      <Button
        className='bg-gray-500 rounded-2xl p-0 mt-2'
        type='submit'
      >
        Login
      </Button>
    </form>
  )
}
