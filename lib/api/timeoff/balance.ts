import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IBalance } from '../../domain/timeoff/IBalance';

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

export const findAllBalance = async() => {
  const url = '/balances';
  const result = await instance.get<IBalance[]>(url);

  return result.data;
};

export const findOneBalance = async(id: number) => {
  const url = `/balances/${id}`;
  const result = await instance.get<IBalance>(url);

  return result.data;
};

export const findOneByUserJWT = async() => {
  const url = '/balances/user/me';
  const result = await instance.get<IBalance>(url);

  return result.data;
};
