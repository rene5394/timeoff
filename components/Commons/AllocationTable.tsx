import * as React from 'react';
import { IBalance } from '../../lib/domain/timeoff/IBalance';
import { IPendingBalance } from '../../common/interfaces/IPendingBalance';
import { findOneByUserJWT } from '../../lib/api/timeoff/balance';
import { findAllRequestByUserJWTAndStatus } from '../../lib/api/timeoff/request';
import { RequestType } from '../../common/enums/request-type.enum';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../common/utils/timeValidation';

export const MyAllocation = () => {
  const [balance, setBalance] = React.useState<IBalance>();
  const [pendingBalance, setPendingBalance] = React.useState<IPendingBalance>();

  React.useEffect(() => {
    const fillBalanceData = async() => {
      const result = await findOneByUserJWT();
        setBalance(result);
    };
    fillBalanceData();
  }, [])

  React.useEffect(() => {
    const fillPendingData = async() => {
      const requests = await findAllRequestByUserJWTAndStatus('pending');
      
      let compDays = 0;
      let vacationDays = 0;

      requests.map((request) => {
        if (request.typeId === RequestType.compDay) {
          const dates = daysBetweenDatesNoWeekends(request.startDate, request.endDate);
          compDays += dates.length;
        } if (request.typeId === RequestType.vacation) {
          const dates = daysBetweenDates(request.startDate, request.endDate);
          vacationDays += dates.length;
        }
      });

      setPendingBalance({compDays, vacationDays});
    };
    fillPendingData();
  }, []);

  return(
    <>
      <table className = "table">
        <thead>
          <tr>
            <th scope="col">Time-Off Type</th>
            <th scope="col">Allowance</th>
            <th scope="col">Balance</th>
            <th scope="col">Pending</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1}>
            <td>Comp Day</td>
            <td>15 d</td>
            <td>
              {(balance?.compDays || balance?.compDays === 0) ?
                `${balance?.compDays} d` :
                'Not assigned'
              }
            </td>
            <td>{pendingBalance?.compDays || balance?.vacationDays === 0} d</td>
          </tr>
          <tr key={2}>
            <td>Vacation</td>
            <td>15 d</td>
            <td>
              {balance?.vacationDays ?
                `${balance?.vacationDays} d` :
                'Not assigned'
              }
            </td>
            <td>{pendingBalance?.vacationDays} d</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
