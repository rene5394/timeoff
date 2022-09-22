import axios from "axios";
import { number } from "prop-types";
import { Api } from "../../../common/constants/api";
import { IBalance } from '../../domain/timeoff/IBalance';

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

  return Promise.resolve({ error });
});

export const findAllBalances = async() => {
  const url = '/balances';

  try {
  const result = await instance.get<IBalance[]>(url);

  return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const findBalances = async(userIds: any[]) => {
  const url = '/balances';
  const request = {
    params: {
      userIds: userIds
    }
  };
  
  try {
    const result = await instance.get<IBalance[]>(url, request);

    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const findOneBalance = async(id: number) => {
  const url = `/balances/${id}`;

  try {
    const result = await instance.get<IBalance>(url);
    
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const findOneByUserJWT = async() => {
  const url = '/balances/user/me';

  try {
    const result = await instance.get<IBalance>(url);

    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};
