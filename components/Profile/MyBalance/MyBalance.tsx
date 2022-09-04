import * as React from 'react';
import { InfoCard } from '../InfoCard';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';

export const MyBalance = () => {
  const [balance, setBalance] = React.useState<IBalance>();

  React.useEffect(() => {
    const fillBalanceCards = async() => {
      const result = await findOneByUserJWT();
      setBalance(result);
    };
    fillBalanceCards();
  }, [])

  if (balance) {
    return (
      <>
        <div className='row ps-5 mt-3'>
          <h5 className='ps-0 pb-2'><b>My</b> Balance</h5>
        </div>
        <div className='row ps-5'>
            <InfoCard title={'Comp days'} text={String(balance.compDays)} borderColorClass={'border-start border-3 border-success'}></InfoCard>
            <InfoCard title={'Vacations'} text={String(balance.vacationDays)} borderColorClass={'border-start border-3 border-success'}></InfoCard>
        </div>
      </>
    );
  }

  return (
    <div className='row ps-5'>
      <span>Loading...</span>
    </div>
  );
};