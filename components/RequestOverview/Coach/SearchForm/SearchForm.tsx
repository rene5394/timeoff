import * as React from 'react';

export interface SearchForm {
  changeText: (e: any) => void;
}

export const SearchForm: React.FC<SearchForm> = ({ changeText }) => {
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
          <label htmlFor="start" className="light-gray-text-2 mt-3 mb-2">Submit initial date</label>
          <input className="form-control rounded" type="date" name="start" id="start" required />
        </div>
        <div className="col">
          <label htmlFor="end" className='light-gray-text-2 mt-3 mb-2'>Submit final date</label>
          <input className="form-control rounded" type="date" name="end" id="end" required />
        </div>
      </div>
      </form>
    </div>
  );
}