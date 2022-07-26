import * as React from 'react';
import { findAllRequestByUserId, findAllRequestByUserJWTAndStatus } from '../../lib/api/timeoff/request';
import { IRequest } from '../../lib/domain/timeoff/IRequest';

export const CountRequestsByStatus = (status: string, year: number) => {
  const [requests, setRequests] = React.useState<IRequest[]>();

  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserJWTAndStatus(status);
      const resultRequest = result.filter(req => new Date(req.startDate).getFullYear() === year);
      setRequests(resultRequest);
    }

    fillRequests();
  }, [year]);

  let amountRequests = 0;

  if (requests) {
    amountRequests = requests.length;
  }

  return amountRequests;
}

export const CountRequestsByStatusAndUserId = (status: string, userId: number) => {
  const [requests,setRequests] = React.useState<IRequest[]>();

  React.useEffect( () => {
    const fillRequests = async() => {
      const result = await findAllRequestByUserId(userId,status);
      setRequests(result);
    }

    fillRequests();
  }, [userId]);

  let amountRequests = 0;

  if (requests) {
    amountRequests = requests.length;
  }

  return amountRequests;
}