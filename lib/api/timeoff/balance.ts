import axios from "axios";
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

  return Promise.reject(error);
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

export const findOneBalanceByUserId = async(userId: number) => {
  const url = `/balances/user/${userId}`;

  try {
    const result = await instance.get<IBalance>(url);
    
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const createBalance = async(form: any) => {
  const url = '/balances';

  try {
    const result = await instance.post<IBalance>(url, {
      userId: parseInt(form.target.elements.userId.value),
      compDays: parseInt(form.target.elements.compDays.value),
      vacationDays: parseInt(form.target.elements.vacationDays.value)
    });

    return result;
  } catch (error: any) {
    return error.response;
  }
}

export const updateBalance = async(form: any) => {
  const id = form.target.elements.balanceId.value;
  const url = `/balances/${id}`;

  try {
    const result = await instance.patch<IBalance>(url, {
      compDays: parseInt(form.target.elements.compDays.value),
      vacationDays: parseInt(form.target.elements.vacationDays.value),
      comment: form.target.elements.comment.value
    });

    return result;
  } catch (error: any) {
    return error.response;
  }
}

export const updateBalanceByUserId = async(form: any) => {
  const userId = form.target.elements.userId.value;
  const url = `/balances/user/${userId}`;

  try {
    const result = await instance.patch<IBalance>(url, {
      userId: parseInt(userId),
      compDays: parseInt(form.target.elements.compDays.value),
      vacationDays: parseInt(form.target.elements.vacationDays.value)
    }, {withCredentials: true});

    return result;
  } catch (error: any) {
    return error.response;
  }
}
