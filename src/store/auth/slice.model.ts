import { IUser } from '../../app/auth/models'

type TypeAuthState = 'authenticated' | 'checking' | 'not-authenticated';

export interface IAuthSlice {
  authState: TypeAuthState;
  user: IUser;
}