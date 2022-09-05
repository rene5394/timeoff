import * as React from 'react';
import  Image  from 'next/image';

export const Avatar =() => {
  return (
    <div className='col'>
      <Image src='/assets/img/avatar.png' width={30} height={30} className='col'/>
    </ div>
  );
}