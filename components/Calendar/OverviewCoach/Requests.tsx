import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import React from "react";
import Styles from './Balance.module.css';
import { findAllRequestsByUsers } from "../../../lib/api/timeoff/request";
import { findAllTypes } from "../../../lib/api/timeoff/type";
import { IRequest } from "../../../lib/domain/timeoff/IRequest";
import { countDaysbyType } from "../../Commons/type";
import { IType } from '../../../lib/domain/timeoff/IType';
import { IUser } from "../../../lib/domain/team/IUser";
import { findAllTeamUsersEmployeesByJWT } from "../../../lib/api/team/user";

export const ShowRequests = (usersIds: any[]) => {
  const [requests, setRequests] = React.useState<IRequest[]>();
  const [types, setTypes] = React.useState<IType[]>();
  const [userTeams,setUserTeams] = React.useState<IUser[]>();

  const typeSearch = (id: number) => {
    var type = types?.filter(val => val.id == id);
    var name = type?.map(res => {return res.name})
    return name;
  }
  React.useEffect(() => {
    const fillRequests = async() => {
      const result = await findAllRequestsByUsers(-1, usersIds,'pending');
      const resultList:IRequest[] = result.list;
      const resultFilter = resultList.filter(request => {
        let findUserOnRequests = usersIds.find(id => id === request.userId);
        if (findUserOnRequests) {
          return request;
        }
      })
      setRequests(resultFilter);
    }

    const fillTypes = async() => {
      const result = await findAllTypes();
      setTypes(result);
    }

    const fillUsersTeam = async() => {
      const result = await findAllTeamUsersEmployeesByJWT();
      let resultList = result.list;
      setUserTeams(resultList);
    }

    fillRequests();
    fillTypes();
    fillUsersTeam();
  }, [usersIds]);
  
  const searchUserName = (userId:number) => {
    if (userTeams) {
      let newUser = userTeams.find(user => user.id === userId);

      return `${newUser?.firstname} ${newUser?.lastname}`;
    }
    return 'not found';
  }

  return(
    <>
      {
        requests?.map((request) =>
          <div key={request.id}>
            <h5 className={Styles.Comp}><FontAwesomeIcon  icon = {['fas','tree']} /> {typeSearch(request.typeId)} - {searchUserName(request.userId)}</h5>
            <p>{String(countDaysbyType(request.typeId,request.startDate,request.endDate))}d</p>
            <p>{format(new Date(request.startDate), 'd MMMM Y')}</p>
          </div>
          )
      }
    </>
  );
}