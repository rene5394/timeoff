import { NextPage } from 'next';
import * as React from 'react';
import  Head  from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarBP } from '../../components/Layout/Sidebars/SidebarBP';
import { Summary } from '../../components/TimeOffSummary/Summary';
import { Requests } from '../../components/TimeOffSummary/Requests';

const TimeOffSummary: NextPage = () => {
  const [year,setYear] = React.useState<number>();
  const [years,setYears] = React.useState<number[]>();
  
  React.useEffect(() => {
    let thisYear = new Date().getFullYear();
    setYear(thisYear);

    let newYears: number[] = [];
    
    if (new Date().getFullYear() === 2022) {
      newYears.push(2023);
    } else{
      let max = new Date().getFullYear() - 1;
      let min = 2022;

      for (let i = max; i >= min; i--) {
        newYears.push(i)
      }

      newYears.push(new Date().getFullYear() + 1);
    }
    setYears(newYears);
  }, []);

  return(
    <div className="container">
      <Head>
      <title>Time Off Summary | Unplugged</title>
      <meta name="description" content="Show balance and transactions" />
      <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className="body row mx-0 gx-6">
        <SideBarBP />
        <div className="col-9 pe-0">
          <div className={"col summaryDiv"}>
            <div className="row">
              <div className="col-5">
                <h3>Time-Off Summary</h3>
                <label htmlFor="Start">START DATE</label>
                <select className="form-select" 
                  onChange={(e) => {
                    setYear(parseInt(e.target.value));
                  }}>
                    <option defaultChecked value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                  {
                    years?.map((newYear) => 
                      <option key={newYear} value={newYear}>{newYear}</option>  
                  )}
                </select>
              </div>
              <Summary />
            </div>
          </div>
          {Requests(year)}
        </div>    
      </div>
    </div>
  );
}

export default TimeOffSummary;