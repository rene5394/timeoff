import * as React from 'react';
import  Image  from 'next/image';

export const Avatar =() => {
  return (
    <div className='col pt-1 ps-3 pe-0'>
      <Image src='/assets/img/avatar.jpg' alt='Avatar' width={30} height={30} className='col rounded-circle'/>
    </ div>
  );
}