import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IMember } from '../../domain/team/IMember';

const instance = axios.create({
  baseURL: `${Api.TEAM}`,
  withCredentials: true
});

export const findAllMembers = async(page: number = 1) => {
  const url = `/members?page=${page}`;
  const result = await instance.get<IMember[]>(url);

  return result.data;
};

export const findMembers = async(employeeIds: any[]) => {
  const url = '/members';
  const request = {
    params: {
      employeeIds: employeeIds
    }
  };

  const result = await instance.get<IMember[]>(url, request);

  return result.data;
};

export const findOneUserByJWT = async() => {
  const url = '/members/me';
  const result = await instance.get<IMember>(url);

  return result.data;
};

export const findOneMember = async(id: number) => {
  const url = `/members/${id}`;
  const result = await instance.get<IMember>(url);

  return result.data;
};


