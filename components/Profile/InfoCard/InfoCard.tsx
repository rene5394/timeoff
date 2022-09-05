import * as React from 'react';

interface InfoCardProps {
  title: string;
  text: string;
  borderColorClass: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ title, text, borderColorClass }) => {
  return (
    <div className={`col-lg-3 col-md-2 ps-2 ${borderColorClass}`}>
      <h6>{title}</h6>
      <p>{text}</p>
    </div>
  );
};
