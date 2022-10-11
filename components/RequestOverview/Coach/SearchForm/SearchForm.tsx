import * as React from 'react';

export interface SearchForm {
  changeText: (e: any) => void;
  changeDate: (e: any) => void;
}

export const SearchForm: React.FC<SearchForm> = ({ changeText, changeDate }) => {
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