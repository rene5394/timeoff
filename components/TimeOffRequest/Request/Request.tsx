import * as React from 'react';
import Styles from './Request.module.css';
import { IType } from '../../../lib/domain/timeoff/IType';
import { RequestType } from '../../../common/enums/request-type.enum';
import { findAllAppTypes } from '../../../lib/api/timeoff/type';
import { createRequestByUserJWT } from '../../../lib/api/timeoff/request';
import { ErrorModalTextProps } from '../../Modals/ErrorModal';
import { SuccessModalTextProps } from '../../Modals/SucessModal';
import { formatInTimeZone } from 'date-fns-tz';

interface RequestProps {
  openSuccessModal: (textProps: SuccessModalTextProps) => void;
  openErrorModal: (textProps: ErrorModalTextProps) => void;
}

export const Request: React.FC<RequestProps> = ({ openSuccessModal, openErrorModal }) => {
  const [types, setTypes] = React.useState<IType[]>();
  const [disable, setDisable] = React.useState<boolean>(false);
  let startDate = React.useRef<HTMLInputElement | null>(null);
  let endDate = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    const fillTypes = async() => {
      const result = await findAllAppTypes();
      setTypes(result);
    };
    fillTypes();
  }, [])
  
  const submitForm = async(form: any) => {
    form.preventDefault();

    if (startDate.current !== null && endDate.current !== null
      && (startDate.current.value > endDate.current.value)) {
        
        openErrorModal({
          title: 'Error',
          body: ['Start date can\'t be lower than start date']
        });

        return ;
    }

    setDisable(true);

    const result  = await createRequestByUserJWT(form);

    if (result.status === 201) {
      const data = result.data;
      let requestType = '';

      if (data.typeId == RequestType.compDay) {
        requestType = 'Comp day(s)';
      } if (data.typeId == RequestType.vacation) {
        requestType = 'Vacations';
      } if (data.typeId == RequestType.permisoSinGoce) {
        requestType = 'Permiso sin goce';
      }

      if (startDate.current != null && endDate.current != null) {
        startDate.current.value = '';
        endDate.current.value = '';
      }
      
      openSuccessModal({
        title: 'Success',
        body: `${requestType} request made from ${formatInTimeZone(new Date(data.startDate), 'America/El_Salvador', 'd MMMM Y')} to ${formatInTimeZone(new Date(data.endDate), 'America/El_Salvador', 'd MMMM Y')}`
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }

    setDisable(false);
  }

  return(
    <div className="col-4">
      <div className={`${Styles.request}`}>
        <h4 className='mb-2'>Time Off Request</h4>
        <p>You are in the process of requesting a new time-off</p>
        <form onSubmit={submitForm}>
          <label htmlFor="type" className='light-gray-text-2 mt-4 mb-2'>TIME-OFF TYPE</label>
          <select className="form-select rounded" id='type' name="type" required>
            <option value="">Select option</option>
            { types?.map((type) => <option key={type.id} value={type.id}>{type.name}</option>) }
          </select>
          <label htmlFor="startDate" className="light-gray-text-2 mt-3 mb-2">START DATE</label>
          <input ref={startDate} className="form-control rounded" type="date" name="startDate" id="startDate" required />
          <label htmlFor="endDate" className='light-gray-text-2 mt-3 mb-2'>END DATE</label>
          <input ref={endDate} className="form-control rounded" type="date" name="endDate" id="endDate" required />
          <button type='submit' className={`btn btn-dark ${Styles.submitBtn}`} disabled={disable}>Submit</button>
        </form>
      </div>
    </div>
  );
}
