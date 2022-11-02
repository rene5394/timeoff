import axios from "axios";
import { Api } from "../../../common/constants/api";
import { ITeam } from '../../domain/team/ITeam';

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

export const findAllTeams = async() => {
  const url = '/teams';
  const result = await instance.get<ITeam[]>(url);

  return result.data;
};


export const findAllActiveTeams = async() => {
  const url = '/teams?status=active';
  const result = await instance.get<ITeam[]>(url);

  return result.data;
};

export const findOneTeam = async(id: number) => {
  const url = `/teams/${id}`;
  const result = await instance.get<ITeam>(url);

  return result.data;
};

export const findOneTeamByUserJWT = async() => {
  const url = '/teams/user/me';
  const result = await instance.get<ITeam>(url);

  return result.data;
};

export const findOneTeamByCoachUserJWT = async() => {
  const url = '/teams/coach/me';
  const result = await instance.get<ITeam>(url);

  return result.data;
};


