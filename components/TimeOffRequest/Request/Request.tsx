import * as React from 'react';
import Styles from './Request.module.css';
import { IType } from '../../../lib/domain/timeoff/IType';
import { findAllTypes } from '../../../lib/api/timeoff/type';
import { createRequestByUserJWT } from '../../../lib/api/timeoff/request';


export const Request= () => {
  const [types, setTypes]= React.useState<IType[]>();

  React.useEffect(() => {
    const fillTypes = async() =>{
      const result = await findAllTypes();
      setTypes(result);
    };
    fillTypes();
  }, [])

  const submitForm = async(form: any) => {
    form.preventDefault();
    await createRequestByUserJWT(form);
  }

  return(
    <>
    <div className={'col-3 ' + Styles.Request}>
      <h4 className='mb-2'>Time Off Request</h4>
      <p>You are in the process of requesting a new time-off</p>
      <form onSubmit={submitForm}>
        <label htmlFor="type" className='light-gray-text-2 mt-4 mb-2'>TIME-OFF TYPE</label>
        <select className="form-select rounded" id='type' name="type" aria-label="Default select example">
          <option value="0">Select option</option>
          { types?.map((type) => <option value={type.id}>{type.name}</option>) }
        </select>
        <label htmlFor="start" className="light-gray-text-2 mt-3 mb-2">START DATE</label>
        <input className="form-control rounded" type="date" name="start" id="start" />
        <label htmlFor="end" className='light-gray-text-2 mt-3 mb-2'>END DATE</label>
        <input className="form-control rounded" type="date" name="end" id="end" />
        <button type='submit' className={'btn btn-dark ' + Styles.submitBtn}>Submit</button>
      </form>
    </div>
    </>
  );
}