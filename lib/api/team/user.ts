import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IUser } from '../../domain/team/IUser';

const instance = axios.create({
  baseURL: `${Api.TEAM}`,
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

export const findAllUsers = async(page: number = 1, status: string = 'active') => {
  const url = `/users?page=${page}&status=${status}`;

  try {
    const result = await instance.get<IUser[]>(url);

    return result.data;
  } catch (err) {
    throw new Error(`axios# Problem with request during pre-flight phase: ${err}.`);
  }
};

export const findUsers = async(usersId: any[]) => {
  const url = '/users/employees?status=active';
  console.log('api',usersId);
  const request = {
    params: {
      userIds: usersId
    }
  };
  
  try {
    const result = await instance.get<IUser[]>(url, request);

    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
}

export const findAllUsersEmployees = async(text: string = '', page: number = 1, status: string = 'active') => {
  const url = `/users/employees?text=${text}&page=${page}&status=${status}`;

  try {
    const { data } = await instance.get<any>(url);

    return data;
  } catch (err) {
    throw new Error(`axios# Problem with request during pre-flight phase: ${err}.`);
  }
};

export const findAllUsersEmployeesByTeam = async(teamId: number, text: string = '', page: number = 1, status: string = 'active') => {
  const url = `/users/employees/team/${teamId}?text=${text}&page=${page}&status=${status}`;

  try {
    const { data } = await instance.get<any>(url);

    return data;
  } catch (err) {
    throw new Error(`axios# Problem with request during pre-flight phase: ${err}.`);
  }
};

export const findAllTeamUsersEmployeesByJWT = async(text: string = '', page: number = 1, status: string = 'active') => {
  const url = `/users/employees/user/me?text=${text}&page=${page}&status=${status}`;

  try {
    const { data } = await instance.get<any>(url);

    return data;
  } catch (err) {
    throw new Error(`axios# Problem with request during pre-flight phase: ${err}.`);
  }
};

export const findOneUserByJWT = async() => {
  const url = '/users/me';
  const result = await instance.get<IUser>(url)

  return result.data;
};

export const findOneUser = async(id: number) => {
  const url = `/users/${id}`;

  try {
    const result = await instance.get<IUser>(url);

    return result.data;
  } catch (err) {
    throw new Error(`axios# Problem with request during pre-flight phase: ${err}.`);
  }
};


