import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IBalanceTransaction } from '../../domain/timeoff/IBalanceTransaction';

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
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
