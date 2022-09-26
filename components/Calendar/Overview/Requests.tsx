import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import { findAllRequestByUserJWTAndStatus } from "../../../lib/api/timeoff/request";
import { findAllTypes } from "../../../lib/api/timeoff/type";
import { IRequest } from "../../../lib/domain/timeoff/IRequest";
import { countDaysbyType } from "../../Commons/type";
import { IType } from '../../../lib/domain/timeoff/IType';

export const showRequests = () => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();

  const typeSearch = (id: number) => {
    var type = types?.filter(val => val.id == id);
    var name = type?.map(res => {return res.name})
    return name;
  }
  React.useEffect(() => {
    const fillRequests = async() => {
      let result = await findAllRequestByUserJWTAndStatus('pending');
      setRequests(result);
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
        requests?.map((request,i) =>
          <div>
            <h3><FontAwesomeIcon icon={['fas','warning']} />{typeSearch(request.typeId)}</h3>
            <p>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</p>
            <p>{format(new Date(request.startDate), 'd MMMM Y')}</p>
          </div>
          )
      }
    </>
  );
}