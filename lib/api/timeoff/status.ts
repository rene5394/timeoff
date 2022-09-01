import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IStatus } from "../../domain/timeoff/IStatus";

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

export const findAllStatuses = async() => {
  const url = '/statuses';
  const result = await instance.get<IStatus[]>(url);

  return result.data;
};

export const findOneStatus = async(id: number) => {
  const url = `/statuses/${id}`;
  const result = await instance.get<IStatus>(url);

  return result.data;
};
