import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import Styles from './Balance.module.css';
import { findAllRequestsByUsers } from "../../../lib/api/timeoff/request";
import { findAllTypes } from "../../../lib/api/timeoff/type";
import { IRequest } from "../../../lib/domain/timeoff/IRequest";
import { countDaysbyType } from "../../Commons/type";
import { IType } from '../../../lib/domain/timeoff/IType';

export const ShowRequests = (usersIds: any[]) => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();

  const typeSearch = (id: number) => {
    var type = types?.filter(val => val.id == id);
    var name = type?.map(res => {return res.name})
    return name;
  }
  React.useEffect(() => {
    const fillRequests = async() => {
      const result = await findAllRequestsByUsers(-1, usersIds,'pending');
      const resultList = result.list;
      setRequests(resultList);
    }

    const fillTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    }

    fillRequests();
    fillTypes();
  }, []);
  

  return(
    <>
      {
        requests?.map((request) =>
          <div>
            <h5 className={Styles.Comp}><FontAwesomeIcon  icon = {['fas','warning']} /> {typeSearch(request.typeId)}</h5>
            <p>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</p>
            <p>{format(new Date(request.startDate), 'd MMMM Y')}</p>
          </div>
          )
      }
    </>
  );
}