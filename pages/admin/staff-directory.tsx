import type { NextPage } from 'next';
import Head from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { SearchForm } from '../../components/StaffDirectory/SearchForm';
import { StaffTable } from '../../components/StaffDirectory/StaffTable';

const StaffDirectory: NextPage = () => {
  return (
    <div className='container'>
      <Head>
        <title>Profile | Time Off App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      <div className="body row mx-0">
        <SideBarAdmin />
        <div className="col-8">
          <div className="content">
            <SearchForm />
            <StaffTable />
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default StaffDirectory
