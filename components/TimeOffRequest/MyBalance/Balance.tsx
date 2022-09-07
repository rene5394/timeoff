import * as React from 'react';
import { IBalance } from '../../../lib/domain/timeoff/IBalance';
import { IPendingBalance } from '../../../common/interfaces/IPendingBalance';
import { findOneByUserJWT } from '../../../lib/api/timeoff/balance';
import { findAllRequestByUserJWTAndStatus } from '../../../lib/api/timeoff/request';
import Styles from './Balance.module.css';
import { RequestType } from '../../../common/enums/request-type.enum';
import { daysBetweenDates, daysBetweenDatesNoWeekends } from '../../../common/utils/timeValidation';
import { MyAllocation } from '../../Commons/AllocationTable';

export const MyBalance = () => {
  return(
    <div className={`col-5 ${Styles.balance}`}>
      <h3>Your current allowance/balance</h3>
      <MyAllocation />
    </div>
  );
}