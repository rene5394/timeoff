import * as React from 'react';
import { format } from 'date-fns';
import { findAllRequestByUserId } from '../../../../lib/api/timeoff/request';
import { findAllTypes } from '../../../../lib/api/timeoff/type';
import { IRequest } from '../../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../../lib/domain/timeoff/IType';
import { countDaysbyType } from '../../../Commons/type';

export const RequestSummaryByStatus = (status: string, userId: number) => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();

  const typeSearch = (id: number) => {
    var type = types?.filter(val => val.id == id);
    var name = type?.map(res => {return res.name})
    return name;
  }

  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserId(userId,status);
      setRequests(result);
    }
    const fillTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    }
    fillRequests();
    fillTypes();
  },[userId]);
  

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
        {requests?.map((request, i) => 
          <tr key={i}>
            <td scope="row"><b>{typeSearch(request.typeId)}</b></td>
            <td>{format(new Date(request.startDate), 'd MMMM yyyy')}</td>
            <td>{format(new Date(request.endDate), 'd MMMM yyyy')}</td>
            <td>All Day</td>
            <td>{String(countDaysbyType(request.typeId, request.startDate, request.endDate))}d</td>
            <td>No comments...</td>
          </tr>
        )}
      </tbody>
      </table>
    </>
  );
}