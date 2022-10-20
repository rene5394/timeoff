import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IEvents, IEventsDetails } from "../../domain/timeoff/IEvents";
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

  return Promise.reject(error);
});

export const createRequest = async (form: any) =>{
  const url = '/requests';

  try {
    const result = await instance.post<any>(url, {
      userId: parseInt(form.target.elements.userId.value),
      typeId: parseInt(form.target.elements.type.value),
      startDate: form.target.elements.start.value,
      endDate: form.target.elements.end.value
    });
    
    return result;
  } catch (error: any) {
    return error.response;
  }
}

export const createRequestByUserJWT = async (form:any) => {
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

export const findAllRequests = async(page: number = -1, status: string = '', starDate: string = '', endDate: string = '') => {
  const url = `/requests?page=${page}&status=${status}&startDate=${starDate}&endDate=${endDate}`;
  const result = await instance.get<any>(url);

  return result.data;
};

export const findAllRequestsByUsers = async(page: number = -1, userIds: any[], status: string = '', starDate: string = '', endDate: string = '') => {
  const url = `/requests?page=${page}&status=${status}&startDate=${starDate}&endDate=${endDate}`;
  const request = {
    params: {
      userIds: userIds
    }
  };

  try {
    const result = await instance.get<any>(url, request);

    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
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

export const findAllRequestByUserId = async(userId: number, status: string) => {
  const url = `/requests/user/${userId}?status=${status}`;
  const result = await instance.get<IRequest[]>(url);

  return result.data;
};

export const findOneRequest = async(id: number) => {
  const url = `/requests/${id}`;
  const result = await instance.get<IRequest>(url);

  return result.data;
};

export const findRequestsByYearMonth = async(year: number, month: number) => {
  const url = `/requests/year/${year}/month/${month}`;
  const result = await instance.get<IEventsDetails[]>(url);

  return result.data;
}
export const findRequestsByRange = async(start: Date, end: Date) => {
  const url = `/requests/startDate/${start}/endDate/${end}`;
  const result = await instance.get<IEventsDetails[]>(url);

  return result.data;
}

export const findNumberOfRequestsByYearMonth = async(year: number, month: number) => {
  const url = `/requests/count/year/${year}/month/${month}`;
  const result = await instance.get<IEvents[]>(url);

  return result.data;
}
export const findNumberOfRequestsByRange = async(start: Date, end: Date) => {
  const url = `/requests/count/startDate/${start}/endDate/${end}`;
  const result = await instance.get<IEvents[]>(url);

  return result.data;
}