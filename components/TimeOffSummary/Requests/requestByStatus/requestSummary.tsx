import { format } from 'date-fns';
import * as React from 'react';
import { diffrenceBetweenDates, diffrenceBetweenDatesNoWeekends } from '../../../../common/utils/timeValidation';
import { findAllRequestByUserJWT } from '../../../../lib/api/timeoff/request';
import { findOneType } from '../../../../lib/api/timeoff/type';
import { IRequest } from '../../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../../lib/domain/timeoff/IType';
import { countDaysbyType } from '../../../Commons/type';

export const RequestSummaryByStatus = (id: number) => {
  const [Requests,setRequests] = React.useState<IRequest[]>();
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
  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWT();
      const resultRequest = result.filter(request => request.statusId == id);
      setRequests(resultRequest);
    }
    fillRequests();
  });
  
  return(
    <>
      <table className="table">
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
            <th scope="row">{typeSearch(request.typeId)}</th>
            <td>{format(new Date(request.startDate), 'd MMMM Y')}</td>
            <td>{format(new Date(request.endDate), 'd MMMM Y')}</td>
            <td>All Day</td>
            <td>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</td>
            <td>No comments...</td>
          </tr>
        )}
      </tbody>
      </table>
    </>
  );
}