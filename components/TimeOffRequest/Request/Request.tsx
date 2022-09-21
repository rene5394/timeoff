import * as React from 'react';
import Styles from './Request.module.css';
import { IType } from '../../../lib/domain/timeoff/IType';
import { RequestType } from '../../../common/enums/request-type.enum';
import { findAllTypes } from '../../../lib/api/timeoff/type';
import { createRequestByUserJWT } from '../../../lib/api/timeoff/request';
import { ErrorModalTextProps } from '../../Modals/ErrorModal';
import { SuccessModalTextProps } from '../../Modals/SucessModal';

interface RequestProps {
  openSuccessModal: (textProps: SuccessModalTextProps) => void;
  openErrorModal: (textProps: ErrorModalTextProps) => void;
}

export const Request: React.FC<RequestProps> = ({ openSuccessModal, openErrorModal }) => {
  const [types, setTypes] = React.useState<IType[]>();

  React.useEffect(() => {
    const fillTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    };
    fillTypes();
  }, [])
  
  const submitForm = async(form: any) => {
    form.preventDefault();
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

      openSuccessModal({
        title: 'Success',
        body: `${requestType} request made from ${data.startDate} to ${data.endDate}`
      });
    } if (result.status === 400) {
      const messages = result.data.message;
      console.log(messages);
      openErrorModal({
        title: 'Error',
        body: messages
      });
    }
  }

  return(
    <>
    <div className={`col-3 ${Styles.request}`}>
      <h4 className='mb-2'>Time Off Request</h4>
      <p>You are in the process of requesting a new time-off</p>
      <form onSubmit={submitForm}>
        <label htmlFor="type" className='light-gray-text-2 mt-4 mb-2'>TIME-OFF TYPE</label>
        <select className="form-select rounded" id='type' name="type" required>
          <option value="">Select option</option>
          { types?.map((type) => <option value={type.id}>{type.name}</option>) }
        </select>
        <label htmlFor="start" className="light-gray-text-2 mt-3 mb-2">START DATE</label>
        <input className="form-control rounded" type="date" name="start" id="start" required />
        <label htmlFor="end" className='light-gray-text-2 mt-3 mb-2'>END DATE</label>
        <input className="form-control rounded" type="date" name="end" id="end" required />
        <button type='submit' className={`btn btn-dark ${Styles.submitBtn}`}>Submit</button>
      </form>
    </div>
    </>
  );
}
