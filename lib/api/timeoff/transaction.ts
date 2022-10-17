import axios from "axios";
import { Api } from "../../../common/constants/api";
import { ITransaction } from '../../domain/timeoff/ITransaction';

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

instance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response.status === 401) {
    window.location.href = '/login';
  }

  return Promise.reject(error);
});

export const createTransaction = async (form: any) => {
    const url = '/transactions';
  
    try {
      const result = await instance.post<any>(url, {
        requestId: parseInt(form.target.elements.requestId.value),
        transactionStatusId: parseInt(form.target.elements.transactionStatusId.value)
      });
      
      return result;
    } catch (error: any) {
      return error.response.data;
    }
  }