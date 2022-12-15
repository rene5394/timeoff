import * as React from 'react';
import { IBalance } from '../../lib/domain/timeoff/IBalance';
import { IPendingBalance } from '../../common/interfaces/IPendingBalance';
import { findOneBalanceByUserId } from '../../lib/api/timeoff/balance';
import { findAllRequestByUserId } from '../../lib/api/timeoff/request';
import { RequestType } from '../../common/enums/request-type.enum';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../common/utils/timeValidation';

export const AllocationByUser = (userId: number) => {
  const [balance, setBalance] = React.useState<IBalance>();
  const [pendingBalance, setPendingBalance] = React.useState<IPendingBalance>();

  React.useEffect(() => {
    const fillBalanceData = async() => {
      const result = await findOneBalanceByUserId(userId);

      if (result.statusCode === 404) {

        setBalance({
          id: -1,
          userId: userId,
          compDays: 0,
          vacationDays: 0
        });
        
      } else {
        setBalance(result);
      }
    };
    fillBalanceData();
  }, [userId])

  React.useEffect(() => {
    const fillPendingData = async() => {
      let compDays = 0;
      let vacationDays = 0;

      const requests = await findAllRequestByUserId(userId, 'pending');
      
      requests.map((request) => {
        if (request.typeId === RequestType.compDay) {
          const dates = daysBetweenDatesNoWeekends(request.startDate, request.endDate);
          compDays += dates.length;
        } if (request.typeId === RequestType.vacation) {
          const dates = daysBetweenDates(request.startDate, request.endDate);
          vacationDays += dates.length;
        }
      });

      setPendingBalance({ compDays, vacationDays });
    };
    fillPendingData();
  }, [userId]);
  /*
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
*/
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
          <tr key={balance?.id}>
            <td>Comp Day</td>
            <td>15 d</td>
            <td>{String(balance?.compDays)} d</td>
            <td>{String(pendingBalance?.compDays)} d</td>
          </tr>
          <tr key={userId}>
            <td>Vacation</td>
            <td>15 d</td>
            <td>{String(balance?.vacationDays)} d</td>
            <td>{String(pendingBalance?.vacationDays)} d</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}