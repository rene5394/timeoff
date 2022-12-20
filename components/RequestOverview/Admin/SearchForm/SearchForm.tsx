import * as React from 'react';
import { ITeam } from '../../../../lib/domain/team/ITeam';
import { ITransactionStatus } from '../../../../lib/domain/timeoff/ITransactionStatus';

export interface SearchForm {
  startDate: string;
  endDate: string;
  teams: ITeam[] | undefined;
  transactionStatuses: ITransactionStatus[] | undefined;
  setTeams: (teams: ITeam[]) => void;
  setTransactionStatuses: (transactionStatuses: ITransactionStatus[]) => void;
  changeTransactionStatus: (e: any) => void;
  changeTeam: (e: any) => void;
  changeText: (e: any) => void;
  changeDate: (e: any) => void;
}

export const SearchForm: React.FC<SearchForm> = ({ startDate, endDate, teams, transactionStatuses, setTeams, setTransactionStatuses, changeTransactionStatus, changeTeam, changeText, changeDate }) => {
  const submitForm = async(form: any) => {
    form.preventDefault();
  }

  return(
    <div className="row px-5 pt-4">
      <h3>Request Overview</h3>
      <p>View and  manage your staff. Click on any employee name to go to their profile.</p>
      <form onSubmit={submitForm}>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="team" className="light-gray-text-2 mt-3 mb-2">Team</label>
          <select onChange={changeTeam} className="form-select rounded" id='team' name="team" required>
            <option value="">Select option</option>
            { teams?.map((team) => <option value={team.id}>{team.name}</option>) }
          </select>
        </div>
        <div className="col">
          <label htmlFor="name" className="light-gray-text-2 mt-3 mb-2">Name</label>
          <input onKeyUp={changeText} type="text" className="form-control" name="name" />
        </div>
      </div>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="start" className="light-gray-text-2 mt-3 mb-2">Submit start date</label>
          <input onChange={changeDate} className="form-control rounded" type="date" name="startDate" id="startDate" value={startDate} required />
        </div>
        <div className="col">
          <label htmlFor="end" className='light-gray-text-2 mt-3 mb-2'>Submit end date</label>
          <input onChange={changeDate} className="form-control rounded" type="date" name="endDate" id="endDate" value={endDate} required />
        </div>
      </div>
      <div className="row g-3">
        <div className="col">
          <label htmlFor="transactionStatus" className="light-gray-text-2 mt-3 mb-2">Transaction status</label>
          <select onChange={changeTransactionStatus} className="form-select rounded" id='transactionStatus' name="transactionStatus" required>
            <option value="0">Select option</option>
            { transactionStatuses?.map((status) => <option value={status.id}>{status.name}</option>) }
          </select>
        </div>
      </div>
      </form>
    </div>
  );
}