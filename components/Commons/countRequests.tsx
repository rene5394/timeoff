import * as React from 'react';
import { findAllRequestByUserJWT } from '../../lib/api/timeoff/request';
import { IRequest } from '../../lib/domain/timeoff/IRequest';

export const countRequestsByStatus = (id: number) => {
  const [Requests,setRequests] = React.useState<IRequest[]>();

  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWT();
      const resultRequest = result.filter(type => type.statusId == id);
      setRequests(resultRequest);
    }

    fillRequests();
  }, []);

  var amountRequests = 0;

  if (Requests) {
    amountRequests = Requests.length;
  }

  return amountRequests;
}