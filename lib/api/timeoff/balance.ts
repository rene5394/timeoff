import axios from "axios";
import { number } from "prop-types";
import { Api } from "../../../common/constants/api";
import { IBalance } from '../../domain/timeoff/IBalance';

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

export const findAllBalances = async() => {
  const url = '/balances';
  const result = await instance.get<IBalance[]>(url);

  return result.data;
};

export const findBalances = async(userIds: any[]) => {
  const url = '/balances';
  const request = {
    params: {
      userIds: userIds
    }
  };
  
  const result = await instance.get<IBalance[]>(url, request);

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
