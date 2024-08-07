import * as React from 'react';
import { formatInTimeZone } from 'date-fns-tz';
import { findAllRequestByUserJWTAndStatus } from '../../../../lib/api/timeoff/request';
import { findAllTypes } from '../../../../lib/api/timeoff/type';
import { IRequest } from '../../../../lib/domain/timeoff/IRequest';
import { IType } from '../../../../lib/domain/timeoff/IType';
import { countDaysbyType } from '../../../Commons/type';

export const RequestSummaryByStatus = (status: string, year: number) => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();

  const typeSearch = (id: number) => {
    var type = types?.filter(val => val.id == id);
    var name = type?.map(res => {return res.name})
    return name;
  }

  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWTAndStatus(status);
      const resultFilter = result.filter(req => new Date(req.startDate).getFullYear() == year);
      console.log('RESULT FILTER', resultFilter);

      setRequests(resultFilter);
    }
    const fillTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    }

    fillRequests();
    fillTypes();
  }, [year]);
  

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
            <td>{formatInTimeZone(new Date(request.startDate), 'America/El_Salvador', 'd MMMM yyyy')}</td>
            <td>{formatInTimeZone(new Date(request.endDate), 'America/El_Salvador', 'd MMMM yyyy')}</td>
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