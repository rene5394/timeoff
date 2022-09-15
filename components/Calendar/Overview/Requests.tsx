import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { findAllRequestByUserJWTAndStatus } from "../../../lib/api/timeoff/request";
import { findOneType } from "../../../lib/api/timeoff/type";
import { IRequest } from "../../../lib/domain/timeoff/IRequest";
import { IType } from "../../../lib/domain/timeoff/IType";
import { countDaysbyType } from "../../Commons/type";

export const showRequests = () => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [Type,setType] = React.useState<IType>();

  const typeSearch = (id: number) => {
  
  const fillType = async() => {
    const result = await findOneType(id);
    setType(result);
  }
  fillType();
  if (Type) {
    return Type.name;
  }
  return 'Bad Request';
}

  React.useEffect(() => {
    const fillRequests = async() => {
      let result = await findAllRequestByUserJWTAndStatus('Pending');
      setRequests(result);
    }
    fillRequests();
  }, []);
  

  return(
    <>
      {
        requests?.map(request =>
          <>
            <h3><FontAwesomeIcon icon={['fas','warning']} />{typeSearch(request.typeId)}</h3>
            <p>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</p>
            <p>{String(request.startDate)}</p>
          </>
          )
      }
    </>
  );
}