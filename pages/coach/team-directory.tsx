import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarCoach } from '../../components/Layout/Sidebars/SidebarCoach';
import { TeamTable } from '../../components/TeamDirectory/TeamTable';
import { ErrorModal, SuccessModal } from '../../components/Modals';
import { ErrorModalTextProps } from '../../components/Modals/ErrorModal';
import { SuccessModalTextProps } from '../../components/Modals/SucessModal';

const TeamDirectory: NextPage = () => {
  const [successModalVisibility, setSuccessModalVisibility] = React.useState<boolean>(false);
  const [errorModalVisibility, setErrorModalVisibility] = React.useState<boolean>(false);
  const [modalSuccessText, setModalSuccessText] = React.useState<SuccessModalTextProps>();
  const [modalErrorText, setModalErrorText] = React.useState<ErrorModalTextProps>();

  const openSuccessModal = (textProps: SuccessModalTextProps) => {
    setModalSuccessText({
      title: textProps.title,
      body: textProps.body
    });
    
    setSuccessModalVisibility(true);
  }

  const openErrorModal = (textProps: ErrorModalTextProps) => {
    setModalErrorText({
      title: textProps.title,
      body: textProps.body
    });

    setErrorModalVisibility(true);
  }

  const closeSuccessModal = () => {
    setSuccessModalVisibility(false);
  }

  const closeErrorModal = () => {
    setErrorModalVisibility(false);
  }

  return (
    <div className='container'>
      <Head>
        <title>Team Directory | Unplugged</title>
        <meta name="description" content="List of team members and their balances" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className="body row mx-0 gx-6">
        <SideBarCoach />
        <div className="col-9 pe-0">
          <div className="content">
            <TeamTable openSuccessModal={openSuccessModal} openErrorModal={openErrorModal} />
          </div>
        </div>
        <SuccessModal text={modalSuccessText} visibility={successModalVisibility} closeModal={closeSuccessModal} />
        <ErrorModal text={modalErrorText} visibility={errorModalVisibility} closeModal={closeErrorModal} />
      </div>
      
    </div>
  )
}

export default TeamDirectory
