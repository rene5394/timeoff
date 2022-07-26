import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { RequestTable } from '../../components/RequestOverview/Admin/RequestTable';
import { SuccessModal, SuccessModalTextProps } from '../../components/Modals/SucessModal';
import { ErrorModal, ErrorModalTextProps } from '../../components/Modals/ErrorModal';

const RequestOverview: NextPage = () => {
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
        <title>Request Overview | Unplugged</title>
        <meta name="description" content="List of requests" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className="body row mx-0 gx-6">
        <SideBarAdmin />
        <div className="col-9 pe-0">
          <div className="content">
            <RequestTable openSuccessModal={openSuccessModal} openErrorModal={openErrorModal} />
          </div>
        </div>
        <SuccessModal text={modalSuccessText} visibility={successModalVisibility} closeModal={closeSuccessModal} />
        <ErrorModal text={modalErrorText} visibility={errorModalVisibility} closeModal={closeErrorModal} />
      </div>
    </div>
  )
}

export default RequestOverview
