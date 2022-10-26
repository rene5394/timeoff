import type { NextPage } from 'next';
import Head from 'next/head';
import { PersonalDetails } from '../../components/Profile/PersonalDetails';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarCoach } from '../../components/Layout/Sidebars/SidebarCoach';
import { Banner } from '../../components/Profile/Banner/Banner';
import { MyBalance } from '../../components/Profile/MyBalance';

const Profile: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Profile | Unplugged</title>
        <meta name="description" content="User balance and information" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className='body row mx-0 gx-6'>
        <SideBarCoach />
        <div className='col-9 pe-0'>
          <div className="content pb-5">
            <Banner />
            <PersonalDetails />
            <MyBalance />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Profile
