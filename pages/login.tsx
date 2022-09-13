import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/future/image";
import { LoginForm } from '../components/Login';

const Login: NextPage = () => {
  return (
      <>
        <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container-fluid min-vh-100 p-0">
          <div className="container pt-5">
            <div className="row">
              <div className="col mb-5">
                <figure>
                  <Image src="/assets/img/uam.png" alt="UAM logo" className="d-block img-fluid mx-auto" width={100} height={62} />
                </figure>
              </div>
            </div>
          </div>
          <LoginForm />
        </div>
      </>
  )
}

export default Login
