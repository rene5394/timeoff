import axios from 'axios';
import * as React from 'react';
import { Api } from '../../../common/constants/api';
import styles from './InfoCard.module.css';

interface InfoCardProps {
  title: string;
  text: string;
  borderColorClass: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, text, borderColorClass }) => {
  return (
    <div className={'col-lg-3 col-md-2 ' + borderColorClass}>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
};
