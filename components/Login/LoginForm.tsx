import { Api } from '../../common/constants/api';

export const LoginForm = () => {
    return (
      <div className="container">
        <form className="row" action="">

          <div className="col-md-4 offset-md-4">
            <div className="input-group mb-3">
              <label htmlFor="email" className="visually-hidden">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="email@uassistme.com" />
            </div>
            <div className="input-group mb-3">
              <label htmlFor="inputPassword2" className="visually-hidden">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="password" />
            </div>
            <div className="input-group mb-3">
              <button type="submit" className="btn btn-primary mb-3">Login</button>
            </div>
          </div>
        </form>
      </div>
    );
}