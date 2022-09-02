import * as React from 'react';
import Styles from './Request.module.css';
import { IType } from '../../../lib/domain/timeoff/IType';
import { findAllTypes } from '../../../lib/api/timeoff/type';
import { createRequestByUserJWT } from '../../../lib/api/timeoff/request';


export const Request= () => {
  const [Type,setType]= React.useState<IType[]>();
  React.useEffect(()=>{
    const FillTypes = async() =>{
      const Result = await findAllTypes();
      setType(Result);
    }
  })

  if (Type) {
    Type.map((TypeItem)=>{
      if (TypeItem.id==1 || TypeItem.id==2 || TypeItem.id==5) {
        console.log(TypeItem.id);
      }
    })  
  }
  const submitForm = async(form: any) => {
    form.preventDefault();
    await createRequestByUserJWT(form);
  }

  return(
    <>
    <div className={'col-3 ' + Styles.Request}>
      <h3>Time Off Request</h3>
      <p>You are in the process of requesting a new time-off</p>
      <form onSubmit={submitForm}>
        <label htmlFor="type">TIME-OFF TYPE</label>
        <select className="form-select" id='type' name="type" aria-label="Default select example">
          
          <option defaultValue={'Open'}>Open this select menu</option>
          <option value="1">Comp Day</option>
          <option value="2">Vacation</option>
          <option value="5">Permiso sin goce</option>

        </select>
        <label htmlFor="Start">START DATE</label>
        <input className={'form-control '} type="date" name="start" id="Start" />
        <label htmlFor="End">END DATE</label>
        <input className={'form-control '} type="date" name="end" id="End" />
        <button type='submit' className={'btn btn-dark ' + Styles.submitBtn}>Submit</button>
      </form>
    </div>
    </>
  );
}