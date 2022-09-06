import * as React from 'react';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../../../common/utils/timeValidation';
import { findAllRequestByUserJWT } from '../../../../lib/api/timeoff/request';
import { findOneType } from '../../../../lib/api/timeoff/type';
import { IRequest } from '../../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../../lib/domain/timeoff/IType';

export const RequestSummaryByStatus = (id: number) => {
  const [Requests,setRequests] = React.useState<IRequest[]>();
  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWT();
      const resultRequest = result.filter(type => type.statusId == id);
      setRequests(resultRequest);
    }
    fillRequests();
  });
  const [Type,setType] = React.useState<IType>();

  const TypeSearch = (id: number) =>{
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
  const countDaysbyType = (TypeId: number, startDate: Date, endDate: Date) => {
    const daysBetween = TypeId == 1 ? (
      daysBetweenDatesNoWeekends(startDate,endDate)
    ):(
      daysBetweenDates(startDate,endDate)
    );
    return daysBetween;
  }
  return(
    <>
      <table className="table-responsive">
      <thead>
        <tr>
          <th scope="col">Type</th>
          <th scope="col">Date</th>
          <th scope="col">Date end</th>
          <th scope="col">Time</th>
          <th scope="col">Duration</th>
          <th scope="col">Comments</th>
        </tr>
      </thead>
      <tbody>
        {Requests?.map((request) => 
          <tr>
            <th scope="row">{TypeSearch(request.typeId)}</th>
            <td>{String(request.startDate)}</td>
            <td>{String(request.endDate)}</td>
            <td>All Day</td>
            <td>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}</td>
            <td>No comments...</td>
          </tr>
        )}
      </tbody>
      </table>
    </>
  );
}