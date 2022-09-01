import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IRequest } from '../../domain/timeoff/IRequest';

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

export const createRequest = async () =>{
  const url = '/requests';
  const result = await instance.get<IRequest>(url);

  return result.data;
}

export const createRequestByUserJWT = async () =>{
  const url = '/requests/user/me';
  const result = await instance.get<IRequest>(url);

  return result.data;
}

export const findAll = async() => {
  const url = '/requests';
  const result = await instance.get<IRequest[]>(url);

  return result.data;
};

export const findAllRequestByUserJWT = async() => {
  const url = '/requests/user/me';
  const result = await instance.get<IRequest[]>(url);

  return result.data;
};

export const findAllRequestByUserId = async(userId: number) => {
  const url = `/requests/user/${userId}`;
  const result = await instance.get<IRequest[]>(url);

  return result.data;
};

export const findOneRequest = async(id: number) => {
  const url = `/requests/${id}`;
  const result = await instance.get<IRequest>(url);

  return result.data;
};
