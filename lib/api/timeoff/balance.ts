import axios from "axios";
import { Api } from "../../../common/constants/api";
import { IBalance } from '../../../lib/domain/timeoff/IBalance';

export const findAllBalance = async() => {
    const url = `${Api.TIMEOFF}/balances`;
    const result = await axios.get<IBalance[]>(url);

    return result.data
};

export const findOneBalance = async(id: number) => {
    const url = `${Api.TIMEOFF}/balances/${id}`;
    const result = await axios.get<IBalance[]>(url);

    return result.data
};

export const findMyBalance = async(id: number) => {
    const url = `${Api.TIMEOFF}/balance/`;
    const result = await axios.get(url);

    return result.data
};