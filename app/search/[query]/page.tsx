import { Search } from '@/components';
import React from 'react';


const page = ({ params }: { params: { query: string } }) => {
  return (
    <div>
        <Search query={params.query}/>
    </div>
  )
}

export default page