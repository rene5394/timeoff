import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { NavHeader } from '../../components/Layout/NavHeader';
import { SideBarAdmin } from '../../components/Layout/Sidebars/SidebarAdmin';
import { Request } from '../../components/TimeOffRequest/Request';
import { MyBalance } from '../../components/TimeOffRequest/MyBalance';
import { ErrorModal, SuccessModal } from '../../components/Modals';
import { ErrorModalTextProps } from '../../components/Modals/ErrorModal';
import { SuccessModalTextProps } from '../../components/Modals/SucessModal';

const TimeOffRequest: NextPage = () => {
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
        <title>Time Off Request | Unplugged</title>
        <meta name="description" content="Create request and show current balance" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavHeader />
      <div className='body row mx-0 gx-6'>
        <SideBarAdmin />
        <Request openSuccessModal={openSuccessModal} openErrorModal={openErrorModal} />
        <MyBalance />
        <SuccessModal text={modalSuccessText} visibility={successModalVisibility} closeModal={closeSuccessModal} />
        <ErrorModal text={modalErrorText} visibility={errorModalVisibility} closeModal={closeErrorModal} />
      </div>
      
    </div>
  )
}
export default TimeOffRequest;