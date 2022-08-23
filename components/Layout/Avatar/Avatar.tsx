import * as React from 'react';
import  Image  from 'next/image'

export const Avatar =() => {
  return (
    <div className='row'>
      <Image src='/assets/img/avatar.png' width={20} height={5} className='avatar col'/>
      <p className='col'>Carlos Rodriguesz</p>
    </ div>
  );
}