import { Checkout } from '@/components';
import React from 'react';

const page = ({ params }: { params: { packageId: string } }) => {
  return (
    <Checkout packageId={params.packageId}/>
  )
}

export default page;