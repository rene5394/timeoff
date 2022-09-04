import axios from 'axios';
import { Api } from '../../../common/constants/api';

const instance = axios.create({
  baseURL: `${Api.AUTH}`,
  withCredentials: true
});

export const login = async(form: any) => {
  const url =  '/login';
  const result = await instance.post<any>(url, {
    email: form.target.elements.email.value,
    password: form.target.elements.password.value
  }, {withCredentials: true});

  return result.data;
};

export const logout = async() => {
  const url =  '/logout';
  const result = await instance.post<any>(url, {withCredentials: true});

  return result;
};