import { NextPage } from 'next';
import  Head  from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { Summary } from '../../components/TimeOffSummary/Summary';
import { Requests } from '../../components/TimeOffSummary/Requests';

const TimeOffSummary: NextPage = () => {
  return(
    <div className="container">
      <Head>
      <title>Summary | Time Off App</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader/>
      <div className="body row">
        <SideBarAdmin />
        <div className="col-8">
          <Summary />
          <Requests />
        </div>    
      </div>
    </div>
  );
}

export default TimeOffSummary;