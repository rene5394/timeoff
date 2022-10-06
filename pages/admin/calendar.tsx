import { NextPage } from "next";
import Head from "next/head";
import { NavHeader } from "../../components/Layout/NavHeader";
import { SideBarAdmin } from "../../components/Layout/Sidebars/SidebarAdmin";
import { Calendar as CalendarComponent } from "../../components/Calendar/CalendarHR/Calendar";
import { Balance } from "../../components/Calendar/OverviewAdmin";

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
        <SideBarAdmin />
        <div className="content col-8">
          <div className="row">
            <CalendarComponent />
            <Balance />
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Calendar;
