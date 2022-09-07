import axios from "axios";
import { Api } from "../../../common/constants/api";
import { ITeam } from '../../domain/team/ITeam';

const instance = axios.create({
  baseURL: `${Api.TEAM}`,
  withCredentials: true
});

export const findAllTeam = async() => {
  const url = '/teams';
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


