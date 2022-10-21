import { NextPage } from "next";
import Head from "next/head";
import { NavHeader } from "../../components/Layout/NavHeader";
import { SideBarBP } from "../../components/Layout/Sidebars/SidebarBP";
import { Calendar as CalendarComponent } from "../../components/Calendar/Calendar/Calendar";
import { Balance } from "../../components/Calendar/Overview";

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
        <SideBarBP />
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
