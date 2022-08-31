import * as React from 'react';
import styles from './Banner.module.css';
import Image from 'next/future/image'



export const Banner = () => {
  return (
    <div className={styles.banner}>
      <Image src='/assets/img/avatar.png' height={70} width={70} className= {styles.ProfilePic} priority/>
    </div>
  );
}