import { NextPage } from "next";
import Head from "next/head";
import { NavHeader } from "../../components/Layout/NavHeader";
import { SideBarCoach } from "../../components/Layout/Sidebars/SidebarCoach";
import { Calendar as CalendarComponent } from "../../components/Calendar/CalendarCoach/Calendar";
import { Balance } from "../../components/Calendar/OverviewCoach/Balance";

const Calendar: NextPage = () => {
  return(
    <div className="container">
      <Head>
        <title>Calendar | Time Off App</title>
        <meta name="description" content="Calendar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      <div className="row body mx-0">
        <SideBarCoach />
        <div className="content col-8">
          <div className="row">
            <CalendarComponent />
          </div>
        </div>
        <div className="row">
          <Balance />
        </div>
      </div>
    </div>
  );
}
export default Calendar;
