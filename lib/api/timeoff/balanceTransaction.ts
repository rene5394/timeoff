import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IBalanceTransaction } from '../../domain/timeoff/IBalanceTransaction';

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

export const createBalanceTransaction = async () =>{
  const url = '/balance-transactions';
  const result = await instance.get<IBalanceTransaction>(url);

  return result.data;
}

export const findAllBalanceTransactionByUserJWT = async() => {
  const url = '/balance-transactions/user/me';
  const result = await instance.get<IBalanceTransaction[]>(url);

  return result.data;
};

export const findAllBalanceTransactionByUserId = async(userId: number) => {
  const url = `/balance-transactions/user/${userId}`;
  const result = await instance.get<IBalanceTransaction[]>(url);

  return result.data;
};
