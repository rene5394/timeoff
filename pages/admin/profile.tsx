import type { NextPage } from 'next';
import Head from 'next/head';
import { PersonalDetails } from '../../components/Profile/PersonalDetails';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { Banner } from '../../components/Profile/Banner/Banner';
import { MyBalance } from '../../components/Profile/MyBalance';

const Profile: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Profile | Time Off App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      <div className='body row mx-0'>
        <SideBarAdmin />
        <div className='content col-8 pb-5'>
          <Banner />
          <PersonalDetails />
          <MyBalance />
        </div>
      </div>
      
    </div>
  )
}

export default Profile
