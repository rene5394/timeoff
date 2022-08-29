import axios from 'axios';
import { Api } from '../../../common/constants/api';

export const login = async(form: any) => {
  const url =  `${Api.AUTH}/login`;
  const result = await axios.post<any>(url, {
    email: form.target.elements.email.value,
    password: form.target.elements.password.value
  }, {withCredentials: true});

  return result.data
};