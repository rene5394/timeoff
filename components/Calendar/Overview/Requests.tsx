import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatInTimeZone } from 'date-fns-tz';
import { findAllRequestByUserJWTAndStatus } from '../../../lib/api/timeoff/request';
import { findAllAppTypes } from "../../../lib/api/timeoff/type";
import { IRequest } from "../../../lib/domain/timeoff/IRequest";
import { countDaysbyType } from "../../Commons/type";
import { IType } from '../../../lib/domain/timeoff/IType';

export const ShowRequests = () => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();

  const typeSearch = (id: number) => {
    const type = types?.filter(val => val.id == id);
    const name = type?.map(res => {return res.name});

    return name;
  }

  React.useEffect(() => {
    const fillRequests = async() => {
      let result = await findAllRequestByUserJWTAndStatus('pending');
      setRequests(result);
    }

    const fillTypes = async() => {
      const result = await findAllAppTypes();
      setTypes(result);
    }

    fillRequests();
    fillTypes();
  }, []);
  

  return(
    <>
      {
        requests?.map((request) =>
          <div key={request.id}>
            <h5><FontAwesomeIcon icon = {['fas','warning']} />{typeSearch(request.typeId)}</h5>
            <p>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</p>
            <p>{formatInTimeZone(new Date(request.startDate), 'America/El_Salvador', 'd MMMM Y')}</p>
          </div>
          )
      }
    </>
  );
}