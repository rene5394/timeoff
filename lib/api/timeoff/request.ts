import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IEvents } from "../../domain/timeoff/IEvents";
import { IRequest } from '../../domain/timeoff/IRequest';

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

export const createRequest = async (form: any) =>{
  const url = '/requests';

  try {
    const result = await instance.post<any>(url, {
      userId: parseInt(form.target.elements.user.value),
      typeId: parseInt(form.target.elements.type.value),
      startDate: form.target.elements.start.value,
      endDate: form.target.elements.end.value
    });
    
    return result;
  } catch (error: any) {
    return error.response.data;
  }
}

export const createRequestByUserJWT = async (form:any) =>{
  const url = '/requests/user/me';

  try {
    const result = await instance.post<any>(url, {
      typeId: parseInt(form.target.elements.type.value),
      startDate: form.target.elements.start.value,
      endDate: form.target.elements.end.value
    });

    return result;
  } catch (error: any) {
    return error.response;
  }
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

export const findAllRequestByUserJWTAndStatus = async(status: string) => {
  const url = `/requests/user/me?status=${status}`;
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

export const findNumberByYearMonth = async(year: number, month: number) => {
  const url = `/requests/year/${year}/month/${month}`;
  const result = await instance.get<IEvents[]>(url);

  return result.data;
}
export const findNumberByRange = async(start: Date, end: Date) => {
  const url = `/requests/startDate/${start}/endDate/${end}`;
  const result = await instance.get<IEvents[]>(url);

  return result.data;
}