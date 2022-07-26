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

  return (
    <>
      <div className='row ps-5 mt-3'>
        <h5 className='ps-0 pb-2'><b>My</b> Balance</h5>
      </div>
      <div className='row ps-5'>
        {(balance?.compDays || balance?.compDays === 0) ?
          <InfoCard title={'Comp days'} text={`${String(balance?.compDays)} d`} borderColorClass={'border-start border-3 border-success'}></InfoCard> :
          <InfoCard title={'Comp days'} text={'Not assigned'} borderColorClass={'border-start border-3 border-success'}></InfoCard>
        }
        {(balance?.vacationDays || balance?.vacationDays === 0) ?
          <InfoCard title={'Vacations'} text={`${String(balance?.vacationDays)} d`} borderColorClass={'border-start border-3 border-success'}></InfoCard> :
          <InfoCard title={'Vacations'} text={'Not assigned'} borderColorClass={'border-start border-3 border-success'}></InfoCard>
        }
      </div>
    </>
  );
};