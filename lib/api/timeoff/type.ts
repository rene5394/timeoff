import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IType } from "../../domain/timeoff/IType";

const instance = axios.create({
  baseURL: `${Api.TIMEOFF}`,
  withCredentials: true
});

export const findAllTypes = async() => {
  const url = '/types?app=true';
  const result = await instance.get<IType[]>(url);

  return result.data;
};

export const findOneType = async(id: number) => {
  const url = `/types/${id}`;
  const result = await instance.get<IType>(url);

  return result.data;
};
