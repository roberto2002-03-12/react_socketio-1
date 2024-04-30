import authServerApi from '../api/authServerApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// dispatches
import { onLoginAuth, onCheckingAuth, onLogout, onCheckedRegister } from '../../../store'

// models
import { IUser } from '../models' 

// alert
import Swal from 'sweetalert2';

export const useAuthApi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (dataInputs: IUser) => {
    dispatch(onCheckingAuth());
    try {
      const { data } = await authServerApi.post('/users/login', dataInputs);

      const date = new Date();

      localStorage.setItem('stateAuth', 'authenticated');
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', `${date.getTime()}`);
      localStorage.setItem('token-expire-date', `${date.setHours(date.getHours() + 4)}`);
      localStorage.setItem('user', JSON.stringify(data.user as IUser));

      dispatch(onLoginAuth(data.user));
      navigate('/chat');
    } catch (error: unknown) {
      dispatch(onLogout());
      Swal.fire({
        icon: 'error',
        title: 'Error on trying login',
        text: `${(error as any).response?.data?.message ?? '---'}`
      });
    }
  };

  const register = async (dataInputs: IUser) => {
    dispatch(onCheckingAuth());
    try {
      await authServerApi.post('/v1/user/login', dataInputs);
      
      dispatch(onCheckedRegister());
    } catch (error) {
      dispatch(onLogout());
      Swal.fire({
        icon: 'error',
        title: 'Error on trying registing',
        text: `${(error as any).response?.data?.message ?? '---'}`
      });
    }
  };

  const logout = () => {
    dispatch(onLogout());
    localStorage.clear()
  }

  return {
    login,
    register,
    logout
  }
}