import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IEmployee } from '../../domain/team/IEmployee';

const instance = axios.create({
  baseURL: `${Api.TEAM}`,
  withCredentials: true
});

export const findAllEmployees = async(page: number = 1) => {
  const url = `/employees?page=${page}`;
  const result = await instance.get<IEmployee[]>(url);

  return result.data;
};

export const findEmployees = async(userIds: any[]) => {
  const url = '/employees';
  const request = {
    params: {
      userIds: userIds
    }
  };

  const result = await instance.get<IEmployee[]>(url, request);

  return result.data;
};

export const findAllUsersEmployees = async(page: number = 1, status: string = 'active') => {
  const url = `/users/employees?page=${page}&status=${status}`;
  const result = await instance.get<IEmployee[]>(url);

  return result.data;
};

export const findOneUserByJWT = async() => {
  const url = '/users/me';
  const result = await instance.get<IEmployee>(url);

  return result.data;
};

export const findOneUser = async(id: number) => {
  const url = `/users/${id}`;
  const result = await instance.get<IEmployee>(url);

  return result.data;
};


