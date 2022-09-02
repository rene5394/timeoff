import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IUser } from '../../domain/team/IUser';

const instance = axios.create({
  baseURL: `${Api.TEAM}`,
  withCredentials: true
});

export const findAllUser = async() => {
  const url = '/users';
  const result = await instance.get<IUser[]>(url);

  return result.data;
};

export const findOneUserByJWT = async() => {
  const url = '/users/me';
  const result = await instance.get<IUser>(url);

  return result.data;
};

export const findOneUser = async(id: number) => {
  const url = `/users/${id}`;
  const result = await instance.get<IUser>(url);

  return result.data;
};


