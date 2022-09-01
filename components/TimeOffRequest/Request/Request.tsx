import * as react from 'react';
import Styles from './Request.module.css';



export const Request= () => {
  return(
    <>
    <div className={'col-3 ' + Styles.Request}>
      <h3>Time Off Request</h3>
      <p>You are in the process of requesting a new time-off</p>
      <form action="">
        <label htmlFor="type">TIME-OFF TYPE</label>
        <select className="form-select" id='type' aria-label="Default select example">
          <option defaultValue={'Open'}>Open this select menu</option>
          <option value="1">Comp Day</option>
          <option value="2">Vacation</option>
        </select>
        <label htmlFor="Start">START DATE</label>
        <input className={'form-control '} type="date" name="Start" id="Start" />
        <label htmlFor="End">END DATE</label>
        <input className={'form-control '} type="date" name="End" id="End" />
        <button className={'btn btn-dark ' + Styles.submitBtn}>Submit</button>
      </form>
    </div>
    </>
  );
}