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
      <h3>Team Directory</h3>
      <p>View and  manage your team. Click on any employee name to go to their profile.</p>
      <form onSubmit={submitForm}>
      <div className="row g-3">
        <div className="col-lg-6">
          <label htmlFor="name" className="light-gray-text-2 mt-3 mb-2">Name</label>
          <input onKeyUp={changeText} type="text" className="form-control" name="name" />
        </div>
      </div>
      </form>
    </div>
  );
}