import { Api } from '../../common/constants/api';
import { login } from '../../lib/api/auth/auth';

const submitForm = async(form: any) => {
  form.preventDefault();
  await login(form);
}

export const LoginForm = () => {
    return (
      <div className="container">
        <form className="row" onSubmit={submitForm}>
          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input type="email" name="email" className="form-control" id="inputEmail" placeholder="email@uassistme.com" required />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
              <input type="password" name="password" className="form-control" id="inputPassword" placeholder="password" required />
            </div>
            <div className="input-group mb-3">
              <button type="submit" className="btn btn-warning text-white mb-3">Login</button>
            </div>
          </div>
        </form>
      </div>
    );
}