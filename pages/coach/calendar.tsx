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
        <title>Calendar | Unplugged</title>
        <meta name="description" content="Calendar to show requests" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className="row body mx-0 mb-4 gx-6">
        <SideBarCoach />
        <div className="col-9 pe-0">
          <div className="content">
            <div className="row px-5 py-4">
              <Balance />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="content">
            <div className="row">
              <CalendarComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
