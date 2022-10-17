import axios from 'axios';
import { Api } from '../../../common/constants/api';
import { IUser } from '../../domain/team/IUser';

const instance = axios.create({
  baseURL: `${Api.AUTH}`,
  withCredentials: true
});

export const login = async(form: any) => {
  const url =  '/login';

  try {
    const result = await instance.post<any>(url, {
      email: form.target.elements.email.value,
      password: form.target.elements.password.value
    }, {withCredentials: true});

    return result.data;
  } catch (error: any) {
    
    if (error.response.status === 401) {
      throw new Error('Invalid credentials');
    } if (error.response.status === 404) {
      throw new Error('User not found or deactivated');
    }
  }
};

export const logout = async() => {
  const url =  '/logout';
  const result = await instance.post<any>(url, {withCredentials: true});

  return result;
};

export const findOneUserByJWT = async() => {
  const url = `${Api.TEAM}/users/me`;
  const result = await axios.get<IUser>(url, {
    withCredentials: true
  });

  return result.data;
};
