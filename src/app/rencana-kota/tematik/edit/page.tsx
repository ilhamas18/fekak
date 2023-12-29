'use client';
import * as React from 'react';
import Breadcrumb from '@/components/global/Breadcrumbs/Breadcrumb';
import withAuth from '@/components/utils/withAuth';
import EditTematikForm from '@/components/pages/rencana-kota/tematik/edit';
import { FaWpforms } from "react-icons/fa";

const EditTematik = () => {
  const gradientStyle = {
    width: '100%',
    background: 'linear-gradient(to right, #1D2B64, #F8CDDA)',
  };

  return (
    <div className='edit-tematik-container'>
      <Breadcrumb pageName="Tematik / Edit" />
      <div style={gradientStyle} className='mt-8'>
        <div className='px-4 flex text-white py-4 space-x-6 font-bold items-center'>
          <FaWpforms size={20} />
          <div className='text-title-xsm'>Form Edit Tematik</div>
        </div>
      </div>
      <EditTematikForm />
    </div>
  )
}

export default withAuth(EditTematik);
