import * as React from 'react';
import { ITeam } from '../../../../lib/domain/team/ITeam';

export interface SearchForm {
  teams: ITeam[] | undefined;
  setTeams: (teams: ITeam[]) => void;
  changeTeam: (e: any) => void;
  changeText: (e: any) => void;
  changeDate: (e: any) => void;
}

export const SearchForm: React.FC<SearchForm> = ({ teams, setTeams, changeTeam, changeText, changeDate }) => {
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
          <input onChange={changeDate} className="form-control rounded" type="date" name="startDate" id="startDate" required />
        </div>
        <div className="col">
          <label htmlFor="end" className='light-gray-text-2 mt-3 mb-2'>Submit end date</label>
          <input onChange={changeDate} className="form-control rounded" type="date" name="endDate" id="endDate" required />
        </div>
      </div>
      </form>
    </div>
  );
}