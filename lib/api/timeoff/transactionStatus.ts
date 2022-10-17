import axios from "axios";
import { Api } from "../../../common/constants/api";
import { ITransactionStatus } from '../../domain/timeoff/ITransactionStatus';

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

export const findAllTransactionStatuses = async() => {
  const url = '/transaction-statuses';
  const result = await instance.get<ITransactionStatus[]>(url);

  return result.data;
};