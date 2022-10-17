import * as React from 'react';
import { login } from '../../lib/api/auth/auth';
import { Role } from '../../common/enums/role.enum';
import { AppUrl } from '../../common/constants/app';
import { findOneUserByJWT } from '../../lib/api/auth/auth';

export const LoginForm = () => {
  const [error, setError] = React.useState<string>('');

  React.useEffect(() => {
    const checkIfUserIsLogged = async() => {
      const user = await findOneUserByJWT();

      if (user) {
        if (user.role_id === Role.admin) {
          window.location.href = `${AppUrl}/admin/profile`;
        } if (user.role_id === Role.coach || user.role_id === Role.jrCoach) {
          window.location.href = `${AppUrl}/coach/profile`;
        } if (user.role_id === Role.va) {
          window.location.href = `${AppUrl}/bp/profile`;
        }
      }
    }
    checkIfUserIsLogged();
  }, []);

  const submitForm = async(form: any) => {
    form.preventDefault();
    
    try {
      const result = await login(form);
  
      if (result.roleId === Role.admin) {
        window.location.href = `${AppUrl}/admin/profile`;
      } if (result.roleId === Role.coach || result.roleId === Role.jrCoach) {
        window.location.href = `${AppUrl}/coach/profile`;
      } if (result.roleId === Role.va) {
        window.location.href = `${AppUrl}/bp/profile`;
      }
    } catch (error: any) {
      setError(error.message);
    }  
  }

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
            <div id="login-error" className={`invalid-feedback ${error ? "d-block" : ""}`}>{error}</div>
          </div>
          <div className="input-group mb-3">
            <button type="submit" className="btn btn-warning text-white mb-3">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}