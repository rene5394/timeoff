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
      if (result.statusCode != 404) {
        setBalance(result);
      } else {
        setBalance({
          id: -1,
          userId: -1,
          compDays: 0,
          vacationDays: 0
        });
      }
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

  const showBalanceCompDay = (balances: string) =>{
    if (balances === 'balance') {
      if (balance) {
        return String(balance.compDays);
      }

      return 0;
    }
    
    if (balances === 'pending') {
      if (pendingBalance) {
        return String(pendingBalance.compDays);
      }

      return 0;
    }
  }

  const showBalanceVacationDay = (balances: string) =>{
    if (balances === 'balance') {
      if (balance?.compDays) {
        return String(balance.vacationDays);
      }

      return 0;
    }

    if (balances === 'pending') {
      if (pendingBalance) {
        return String(pendingBalance.vacationDays);
      }
      
      return 0;
    }
  }

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
            <td>{showBalanceCompDay('balance')} d</td>
            <td>{showBalanceCompDay('pending')} d</td>
          </tr>
          <tr key={2}>
            <td>Vacation</td>
            <td>15 d</td>
            <td>{showBalanceVacationDay('balance')} d</td>
            <td>{showBalanceVacationDay('pending')} d</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
