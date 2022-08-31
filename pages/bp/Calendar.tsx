import { NextPage } from "next";
import Head from "next/head";
import { NavHeader } from "../../components/Layout/NavHeader";
import { SideBar } from "../../components/Layout/Sidebar";
import { Calendario } from "../../components/Calendar/Calendario";
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
      <div className="row body">
        <SideBar />
        <div className="content col-8">
          <div className="row">
            <Calendario />
            <Balance />
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Calendar;